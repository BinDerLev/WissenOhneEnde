const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const element = () => ({ textContent: '', disabled: false, innerHTML: '', style: {}, classList: { add() {} }, setAttribute() {}, addEventListener() {}, appendChild() {}, getAnimations: () => [] });
const context = vm.createContext({
  document: { getElementById: element, addEventListener() {}, createElement: element },
  window: { addEventListener() {}, setInterval() {} },
  localStorage: { getItem: () => null, setItem() {} },
});
vm.runInContext(fs.readFileSync(`${__dirname}/../script.js`, 'utf8'), context);
const evaluate = code => JSON.parse(JSON.stringify(vm.runInContext(code, context)));
const board = row => [row, [0,0,0,0], [0,0,0,0], [0,0,0,0]];
function move(input, direction) {
  return evaluate(`calculateMove(${JSON.stringify(input)}, '${direction}')`);
}
test('all directions merge in movement order, once per tile', () => {
  for (const direction of ['left', 'right', 'up', 'down']) {
    const input = direction === 'up' || direction === 'down'
      ? [[2,0,0,0],[2,0,0,0],[4,0,0,0],[4,0,0,0]] : board([2,2,4,4]);
    const result = move(input, direction);
    const line = direction === 'up' || direction === 'down' ? result.grid.map(row => row[0]) : result.grid[0];
    assert.deepEqual(line, ['right', 'down'].includes(direction) ? [0,0,4,8] : [4,8,0,0]);
    assert.equal(result.points, 12);
    assert.equal(result.tracks.length, 4);
    assert.equal(result.merges.length, 2);
  }
});
test('right/down detect movement and ignore already aligned tiles', () => {
  assert.equal(move(board([0,0,0,2]), 'right').moved, false);
  assert.equal(move(board([2,0,0,0]), 'right').moved, true);
  assert.equal(move([[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,0,0]], 'down').moved, false);
});
test('gaps, triples and fours preserve merge rules', () => {
  assert.deepEqual(move(board([2,0,2,4]), 'left').grid[0], [4,4,0,0]);
  assert.deepEqual(move(board([2,2,2,0]), 'left').grid[0], [4,2,0,0]);
  assert.deepEqual(move(board([2,2,2,2]), 'right').grid[0], [0,0,4,4]);
});
test('invalid moves preserve undo history; rapid input cannot create extra turns', async () => {
  vm.runInContext(`grid = [[0,0,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; previousState = [[8]];`, context);
  await vm.runInContext(`applyMove('right')`, context);
  assert.deepEqual(evaluate('previousState'), [[8]]);
  vm.runInContext('animating = true', context);
  await vm.runInContext(`applyMove('left')`, context);
  assert.deepEqual(evaluate('grid[0]'), [0,0,0,2]);
});
