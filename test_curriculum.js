const fs = require('fs');
const vm = require('vm');
function extractObjectLiteral(src, startToken) {
  const idx = src.indexOf(startToken);
  if (idx === -1) throw new Error('start token not found: ' + startToken);
  const braceIdx = src.indexOf('{', idx + startToken.length);
  if (braceIdx === -1) throw new Error('opening brace not found');
  let i = braceIdx;
  let depth = 0;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return src.slice(braceIdx, i + 1);
      }
    }
  }
  throw new Error('matching closing brace not found');
}

try {
  const path = __dirname + '/Lern-App/script.js';
  const src = fs.readFileSync(path, 'utf8');
  const germanLiteral = extractObjectLiteral(src, 'const germanCurriculum =');
  const intermediate = extractObjectLiteral(src, 'const germanIntermediateTexts =');
  const advanced = extractObjectLiteral(src, 'const germanAdvancedTexts =');

  const sandbox = { console };
  const ctxt = vm.createContext(sandbox);
  vm.runInContext('result = ' + germanLiteral + ';', ctxt);
  const germanCurriculum = ctxt.result;
  vm.runInContext('inter = ' + intermediate + ';', ctxt);
  vm.runInContext('adv = ' + advanced + ';', ctxt);

  const issues = [];
  if (!germanCurriculum[1] || germanCurriculum[1].length === 0) issues.push('Grade 1 has 0 topics');
  if (!germanCurriculum[5] || germanCurriculum[5].length === 0) issues.push('Grade 5 has 0 topics');
  if (!germanCurriculum[10] || germanCurriculum[10].length === 0) issues.push('Grade 10 has 0 topics');

  const defaultGradeLine = /grade:\s*Number\.isInteger\(saved\.grade\)\s*&&\s*saved\.grade\s*>\=\s*1\s*&&\s*saved\.grade\s*<\=\s*10\s*\?\s*saved\.grade\s*:\s*1/;
  const defaultGradeOk = defaultGradeLine.test(src);
  if (!defaultGradeOk) issues.push('Default grade fallback to 1 not found');

  if (!ctxt.inter || ctxt.inter.length === 0) issues.push('intermediate text pool missing');
  if (!ctxt.adv || ctxt.adv.length === 0) issues.push('advanced text pool missing');

  if (issues.length === 0) {
    console.log('OK: germanCurriculum and text pools present.');
    console.log('Grade1 topics:', germanCurriculum[1].length);
    console.log('Grade5 topics:', germanCurriculum[5].length);
    console.log('Grade10 topics:', germanCurriculum[10].length);
    process.exit(0);
  } else {
    console.error('ISSUES:');
    issues.forEach(i => console.error('- ' + i));
    process.exit(2);
  }
} catch (e) {
  console.error('ERROR:', e && e.stack ? e.stack : e);
  process.exit(3);
}

