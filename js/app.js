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
const moduleSelect     = document.getElementById('module');
const topicSelect      = document.getElementById('topic');
const timesTableGroup  = document.getElementById('timesTableGroup');
const rangeRow         = document.getElementById('rangeRow');

const QUESTIONS_PER_PAGE = 20;

const MODULE_TOPICS = {
  arithmetic: [
    { value: 'addition', label: 'Addition (+)' },
    { value: 'subtraction', label: 'Subtraction (−)' },
    { value: 'multiplication', label: 'Multiplication (×)' },
    { value: 'division', label: 'Division (÷)' },
    { value: 'times-tables', label: 'Times Tables' },
    { value: 'mixed', label: 'Mixed Operations' },
  ],
};

let allPages    = [];
let currentPage = 0;

moduleSelect.addEventListener('change', () => {
  populateTopics();
  updateTopicControls();
});

topicSelect.addEventListener('change', () => {
  updateTopicControls();
});

function populateTopics() {
  const topics = MODULE_TOPICS[moduleSelect.value] || [];
  topicSelect.innerHTML = topics
    .map((topic) => `<option value="${topic.value}">${topic.label}</option>`)
    .join('');
}

// Show/hide controls based on topic
function updateTopicControls() {
  const topic = topicSelect.value;
  const isTimesTable = topic === 'times-tables';
  timesTableGroup.style.display = isTimesTable ? 'block' : 'none';
  rangeRow.style.display        = isTimesTable ? 'none' : 'flex';
}

populateTopics();
updateTopicControls();

generateBtn.addEventListener('click', generateWorksheet);
printBtn.addEventListener('click', () => window.print());
prevBtn.addEventListener('click', () => showPage(currentPage - 1));
nextBtn.addEventListener('click', () => showPage(currentPage + 1));

function generateWorksheet() {
  const module      = moduleSelect.value;
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
  allPages = paginateQuestions(questions, title, module, includeMeta);
  currentPage = 0;
  showPage(0);
  printBtn.disabled = false;
}

function moduleLabel(module) {
  const map = {
    arithmetic: 'Arithmetic',
  };
  return map[module] || 'Mathematics';
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

function paginateQuestions(questions, title, module, includeMeta) {
  const pages = [];
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  for (let p = 0; p < totalPages; p++) {
    const slice    = questions.slice(p * QUESTIONS_PER_PAGE, (p + 1) * QUESTIONS_PER_PAGE);
    const startIdx = p * QUESTIONS_PER_PAGE;
    pages.push(buildPageHTML(slice, startIdx, title, module, includeMeta, p + 1, totalPages));
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

function buildPageHTML(questions, startIdx, title, module, includeMeta, pageNum, totalPages) {
  const opSymbol = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };

  const cols = 4;
  const rows = Math.ceil(questions.length / cols);
  let html = `<div class="a4-page" style="--q-rows:${rows}">`;

  // Header
  html += `<div class="worksheet-header"><h2>${escapeHtml(title)}</h2>`;
  html += `<div class="worksheet-module">Module: ${escapeHtml(moduleLabel(module))}</div>`;
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
    html += renderVerticalQuestion(num, q, opSymbol[q.operation]);
  });
  html += `</div>`;

  // Page footer
  if (totalPages > 1) {
    html += `<div class="page-footer">Page ${pageNum} of ${totalPages}</div>`;
  }

  html += `</div>`;
  return html;
}

function renderVerticalQuestion(num, question, symbol) {
  if (question.operation === 'division') {
    return renderLongDivisionQuestion(num, question);
  }

  return `
    <div class="question question-vertical">
      <div class="question-number">${num}.</div>
      <div class="question-stack">
        <div class="question-top">${question.a}</div>
        <div class="question-bottom">
          <span class="question-operator">${symbol}</span>
          <span class="question-value">${question.b}</span>
        </div>
        <div class="answer-line"></div>
      </div>
    </div>`;
}

function renderLongDivisionQuestion(num, question) {
  return `
    <div class="question question-long-division">
      <div class="question-number">${num}.</div>
      <div class="long-division">
        <div class="long-division-divisor">${question.b}</div>
        <div class="long-division-work">
          <div class="long-division-answer"></div>
          <div class="long-division-dividend">${question.a}</div>
        </div>
      </div>
    </div>`;
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
