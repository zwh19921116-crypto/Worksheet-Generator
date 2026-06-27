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
  geometry: [
    { value: '2d-shapes', label: '2D Shapes' },
    { value: '3d-shapes', label: '3D Shapes' },
    { value: 'angles', label: 'Angles' },
    { value: 'symmetry', label: 'Symmetry' },
    { value: 'transformations', label: 'Transformations' },
    { value: 'congruence', label: 'Congruence' },
    { value: 'similarity', label: 'Similarity' },
    { value: 'circle-geometry', label: 'Circle Geometry' },
    { value: 'geometric-reasoning', label: 'Geometric Reasoning' },
    { value: 'proof', label: 'Proof' },
  ],
  measurement: [
    { value: 'length', label: 'Length' },
    { value: 'area', label: 'Area' },
    { value: 'perimeter', label: 'Perimeter' },
    { value: 'volume', label: 'Volume' },
    { value: 'surface-area', label: 'Surface Area' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'mass', label: 'Mass' },
    { value: 'time', label: 'Time' },
    { value: 'unit-conversions', label: 'Unit Conversions' },
    { value: 'scale-drawings', label: 'Scale Drawings' },
  ],
  algebra: [
    { value: 'patterns', label: 'Patterns' },
    { value: 'variables', label: 'Variables' },
    { value: 'expressions', label: 'Expressions' },
    { value: 'substitution', label: 'Substitution' },
    { value: 'expanding-expressions', label: 'Expanding Expressions' },
    { value: 'factorisation', label: 'Factorisation' },
    { value: 'linear-equations', label: 'Linear Equations' },
    { value: 'simultaneous-equations', label: 'Simultaneous Equations' },
    { value: 'inequalities', label: 'Inequalities' },
    { value: 'polynomials', label: 'Polynomials' },
    { value: 'functions', label: 'Functions' },
    { value: 'exponential-functions', label: 'Exponential Functions' },
    { value: 'logarithmic-functions', label: 'Logarithmic Functions' },
    { value: 'sequences', label: 'Sequences' },
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

const GEOMETRY_TOPICS = new Set([
  '2d-shapes',
  '3d-shapes',
  'angles',
  'symmetry',
  'transformations',
  'congruence',
  'similarity',
  'circle-geometry',
  'geometric-reasoning',
  'proof',
]);

const ALGEBRA_TOPICS = new Set([
  'patterns',
  'variables',
  'expressions',
  'substitution',
  'expanding-expressions',
  'factorisation',
  'linear-equations',
  'simultaneous-equations',
  'inequalities',
  'polynomials',
  'functions',
  'exponential-functions',
  'logarithmic-functions',
  'sequences',
]);

const MEASUREMENT_TOPICS = new Set([
  'length',
  'area',
  'perimeter',
  'volume',
  'surface-area',
  'capacity',
  'mass',
  'time',
  'unit-conversions',
  'scale-drawings',
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
    geometry: 'Geometry',
    measurement: 'Measurement',
    algebra: 'Algebra',
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
    '2d-shapes': '2D Shapes Practice',
    '3d-shapes': '3D Shapes Practice',
    angles: 'Angles Practice',
    symmetry: 'Symmetry Practice',
    transformations: 'Transformations Practice',
    congruence: 'Congruence Practice',
    similarity: 'Similarity Practice',
    'circle-geometry': 'Circle Geometry Practice',
    'geometric-reasoning': 'Geometric Reasoning Practice',
    proof: 'Proof Practice',
    patterns: 'Patterns Practice',
    variables: 'Variables Practice',
    expressions: 'Expressions Practice',
    substitution: 'Substitution Practice',
    'expanding-expressions': 'Expanding Expressions Practice',
    factorisation: 'Factorisation Practice',
    'linear-equations': 'Linear Equations Practice',
    'simultaneous-equations': 'Simultaneous Equations Practice',
    inequalities: 'Inequalities Practice',
    polynomials: 'Polynomials Practice',
    functions: 'Functions Practice',
    'exponential-functions': 'Exponential Functions Practice',
    'logarithmic-functions': 'Logarithmic Functions Practice',
    sequences: 'Sequences Practice',
    length: 'Length Practice',
    area: 'Area Practice',
    perimeter: 'Perimeter Practice',
    volume: 'Volume Practice',
    'surface-area': 'Surface Area Practice',
    capacity: 'Capacity Practice',
    mass: 'Mass Practice',
    time: 'Time Practice',
    'unit-conversions': 'Unit Conversions Practice',
    'scale-drawings': 'Scale Drawings Practice',
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
  const geometryShapesOnly = questions.length > 0 && questions.every((question) => question.kind === 'geometry' && (question.topic === '2d-shapes' || question.topic === '3d-shapes'));
  const measurementAreaPerimeterOnly = questions.length > 0 && questions.every((question) => question.kind === 'measurement' && (question.topic === 'area' || question.topic === 'perimeter'));
  const measurementVolumeOnly = questions.length > 0 && questions.every((question) => question.kind === 'measurement' && question.topic === 'volume');
  const measurementSurfaceAreaOnly = questions.length > 0 && questions.every((question) => question.kind === 'measurement' && question.topic === 'surface-area');
  const hasDoubleDigitByDoubleDigit = questions.some((question) => question.a >= 10 && question.b >= 10);

  if (geometryShapesOnly) {
    return 4;
  }

  if (measurementAreaPerimeterOnly) {
    return 4;
  }

  if (measurementVolumeOnly) {
    return 4;
  }

  if (measurementSurfaceAreaOnly) {
    return 4;
  }

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

  if (question.kind === 'geometry') {
    return renderGeometryQuestion(num, question);
  }

  if (question.kind === 'algebra') {
    return renderAlgebraQuestion(num, question);
  }

  if (question.kind === 'percentage') {
    return renderPercentageQuestion(num, question);
  }

  if (question.kind === 'decimal') {
    return renderDecimalQuestion(num, question);
  }

  if (question.kind === 'measurement') {
    return renderMeasurementQuestion(num, question);
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

function renderMeasurementQuestion(num, question) {
  const inlineMeasurementTopics = new Set();

  if (inlineMeasurementTopics.has(question.topic)) {
    return `
      <div class="question question-number-topic question-measurement-inline">
        <div class="question-number">${num}.</div>
        <div class="number-topic-body">
          <div class="measurement-inline-row">
            <div class="number-topic-prompt measurement-inline-prompt">${renderMeasurementPromptHTML(question)}</div>
            <div class="number-topic-answer-line measurement-inline-answer-line"></div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="question question-number-topic">
      <div class="question-number">${num}.</div>
      <div class="number-topic-body">
        <div class="number-topic-prompt">${renderMeasurementPromptHTML(question)}</div>
        <div class="number-topic-answer-line"></div>
      </div>
    </div>`;
}

function renderMeasurementPromptHTML(question) {
  const label = escapeHtml(String(question.prompt ?? ''));
  const shapeSvg = renderMeasurementShapeSVG(question);
  const areaPerimeterShapeClass = (question.topic === 'area' || question.topic === 'perimeter') ? ' measurement-area-perimeter-shape' : '';

  if (!shapeSvg) {
    return label;
  }

  return `
    <span class="geometry-shape-stack">
      <span class="geometry-shape-question">${label}</span>
      <span class="geometry-shape-icon measurement-shape-icon${areaPerimeterShapeClass}" aria-hidden="true">${shapeSvg}</span>
    </span>`;
}

function renderMeasurementShapeSVG(question) {
  if ((question.topic !== 'area' && question.topic !== 'perimeter' && question.topic !== 'volume' && question.topic !== 'surface-area') || !question.shape) {
    return '';
  }

  const dims = question.dimensions || {};
  const format = (value) => escapeHtml(`${value} cm`);

  if (question.shape === 'rectangle') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><rect x="28" y="24" width="76" height="52" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="66" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.length)}</text><text x="125" y="53" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.width)}</text></svg>`;
  }

  if (question.shape === 'square') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><rect x="38" y="20" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="70" y="11" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.side)}</text></svg>`;
  }

  if (question.shape === 'triangle-area') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="26,82 114,82 70,24" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="70" y1="24" x2="70" y2="82" stroke="currentColor" stroke-dasharray="4 3" stroke-width="1.8"/><text x="70" y="102" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.base)}</text><text x="116" y="56" text-anchor="start" font-size="10" font-weight="700" fill="currentColor">${format(dims.height)}</text></svg>`;
  }

  if (question.shape === 'parallelogram') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="36,80 112,80 94,30 18,30" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="94" y1="30" x2="94" y2="80" stroke="currentColor" stroke-dasharray="4 3" stroke-width="1.8"/><text x="64" y="102" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.base)}</text><text x="118" y="58" text-anchor="start" font-size="10" font-weight="700" fill="currentColor">${format(dims.height)}</text></svg>`;
  }

  if (question.shape === 'triangle-perimeter') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="24,84 114,84 74,26" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="69" y="100" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.c)}</text><text x="42" y="54" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.a)}</text><text x="102" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.b)}</text></svg>`;
  }

  if (question.shape === 'regular-pentagon') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="70,16 112,48 96,94 44,94 28,48" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="70" y="107" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.side)}</text></svg>`;
  }

  if (question.shape === 'cuboid') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="38,32 88,32 106,46 56,46" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="30,46 80,46 80,88 30,88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="80,46 106,46 106,88 80,88" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="38" y1="32" x2="30" y2="46" stroke="currentColor" stroke-width="2.2"/><text x="59" y="27" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.length)}</text><text x="114" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.width)}</text><text x="18" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.height)}</text></svg>`;
  }

  if (question.shape === 'cube') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="48,30 86,30 102,44 64,44" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="34,44 72,44 72,82 34,82" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="72,44 102,44 102,82 72,82" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="48" y1="30" x2="34" y2="44" stroke="currentColor" stroke-width="2.2"/><text x="69" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.side)}</text></svg>`;
  }

  if (question.shape === 'cylinder') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><ellipse cx="70" cy="30" rx="24" ry="8" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="46" y1="30" x2="46" y2="84" stroke="currentColor" stroke-width="2.2"/><line x1="94" y1="30" x2="94" y2="84" stroke="currentColor" stroke-width="2.2"/><ellipse cx="70" cy="84" rx="24" ry="8" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="70" y1="30" x2="94" y2="30" stroke="currentColor" stroke-dasharray="4 3" stroke-width="1.8"/><text x="108" y="34" text-anchor="start" font-size="10" font-weight="700" fill="currentColor">r = ${format(dims.radius)}</text><text x="28" y="60" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">h = ${format(dims.height)}</text></svg>`;
  }

  if (question.shape === 'triangular-prism') {
    return `<svg viewBox="0 0 140 110" aria-hidden="true"><polygon points="28,84 56,40 56,84" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="72,84 100,40 100,84" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="28" y1="84" x2="72" y2="84" stroke="currentColor" stroke-width="2.2"/><line x1="56" y1="40" x2="100" y2="40" stroke="currentColor" stroke-width="2.2"/><line x1="56" y1="84" x2="100" y2="84" stroke="currentColor" stroke-width="2.2"/><line x1="56" y1="40" x2="56" y2="84" stroke="currentColor" stroke-dasharray="4 3" stroke-width="1.8"/><text x="42" y="100" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.base)}</text><text x="64" y="64" text-anchor="start" font-size="10" font-weight="700" fill="currentColor">${format(dims.triHeight)}</text><text x="78" y="94" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">${format(dims.length)}</text></svg>`;
  }

  return '';
}

function renderSolutionHTML(question) {
  if (question.kind !== 'number') {
    if (question.kind === 'fraction') {
      return `${renderFractionTextHTML(question.prompt)} = ${renderFractionTextHTML(String(question.answer))}`;
    }

    if (question.kind === 'geometry') {
      return `${escapeHtml(String(question.prompt ?? ''))} = ${escapeHtml(String(question.answer))}`;
    }

    if (question.kind === 'algebra') {
      return `${renderAlgebraPromptHTML(question)} = ${renderAlgebraTextHTML(String(question.answer))}`;
    }

    if (question.kind === 'percentage') {
      return `${renderPercentagePromptHTML(question)} = ${escapeHtml(String(question.answer))}`;
    }

    if (question.kind === 'decimal') {
      return `${renderDecimalSolutionText(question)} = ${escapeHtml(String(question.answer))}`;
    }

    if (question.kind === 'measurement') {
      return `${escapeHtml(String(question.prompt ?? ''))} = ${escapeHtml(String(question.answer ?? ''))}`;
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

  if (GEOMETRY_TOPICS.has(topic)) {
    return buildGeometryQuestions(topic, count);
  }

  if (ALGEBRA_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildAlgebraQuestion(topic));
    }
    return questions;
  }

  if (MEASUREMENT_TOPICS.has(topic)) {
    for (let i = 0; i < count; i++) {
      questions.push(buildMeasurementQuestion(topic, min, max));
    }
    return questions;
  }

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

function buildGeometryQuestion(topic) {
  switch (topic) {
    case '2d-shapes': {
      const shape = pickRandomFromList(get2dShapeFacts());
      const promptType = pickRandomFromList(['sides', 'vertices', 'symmetry']);
      if (promptType === 'sides') {
        return {
          kind: 'geometry',
          topic,
          prompt: `${shape.name}: number of sides`,
          answer: shape.sides,
        };
      }
      if (promptType === 'vertices') {
        return {
          kind: 'geometry',
          topic,
          prompt: `${shape.name}: number of vertices`,
          answer: shape.vertices,
        };
      }
      return {
        kind: 'geometry',
        topic,
        prompt: `${shape.name}: line(s) of symmetry`,
        answer: shape.symmetry,
      };
    }
    case '3d-shapes': {
      const shape = pickRandomFromList(get3dShapeFacts());
      const promptType = pickRandomFromList(['faces', 'edges', 'vertices']);
      if (promptType === 'faces') {
        return {
          kind: 'geometry',
          topic,
          prompt: `${shape.name}: number of faces`,
          answer: shape.faces,
        };
      }
      if (promptType === 'edges') {
        return {
          kind: 'geometry',
          topic,
          prompt: `${shape.name}: number of edges`,
          answer: shape.edges,
        };
      }
      return {
        kind: 'geometry',
        topic,
        prompt: `${shape.name}: number of vertices`,
        answer: shape.vertices,
      };
    }
    case 'angles': {
      const first = randomInt(30, 80);
      const second = randomInt(20, 70);
      const missing = 180 - first - second;
      return {
        kind: 'geometry',
        topic,
        prompt: `${first}° + ${second}° + x = 180°`,
        answer: `x = ${missing}°`,
      };
    }
    case 'symmetry': {
      const shapes = [
        { name: 'Square', lines: 4 },
        { name: 'Rectangle', lines: 2 },
        { name: 'Equilateral Triangle', lines: 3 },
        { name: 'Isosceles Triangle', lines: 1 },
        { name: 'Regular Pentagon', lines: 5 },
        { name: 'Regular Hexagon', lines: 6 },
      ];
      const shape = pickRandomFromList(shapes);
      return {
        kind: 'geometry',
        topic,
        prompt: shape.name,
        answer: `${shape.lines} line(s) of symmetry`,
      };
    }
    case 'transformations': {
      const x = randomInt(-6, 6);
      const y = randomInt(-6, 6);
      const dx = randomInt(-4, 4);
      const dy = randomInt(-4, 4);
      return {
        kind: 'geometry',
        topic,
        prompt: `A(${x}, ${y}) translated by (${dx}, ${dy})`,
        answer: `A'(${x + dx}, ${y + dy})`,
      };
    }
    case 'congruence': {
      const a = randomInt(3, 10);
      const b = randomInt(3, 10);
      const c = randomInt(3, 10);
      const congruent = randomInt(0, 1) === 0;
      const d = congruent ? a : a + randomInt(1, 3);
      const e = congruent ? b : b + randomInt(1, 3);
      const f = congruent ? c : c + randomInt(1, 3);
      return {
        kind: 'geometry',
        topic,
        prompt: `△P: ${a}, ${b}, ${c} and △Q: ${d}, ${e}, ${f}`,
        answer: congruent ? 'Congruent' : 'Not congruent',
      };
    }
    case 'similarity': {
      const side = randomInt(2, 14);
      const scale = randomInt(2, 5);
      return {
        kind: 'geometry',
        topic,
        prompt: `Side ${side} cm at scale factor ${scale}`,
        answer: `${side * scale} cm`,
      };
    }
    case 'circle-geometry': {
      const askDiameter = randomInt(0, 1) === 0;
      if (askDiameter) {
        const diameter = randomInt(4, 30);
        return {
          kind: 'geometry',
          topic,
          prompt: `Diameter = ${diameter} cm`,
          answer: `Radius = ${diameter / 2} cm`,
        };
      }

      const radius = randomInt(2, 15);
      return {
        kind: 'geometry',
        topic,
        prompt: `Radius = ${radius} cm`,
        answer: `Diameter = ${radius * 2} cm`,
      };
    }
    case 'geometric-reasoning': {
      const angle = randomInt(35, 145);
      return {
        kind: 'geometry',
        topic,
        prompt: `${angle}° + y = 180°`,
        answer: `y = ${180 - angle}°`,
      };
    }
    case 'proof': {
      const statements = [
        { prompt: 'Vertical opposite angles are equal.', answer: 'True' },
        { prompt: 'A triangle can have two right angles.', answer: 'False' },
        { prompt: 'All quadrilaterals have four equal sides.', answer: 'False' },
        { prompt: 'Corresponding angles in parallel lines are equal.', answer: 'True' },
      ];
      const statement = pickRandomFromList(statements);
      return {
        kind: 'geometry',
        topic,
        prompt: statement.prompt,
        answer: statement.answer,
      };
    }
    default:
      return {
        kind: 'geometry',
        topic,
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function buildMeasurementQuestion(topic, min, max) {
  const safeMin = Math.max(1, min);
  const safeMax = Math.max(safeMin + 1, max);

  switch (topic) {
    case 'length': {
      const meters = randomInt(safeMin, Math.min(20, safeMax));
      return {
        kind: 'measurement',
        topic,
        prompt: `${meters} m to cm`,
        answer: `${meters * 100} cm`,
      };
    }
    case 'area': {
      const shapeType = pickRandomFromList(['rectangle', 'square', 'triangle', 'parallelogram']);

      if (shapeType === 'rectangle') {
        const length = randomInt(2, 20);
        const width = randomInt(2, 20);
        return {
          kind: 'measurement',
          topic,
          shape: 'rectangle',
          dimensions: { length, width },
          prompt: `Rectangle ${length} cm by ${width} cm. Find the area`,
          answer: `${length * width} cm²`,
        };
      }

      if (shapeType === 'square') {
        const side = randomInt(2, 20);
        return {
          kind: 'measurement',
          topic,
          shape: 'square',
          dimensions: { side },
          prompt: `Square side length ${side} cm. Find the area`,
          answer: `${side * side} cm²`,
        };
      }

      if (shapeType === 'triangle') {
        const base = randomInt(2, 20);
        const height = randomInt(2, 20);
        const area = (base * height) / 2;
        return {
          kind: 'measurement',
          topic,
          shape: 'triangle-area',
          dimensions: { base, height },
          prompt: `Triangle base ${base} cm and height ${height} cm. Find the area`,
          answer: `${formatDecimalResult(area)} cm²`,
        };
      }

      const base = randomInt(2, 20);
      const height = randomInt(2, 20);
      return {
        kind: 'measurement',
        topic,
        shape: 'parallelogram',
        dimensions: { base, height },
        prompt: `Parallelogram base ${base} cm and perpendicular height ${height} cm. Find the area`,
        answer: `${base * height} cm²`,
      };
    }
    case 'perimeter': {
      const shapeType = pickRandomFromList(['rectangle', 'square', 'triangle', 'regular-pentagon']);

      if (shapeType === 'rectangle') {
        const length = randomInt(2, 20);
        const width = randomInt(2, 20);
        return {
          kind: 'measurement',
          topic,
          shape: 'rectangle',
          dimensions: { length, width },
          prompt: `Rectangle ${length} cm by ${width} cm. Find the perimeter`,
          answer: `${2 * (length + width)} cm`,
        };
      }

      if (shapeType === 'square') {
        const side = randomInt(2, 20);
        return {
          kind: 'measurement',
          topic,
          shape: 'square',
          dimensions: { side },
          prompt: `Square side length ${side} cm. Find the perimeter`,
          answer: `${4 * side} cm`,
        };
      }

      if (shapeType === 'triangle') {
        const a = randomInt(3, 20);
        const b = randomInt(3, 20);
        const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
        return {
          kind: 'measurement',
          topic,
          shape: 'triangle-perimeter',
          dimensions: { a, b, c },
          prompt: `Triangle side lengths ${a} cm, ${b} cm and ${c} cm. Find the perimeter`,
          answer: `${a + b + c} cm`,
        };
      }

      const side = randomInt(2, 20);
      return {
        kind: 'measurement',
        topic,
        shape: 'regular-pentagon',
        dimensions: { side },
        prompt: `Regular pentagon side length ${side} cm. Find the perimeter`,
        answer: `${5 * side} cm`,
      };
    }
    case 'volume': {
      const solidType = pickRandomFromList(['cuboid', 'cube', 'cylinder', 'triangular-prism']);

      if (solidType === 'cuboid') {
        const l = randomInt(2, 12);
        const w = randomInt(2, 12);
        const h = randomInt(2, 12);
        return {
          kind: 'measurement',
          topic,
          shape: 'cuboid',
          dimensions: { length: l, width: w, height: h },
          prompt: `Cuboid ${l} cm by ${w} cm by ${h} cm. Find the volume`,
          answer: `${l * w * h} cm³`,
        };
      }

      if (solidType === 'cube') {
        const side = randomInt(2, 14);
        return {
          kind: 'measurement',
          topic,
          shape: 'cube',
          dimensions: { side },
          prompt: `Cube side length ${side} cm. Find the volume`,
          answer: `${side * side * side} cm³`,
        };
      }

      if (solidType === 'cylinder') {
        const radius = randomInt(2, 10);
        const height = randomInt(2, 16);
        return {
          kind: 'measurement',
          topic,
          shape: 'cylinder',
          dimensions: { radius, height },
          prompt: `Cylinder radius ${radius} cm and height ${height} cm. Find the volume`,
          answer: `${radius * radius * height}π cm³`,
        };
      }

      const base = randomInt(2, 14);
      const triHeight = randomInt(2, 14);
      const length = randomInt(2, 14);
      const volume = (base * triHeight * length) / 2;
      return {
        kind: 'measurement',
        topic,
        shape: 'triangular-prism',
        dimensions: { base, triHeight, length },
        prompt: `Triangular prism with triangle base ${base} cm, triangle height ${triHeight} cm and prism length ${length} cm. Find the volume`,
        answer: `${formatDecimalResult(volume)} cm³`,
      };
    }
    case 'surface-area': {
      const side = randomInt(2, 20);
      return {
        kind: 'measurement',
        topic,
        shape: 'cube',
        dimensions: { side },
        prompt: `Cube side length ${side} cm. Find the surface area`,
        answer: `${6 * side * side} cm²`,
      };
    }
    case 'capacity': {
      const liters = randomInt(1, 25);
      return {
        kind: 'measurement',
        topic,
        prompt: `Convert ${liters} L to mL`,
        answer: `${liters * 1000} mL`,
      };
    }
    case 'mass': {
      const kg = randomInt(1, 30);
      return {
        kind: 'measurement',
        topic,
        prompt: `Convert ${kg} kg to g`,
        answer: `${kg * 1000} g`,
      };
    }
    case 'time': {
      const hours = randomInt(1, 6);
      const minutes = randomInt(1, 11) * 5;
      return {
        kind: 'measurement',
        topic,
        prompt: `${hours} h ${minutes} min to minutes`,
        answer: `${hours * 60 + minutes} min`,
      };
    }
    case 'unit-conversions': {
      const conversionType = pickRandomFromList(['length', 'mass', 'capacity']);
      if (conversionType === 'length') {
        const cm = randomInt(100, 2500);
        return {
          kind: 'measurement',
          topic,
          prompt: `${cm} cm to m`,
          answer: `${formatDecimalResult(cm / 100)} m`,
        };
      }

      if (conversionType === 'mass') {
        const grams = randomInt(200, 9000);
        return {
          kind: 'measurement',
          topic,
          prompt: `${grams} g to kg`,
          answer: `${formatDecimalResult(grams / 1000)} kg`,
        };
      }

      const ml = randomInt(250, 9500);
      return {
        kind: 'measurement',
        topic,
        prompt: `${ml} mL to L`,
        answer: `${formatDecimalResult(ml / 1000)} L`,
      };
    }
    case 'scale-drawings': {
      const scale = pickRandomFromList([20, 50, 100]);
      const realMeters = randomInt(2, 20);
      const drawingCm = (realMeters * 100) / scale;
      return {
        kind: 'measurement',
        topic,
        prompt: `Scale 1:${scale}, real ${realMeters} m -> ? cm`,
        answer: `${formatDecimalResult(drawingCm)} cm`,
      };
    }
    default:
      return {
        kind: 'measurement',
        topic,
        prompt: 'Write the answer.',
        answer: '',
      };
  }
}

function buildGeometryQuestions(topic, count) {
  if (topic !== '2d-shapes' && topic !== '3d-shapes') {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(buildGeometryQuestion(topic));
    }
    return items;
  }

  const source = topic === '2d-shapes' ? get2dShapeFacts() : get3dShapeFacts();
  const shuffled = source.slice().sort(() => Math.random() - 0.5);
  const items = [];
  let lastPromptType = '';

  const promptVariants2d = {
    sides: ['number of sides', 'how many sides', 'sides'],
    corners: ['number of corners', 'how many corners', 'corners'],
    vertices: ['number of vertices', 'how many vertices', 'vertices'],
    symmetry: ['number of lines of symmetry', 'how many lines of symmetry', 'line(s) of symmetry'],
  };

  const promptVariants3d = {
    faces: ['number of faces', 'how many faces', 'faces'],
    edges: ['number of edges', 'how many edges', 'edges'],
    vertices: ['number of vertices', 'how many vertices', 'vertices'],
  };

  for (let i = 0; i < count; i++) {
    const shape = shuffled[i % shuffled.length];

    if (topic === '2d-shapes') {
      const availableTypes = ['sides', 'corners', 'vertices', 'symmetry'].filter((type) => type !== lastPromptType);
      const promptType = pickRandomFromList(availableTypes);
      const wording = pickRandomFromList(promptVariants2d[promptType]);
      lastPromptType = promptType;

      if (promptType === 'sides') {
        items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.sides });
      } else if (promptType === 'corners' || promptType === 'vertices') {
        items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.vertices });
      } else {
        items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.symmetry });
      }
      continue;
    }

    const availableTypes = ['faces', 'edges', 'vertices'].filter((type) => type !== lastPromptType);
    const promptType = pickRandomFromList(availableTypes);
    const wording = pickRandomFromList(promptVariants3d[promptType]);
    lastPromptType = promptType;

    if (promptType === 'faces') {
      items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.faces });
    } else if (promptType === 'edges') {
      items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.edges });
    } else {
      items.push({ kind: 'geometry', topic, prompt: `${shape.name}: ${wording}`, answer: shape.vertices });
    }
  }

  return items;
}

function get2dShapeFacts() {
  return [
    { name: 'Triangle', sides: 3, vertices: 3, symmetry: 3 },
    { name: 'Square', sides: 4, vertices: 4, symmetry: 4 },
    { name: 'Rectangle', sides: 4, vertices: 4, symmetry: 2 },
    { name: 'Pentagon', sides: 5, vertices: 5, symmetry: 5 },
    { name: 'Hexagon', sides: 6, vertices: 6, symmetry: 6 },
    { name: 'Octagon', sides: 8, vertices: 8, symmetry: 8 },
  ];
}

function get3dShapeFacts() {
  return [
    { name: 'Cube', faces: 6, edges: 12, vertices: 8 },
    { name: 'Cuboid', faces: 6, edges: 12, vertices: 8 },
    { name: 'Triangular Prism', faces: 5, edges: 9, vertices: 6 },
    { name: 'Square Pyramid', faces: 5, edges: 8, vertices: 5 },
    { name: 'Cylinder', faces: 3, edges: 2, vertices: 0 },
    { name: 'Cone', faces: 2, edges: 1, vertices: 1 },
    { name: 'Sphere', faces: 1, edges: 0, vertices: 0 },
  ];
}

function buildAlgebraQuestion(topic) {
  switch (topic) {
    case 'patterns': {
      const start = randomInt(1, 12);
      const step = randomInt(2, 9);
      const values = [start, start + step, start + (step * 2), start + (step * 3)];
      return {
        kind: 'algebra',
        topic,
        prompt: `${values.join(', ')}, __`,
        answer: values[3] + step,
      };
    }
    case 'variables': {
      const variable = pickRandomFromList(['x', 'y', 'n', 'a']);
      const coefficient = randomInt(2, 9);
      const constant = randomInt(1, 12);
      const phrase = `${coefficient} times ${variable} plus ${constant}`;
      const answer = `${coefficient}${variable} + ${constant}`;
      return { kind: 'algebra', topic, prompt: phrase, answer };
    }
    case 'expressions': {
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const first = randomInt(2, 6);
      const second = randomInt(2, 6);
      const third = randomInt(1, 5);
      return {
        kind: 'algebra',
        topic,
        prompt: `${first}${variable} + ${second}${variable} + ${third}${variable}`,
        answer: `${first + second + third}${variable}`,
      };
    }
    case 'substitution': {
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const value = randomInt(2, 9);
      const coefficient = randomInt(2, 8);
      const constant = randomInt(1, 12);
      return {
        kind: 'algebra',
        topic,
        prompt: `Evaluate ${coefficient}${variable} + ${constant} when ${variable} = ${value}.`,
        answer: coefficient * value + constant,
      };
    }
    case 'expanding-expressions': {
      const coefficient = randomInt(2, 9);
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const constant = randomInt(2, 12);
      return {
        kind: 'algebra',
        topic,
        prompt: `${coefficient}(${variable} + ${constant})`,
        answer: `${coefficient}${variable} + ${coefficient * constant}`,
      };
    }
    case 'factorisation': {
      const coefficient = randomInt(2, 9);
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const constant = randomInt(2, 12);
      return {
        kind: 'algebra',
        topic,
        prompt: `${coefficient}${variable} + ${coefficient * constant}`,
        answer: `${coefficient}(${variable} + ${constant})`,
      };
    }
    case 'linear-equations': {
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const solution = randomInt(2, 20);
      const constant = randomInt(1, 12);
      return {
        kind: 'algebra',
        topic,
        prompt: `${variable} + ${constant} = ${solution + constant}`,
        answer: `${variable} = ${solution}`,
      };
    }
    case 'simultaneous-equations': {
      const x = randomInt(1, 9);
      const y = randomInt(1, 9);
      const sum = x + y;
      const diff = x - y;
      return {
        kind: 'algebra',
        topic,
        prompt: `x + y = ${sum}\nx - y = ${diff}`,
        answer: `x = ${x}, y = ${y}`,
      };
    }
    case 'inequalities': {
      const variable = pickRandomFromList(['x', 'y', 'n']);
      const solution = randomInt(2, 15);
      const offset = randomInt(1, 9);
      const comparison = pickRandomFromList(['>', '<']);
      const rightSide = solution + offset;
      return {
        kind: 'algebra',
        topic,
        prompt: `${variable} + ${offset} ${comparison} ${rightSide}`,
        answer: `${variable} ${comparison} ${solution}`,
      };
    }
    case 'polynomials': {
      const variable = 'x';
      const first = randomInt(2, 6);
      const second = randomInt(2, 6);
      const third = randomInt(1, 4);
      return {
        kind: 'algebra',
        topic,
        prompt: `Simplify ${first}${variable}^2 + ${second}${variable}^2 + ${third}${variable}.`,
        answer: `${first + second}${variable}^2 + ${third}${variable}`,
      };
    }
    case 'functions': {
      const variable = pickRandomFromList(['x', 'n']);
      const value = randomInt(2, 8);
      const multiplier = randomInt(2, 6);
      const constant = randomInt(1, 12);
      return {
        kind: 'algebra',
        topic,
        prompt: `If f(${variable}) = ${multiplier}${variable} + ${constant}, find f(${value}).`,
        answer: multiplier * value + constant,
      };
    }
    case 'exponential-functions': {
      const base = randomInt(2, 5);
      const exponent = randomInt(2, 4);
      return {
        kind: 'algebra',
        topic,
        prompt: `${base}^${exponent}`,
        answer: Math.pow(base, exponent),
      };
    }
    case 'logarithmic-functions': {
      const exponent = randomInt(2, 4);
      const value = Math.pow(10, exponent);
      return {
        kind: 'algebra',
        topic,
        prompt: `log10(${value})`,
        answer: exponent,
      };
    }
    case 'sequences': {
      const start = randomInt(1, 15);
      const step = randomInt(2, 9);
      const terms = [start, start + step, start + (step * 2), start + (step * 3)];
      return {
        kind: 'algebra',
        topic,
        prompt: `${terms.join(', ')}, __`,
        answer: terms[3] + step,
      };
    }
    default:
      return {
        kind: 'algebra',
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

function renderAlgebraQuestion(num, question) {
  return `
    <div class="question question-algebra-topic">
      <div class="question-number">${num}.</div>
      <div class="algebra-topic-body">
        <div class="algebra-topic-prompt">${renderAlgebraPromptHTML(question)}</div>
        <div class="algebra-topic-answer-line"></div>
      </div>
    </div>`;
}

function renderGeometryQuestion(num, question) {
  const largeShapeClass = (question.topic === '2d-shapes' || question.topic === '3d-shapes') ? ' geometry-topic-large-shape' : '';
  return `
    <div class="question question-geometry-topic">
      <div class="question-number">${num}.</div>
      <div class="geometry-topic-body${largeShapeClass}">
        <div class="geometry-topic-prompt">${renderGeometryPromptHTML(question)}</div>
        <div class="geometry-topic-answer-line"></div>
      </div>
    </div>`;
}

function renderPercentagePromptHTML(question) {
  return escapeHtml(String(question.prompt ?? ''));
}

function renderAlgebraPromptHTML(question) {
  return renderAlgebraTextHTML(String(question.prompt ?? '')).replace(/\n/g, '<br>');
}

function renderGeometryPromptHTML(question) {
  const rawPrompt = String(question.prompt ?? '');
  const shapeName = rawPrompt.includes(':') ? rawPrompt.split(':')[0].trim() : rawPrompt;
  const label = escapeHtml(rawPrompt);

  if (question.topic === 'circle-geometry') {
    const diagram = renderCircleGeometrySVG(rawPrompt);
    if (!diagram) {
      return label;
    }

    return `
      <span class="geometry-shape-stack">
        <span class="geometry-shape-question">${label}</span>
        <span class="geometry-shape-icon geometry-circle-diagram" aria-hidden="true">${diagram}</span>
      </span>`;
  }

  if (question.topic !== '2d-shapes' && question.topic !== '3d-shapes') {
    return label;
  }

  const shapeSvg = renderGeometryShapeSVG(shapeName, question.topic);
  if (!shapeSvg) {
    return label;
  }

  return `
    <span class="geometry-shape-stack">
      <span class="geometry-shape-question">${label}</span>
      <span class="geometry-shape-icon" aria-hidden="true">${shapeSvg}</span>
    </span>`;
}

function renderGeometryShapeSVG(shapeName, topic) {
  if (topic === '2d-shapes') {
    const shapeMap = {
      Triangle: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 21,20 3,20" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      Square: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      Rectangle: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      Pentagon: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      Hexagon: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,3 17,3 22,12 17,21 7,21 2,12" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      Octagon: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    };
    return shapeMap[shapeName] || '';
  }

  const shapeMap = {
    Cube: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,10 50,20 32,30 14,20" fill="rgba(43,108,176,0.08)" stroke="currentColor" stroke-width="2"/><polygon points="14,20 32,30 32,52 14,42" fill="rgba(43,108,176,0.12)" stroke="currentColor" stroke-width="2"/><polygon points="32,30 50,20 50,42 32,52" fill="rgba(43,108,176,0.05)" stroke="currentColor" stroke-width="2"/></svg>',
    Cuboid: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="24,12 50,12 58,20 32,20" fill="rgba(43,108,176,0.08)" stroke="currentColor" stroke-width="2"/><polygon points="12,20 38,20 38,48 12,48" fill="rgba(43,108,176,0.12)" stroke="currentColor" stroke-width="2"/><polygon points="38,20 58,20 58,48 38,48" fill="rgba(43,108,176,0.05)" stroke="currentColor" stroke-width="2"/><line x1="24" y1="12" x2="12" y2="20" stroke="currentColor" stroke-width="2"/></svg>',
    'Triangular Prism': '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="12,44 24,20 36,44" fill="rgba(43,108,176,0.12)" stroke="currentColor" stroke-width="2"/><polygon points="28,44 40,20 52,44" fill="rgba(43,108,176,0.05)" stroke="currentColor" stroke-width="2"/><line x1="12" y1="44" x2="28" y2="44" stroke="currentColor" stroke-width="2"/><line x1="24" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="2"/><line x1="36" y1="44" x2="52" y2="44" stroke="currentColor" stroke-width="2"/></svg>',
    'Square Pyramid': '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="18,42 46,42 38,50 10,50" fill="rgba(43,108,176,0.06)" stroke="currentColor" stroke-width="2"/><polygon points="32,14 18,42 32,42" fill="rgba(43,108,176,0.12)" stroke="currentColor" stroke-width="2"/><polygon points="32,14 32,42 46,42" fill="rgba(43,108,176,0.03)" stroke="currentColor" stroke-width="2"/><line x1="32" y1="14" x2="38" y2="50" stroke="currentColor" stroke-width="2"/><line x1="32" y1="14" x2="10" y2="50" stroke="currentColor" stroke-width="2"/></svg>',
    Cylinder: '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="16" rx="16" ry="6" fill="rgba(43,108,176,0.05)" stroke="currentColor" stroke-width="2"/><line x1="16" y1="16" x2="16" y2="44" stroke="currentColor" stroke-width="2"/><line x1="48" y1="16" x2="48" y2="44" stroke="currentColor" stroke-width="2"/><ellipse cx="32" cy="44" rx="16" ry="6" fill="rgba(43,108,176,0.12)" stroke="currentColor" stroke-width="2"/></svg>',
    Cone: '<svg viewBox="0 0 64 64" aria-hidden="true"><polygon points="32,12 14,42 50,42" fill="rgba(43,108,176,0.08)" stroke="currentColor" stroke-width="2"/><ellipse cx="32" cy="42" rx="18" ry="6" fill="rgba(43,108,176,0.02)" stroke="currentColor" stroke-width="2"/></svg>',
    Sphere: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="18" fill="rgba(43,108,176,0.05)" stroke="currentColor" stroke-width="2"/><ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="32" cy="32" rx="7" ry="18" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  };
  return shapeMap[shapeName] || '';
}

function renderCircleGeometrySVG(promptText) {
  const prompt = String(promptText ?? '');
  const match = prompt.match(/^(Diameter|Radius)\s*=\s*(\d+(?:\.\d+)?)\s*cm$/i);
  if (!match) {
    return '';
  }

  const measureType = match[1].toLowerCase();
  const valueText = `${match[2]} cm`;

  if (measureType === 'diameter') {
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="2" fill="currentColor"/><text x="32" y="27" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor">${escapeHtml(valueText)}</text></svg>`;
  }

  return `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-width="2"/><line x1="32" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="2" fill="currentColor"/><text x="44" y="27" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor">${escapeHtml(valueText)}</text></svg>`;
}

function renderAlgebraTextHTML(text) {
  return escapeHtml(String(text)).replace(/\^(\d+)/g, '<sup>$1</sup>');
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

  if (topic === '2d-shapes') {
    return 'Write the requested property for each 2D shape:';
  }

  if (topic === '3d-shapes') {
    return 'Write the requested property for each 3D shape:';
  }

  if (topic === 'angles') {
    return 'Find the missing angle:';
  }

  if (topic === 'symmetry') {
    return 'Write the number of lines of symmetry for each shape:';
  }

  if (topic === 'transformations') {
    return 'Apply each transformation and write the new coordinate:';
  }

  if (topic === 'congruence') {
    return 'Decide if the two triangles are congruent:';
  }

  if (topic === 'similarity') {
    return 'Use similarity and scale factor to find the new side length:';
  }

  if (topic === 'circle-geometry') {
    return 'Find the missing circle measure:';
  }

  if (topic === 'geometric-reasoning') {
    return 'Use angle facts to find the missing value:';
  }

  if (topic === 'proof') {
    return 'State whether each geometric statement is true or false:';
  }

  if (topic === 'length') {
    return 'Convert each length to the requested unit:';
  }

  if (topic === 'area') {
    return 'Find the area of each shape:';
  }

  if (topic === 'perimeter') {
    return 'Find the perimeter of each shape:';
  }

  if (topic === 'volume') {
    return 'Find the volume of each solid:';
  }

  if (topic === 'surface-area') {
    return 'Find the surface area of each solid:';
  }

  if (topic === 'capacity') {
    return 'Convert each capacity to the requested unit:';
  }

  if (topic === 'mass') {
    return 'Convert each mass to the requested unit:';
  }

  if (topic === 'time') {
    return 'Convert each time value to the requested unit:';
  }

  if (topic === 'unit-conversions') {
    return 'Convert each value to the requested unit:';
  }

  if (topic === 'scale-drawings') {
    return 'Use the scale to find the missing drawing length:';
  }

  if (ALGEBRA_TOPICS.has(topic)) {
    const map = {
      patterns: 'Complete the patterns:',
      variables: 'Write each expression:',
      expressions: 'Simplify each expression:',
      substitution: 'Substitute the values and evaluate:',
      'expanding-expressions': 'Expand each expression:',
      factorisation: 'Factorise each expression:',
      'linear-equations': 'Solve each equation:',
      'simultaneous-equations': 'Solve the simultaneous equations:',
      inequalities: 'Solve each inequality:',
      polynomials: 'Simplify each polynomial:',
      functions: 'Evaluate each function:',
      'exponential-functions': 'Evaluate each exponential function:',
      'logarithmic-functions': 'Evaluate each logarithmic function:',
      sequences: 'Continue the sequences:',
    };
    return map[topic] || 'Complete the following algebra questions:';
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
