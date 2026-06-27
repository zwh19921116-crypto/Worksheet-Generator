// ===========================
//  Math Worksheet Generator
//  app.js
// ===========================

const generateBtn      = document.getElementById('generateBtn');
const refreshBtn       = document.getElementById('refreshBtn');
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
const titleInput       = document.getElementById('title');
const solutionsCheckbox = document.getElementById('solutionsRequired');

const MODULE_TOPICS = {
  arithmetic: [
    { value: 'addition', label: 'Addition (+)' },
    { value: 'subtraction', label: 'Subtraction (−)' },
    { value: 'multiplication', label: 'Multiplication (×)' },
    { value: 'division', label: 'Division (÷)' },
    { value: 'times-tables', label: 'Times Tables' },
    { value: 'bodmas', label: 'B.O.D.M.A.S' },
    { value: 'mixed', label: 'Mixed Operations' },
  ],
  fractions: [
    { value: 'equivalent-fractions', label: 'Equivalent Fractions' },
    { value: 'simplifying-fractions', label: 'Simplifying Fractions' },
    { value: 'mixed-fractions', label: 'Mixed Fractions' },
    { value: 'improper-fractions', label: 'Improper Fractions' },
    { value: 'add-fractions', label: 'Add Fractions' },
    { value: 'subtract-fractions', label: 'Subtract Fractions' },
    { value: 'multiply-fractions', label: 'Multiply Fractions' },
    { value: 'divide-fractions', label: 'Divide Fractions' },
  ],
  decimals: [
    { value: 'decimal-place-value', label: 'Decimal Place Value' },
    { value: 'decimal-operations', label: 'Decimal Operations' },
  ],
  percentages: [
    { value: 'percentage-increase', label: 'Percentage Increase' },
    { value: 'percentage-decrease', label: 'Percentage Decrease' },
    { value: 'percentage-to-decimal', label: 'Converting Percentage to Decimal' },
  ],
  number: [
    { value: 'whole-numbers', label: 'Whole Numbers' },
    { value: 'place-value', label: 'Place Value' },
    { value: 'ordering-numbers', label: 'Ordering Numbers' },
    { value: 'factors', label: 'Factors' },
    { value: 'multiples', label: 'Multiples' },
    { value: 'prime-numbers', label: 'Prime Numbers' },
    { value: 'composite-numbers', label: 'Composite Numbers' },
    { value: 'integers', label: 'Integers' },
    { value: 'indices', label: 'Indices' },
    { value: 'scientific-notation', label: 'Scientific Notation' },
    { value: 'surds', label: 'Surds' },
  ],
};

const NUMBER_TOPICS = new Set([
  'whole-numbers',
  'place-value',
  'ordering-numbers',
  'factors',
  'multiples',
  'prime-numbers',
  'composite-numbers',
  'integers',
  'indices',
  'scientific-notation',
  'surds',
]);

const FRACTION_TOPICS = new Set([
  'equivalent-fractions',
  'simplifying-fractions',
  'mixed-fractions',
  'improper-fractions',
  'add-fractions',
  'subtract-fractions',
  'multiply-fractions',
  'divide-fractions',
]);

const DECIMAL_TOPICS = new Set([
  'decimal-place-value',
  'decimal-operations',
]);

const PERCENTAGE_TOPICS = new Set([
  'percentage-increase',
  'percentage-decrease',
  'percentage-to-decimal',
]);

let allPages    = [];
let currentPage = 0;
let lastGeneratedQuestions = [];
let titleTouched = false;

moduleSelect.addEventListener('change', () => {
  populateTopics();
  updateTopicControls();
  updateTitleInput();
});

topicSelect.addEventListener('change', () => {
  updateTopicControls();
  updateTitleInput();
});

titleInput.addEventListener('input', () => {
  titleTouched = titleInput.value.trim() !== defaultTitleSuffix();
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

function updateTitleInput(force = false) {
  if (!titleTouched || force) {
    titleInput.value = defaultTitleSuffix();
    titleTouched = false;
  }
}

function defaultTitleSuffix() {
  return `${moduleLabel(moduleSelect.value)} - ${topicLabel(topicSelect.value, parseInt(document.getElementById('timesTable').value, 10))}`;
}

populateTopics();
updateTopicControls();
updateTitleInput(true);

generateBtn.addEventListener('click', generateWorksheet);
refreshBtn.addEventListener('click', refreshWorksheet);
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
  const titleSuffix = titleInput.value.trim() || defaultTitleSuffix();
  const title       = `Edgeducate: ${titleSuffix}`;
  const includeSolutions = solutionsCheckbox.checked;

  if (topic !== 'times-tables' && minNum > maxNum) {
    alert('Min Number cannot be greater than Max Number.');
    return;
  }

  const questions = buildQuestions(topic, minNum, maxNum, numQ, timesTable);
  lastGeneratedQuestions = questions;
  renderWorksheetPages(questions);
}

function refreshWorksheet() {
  if (lastGeneratedQuestions.length === 0) {
    generateWorksheet();
    return;
  }

  renderWorksheetPages(lastGeneratedQuestions);
}

function renderWorksheetPages(questions) {
  const module      = moduleSelect.value;
  const titleSuffix = titleInput.value.trim() || defaultTitleSuffix();
  const title       = `Edgeducate: ${titleSuffix}`;
  const includeSolutions = solutionsCheckbox.checked;

  allPages = paginateQuestions(questions, title, module, includeSolutions);
  currentPage = 0;
  showPage(0);
  printBtn.disabled = false;
}

function moduleLabel(module) {
  const map = {
    arithmetic: 'Arithmetic',
    fractions: 'Fractions',
    decimals: 'Decimals',
    percentages: 'Percentages',
    number: 'Number',
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
    bodmas: 'B.O.D.M.A.S Practice',
    mixed: 'Mixed Operations Practice',
    'whole-numbers': 'Whole Numbers Practice',
    'place-value': 'Place Value Practice',
    'ordering-numbers': 'Ordering Numbers Practice',
    factors: 'Factors Practice',
    multiples: 'Multiples Practice',
    'prime-numbers': 'Prime Numbers Practice',
    'composite-numbers': 'Composite Numbers Practice',
    integers: 'Integers Practice',
    indices: 'Indices Practice',
    'scientific-notation': 'Scientific Notation Practice',
    surds: 'Surds Practice',
    'equivalent-fractions': 'Equivalent Fractions Practice',
    'simplifying-fractions': 'Simplifying Fractions Practice',
    'mixed-fractions': 'Mixed Fractions Practice',
    'improper-fractions': 'Improper Fractions Practice',
    'add-fractions': 'Add Fractions Practice',
    'subtract-fractions': 'Subtract Fractions Practice',
    'multiply-fractions': 'Multiply Fractions Practice',
    'divide-fractions': 'Divide Fractions Practice',
    'decimal-place-value': 'Decimal Place Value Practice',
    'decimal-operations': 'Decimal Operations Practice',
    'percentage-increase': 'Percentage Increase Practice',
    'percentage-decrease': 'Percentage Decrease Practice',
    'percentage-to-decimal': 'Percentage to Decimal Practice',
  };
  return map[topic] || 'Math Practice';
}

function paginateQuestions(questions, title, module, includeSolutions) {
  const pageModels = [];
  const questionsPerPage = getQuestionsPerPage(questions);
  const worksheetPageCount = Math.ceil(questions.length / questionsPerPage);

  for (let p = 0; p < worksheetPageCount; p++) {
    const slice    = questions.slice(p * questionsPerPage, (p + 1) * questionsPerPage);
    const startIdx = p * questionsPerPage;
    pageModels.push({
      type: 'worksheet',
      questions: slice,
      startIdx,
      title,
      module,
    });
  }

  if (includeSolutions) {
    const solutionsPerPage = 20;
    const solutionPageCount = Math.ceil(questions.length / solutionsPerPage);
    for (let p = 0; p < solutionPageCount; p++) {
      const slice = questions.slice(p * solutionsPerPage, (p + 1) * solutionsPerPage);
      const startIdx = p * solutionsPerPage;
      pageModels.push({
        type: 'solutions',
        questions: slice,
        startIdx,
        title,
        module,
      });
    }
  }

  const totalPages = pageModels.length;
  return pageModels.map((pageModel, index) => {
    if (pageModel.type === 'solutions') {
      return buildSolutionsPageHTML(pageModel.questions, pageModel.startIdx, pageModel.title, pageModel.module, index + 1, totalPages);
    }

    return buildPageHTML(
      pageModel.questions,
      pageModel.startIdx,
      pageModel.title,
      pageModel.module,
      index + 1,
      totalPages
    );
  });
}

function getQuestionsPerPage(questions) {
  const multiplicationOnly = questions.length > 0 && questions.every((question) => question.operation === 'multiplication');
  const bodmasOnly = questions.length > 0 && questions.every((question) => question.operation === 'bodmas');
  const numberOnly = questions.length > 0 && questions.every((question) => question.kind === 'number');
  const fractionOnly = questions.length > 0 && questions.every((question) => question.kind === 'fraction');
  const hasDoubleDigitByDoubleDigit = questions.some((question) => question.a >= 10 && question.b >= 10);

  if (bodmasOnly) {
    return 8;
  }

  if (numberOnly) {
    return 8;
  }

  if (fractionOnly) {
    return 8;
  }

  if (multiplicationOnly && hasDoubleDigitByDoubleDigit) {
    return 6;
  }

  return 10;
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

function buildPageHTML(questions, startIdx, title, module, pageNum, totalPages) {
  const opSymbol = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };
  const pageTopic = questions[0]?.topic;
  const pageInstruction = getPageInstruction(pageTopic);

  const cols = 2;
  const rows = Math.ceil(questions.length / cols);
  let html = `<div class="a4-page" style="--q-rows:${rows}">`;

  // Header
  html += `<div class="worksheet-header"><h2>${escapeHtml(title)}</h2>`;
  html += `<div class="worksheet-module">Module: ${escapeHtml(moduleLabel(module))}</div>`;
  if (pageNum === 1) {
    html += `<div class="meta-fields">
      <span>Name: <span class="meta-field"></span></span>
      <span>Date: <span class="meta-field"></span></span>
      <span>Score: <span class="meta-field"></span></span>
    </div>`;
  }
  if (pageInstruction) {
    html += `<div class="page-instruction">${escapeHtml(pageInstruction)}</div>`;
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
  html += `
    <div class="page-footer">
      <span class="page-footer-left">www.edgeducate.com.au</span>
      <span class="page-footer-right">Page ${pageNum} of ${totalPages}</span>
    </div>`;

  html += `</div>`;
  return html;
}

function buildSolutionsPageHTML(questions, startIdx, title, module, pageNum, totalPages) {
  const pageTopic = questions[0]?.topic;
  const pageInstruction = getPageInstruction(pageTopic);
  let html = `<div class="a4-page solutions-page">`;

  html += `<div class="worksheet-header"><h2>${escapeHtml(title)} - Solutions</h2>`;
  html += `<div class="worksheet-module">Module: ${escapeHtml(moduleLabel(module))}</div>`;
  if (pageInstruction) {
    html += `<div class="page-instruction">${escapeHtml(pageInstruction)}</div>`;
  }
  html += `</div>`;

  html += `<div class="solutions-grid">`;
  questions.forEach((question, idx) => {
    const num = startIdx + idx + 1;
    html += `<div class="solution-item"><span class="solution-number">${num}.</span><span class="solution-answer">${renderSolutionHTML(question)}</span></div>`;
  });
  html += `</div>`;

  html += `
    <div class="page-footer">
      <span class="page-footer-left">www.edgeducate.com.au</span>
      <span class="page-footer-right">Page ${pageNum} of ${totalPages}</span>
    </div>`;

  html += `</div>`;
  return html;
}

function formatSolution(question) {
  if (question.kind === 'number') {
    return `${question.prompt} = ${question.answer}`;
  }

  if (question.kind === 'fraction') {
    return `${question.prompt} = ${question.answer}`;
  }

  switch (question.operation) {
    case 'addition':
      return `${question.a} + ${question.b} = ${question.a + question.b}`;
    case 'subtraction':
      return `${question.a} - ${question.b} = ${question.a - question.b}`;
    case 'multiplication':
      return `${question.a} × ${question.b} = ${question.a * question.b}`;
    case 'division':
      return `${question.a} ÷ ${question.b} = ${question.a / question.b}`;
    case 'bodmas':
      return `${question.expression} = ${question.answer}`;
    default:
      return '';
  }
}

function renderVerticalQuestion(num, question, symbol) {
  if (question.kind === 'number') {
    return renderNumberQuestion(num, question);
  }

  if (question.kind === 'fraction') {
    return renderFractionQuestion(num, question);
  }

  if (question.kind === 'percentage') {
    return renderPercentageQuestion(num, question);
  }

  if (question.kind === 'decimal') {
    return renderDecimalQuestion(num, question);
  }

  if (question.operation === 'bodmas') {
    return renderBodmasQuestion(num, question);
  }

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
  const dividendWidth = String(question.a).length + 2;
  return `
    <div class="question question-long-division">
      <div class="question-number">${num}.</div>
      <div class="long-division" style="--dividend-ch:${dividendWidth}">
        <div class="long-division-answer"></div>
        <div class="long-division-divisor">${question.b}</div>
        <div class="long-division-dividend">${question.a}</div>
      </div>
    </div>`;
}

function renderBodmasQuestion(num, question) {
  return `
    <div class="question question-bodmas">
      <div class="question-number">${num}.</div>
      <div class="bodmas-body">
        <div class="bodmas-expression">${escapeHtml(question.expression)}</div>
        <div class="bodmas-answer-line"></div>
      </div>
    </div>`;
}

function renderNumberQuestion(num, question) {
  return `
    <div class="question question-number-topic">
      <div class="question-number">${num}.</div>
      <div class="number-topic-body">
        <div class="number-topic-prompt">${renderNumberPromptHTML(question)}</div>
        <div class="number-topic-answer-line"></div>
      </div>
    </div>`;
}

function renderFractionQuestion(num, question) {
  return `
    <div class="question question-fraction-topic">
      <div class="question-number">${num}.</div>
      <div class="fraction-topic-body">
        <div class="fraction-topic-prompt">${question.topic === 'improper-fractions' ? renderMixedFractionHTML(question.prompt) : renderFractionTextHTML(question.prompt)}</div>
      </div>
    </div>`;
}

function renderDecimalQuestion(num, question) {
  if (question.mode === 'operations') {
    return renderDecimalOperationQuestion(num, question);
  }

  const promptHTML = renderDecimalPlaceValueHTML(question);

  return `
    <div class="question question-decimal-topic">
      <div class="question-number">${num}.</div>
      <div class="decimal-topic-body">
        <div class="decimal-topic-prompt">${promptHTML}</div>
      </div>
    </div>`;
}

function renderSolutionHTML(question) {
  if (question.kind !== 'number') {
    if (question.kind === 'fraction') {
      return `${renderFractionTextHTML(question.prompt)} = ${renderFractionTextHTML(String(question.answer))}`;
    }

    if (question.kind === 'percentage') {
      return `${renderPercentagePromptHTML(question)} = ${escapeHtml(String(question.answer))}`;
    }

    if (question.kind === 'decimal') {
      return `${renderDecimalSolutionText(question)} = ${escapeHtml(String(question.answer))}`;
    }

    return escapeHtml(formatSolution(question));
  }

  if (isYesNoNumberQuestion(question)) {
    return `${renderNumberPromptHTML(question)} = ${escapeHtml(String(question.answer))}`;
  }

  if (question.topic === 'scientific-notation') {
    return `${renderNumberPromptHTML(question)} = ${renderScientificNotationHTML(String(question.answer))}`;
  }

  return `${renderNumberPromptHTML(question)} = ${escapeHtml(String(question.answer))}`;
}

function buildQuestions(topic, min, max, count, timesTable) {
  const mixedOps = ['addition', 'subtraction', 'multiplication', 'division'];
  const questions = [];

  if (PERCENTAGE_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildPercentageQuestion(topic));
    }
    return questions;
  }

  if (DECIMAL_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildDecimalQuestion(topic));
    }
    return questions;
  }

  if (FRACTION_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildFractionQuestion(topic));
    }
    return questions;
  }

  if (NUMBER_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildNumberQuestion(topic, min, max));
    }
    return questions;
  }

  for (let i = 0; i < count; i++) {
    let operation, a, b;

    if (topic === 'times-tables') {
      operation = 'multiplication';
      a = timesTable;
      b = randomInt(1, 12);
    } else if (topic === 'bodmas') {
      questions.push(buildBodmasQuestion(min, max));
      continue;
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

function buildBodmasQuestion(min, max) {
  const lowerBound = Math.max(1, min);
  const template = randomInt(1, 6);

  const a = randomInt(lowerBound, max);
  const b = randomInt(lowerBound, max);
  const c = randomInt(lowerBound, max);

  switch (template) {
    case 1:
      return {
        operation: 'bodmas',
        expression: `${a} + ${b} × ${c}`,
        answer: a + (b * c),
      };
    case 2:
      return {
        operation: 'bodmas',
        expression: `(${a} + ${b}) × ${c}`,
        answer: (a + b) * c,
      };
    case 3:
      return {
        operation: 'bodmas',
        expression: `${a} × ${b} + ${c}`,
        answer: (a * b) + c,
      };
    case 4:
      return {
        operation: 'bodmas',
        expression: `${a} × (${b} + ${c})`,
        answer: a * (b + c),
      };
    case 5:
      return {
        operation: 'bodmas',
        expression: `${a} × ${b} - ${c}`,
        answer: (a * b) - c,
      };
    default: {
      const divisor = randomInt(lowerBound, max);
      const multiplier = randomInt(lowerBound, max);
      const dividend = divisor * multiplier;
      return {
        operation: 'bodmas',
        expression: `${a} + ${dividend} ÷ ${divisor}`,
        answer: a + (dividend / divisor),
      };
    }
  }
}

function buildFractionQuestion(topic) {
  switch (topic) {
    case 'equivalent-fractions': {
      const fraction = createProperFraction();
      const multiplier = randomInt(2, 5);
      return {
        kind: 'fraction',
        topic,
        prompt: fractionToText(fraction),
        answer: fractionToText({ numerator: fraction.numerator * multiplier, denominator: fraction.denominator * multiplier }),
      };
    }
    case 'simplifying-fractions': {
      const simplified = createProperFraction(true);
      const multiplier = randomInt(2, 5);
      const unsimplified = {
        numerator: simplified.numerator * multiplier,
        denominator: simplified.denominator * multiplier,
      };
      return {
        kind: 'fraction',
        topic,
        prompt: `Simplify ${fractionToText(unsimplified)}.`,
        answer: fractionToText(simplified),
      };
    }
    case 'mixed-fractions': {
      const whole = randomInt(1, 9);
      const fraction = createProperFraction();
      return {
        kind: 'fraction',
        topic,
        prompt: fractionToText({ numerator: whole * fraction.denominator + fraction.numerator, denominator: fraction.denominator }),
        answer: formatMixedFraction(whole, fraction.numerator, fraction.denominator),
      };
    }
    case 'improper-fractions': {
      const whole = randomInt(1, 9);
      const fraction = createProperFraction();
      return {
        kind: 'fraction',
        topic,
        prompt: formatMixedFraction(whole, fraction.numerator, fraction.denominator),
        answer: fractionToText({ numerator: whole * fraction.denominator + fraction.numerator, denominator: fraction.denominator }),
      };
    }
    case 'add-fractions': {
      const denominator = randomInt(2, 12);
      const first = randomInt(1, denominator - 1);
      const second = randomInt(1, denominator - first);
      return {
        kind: 'fraction',
        topic,
        prompt: `${fractionToText({ numerator: first, denominator })} + ${fractionToText({ numerator: second, denominator })}`,
        answer: reduceFraction(first + second, denominator),
      };
    }
    case 'subtract-fractions': {
      const denominator = randomInt(3, 12);
      const first = randomInt(2, denominator - 1);
      const second = randomInt(1, first - 1);
      return {
        kind: 'fraction',
        topic,
        prompt: `${fractionToText({ numerator: first, denominator })} - ${fractionToText({ numerator: second, denominator })}`,
        answer: reduceFraction(first - second, denominator),
      };
    }
    case 'multiply-fractions': {
      const first = createProperFraction();
      const second = createProperFraction();
      return {
        kind: 'fraction',
        topic,
        prompt: `${fractionToText(first)} × ${fractionToText(second)}`,
        answer: reduceFraction(first.numerator * second.numerator, first.denominator * second.denominator),
      };
    }
    case 'divide-fractions': {
      const first = createProperFraction();
      const second = createProperFraction();
      return {
        kind: 'fraction',
        topic,
        prompt: `${fractionToText(first)} ÷ ${fractionToText(second)}`,
        answer: reduceFraction(first.numerator * second.denominator, first.denominator * second.numerator),
      };
    }
    default:
      return {
        kind: 'fraction',
        topic,
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function buildDecimalQuestion(topic) {
  switch (topic) {
    case 'decimal-place-value': {
      const wholeDigits = randomInt(1, 3);
      const decimalDigits = randomInt(2, 3);
      const digitCount = wholeDigits + decimalDigits;
      const highlightIndex = randomInt(0, digitCount - 1);
      const number = buildDecimalNumber(wholeDigits, decimalDigits, highlightIndex);
      return {
        kind: 'decimal',
        topic,
        mode: 'place-value',
        number: number.value,
        highlightIndex,
        answer: formatDecimalPlaceValue(number.highlightDigit, number.highlightPower),
      };
    }
    case 'decimal-operations': {
      const operation = ['addition', 'subtraction', 'multiplication', 'division'][randomInt(0, 3)];
      const question = buildDecimalOperation(operation);
      return {
        kind: 'decimal',
        topic,
        mode: 'operations',
        operation,
        left: question.left,
        right: question.right,
        answer: question.answer,
      };
    }
    default:
      return {
        kind: 'decimal',
        topic,
        mode: 'operations',
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function buildPercentageQuestion(topic) {
  switch (topic) {
    case 'percentage-increase': {
      const base = randomInt(2, 20) * 20;
      const percent = randomInt(1, 10) * 5;
      return {
        kind: 'percentage',
        topic,
        prompt: `Increase ${base} by ${percent}%`,
        answer: formatPercentageChange(base, percent, 1),
      };
    }
    case 'percentage-decrease': {
      const base = randomInt(2, 20) * 20;
      const percent = randomInt(1, 10) * 5;
      return {
        kind: 'percentage',
        topic,
        prompt: `Decrease ${base} by ${percent}%`,
        answer: formatPercentageChange(base, percent, -1),
      };
    }
    case 'percentage-to-decimal': {
      const percent = randomInt(5, 100);
      return {
        kind: 'percentage',
        topic,
        prompt: `${percent}%`,
        answer: formatPercentageToDecimal(percent),
      };
    }
    default:
      return {
        kind: 'percentage',
        topic,
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function buildNumberQuestion(topic, min, max) {
  switch (topic) {
    case 'whole-numbers': {
      const value = randomInt(100, 9999);
      return {
        kind: 'number',
        topic,
        prompt: `${value}`,
        answer: numberToWords(value),
      };
    }
    case 'place-value': {
      const digitsCount = randomInt(3, 5);
      const index = randomInt(0, digitsCount - 1);
      const digit = String(randomInt(0, 9));
      const digits = buildUniquePlaceValueDigits(digitsCount, index, digit);
      const value = digits.join('');
      const placeValue = Number(digit) * Math.pow(10, digitsCount - index - 1);
      const placeName = getPlaceName(digitsCount - index - 1);
      return {
        kind: 'number',
        topic,
        prompt: `What is the value of the ${digit} in the ${placeName} place of ${value}?`,
        answer: placeValue,
      };
    }
    case 'ordering-numbers': {
      const values = uniqueRandomValues(4, min, max);
      return {
        kind: 'number',
        topic,
        prompt: values.join(', '),
        answer: values.slice().sort((a, b) => a - b).join(', '),
      };
    }
    case 'factors': {
      const value = randomInt(12, 144);
      return {
        kind: 'number',
        topic,
        prompt: `${value}`,
        answer: getFactors(value).join(', '),
      };
    }
    case 'multiples': {
      const value = randomInt(2, 12);
      const countLimit = 5;
      return {
        kind: 'number',
        topic,
        prompt: `${value}`,
        answer: Array.from({ length: countLimit }, (_, index) => value * (index + 1)).join(', '),
      };
    }
    case 'prime-numbers': {
      const isPrimeQuestion = randomInt(0, 1) === 0;
      const value = isPrimeQuestion ? pickRandomFromList(PRIME_NUMBERS) : pickNonPrimeNumber();
      return {
        kind: 'number',
        topic,
        prompt: `Is ${value} a prime number?`,
        answer: isPrimeQuestion ? 'Yes' : 'No',
      };
    }
    case 'composite-numbers': {
      const isCompositeQuestion = randomInt(0, 1) === 0;
      const value = isCompositeQuestion ? pickRandomFromList(COMPOSITE_NUMBERS) : pickNonCompositeNumber();
      return {
        kind: 'number',
        topic,
        prompt: `Is ${value} a composite number?`,
        answer: isCompositeQuestion ? 'Yes' : 'No',
      };
    }
    case 'integers': {
      const values = uniqueRandomValues(4, -20, 20);
      return {
        kind: 'number',
        topic,
        prompt: values.join(', '),
        answer: values.slice().sort((a, b) => a - b).join(', '),
      };
    }
    case 'indices': {
      const base = randomInt(2, 9);
      const exponent = randomInt(2, 4);
      return {
        kind: 'number',
        topic,
        prompt: `Evaluate ${base}^${exponent}.`,
        answer: Math.pow(base, exponent),
      };
    }
    case 'scientific-notation': {
      const value = randomInt(1000, 9999999);
      const scientific = toScientificNotation(value);
      return {
        kind: 'number',
        topic,
        prompt: `${value}`,
        answer: scientific,
      };
    }
    case 'surds': {
      const rootFactor = randomInt(2, 9);
      const radicand = pickNonSquareRadicand();
      return {
        kind: 'number',
        topic,
        prompt: `Simplify √(${rootFactor * rootFactor * radicand}).`,
        answer: `${rootFactor}√${radicand}`,
      };
    }
    default:
      return {
        kind: 'number',
        topic,
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function getFactors(value) {
  const factors = [];
  for (let i = 1; i <= value; i++) {
    if (value % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

function uniqueRandomValues(count, min, max) {
  const values = new Set();
  while (values.size < count) {
    values.add(randomInt(min, max));
  }
  return Array.from(values);
}

function pickRandomFromList(list) {
  return list[randomInt(0, list.length - 1)];
}

function createProperFraction(alreadyReduced = false) {
  let denominator = randomInt(2, 12);
  let numerator = randomInt(1, denominator - 1);

  if (alreadyReduced) {
    while (gcd(numerator, denominator) !== 1) {
      denominator = randomInt(2, 12);
      numerator = randomInt(1, denominator - 1);
    }
  }

  return { numerator, denominator };
}

function fractionToText(fraction) {
  return `${fraction.numerator}/${fraction.denominator}`;
}

function formatMixedFraction(whole, numerator, denominator) {
  return `${whole} ${numerator}/${denominator}`;
}

function renderMixedFractionHTML(value) {
  const match = String(value).match(/^(\d+) (\d+)\/(\d+)$/);
  if (!match) {
    return renderFractionTextHTML(String(value));
  }

  return `${escapeHtml(match[1])} ${renderFractionTextHTML(`${match[2]}/${match[3]}`)}`;
}

function reduceFraction(numerator, denominator) {
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  numerator = numerator / divisor;
  denominator = denominator / divisor;
  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }
  return fractionToText({ numerator, denominator });
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function renderFractionValueHTML(value) {
  return renderFractionTextHTML(String(value));
}

function renderFractionTextHTML(value) {
  const text = String(value);
  const parts = [];
  const regex = /(\d+)\/(\d+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(escapeHtml(text.slice(lastIndex, match.index)));
    }

    parts.push(`<span class="fraction-inline"><span class="fraction-numerator">${escapeHtml(match[1])}</span><span class="fraction-line"></span><span class="fraction-denominator">${escapeHtml(match[2])}</span></span>`);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(escapeHtml(text.slice(lastIndex)));
  }

  return parts.join('');
}

function renderDecimalPlaceValueHTML(question) {
  return renderHighlightedDecimalHTML(question.number, question.highlightIndex);
}

function renderDecimalPromptHTML(question) {
  return escapeHtml(String(question.prompt ?? question.number ?? ''));
}

function renderPercentageQuestion(num, question) {
  return `
    <div class="question question-percentage-topic">
      <div class="question-number">${num}.</div>
      <div class="percentage-topic-body">
        <div class="percentage-topic-prompt">${renderPercentagePromptHTML(question)}</div>
        <div class="percentage-topic-answer-line"></div>
      </div>
    </div>`;
}

function renderPercentagePromptHTML(question) {
  return escapeHtml(String(question.prompt ?? ''));
}

function renderDecimalSolutionText(question) {
  if (question.mode === 'operations') {
    return formatDecimalOperationText(question);
  }

  return renderDecimalPromptHTML(question);
}

function renderDecimalOperationQuestion(num, question) {
  if (question.operation === 'division') {
    return `
      <div class="question question-long-division question-decimal-topic">
        <div class="question-number">${num}.</div>
        <div class="long-division decimal-long-division" style="--dividend-ch:${String(question.left).length + 2}">
          <div class="long-division-answer"></div>
          <div class="long-division-divisor">${escapeHtml(String(question.right))}</div>
          <div class="long-division-dividend">${escapeHtml(String(question.left))}</div>
        </div>
      </div>`;
  }

  const symbol = question.operation === 'addition' ? '+' : question.operation === 'subtraction' ? '−' : '×';

  return `
    <div class="question question-vertical question-decimal-topic">
      <div class="question-number">${num}.</div>
      <div class="question-stack decimal-question-stack">
        <div class="question-top">${escapeHtml(String(question.left))}</div>
        <div class="question-bottom">
          <span class="question-operator">${symbol}</span>
          <span class="question-value">${escapeHtml(String(question.right))}</span>
        </div>
        <div class="answer-line"></div>
      </div>
    </div>`;
}

function renderHighlightedDecimalHTML(value, highlightIndex) {
  const text = String(value);
  const parts = [];
  let digitIndex = 0;

  for (const character of text) {
    if (character === '.') {
      parts.push('.');
      continue;
    }

    const digit = escapeHtml(character);
    if (digitIndex === highlightIndex) {
      parts.push(`<span class="decimal-highlight">${digit}</span>`);
    } else {
      parts.push(digit);
    }
    digitIndex += 1;
  }

  return parts.join('');
}

function buildDecimalNumber(wholeDigits, decimalDigits, highlightIndex) {
  const whole = Array.from({ length: wholeDigits }, (_, index) => (index === 0 ? randomInt(1, 9) : randomInt(0, 9))).join('');
  const fractional = Array.from({ length: decimalDigits }, () => randomInt(0, 9)).join('');
  const value = `${whole}.${fractional}`;
  const plainDigits = `${whole}${fractional}`.split('');
  const highlightDigit = plainDigits[highlightIndex];
  const highlightPower = highlightIndex < wholeDigits ? wholeDigits - highlightIndex - 1 : -(highlightIndex - wholeDigits + 1);

  return { value, highlightDigit, highlightPower };
}

function buildDecimalOperation(operation) {
  const places = randomInt(1, 2);
  const left = randomInt(1, 99) / Math.pow(10, places);
  const right = randomInt(1, 99) / Math.pow(10, places);

  if (operation === 'addition') {
    return { left: left.toFixed(places), right: right.toFixed(places), answer: formatDecimalResult(left + right) };
  }

  if (operation === 'subtraction') {
    const larger = Math.max(left, right);
    const smaller = Math.min(left, right);
    return { left: larger.toFixed(places), right: smaller.toFixed(places), answer: formatDecimalResult(larger - smaller) };
  }

  if (operation === 'multiplication') {
    return { left: left.toFixed(places), right: right.toFixed(places), answer: formatDecimalResult(left * right) };
  }

  const divisor = randomInt(2, 9);
  const quotient = randomInt(1, 99) / 10;
  const dividend = divisor * quotient;
  return { left: formatDecimalResult(dividend), right: String(divisor), answer: formatDecimalResult(quotient) };
}

function formatDecimalOperationText(question) {
  const operators = {
    addition: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷',
  };

  return `${question.left} ${operators[question.operation]} ${question.right}`;
}

function formatDecimalResult(value) {
  return Number(value.toFixed(2)).toString();
}

function formatDecimalPlaceValue(digit, power) {
  const numeric = Number(digit) * Math.pow(10, power);
  return formatDecimalResult(numeric);
}

function formatPercentageToDecimal(percent) {
  return formatDecimalResult(percent / 100);
}

function formatPercentageChange(base, percent, direction) {
  const change = base * (percent / 100);
  return formatDecimalResult(direction === 1 ? base + change : base - change);
}

function getPageInstruction(topic) {
  if (topic === 'decimal-place-value') {
    return 'What is the value of the highlighted digit in the following decimal:';
  }

  if (topic === 'decimal-operations') {
    return 'Calculate the following decimal operations:';
  }

  if (topic === 'percentage-increase') {
    return 'Calculate the percentage increase:';
  }

  if (topic === 'percentage-decrease') {
    return 'Calculate the percentage decrease:';
  }

  if (topic === 'percentage-to-decimal') {
    return 'Convert the following percentages to decimals:';
  }

  if (topic === 'whole-numbers') {
    return 'Write the following in words:';
  }

  if (topic === 'ordering-numbers') {
    return 'Order the following numbers from smallest to largest:';
  }

  if (topic === 'factors') {
    return 'List all the factors of the following number:';
  }

  if (topic === 'multiples') {
    return 'Write the first 5 multiples of the following number:';
  }

  if (topic === 'integers') {
    return 'Order the following integers from least to greatest:';
  }

  if (topic === 'scientific-notation') {
    return 'Write the following in scientific notation:';
  }

  if (topic === 'equivalent-fractions') {
    return 'Write an equivalent fraction for the following:';
  }

  if (topic === 'mixed-fractions') {
    return 'Convert the following to a mixed fraction:';
  }

  if (topic === 'improper-fractions') {
    return 'Convert the following to an improper fraction:';
  }

  return '';
}

function buildUniquePlaceValueDigits(length, targetIndex, targetDigit) {
  const digits = new Array(length);
  digits[targetIndex] = targetDigit;

  for (let i = 0; i < length; i++) {
    if (i === targetIndex) {
      continue;
    }

    let nextDigit = String(randomInt(0, 9));
    while (nextDigit === targetDigit || (i === 0 && nextDigit === '0')) {
      nextDigit = String(randomInt(0, 9));
    }
    digits[i] = nextDigit;
  }

  return digits;
}

function getPlaceName(power) {
  switch (power) {
    case 0:
      return 'ones';
    case 1:
      return 'tens';
    case 2:
      return 'hundreds';
    case 3:
      return 'thousands';
    case 4:
      return 'ten-thousands';
    case 5:
      return 'hundred-thousands';
    case 6:
      return 'millions';
    default:
      return `10^${power}`;
  }
}

function pickNonPrimeNumber() {
  const candidates = [1].concat(COMPOSITE_NUMBERS);
  return pickRandomFromList(candidates);
}

function pickNonCompositeNumber() {
  const candidates = [1].concat(PRIME_NUMBERS);
  return pickRandomFromList(candidates);
}

function isPrime(value) {
  if (value < 2) return false;
  for (let i = 2; i * i <= value; i++) {
    if (value % i === 0) return false;
  }
  return true;
}

function pickNonSquareRadicand() {
  const options = [2, 3, 5, 6, 7, 10, 11, 13];
  return options[randomInt(0, options.length - 1)];
}

function toScientificNotation(value) {
  const exponent = String(value).length - 1;
  const mantissa = (value / Math.pow(10, exponent)).toFixed(2).replace(/\.00$/, '').replace(/0$/, '');
  return `${mantissa} × 10^${exponent}`;
}

function numberToWords(value) {
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (value < 10) return ones[value];
  if (value < 20) return teens[value - 10];
  if (value < 100) {
    const tensPart = tens[Math.floor(value / 10)];
    const onesPart = value % 10;
    return onesPart === 0 ? tensPart : `${tensPart}-${ones[onesPart]}`;
  }

  if (value < 1000) {
    const hundredsPart = Math.floor(value / 100);
    const remainder = value % 100;
    return remainder === 0 ? `${ones[hundredsPart]} hundred` : `${ones[hundredsPart]} hundred and ${numberToWords(remainder)}`;
  }

  if (value < 10000) {
    const thousandsPart = Math.floor(value / 1000);
    const remainder = value % 1000;
    if (remainder === 0) {
      return `${numberToWords(thousandsPart)} thousand`;
    }
    const remainderWords = remainder < 100 ? numberToWords(remainder) : numberToWords(remainder);
    return `${numberToWords(thousandsPart)} thousand ${remainderWords}`;
  }

  return String(value);
}

function renderNumberPromptHTML(question) {
  switch (question.topic) {
    case 'indices': {
      const match = question.prompt.match(/^Evaluate (\d+)\^(\d+)\.$/);
      if (match) {
        const base = escapeHtml(match[1]);
        const exponent = escapeHtml(match[2]);
        return `Evaluate ${base}<sup>${exponent}</sup>.`;
      }
      return escapeHtml(question.prompt);
    }
    case 'scientific-notation': {
      const match = question.prompt.match(/^Write (\d+) in scientific notation\.$/);
      if (match) {
        return `Write ${escapeHtml(match[1])} in scientific notation.`;
      }
      return escapeHtml(question.prompt);
    }
    default:
      return escapeHtml(question.prompt);
  }
}

function renderScientificNotationHTML(value) {
  const match = String(value).match(/^(.+?) × 10\^(\d+)$/);
  if (!match) {
    return escapeHtml(String(value));
  }

  return `${escapeHtml(match[1])} × 10<sup>${escapeHtml(match[2])}</sup>`;
}

function isYesNoNumberQuestion(question) {
  return typeof question.prompt === 'string' && question.prompt.startsWith('Is ');
}

const PRIME_NUMBERS = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];

const COMPOSITE_NUMBERS = [
  4, 6, 8, 9, 10, 12, 14, 15, 16, 18,
  20, 21, 22, 24, 25, 26, 27, 28, 30, 32,
  33, 34, 35, 36, 38, 39, 40, 42, 44, 45,
  46, 48, 49, 50, 51, 52, 54, 55, 56, 57,
  58, 60, 62, 63, 64, 65, 66, 68, 69, 70,
  72, 74, 75, 76, 77, 78, 80, 81, 82, 84,
  85, 86, 87, 88, 90, 91, 92, 93, 94, 95,
  96, 98, 99,
];

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
