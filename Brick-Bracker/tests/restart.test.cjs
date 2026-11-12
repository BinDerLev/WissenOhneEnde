const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

test('restarting cancels the return and allows the next round to finish', () => {
  const timers = new Map();
  const notices = new Set();
  let redirects = 0;
  let timerId = 0;
  const document = {
    body: { dataset: {}, appendChild(node) { notices.add(node); } },
    head: { appendChild() {} },
    createElement() { return { setAttribute() {}, remove() { notices.delete(this); } }; }
  };
  const window = {
    setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    location: { replace() { redirects++; } }
  };
  vm.runInNewContext(fs.readFileSync(`${__dirname}/../../game-round-session.js`, 'utf8'), { window, document });
  window.GameRoundSession.finish();
  window.GameRoundSession.finish();
  assert.equal(timers.size, 1);
  window.GameRoundSession.restart();
  for (const callback of timers.values()) callback();
  assert.equal(redirects, 0);
  assert.equal(notices.size, 0);
  assert.equal(document.body.dataset.roundFinished, undefined);
  window.GameRoundSession.finish();
  assert.equal(timers.size, 1);
  for (const callback of timers.values()) callback();
  assert.equal(redirects, 1);
});
