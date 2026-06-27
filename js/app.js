// ===========================
//  Math Worksheet Generator
//  app.js
// ===========================

const generateBtn      = document.getElementById('generateBtn');
const printBtn         = document.getElementById('printBtn');
const preview          = document.getElementById('worksheetPreview');
const pagination       = document.getElementById('pagination');
const prevBtn          = document.getElementById('prevBtn');
const nextBtn          = document.getElementById('nextBtn');
const pageIndicator    = document.getElementById('pageIndicator');
const topicSelect      = document.getElementById('topic');
const timesTableGroup  = document.getElementById('timesTableGroup');
const rangeRow         = document.getElementById('rangeRow');

const QUESTIONS_PER_PAGE = 20;

let allPages    = [];
let currentPage = 0;

// Show/hide controls based on topic
topicSelect.addEventListener('change', () => {
  const topic = topicSelect.value;
  const isTimesTable = topic === 'times-tables';
  timesTableGroup.style.display = isTimesTable ? 'block' : 'none';
  rangeRow.style.display        = isTimesTable ? 'none' : 'flex';
});

generateBtn.addEventListener('click', generateWorksheet);
printBtn.addEventListener('click', () => window.print());
prevBtn.addEventListener('click', () => showPage(currentPage - 1));
nextBtn.addEventListener('click', () => showPage(currentPage + 1));

function generateWorksheet() {
  const topic       = topicSelect.value;
  const minNum      = parseInt(document.getElementById('minNum').value, 10);
  const maxNum      = parseInt(document.getElementById('maxNum').value, 10);
  const numQ        = parseInt(document.getElementById('numQuestions').value, 10);
  const timesTable  = parseInt(document.getElementById('timesTable').value, 10);
  const title       = document.getElementById('title').value.trim() || topicLabel(topic, timesTable);
  const includeMeta = document.getElementById('studentName').checked;

  if (topic !== 'times-tables' && minNum > maxNum) {
    alert('Min Number cannot be greater than Max Number.');
    return;
  }

  const questions = buildQuestions(topic, minNum, maxNum, numQ, timesTable);
  allPages = paginateQuestions(questions, title, topic, includeMeta);
  currentPage = 0;
  showPage(0);
  printBtn.disabled = false;
}

function topicLabel(topic, timesTable) {
  const map = {
    addition: 'Addition Practice',
    subtraction: 'Subtraction Practice',
    multiplication: 'Multiplication Practice',
    division: 'Division Practice',
    'times-tables': `${timesTable} Times Table`,
    mixed: 'Mixed Operations Practice',
  };
  return map[topic] || 'Math Practice';
}

function paginateQuestions(questions, title, topic, includeMeta) {
  const pages = [];
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  for (let p = 0; p < totalPages; p++) {
    const slice    = questions.slice(p * QUESTIONS_PER_PAGE, (p + 1) * QUESTIONS_PER_PAGE);
    const startIdx = p * QUESTIONS_PER_PAGE;
    pages.push(buildPageHTML(slice, startIdx, title, includeMeta, p + 1, totalPages));
  }
  return pages;
}

function showPage(index) {
  if (index < 0 || index >= allPages.length) return;
  currentPage = index;
  preview.innerHTML = allPages[index];

  const total = allPages.length;
  pageIndicator.textContent = `Page ${index + 1} of ${total}`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === total - 1;
  pagination.style.display = total > 1 ? 'flex' : 'none';
}

function buildPageHTML(questions, startIdx, title, includeMeta, pageNum, totalPages) {
  const opSymbol = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };

  const cols = 4;
  const rows = Math.ceil(questions.length / cols);
  let html = `<div class="a4-page" style="--q-rows:${rows}">`;

  // Header
  html += `<div class="worksheet-header"><h2>${escapeHtml(title)}</h2>`;
  if (includeMeta) {
    html += `<div class="meta-fields">
      <span>Name: <span class="meta-field"></span></span>
      <span>Date: <span class="meta-field"></span></span>
      <span>Score: <span class="meta-field"></span></span>
    </div>`;
  }
  html += `</div>`;

  // Questions grid
  html += `<div class="questions-grid">`;
  questions.forEach((q, idx) => {
    const num    = startIdx + idx + 1;
    const symbol = opSymbol[q.operation];
    html += `<div class="question">${num}.&nbsp; ${q.a} ${symbol} ${q.b} = <span class="answer-line"></span></div>`;
  });
  html += `</div>`;

  // Page footer
  if (totalPages > 1) {
    html += `<div class="page-footer">Page ${pageNum} of ${totalPages}</div>`;
  }

  html += `</div>`;
  return html;
}

function buildQuestions(topic, min, max, count, timesTable) {
  const mixedOps = ['addition', 'subtraction', 'multiplication', 'division'];
  const questions = [];

  for (let i = 0; i < count; i++) {
    let operation, a, b;

    if (topic === 'times-tables') {
      operation = 'multiplication';
      a = timesTable;
      b = randomInt(1, 12);
    } else if (topic === 'mixed') {
      operation = mixedOps[randomInt(0, 3)];
      a = randomInt(min, max);
      b = randomInt(min, max);
      if (operation === 'subtraction' && a < b) [a, b] = [b, a];
      if (operation === 'division') {
        b = randomInt(1, max);
        a = b * randomInt(1, Math.max(1, Math.floor(max / b)));
      }
    } else {
      operation = topic;
      a = randomInt(min, max);
      b = randomInt(min, max);
      if (operation === 'subtraction' && a < b) [a, b] = [b, a];
      if (operation === 'division') {
        b = randomInt(1, max);
        a = b * randomInt(1, Math.max(1, Math.floor(max / b)));
      }
    }

    questions.push({ a, b, operation });
  }
  return questions;
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
