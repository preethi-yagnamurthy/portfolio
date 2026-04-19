function getQuizScript() {
  return Array.from(document.querySelectorAll('script[type="module"][src]')).find(function (script) {
    const src = script.getAttribute("src");
    if (!src) return false;
    return new URL(src, document.baseURI).href === import.meta.url;
  });
}

const quizScript = getQuizScript();
const configuredDataPath = quizScript?.getAttribute("data-quiz-data");
const DEFAULT_QUIZ_LABEL = quizScript?.getAttribute("data-quiz-label") || "CPA Quiz";
const DATA_PATH = configuredDataPath
  ? new URL(configuredDataPath, document.baseURI).href
  : new URL("../data/quiz-batches.json", import.meta.url).href;

const state = {
  data: null,
  batchIndex: 0,
  questionIndex: 0,
  responses: {}
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getCurrentBatch() {
  return state.data.batches[state.batchIndex];
}

function getQuestionState(batchId, questionId) {
  if (!state.responses[batchId]) {
    state.responses[batchId] = {};
  }

  if (!state.responses[batchId][questionId]) {
    state.responses[batchId][questionId] = {
      selected: "",
      checked: false,
      resultStatus: "",
      keyVisible: false
    };
  }

  return state.responses[batchId][questionId];
}

function evaluateQuestion(question, questionState) {
  if (!questionState.selected) {
    return {
      status: "missing",
      correct: false,
      message: "Select one option before checking this answer."
    };
  }

  if (questionState.selected === question.answer) {
    return {
      status: "correct",
      correct: true,
      message: "Right answer."
    };
  }

  return {
    status: "incorrect",
    correct: false,
    message: "Wrong answer."
  };
}

function getBatchScore(batch) {
  let attempted = 0;
  let correct = 0;

  batch.questions.forEach(function (question) {
    const questionState = getQuestionState(batch.id, question.id);
    if (!questionState.checked) return;
    attempted += 1;
    if (questionState.resultStatus === "correct") correct += 1;
  });

  return {
    attempted,
    correct,
    wrong: attempted - correct,
    unanswered: batch.questions.length - attempted
  };
}

function buildScoreText(batch, score) {
  const parts = [
    `Score: ${score.correct} / ${batch.questions.length}`,
    `${score.correct} right`,
    `${score.wrong} wrong`
  ];

  if (score.unanswered > 0) {
    parts.push(`${score.unanswered} unanswered`);
  }

  return parts.join(" • ");
}

function getQuizLabel() {
  return state.data?.label || DEFAULT_QUIZ_LABEL;
}

function renderOption(question, option, questionState) {
  const key = escapeHtml(option.key);
  const text = escapeHtml(option.text);
  const checked = questionState.selected === option.key ? " checked" : "";

  return `
    <label class="quiz-option">
      <input type="radio" name="${escapeHtml(question.id)}" value="${key}"${checked}>
      <span class="quiz-option__body">
        <span class="quiz-option__bullet"></span>
        <span class="quiz-option__text">${text}</span>
      </span>
    </label>
  `;
}

function renderResult(questionState) {
  if (!questionState.checked) {
    return `<div class="quiz-result" id="quiz-result"></div>`;
  }

  const icon = questionState.resultStatus === "correct" ? "✓" : questionState.resultStatus === "incorrect" ? "➜" : "•";
  const message =
    questionState.resultStatus === "correct"
      ? "Right answer."
      : questionState.resultStatus === "incorrect"
        ? "Wrong answer."
        : "Select one option before checking this answer.";

  return `
    <div class="quiz-result quiz-result--${questionState.resultStatus} is-visible" id="quiz-result">
      <span class="quiz-result__icon" aria-hidden="true">${icon}</span>
      <span>${message}</span>
    </div>
  `;
}

function renderKey(question, questionState) {
  const hidden = questionState.keyVisible ? "" : " hidden";
  const visibleClass = questionState.keyVisible ? " is-visible" : "";

  return `
    <div class="quiz-key${visibleClass}" id="quiz-key"${hidden}>
      <p class="quiz-key__title">Correct answer: ${escapeHtml(question.answer)}</p>
      <p class="quiz-key__citation">${escapeHtml(question.citation)}</p>
    </div>
  `;
}

function renderQuestionStage(batch, question, questionState, score) {
  const questionNumber = state.questionIndex + 1;
  const totalQuestions = batch.questions.length;
  const canGoPrevious = state.questionIndex > 0;
  const canGoNext = state.questionIndex < totalQuestions - 1;

  return `
    <section class="quiz-shell">
      <aside class="quiz-sidebar">
        <div class="quiz-badge">
          <div class="quiz-badge__cap"></div>
          <div class="quiz-badge__body">
            <p class="quiz-badge__code">B${state.batchIndex + 1}</p>
            <p class="quiz-badge__meta">Q${questionNumber}</p>
          </div>
        </div>

        <dl class="quiz-sidebar__stats">
          <div>
            <dt>Set</dt>
            <dd>${state.batchIndex + 1} / ${state.data.batches.length}</dd>
          </div>
          <div>
            <dt>Question</dt>
            <dd>${questionNumber} / ${totalQuestions}</dd>
          </div>
          <div>
            <dt>Checked</dt>
            <dd>${score.attempted}</dd>
          </div>
          <div>
            <dt>Correct</dt>
            <dd>${score.correct}</dd>
          </div>
        </dl>
      </aside>

      <article class="quiz-stage">
        <div class="quiz-stage__topbar">
          <div class="quiz-stage__chips">
            <span class="quiz-chip">${escapeHtml(getQuizLabel())}</span>
            <span class="quiz-chip">${escapeHtml(batch.title)}</span>
            <span class="quiz-chip">Question ${questionNumber}</span>
          </div>
          <div class="quiz-stage__tools">
            <button class="quiz-button quiz-button--ghost" type="button" data-toggle-key>
              ${questionState.keyVisible ? "Hide key" : "Reveal key"}
            </button>
            <button class="quiz-button quiz-button--primary" type="button" data-check-answer>Check answer</button>
          </div>
        </div>

        <div class="quiz-stage__body">
          <p class="quiz-stage__id">${escapeHtml(question.id.toUpperCase())}</p>
          <h2 class="quiz-stage__prompt">${escapeHtml(question.prompt)}</h2>

          <div class="quiz-options" role="radiogroup" aria-label="Question ${questionNumber}">
            ${question.options.map(function (option) {
              return renderOption(question, option, questionState);
            }).join("")}
          </div>

          ${renderResult(questionState)}
          ${renderKey(question, questionState)}
        </div>

        <div class="quiz-stage__footer">
          <div class="quiz-stage__progress">Question ${questionNumber} of ${totalQuestions}</div>
          <div class="quiz-stage__nav">
            <button class="quiz-button" type="button" data-prev-question${canGoPrevious ? "" : " disabled"}>Previous</button>
            <button class="quiz-button" type="button" data-submit-all>Submit all</button>
            <button class="quiz-button quiz-button--primary" type="button" data-next-question>
              ${canGoNext ? "Next question" : "Next set"}
            </button>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderQuiz(batch) {
  const app = document.getElementById("quiz-app");
  const title = document.getElementById("quiz-title");
  const intro = document.getElementById("quiz-intro");
  if (!app) return;

  const question = batch.questions[state.questionIndex];
  const questionState = getQuestionState(batch.id, question.id);
  const score = getBatchScore(batch);

  if (title) title.textContent = batch.title;
  if (intro) intro.textContent = state.data.intro;

  app.innerHTML = `
    <section class="quiz-toolbar quiz-toolbar--session">
      <div class="quiz-toolbar__meta">
        <p class="quiz-toolbar__eyebrow">${escapeHtml(batch.subtitle)}</p>
        <p class="quiz-toolbar__summary">Set ${state.batchIndex + 1} of ${state.data.batches.length}</p>
      </div>
      <div class="quiz-toolbar__actions quiz-toolbar__actions--inline">
        <p class="quiz-toolbar__score" data-quiz-score>${buildScoreText(batch, score)}</p>
        <button class="quiz-button" type="button" data-next-batch>
          ${state.batchIndex < state.data.batches.length - 1 ? "Jump to next set" : "Go to first set"}
        </button>
      </div>
    </section>

    ${renderQuestionStage(batch, question, questionState, score)}

    <section class="quiz-toolbar quiz-footer">
      <p class="quiz-footer__note">
        Check a question individually or use submit all for the current set. Keys remain hidden unless you explicitly reveal them.
      </p>
      <div class="quiz-toolbar__actions">
        <button class="quiz-button" type="button" data-submit-all>Submit all</button>
        <p class="quiz-toolbar__score" data-quiz-score>${buildScoreText(batch, score)}</p>
      </div>
    </section>
  `;

  wireCurrentView(batch, question, questionState);
}

function renderCurrentView() {
  renderQuiz(getCurrentBatch());
}

function wireCurrentView(batch, question, questionState) {
  document.querySelectorAll(`input[name="${question.id}"]`).forEach(function (input) {
    input.addEventListener("change", function () {
      questionState.selected = input.value;
    });
  });

  document.querySelector("[data-check-answer]")?.addEventListener("click", function () {
    const evaluation = evaluateQuestion(question, questionState);
    questionState.checked = true;
    questionState.resultStatus = evaluation.status;
    renderCurrentView();
  });

  document.querySelector("[data-toggle-key]")?.addEventListener("click", function () {
    questionState.keyVisible = !questionState.keyVisible;
    renderCurrentView();
  });

  document.querySelectorAll("[data-submit-all]").forEach(function (button) {
    button.addEventListener("click", function () {
      batch.questions.forEach(function (batchQuestion) {
        const batchQuestionState = getQuestionState(batch.id, batchQuestion.id);
        const evaluation = evaluateQuestion(batchQuestion, batchQuestionState);
        batchQuestionState.checked = true;
        batchQuestionState.resultStatus = evaluation.status;
      });
      renderCurrentView();
    });
  });

  document.querySelector("[data-prev-question]")?.addEventListener("click", function () {
    if (state.questionIndex === 0) return;
    state.questionIndex -= 1;
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelector("[data-next-question]")?.addEventListener("click", function () {
    if (state.questionIndex < batch.questions.length - 1) {
      state.questionIndex += 1;
    } else {
      state.batchIndex = state.batchIndex >= state.data.batches.length - 1 ? 0 : state.batchIndex + 1;
      state.questionIndex = 0;
    }
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelector("[data-next-batch]")?.addEventListener("click", function () {
    state.batchIndex = state.batchIndex >= state.data.batches.length - 1 ? 0 : state.batchIndex + 1;
    state.questionIndex = 0;
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

async function init() {
  const app = document.getElementById("quiz-app");

  try {
    const response = await fetch(DATA_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load quiz data (${response.status})`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.batches) || !data.batches.length) {
      throw new Error("Quiz data is empty.");
    }

    state.data = data;
    renderCurrentView();
  } catch (error) {
    if (app) {
      app.innerHTML = `<p class="quiz-error">${escapeHtml(error.message || "Failed to load quiz.")}</p>`;
    }
  }
}

init();
