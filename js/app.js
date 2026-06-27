// ===========================
//  Math Worksheet Generator
//  app.js
// ===========================

const generateBtn = document.getElementById('generateBtn');
const printBtn    = document.getElementById('printBtn');
const preview     = document.getElementById('worksheetPreview');

generateBtn.addEventListener('click', generateWorksheet);
printBtn.addEventListener('click', () => window.print());

function generateWorksheet() {
  const operation   = document.getElementById('operation').value;
  const minNum      = parseInt(document.getElementById('minNum').value, 10);
  const maxNum      = parseInt(document.getElementById('maxNum').value, 10);
  const numQ        = parseInt(document.getElementById('numQuestions').value, 10);
  const title       = document.getElementById('title').value.trim() || 'Math Practice';
  const includeMeta = document.getElementById('studentName').checked;

  if (minNum > maxNum) {
    alert('Min Number cannot be greater than Max Number.');
    return;
  }

  const questions = buildQuestions(operation, minNum, maxNum, numQ);
  renderWorksheet(title, operation, questions, includeMeta);
  printBtn.disabled = false;
}

function buildQuestions(operation, min, max, count) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    let a = randomInt(min, max);
    let b = randomInt(min, max);

    if (operation === 'subtraction' && a < b) [a, b] = [b, a]; // avoid negatives
    if (operation === 'division') {
      // ensure b != 0 and result is whole number
      b = randomInt(1, max);
      a = b * randomInt(1, Math.max(1, Math.floor(max / b)));
    }

    questions.push({ a, b, operation });
  }
  return questions;
}

function renderWorksheet(title, operation, questions, includeMeta) {
  const opSymbol = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };
  const symbol   = opSymbol[operation];

  let html = `<div class="worksheet">`;

  // Header
  html += `<div class="worksheet-header"><h2>${escapeHtml(title)}</h2>`;
  if (includeMeta) {
    html += `<div class="meta-fields">
      <span>Name: <span class="meta-field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
      <span>Date: <span class="meta-field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
      <span>Score: <span class="meta-field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
    </div>`;
  }
  html += `</div>`;

  // Questions
  html += `<div class="questions-grid">`;
  questions.forEach((q, idx) => {
    html += `<div class="question">${idx + 1}. &nbsp; ${q.a} ${symbol} ${q.b} = <span class="answer-line">&nbsp;&nbsp;&nbsp;&nbsp;</span></div>`;
  });
  html += `</div></div>`;

  preview.innerHTML = html;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
