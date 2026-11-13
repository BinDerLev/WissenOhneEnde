const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

function createGame({ reducedMotion = false } = {}) {
  const animations = []
  const timers = new Map()
  let timerId = 0
  let document
  class Element {
    constructor() {
      this.children = []
      this.dataset = {}
      this.attributes = {}
      this.className = ''
      this.textContent = ''
      this.value = ''
      this.classList = {
        contains: name => this.className.split(' ').includes(name),
        add: (...names) => { this.className += ' ' + names.join(' ') },
        remove: (...names) => { this.className = this.className.split(' ').filter(name => !names.includes(name)).join(' ') }
      }
    }
    set innerHTML(value) { this.children = [] }
    setAttribute(key, value) { this.attributes[key] = value }
    addEventListener() {}
    appendChild(child) { this.children.push(child) }
    contains(element) { return this.children.some(child => child === element || child.contains(element)) }
    focus() { document.activeElement = this }
    querySelectorAll(selector) {
      const matches = element => selector === '.square' ? element.classList.contains('square')
        : selector === '.piece' ? element.classList.contains('piece')
        : element.classList.contains('square') && [...selector.matchAll(/data-([rc])=['"](\d)['"]/g)].every(([, key, value]) => String(element.dataset[key]) === value)
      return this.children.flatMap(child => [...(matches(child) ? [child] : []), ...child.querySelectorAll(selector)])
    }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
    getBoundingClientRect() { return { left: Number(this.dataset.c) * 64, top: Number(this.dataset.r) * 64 } }
    animate(frames, options) {
      let resolve, reject
      const finished = new Promise((res, rej) => { resolve = res; reject = rej })
      const animation = { frames, options, finished, finish: resolve, cancel: () => reject(new Error('cancelled')) }
      animations.push(animation)
      return animation
    }
  }
  const elements = new Map()
  document = {
    activeElement: null,
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new Element())
      return elements.get(id)
    },
    createElement: () => new Element(),
    querySelectorAll: selector => elements.get('board').querySelectorAll(selector),
    querySelector: selector => elements.get('board').querySelector(selector),
    addEventListener() {}
  }
  const context = vm.createContext({
    document,
    window: { matchMedia: () => ({ matches: reducedMotion }), GameRoundSession: { finish() {} } },
    setTimeout: callback => { const id = ++timerId; timers.set(id, callback); return id },
    clearTimeout: id => timers.delete(id)
  })
  vm.runInContext(fs.readFileSync(`${__dirname}/../chess.js`, 'utf8'), context)
  return {
    run: code => vm.runInContext(code, context),
    read: code => JSON.parse(JSON.stringify(vm.runInContext(code, context))),
    element: id => elements.get(id), animations, timers
  }
}

test('piece colors belong to each side on both light and dark squares', () => {
  const game = createGame()
  const squares = game.element('board').querySelectorAll('.square')
  assert.equal(squares.filter(square => square.querySelector('.piece')?.classList.contains('piece-white')).length, 16)
  assert.equal(squares.filter(square => square.querySelector('.piece')?.classList.contains('piece-black')).length, 16)
  assert.equal(game.read('lastMove'), null)
})

test('moves animate before committing; extra input cannot move pieces during animation or the AI turn', async () => {
  const game = createGame()
  const pending = game.run('doMove({from:[6,4],to:[4,4]})')
  assert.equal(game.read('animating'), true)
  assert.equal(game.read('board[6][4]'), 'p')
  assert.equal(game.animations.length, 1)
  assert.equal(game.animations[0].frames[1].transform, 'translate(0px, -128px)')
  await game.run('doMove({from:[6,3],to:[4,3]})')
  assert.equal(game.animations.length, 1)
  game.animations[0].finish()
  await pending
  assert.equal(game.read('board[4][4]'), 'p')
  assert.equal(game.read('turn'), 'w')
  assert.equal(game.read('aiThinking'), true)
  game.run('onSquareClick({currentTarget:getSquare([1,0])})')
  assert.equal(game.read('selected'), null)
  assert.match(game.element('last-move').textContent, /Du \(Schwarz\).*Bauer e2 → e4/)
  assert.equal(game.element('board').querySelectorAll('.square').filter(s => s.classList.contains('last-move-from')).length, 1)
  assert.match(game.run('getSquare([4,4]).attributes["aria-label"]'), /Zielfeld des letzten Zugs/)
})

test('the computer animates its chosen move and replaces the previous move markers', async () => {
  const game = createGame({ reducedMotion: true })
  await game.run('doMove({from:[6,4],to:[4,4]})')
  game.run('window.matchMedia = () => ({matches:false})')
  const pending = game.run('aiMoveRandom()')
  assert.equal(game.read('animating'), true)
  assert.equal(game.animations.length, 1)
  assert.equal(game.element('status').textContent, 'KI zieht…')
  game.animations[0].finish()
  await pending
  assert.equal(game.read('turn'), 'b')
  assert.equal(game.read('aiThinking'), false)
  assert.equal(game.read('pieceColor(lastMove.piece)'), 'w')
  assert.match(game.element('last-move').textContent, /KI \(Weiß\)/)
  assert.equal(game.element('board').querySelectorAll('.square').filter(s => s.classList.contains('last-move-to')).length, 1)
})

test('a restart cancels an in-flight animation without committing its stale move', async () => {
  const game = createGame()
  const pending = game.run('doMove({from:[6,4],to:[4,4]})')
  game.run('init()')
  await pending
  assert.equal(game.read('board[6][4]'), 'p')
  assert.equal(game.read('board[4][4]'), '')
  assert.equal(game.read('lastMove'), null)
  assert.equal(game.read('animating'), false)
  assert.equal(game.timers.size, 0)
})

test('a restart clears a scheduled computer move and ignores stale callbacks', async () => {
  const game = createGame({ reducedMotion: true })
  await game.run('doMove({from:[6,4],to:[4,4]})')
  const oldCallback = [...game.timers.values()][0]
  game.run('init()')
  assert.equal(game.timers.size, 0)
  oldCallback()
  assert.equal(game.read('turn'), 'b')
  assert.equal(game.read('lastMove'), null)
})

test('castling animates both king and rook and records their final positions', async () => {
  const game = createGame()
  game.run("board[7][5]=''; board[7][6]=''; renderBoard()")
  const pending = game.run('doMove({from:[7,4],to:[7,6]})')
  assert.equal(game.animations.length, 2)
  game.animations.forEach(animation => animation.finish())
  await pending
  assert.equal(game.read('board[7][6]'), 'k')
  assert.equal(game.read('board[7][5]'), 'r')
  assert.match(game.element('last-move').textContent, /Rochade/)
})

test('promotion and en passant preserve the moved piece and origin in the move description', async () => {
  for (const [piece, from, to, color, promoted] of [['P', [6,0], [7,0], 'w', 'Q'], ['p', [1,0], [0,0], 'b', 'q']]) {
    const game = createGame({ reducedMotion: true })
    game.run(`board[${from[0]}][0]='${piece}'; turn='${color}'; renderBoard()`)
    await game.run(`doMove(${JSON.stringify({ from, to })})`)
    assert.equal(game.read(`board[${to[0]}][0]`), promoted)
    assert.equal(game.read('lastMove.piece'), piece)
    assert.match(game.element('last-move').textContent, /Bauer.*Umwandlung zur Dame/)
  }
  const game = createGame({ reducedMotion: true })
  game.run("board[3][4]='p'; board[3][3]='P'; enPassant={r:2,c:3}; renderBoard()")
  await game.run('doMove({from:[3,4],to:[2,3]})')
  assert.equal(game.read('board[3][3]'), '')
  assert.equal(game.read('board[2][3]'), 'p')
  assert.match(game.element('last-move').textContent, /Bauer e5 → d6/)
})
