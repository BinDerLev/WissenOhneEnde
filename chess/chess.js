const boardEl = document.getElementById('board')
const statusEl = document.getElementById('status')
const restartBtn = document.getElementById('restart')

const PIECE_UNICODE = {
  p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
  P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
}

let board = []
let turn = 'w' // 'w' or 'b'
let selected = null
let legalMoves = []
let gameOver = false
let aiThinking = false
let castling = { w: {k: true, q: true}, b: {k: true, q: true} }
let enPassant = null // {r,c} square that can be captured into this move, or null

function init() {
  board = [
    ['R','N','B','Q','K','B','N','R'],
    ['P','P','P','P','P','P','P','P'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['p','p','p','p','p','p','p','p'],
    ['r','n','b','q','k','b','n','r']
  ]
  turn = 'b'
  selected = null
  legalMoves = []
  gameOver = false
  aiThinking = false
  castling = { w: {k: true, q: true}, b: {k: true, q: true} }
  enPassant = null
  renderBoard()
  updateStatus()
}

function renderBoard() {
  boardEl.innerHTML = ''
  for (let r = 0; r < 8; r++) {
    const rank = document.createElement('div')
    rank.className = 'rank'
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement('div')
      sq.className = 'square ' + (((r + c) % 2 === 1) ? 'light' : 'dark')
      sq.dataset.r = r
      sq.dataset.c = c
      const p = board[r][c]
      if (p) sq.textContent = PIECE_UNICODE[p]
      sq.addEventListener('click', onSquareClick)
      rank.appendChild(sq)
    }
    boardEl.appendChild(rank)
  }
  highlightSelection()
      if (searchInput && searchInput.value && searchInput.value.trim()) performSearch()
}

function onSquareClick(e) {
  if (gameOver) return
  const r = +e.currentTarget.dataset.r
  const c = +e.currentTarget.dataset.c
  const p = board[r][c]
  const color = pieceColor(p)

  if (selected) {
    // try to move
    const move = legalMoves.find(m => m.from[0]===selected[0] && m.from[1]===selected[1] && m.to[0]===r && m.to[1]===c)
    if (move) {
      doMove(move)
      return
    }
  }

  // select own piece
  if (p && ((turn==='w' && color==='w') || (turn==='b' && color==='b'))) {
    selected = [r,c]
    legalMoves = computeLegalMovesForSquare(r,c)
    highlightSelection()
  } else {
    // clicked empty or enemy and no selection -> ignore
    selected = null
    legalMoves = []
    highlightSelection()
  }
}

function highlightSelection() {
  document.querySelectorAll('.square').forEach(sq => {
    sq.classList.remove('selected','highlight')
  })
  if (selected) {
    const [sr,sc] = selected
    const sel = document.querySelector(`.square[data-r='${sr}'][data-c='${sc}']`)
    if (sel) sel.classList.add('selected')
    for (const m of legalMoves) {
      const [tr,tc] = m.to
      const t = document.querySelector(`.square[data-r='${tr}'][data-c='${tc}']`)
      if (t) t.classList.add('highlight')
    }
  }
}

function pieceColor(p) {
  if (!p) return null
  return p === p.toUpperCase() ? 'w' : 'b'
}

// einfache Figurbewertung, positive Werte = Materialvorteil für Schwarz
function pieceValue(p){
  if (!p) return 0
  const t = p.toLowerCase()
  if (t==='p') return 1
  if (t==='n') return 3
  if (t==='b') return 3
  if (t==='r') return 5
  if (t==='q') return 9
  if (t==='k') return 1000
  return 0
}

function computeLegalMovesForSquare(r,c) {
  const p = board[r][c]
  if (!p) return []
  const color = pieceColor(p)
  if ((turn==='w' && color!=='w') || (turn==='b' && color!=='b')) return []
  const raw = pieceMoves(r,c,board)
  const legal = []
  for (const to of raw) {
    const mv = {from:[r,c], to}
    const nb = cloneBoard(board)
    applyMoveOnBoard(nb, mv, false)
    if (!isKingInCheck(color, nb)) legal.push(mv)
  }
  return legal
}

function allLegalMovesForColor(color) {
  const moves = []
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
    const p = board[r][c]
    if (!p) continue
    if (pieceColor(p)!==color) continue
    const raws = pieceMoves(r,c,board)
    for (const to of raws) {
      const mv = {from:[r,c], to}
      const nb = cloneBoard(board)
      applyMoveOnBoard(nb,mv,false)
      if (!isKingInCheck(color, nb)) moves.push(mv)
    }
  }
  return moves
}

function doMove(move) {
  applyMoveOnBoard(board, move)
  // promotion
  const [tr,tc]=move.to
  const moved = board[tr][tc]
  if (moved === 'P' && tr===7) board[tr][tc]='Q'
  if (moved === 'p' && tr===0) board[tr][tc]='q'

  // switch
  turn = (turn==='w') ? 'b' : 'w'
  selected = null
  legalMoves = []
  renderBoard()
  checkGameState()
  updateStatus()

  if (!gameOver && turn==='w') {
    // AI move with small delay; bei mittlerer/schwerer Schwierigkeit zusätzlich 1s Pause
    const diffEl = document.getElementById('difficulty')
    const diff = diffEl ? diffEl.value : '2'
    // Level 1 & 2: ca. 1300 ms Verzögerung; Level 3: keine Verzögerung
    const delay = (diff === '3') ? 0 : 1300
    // Anzeige: KI denkt während Wartezeit
    aiThinking = true
    updateStatus()
    setTimeout(aiMoveRandom, delay)
  }
}

function applyMoveOnBoard(bd, move, updateGlobal = true) {
  const [fr,fc]=move.from, [tr,tc]=move.to
  const piece = bd[fr][fc]
  const color = pieceColor(piece)

  // handle en passant capture: if pawn moves diagonally into empty square that equals enPassant
  if (piece && piece.toLowerCase()==='p' && fc!==tc && !bd[tr][tc] && enPassant && enPassant.r===tr && enPassant.c===tc) {
    // remove the pawn that moved two squares last turn (it's behind the target square)
    const dir = (color==='w') ? 1 : -1 // direction of moving pawn
    const capR = tr - dir
    bd[capR][tc] = ''
  }

  // move piece
  bd[tr][tc] = bd[fr][fc]
  bd[fr][fc] = ''

  // handle castling: if king moves two squares, move rook correspondingly
  if (piece && piece.toLowerCase()==='k') {
    // disable castling rights for this color (global state)
    if (updateGlobal) {
      castling[color].k = false
      castling[color].q = false
    }
    if (Math.abs(tc-fc)===2) {
      // kingside
      if (tc>fc) {
        const rr = fr, rfc = 7, rtc = 5
        bd[rr][rtc] = bd[rr][rfc]
        bd[rr][rfc] = ''
      } else {
        // queenside
        const rr = fr, rfc = 0, rtc = 3
        bd[rr][rtc] = bd[rr][rfc]
        bd[rr][rfc] = ''
      }
    }
  }

  // if rook moves from initial square, disable appropriate castling right
  if (piece && piece.toLowerCase()==='r') {
    if (updateGlobal) {
      if (fr===0 && fc===0) castling.w.q = false
      if (fr===0 && fc===7) castling.w.k = false
      if (fr===7 && fc===0) castling.b.q = false
      if (fr===7 && fc===7) castling.b.k = false
    }
  }

  // set enPassant: if pawn moved two squares, set target square; otherwise clear
  if (piece && piece.toLowerCase()==='p' && Math.abs(tr-fr)===2) {
    // square passed over
    const midR = (fr+tr)/2
    if (updateGlobal) enPassant = {r: midR, c: fc}
  } else {
    if (updateGlobal) enPassant = null
  }
}

function aiMoveRandom() {
  const color = 'w'

  // Bestimme Tiefe und Verhalten aus dem Difficulty-Selector
  const diffEl = document.getElementById('difficulty')
  const diff = diffEl ? diffEl.value : '2'
  let MAX_DEPTH = 3 // default (Mittel)
  let mistakeChance = 0 // Wahrscheinlichkeit für zufälligen (fehlerhaften) Zug
  if (diff === '1') { MAX_DEPTH = 2; mistakeChance = 0.35 } // Level 1: leicht — gelegentlich suboptimale Züge
  if (diff === '2') { MAX_DEPTH = 3; mistakeChance = 0.12 } // Level 2: mittel — seltener Fehler
  if (diff === '3') { MAX_DEPTH = 5; mistakeChance = 0 } // Level 3: schwer — keine absichtlichen Fehler

  // Hilfsfunktion: pieceMoves aber auf einem beliebigen Brett
  function pieceMovesOnBoard(r,c,bd){
    const p = bd[r][c]
    if (!p) return []
    const color = pieceColor(p)
    const moves = []
    const pl = p.toLowerCase()
     if (pl==='p') {
       const dir = (color==='w') ? 1 : -1
       const startRow = (color==='w') ? 1 : 6
       if (inRange(r+dir,c) && !bd[r+dir][c]) {
         moves.push([r+dir,c])
         if (r===startRow && !bd[r+2*dir][c]) moves.push([r+2*dir,c])
       }
       for (const dc of [-1,1]) {
         const rr=r+dir, cc=c+dc
         if (inRange(rr,cc) && bd[rr][cc] && pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
       }
    } else if (pl==='n') {
      const jumps = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
      for (const [dr,dc] of jumps) {
        const rr=r+dr, cc=c+dc
        if (!inRange(rr,cc)) continue
        if (!bd[rr][cc] || pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
      }
    } else if (pl==='b' || pl==='r' || pl==='q') {
      const dirs = []
      if (pl==='b' || pl==='q') dirs.push([-1,-1],[-1,1],[1,-1],[1,1])
      if (pl==='r' || pl==='q') dirs.push([-1,0],[1,0],[0,-1],[0,1])
      for (const [dr,dc] of dirs) {
        let rr=r+dr, cc=c+dc
        while (inRange(rr,cc)) {
          if (!bd[rr][cc]) moves.push([rr,cc])
          else { if (pieceColor(bd[rr][cc])!==color) moves.push([rr,cc]); break }
          rr+=dr; cc+=dc
        }
      }
    } else if (pl==='k') {
      for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
        if (dr===0&&dc===0) continue
        const rr=r+dr, cc=c+dc
        if (!inRange(rr,cc)) continue
        if (!bd[rr][cc] || pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
      }
    }
    return moves
  }

  function allLegalMovesForColorOnBoard(bd, colorParam){
    const moves = []
    for (let r=0;r<8;r++) for (let c=0;c<8;c++){
      const p = bd[r][c]
      if (!p) continue
      if (pieceColor(p)!==colorParam) continue
      const raws = pieceMovesOnBoard(r,c,bd)
      for (const to of raws){
        const mv = {from:[r,c], to}
        const nb = cloneBoard(bd)
        applyMoveOnBoard(nb,mv,false)
        if (!isKingInCheck(colorParam, nb)) moves.push(mv)
      }
    }
    return moves
  }

  function evaluateBoard(bd){
    let s = 0
    for (let r=0;r<8;r++) for (let c=0;c<8;c++){
      const p = bd[r][c]
      if (!p) continue
      const v = pieceValue(p)
      s += (pieceColor(p)==='b') ? v : -v
    }
    return s
  }

  function negamax(bd, depth, alpha, beta, colorToMove){
    if (depth===0) return evaluateBoard(bd) * (colorToMove==='b' ? 1 : -1)
    const moves = allLegalMovesForColorOnBoard(bd,colorToMove)
    if (moves.length===0){
      if (isKingInCheck(colorToMove, bd)) return -10000
      return 0
    }
    // move ordering: prefer captures
    moves.sort((a,b)=>{
      const at = bd[a.to[0]][a.to[1]]; const bt = bd[b.to[0]][b.to[1]]
      const av = at ? pieceValue(at) : 0
      const bv = bt ? pieceValue(bt) : 0
      return bv - av
    })
    let best = -Infinity
    for (const mv of moves){
      const nb = cloneBoard(bd)
      applyMoveOnBoard(nb,mv,false)
      const val = -negamax(nb, depth-1, -beta, -alpha, (colorToMove==='b'?'w':'b'))
      if (val>best) best = val
      if (val>alpha) alpha = val
      if (alpha>=beta) break
    }
    return best
  }

    const moves = allLegalMovesForColor('w')
    if (moves.length===0){ aiThinking = false; checkGameState(); updateStatus(); return }

   let bestMove = null
   let bestScore = -Infinity
    for (const mv of moves){
      const nb = cloneBoard(board)
      applyMoveOnBoard(nb,mv,false)
      const score = -negamax(nb, MAX_DEPTH-1, -Infinity, Infinity, 'b')
     if (score>bestScore){ bestScore = score; bestMove = mv }
   }

    // Berechne Bewertung für alle Züge
    const scored = []
    for (const mv of moves){
      const nb = cloneBoard(board)
      applyMoveOnBoard(nb,mv,false)
      const score = -negamax(nb, MAX_DEPTH-1, -Infinity, Infinity, (color==='w'?'b':'w'))
      scored.push({mv, score})
    }

    // sortiere absteigend nach score (bestes zuerst)
    scored.sort((a,b)=>b.score - a.score)

    // Fehlerverhalten: bei leichter Schwierigkeit gelegentlich zufälligen Zug wählen
    let finalMove = null
    if (Math.random() < mistakeChance) {
      // bei leichteren Levels wähle aus einem größeren Pool suboptimaler Züge,
      // bei mittlerer Schwierigkeit nur aus den besseren Alternativen
      let poolSize = 1
      if (diff === '1') poolSize = Math.min(10, scored.length)
      else if (diff === '2') poolSize = Math.min(4, scored.length)
      else poolSize = Math.min(1, scored.length)
      const idx = Math.floor(Math.random()*poolSize)
      finalMove = scored[idx].mv
    } else {
      finalMove = scored.length>0 ? scored[0].mv : null
    }

    if (!finalMove){
      const nonCaptures = moves.filter(m=>!board[m.to[0]][m.to[1]])
      finalMove = nonCaptures.length>0 ? nonCaptures[Math.floor(Math.random()*nonCaptures.length)] : moves[Math.floor(Math.random()*moves.length)]
    }

    applyMoveOnBoard(board, finalMove)
    // AI hat beendet => Denken aus
    aiThinking = false
   // promotion
   const [tr,tc]=bestMove.to
    const moved = board[tr][tc]
    // Promotion für weiße Bauern: erreichen der letzten Reihe (r==7)
    if (moved === 'P' && tr===7) board[tr][tc]='Q'

   turn = 'b'
  renderBoard()
  checkGameState()
  updateStatus()
}

function checkGameState() {
  const color = turn
  const moves = allLegalMovesForColor(color)
  if (moves.length===0) {
    if (isKingInCheck(color, board)) {
      statusEl.textContent = (color==='w' ? 'Weiß ist matt. Du gewinnst!' : 'Schwarz ist matt. Die KI gewinnt.')
    } else {
      statusEl.textContent = 'Patt.'
    }
    gameOver = true
  }
}

function updateStatus() {
  if (gameOver) return
  if (aiThinking) { statusEl.textContent = 'KI denkt…'; return }
  statusEl.textContent = (turn==='w') ? 'Weiß am Zug' : 'Schwarz am Zug'
}

function cloneBoard(bd) {
  return bd.map(r => r.slice())
}

function isKingInCheck(color, bd) {
  // find king
  const king = color==='w' ? 'K' : 'k'
  let kr=-1,kc=-1
  for (let r=0;r<8;r++) for (let c=0;c<8;c++) if (bd[r][c]===king) { kr=r; kc=c }
  if (kr<0) return true
  const enemy = color==='w' ? 'b' : 'w'
  return isSquareAttacked(kr,kc,enemy,bd)
}

function isSquareAttacked(r,c,byColor,bd) {
  // pawns
  if (byColor==='w') {
    const dr = 1
    for (const dc of [-1,1]) {
      const rr = r+dr, cc = c+dc
      if (inRange(rr,cc) && bd[rr][cc]==='P') return true
    }
  } else {
    const dr = -1
    for (const dc of [-1,1]) {
      const rr = r+dr, cc = c+dc
      if (inRange(rr,cc) && bd[rr][cc]==='p') return true
    }
  }

  // knights
  const knights = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
  for (const [dr,dc] of knights) {
    const rr=r+dr, cc=c+dc
    if (!inRange(rr,cc)) continue
    const p = bd[rr][cc]
    if (!p) continue
    if ((byColor==='w' && p==='N') || (byColor==='b' && p==='n')) return true
  }

  // sliding pieces
  const dirs = [ [-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1] ]
  for (const [dr,dc] of dirs) {
    let rr=r+dr, cc=c+dc
    let dist=1
    while (inRange(rr,cc)) {
      const p = bd[rr][cc]
      if (p) {
        const isWhite = p === p.toUpperCase()
        const pLower = p.toLowerCase()
        if (byColor==='w' && isWhite) {
          if ( (dist===1 && pLower==='k') ) return true
          if ((dr===0||dc===0) && (pLower==='r' || pLower==='q')) return true
          if ((dr!==0&&dc!==0) && (pLower==='b' || pLower==='q')) return true
        }
        if (byColor==='b' && !isWhite) {
          if ( (dist===1 && pLower==='k') ) return true
          if ((dr===0||dc===0) && (pLower==='r' || pLower==='q')) return true
          if ((dr!==0&&dc!==0) && (pLower==='b' || pLower==='q')) return true
        }
        break
      }
      rr+=dr; cc+=dc; dist++
    }
  }
  return false
}

function inRange(r,c){return r>=0 && r<8 && c>=0 && c<8}

function pieceMoves(r,c,bd) {
  const p = bd[r][c]
  if (!p) return []
  const color = pieceColor(p)
  const moves = []
  const pl = p.toLowerCase()
   if (pl==='p') {
     const dir = (color==='w') ? 1 : -1
     const startRow = (color==='w') ? 1 : 6
     // forward
     if (inRange(r+dir,c) && !bd[r+dir][c]) {
       moves.push([r+dir,c])
       if (r===startRow && !bd[r+2*dir][c]) moves.push([r+2*dir,c])
     }
      // captures
      for (const dc of [-1,1]) {
        const rr=r+dir, cc=c+dc
        if (inRange(rr,cc) && bd[rr][cc] && pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
        // en passant: capture in das Zielfeld, auch wenn dort aktuell kein Stein steht
        if (inRange(rr,cc) && !bd[rr][cc] && enPassant && enPassant.r===rr && enPassant.c===cc) {
          moves.push([rr,cc])
        }
      }
  } else if (pl==='n') {
    const jumps = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
    for (const [dr,dc] of jumps) {
      const rr=r+dr, cc=c+dc
      if (!inRange(rr,cc)) continue
      if (!bd[rr][cc] || pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
    }
  } else if (pl==='b' || pl==='r' || pl==='q') {
    const dirs = []
    if (pl==='b' || pl==='q') dirs.push([-1,-1],[-1,1],[1,-1],[1,1])
    if (pl==='r' || pl==='q') dirs.push([-1,0],[1,0],[0,-1],[0,1])
    for (const [dr,dc] of dirs) {
      let rr=r+dr, cc=c+dc
      while (inRange(rr,cc)) {
        if (!bd[rr][cc]) moves.push([rr,cc])
        else { if (pieceColor(bd[rr][cc])!==color) moves.push([rr,cc]); break }
        rr+=dr; cc+=dc
      }
    }
  } else if (pl==='k') {
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
      if (dr===0&&dc===0) continue
      const rr=r+dr, cc=c+dc
      if (!inRange(rr,cc)) continue
      if (!bd[rr][cc] || pieceColor(bd[rr][cc])!==color) moves.push([rr,cc])
    }
    // Castling: nur möglich, wenn König und betroffene Türme noch nicht gezogen haben
    try {
      if (!isKingInCheck(color, bd)) {
        const row = r
        // kingside
        if (castling[color].k) {
          if (!bd[row][5] && !bd[row][6]) {
            if (!isSquareAttacked(row,5, color==='w'?'b':'w', bd) && !isSquareAttacked(row,6, color==='w'?'b':'w', bd)) {
              const rook = bd[row][7]
              if (rook && pieceColor(rook)===color && rook.toLowerCase()==='r') moves.push([row,6])
            }
          }
        }
        // queenside
        if (castling[color].q) {
          if (!bd[row][1] && !bd[row][2] && !bd[row][3]) {
            if (!isSquareAttacked(row,3, color==='w'?'b':'w', bd) && !isSquareAttacked(row,2, color==='w'?'b':'w', bd)) {
              const rook = bd[row][0]
              if (rook && pieceColor(rook)===color && rook.toLowerCase()==='r') moves.push([row,2])
            }
          }
        }
      }
    } catch (e) { /* ignore if no king found on bd */ }
  }
  return moves
}

restartBtn.addEventListener('click', init)

// Anleitung Toggle
const toggleRulesBtn = document.getElementById('toggle-rules')
const closeRulesBtn = document.getElementById('close-rules')
const rulesContainer = document.getElementById('rules-container')

if (toggleRulesBtn) {
  toggleRulesBtn.addEventListener('click', () => {
    rulesContainer.classList.toggle('hidden')
  })
}

if (closeRulesBtn) {
  closeRulesBtn.addEventListener('click', () => {
    rulesContainer.classList.add('hidden')
  })
}

// Schließe die Anleitung, wenn außerhalb geklickt wird
if (rulesContainer) {
  rulesContainer.addEventListener('click', (e) => {
    if (e.target === rulesContainer) {
      rulesContainer.classList.add('hidden')
    }
  })
}

// Suche: Felder oder Figuren hervorheben
const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const clearSearchBtn = document.getElementById('clear-search')

function coordToRC(coord) {
  // coord like e4 -> c=4, r = 8 - rank
  if (!/^[a-h][1-8]$/i.test(coord)) return null
  const file = coord[0].toLowerCase()
  const rank = parseInt(coord[1],10)
  const c = file.charCodeAt(0) - 'a'.charCodeAt(0)
  const r = 8 - rank
  return [r,c]
}

function performSearch() {
  const q = (searchInput && searchInput.value) ? searchInput.value.trim() : ''
  document.querySelectorAll('.square').forEach(sq=>sq.classList.remove('search-hit'))
  if (!q) { statusEl.textContent = (turn==='w') ? 'Weiß am Zug' : 'Schwarz am Zug'; return }
  // coordinate search
  const coord = coordToRC(q)
  let hits = []
  if (coord) {
    const [r,c] = coord
    const sq = document.querySelector(`.square[data-r='${r}'][data-c='${c}']`)
    if (sq) { sq.classList.add('search-hit'); hits.push([r,c]) }
  } else {
    const map = {
      'bauer':'p','p':'p','pawn':'p',
      'turm':'r','r':'r','rook':'r',
      'springer':'n','n':'n','knight':'n',
      'läufer':'b','läufer':'b','b':'b','bishop':'b',
      'dame':'q','q':'q','queen':'q',
      'könig':'k','k':'k','king':'k'
    }
    const key = q.toLowerCase()
    const piece = map[key]
    if (piece) {
      for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
        const p = board[r][c]
        if (!p) continue
        if (p.toLowerCase()===piece) {
          const sq = document.querySelector(`.square[data-r='${r}'][data-c='${c}']`)
          if (sq) { sq.classList.add('search-hit'); hits.push([r,c]) }
        }
      }
    }
  }
  statusEl.textContent = hits.length>0 ? `${hits.length} Treffer für "${q}"` : `Keine Treffer für "${q}"`
}

if (searchBtn) searchBtn.addEventListener('click', performSearch)
if (clearSearchBtn) clearSearchBtn.addEventListener('click', ()=>{ if (searchInput) searchInput.value=''; document.querySelectorAll('.square').forEach(sq=>sq.classList.remove('search-hit')); updateStatus() })
if (searchInput) searchInput.addEventListener('keydown',(e)=>{ if (e.key==='Enter') performSearch() })

init()

