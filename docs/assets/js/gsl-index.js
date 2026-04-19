function getGslIndexScript() {
  return Array.from(document.querySelectorAll('script[type="module"][src]')).find(function (script) {
    const src = script.getAttribute("src");
    if (!src) return false;
    return new URL(src, document.baseURI).href === import.meta.url;
  });
}

const indexScript = getGslIndexScript();
const configuredDataPath = indexScript?.getAttribute("data-gsl-index-data");
const DATA_PATH = configuredDataPath
  ? new URL(configuredDataPath, document.baseURI).href
  : new URL("../data/gsl-indexes.json", import.meta.url).href;

const DATASET_ORDER = [
  "cue_to_framework",
  "weakness_tracker",
  "hierarchical_index",
  "az_index",
  "priority_tabs",
  "section_headings",
  "headings_all",
  "table_headings",
  "figure_headings",
  "styled_text",
  "citations",
  "reference_authors",
  "authors_index"
];

const SEARCH_COLUMNS = {
  cue_to_framework: ["Question Cue", "Likely Framework", "Use When", "Common Confusion"],
  weakness_tracker: ["Zone", "Topic", "Trigger Words", "Key Subpoints"],
  hierarchical_index: ["Module", "Section", "Type", "Entry", "Pages"],
  az_index: ["Entry", "Pages", "Type"],
  priority_tabs: ["Section", "Page"],
  section_headings: ["Module", "Section No.", "Section Heading", "Book Page", "PDF Page"],
  headings_all: ["Module", "Heading Type", "Heading Text", "Book Page", "PDF Page"],
  table_headings: ["Module", "Table Label", "Table Heading / Caption", "Book Page", "PDF Page"],
  figure_headings: ["Module", "Figure Label", "Figure Heading / Caption", "Book Page", "PDF Page"],
  styled_text: ["Module", "Style Type", "Styled Text", "Book Page", "PDF Page"],
  citations: ["Module", "Citation Type", "Citation Text", "Author String", "Year", "Book Page", "PDF Page"],
  reference_authors: ["Module", "Source Type", "Author String", "Year", "Book Page", "PDF Page"],
  authors_index: ["Author Name", "Years", "Book Pages", "Modules", "Source Types"]
};

const KNOWLEDGE_MAP = [
  {
    title: "Module 2",
    subtitle: "External Environment and Industry Analysis",
    branches: [
      {
        label: "Industry logic",
        items: ["Value chain", "Industry segmentation", "Industry life cycle", "Strategic position"]
      },
      {
        label: "Remote and industry environment",
        items: ["PESTEL cues", "Porter's five forces", "Industry attractiveness", "Competitive pressure"]
      },
      {
        label: "Markets and segmentation",
        items: ["What is a market?", "Market segmentation", "Segmentation approaches", "Target markets"]
      },
      {
        label: "Competition",
        items: ["Basis of competition", "Key success factors", "Competitive position", "Strategic groups"]
      }
    ]
  },
  {
    title: "Module 3",
    subtitle: "Internal Analysis and Strategic Capability",
    branches: [
      {
        label: "Stakeholders and performance",
        items: ["Stakeholder salience", "Current performance", "Data analytics", "Strategic drivers"]
      },
      {
        label: "Operational drivers",
        items: ["Balanced scorecard", "Processes", "Customer value", "Operational measures"]
      },
      {
        label: "Resources and people",
        items: ["Resources", "Capabilities", "Core competencies", "People and culture"]
      },
      {
        label: "Synthesis",
        items: ["SWOT", "Gap analysis", "Strategic implications", "Exam answer framing"]
      }
    ]
  }
];

const state = {
  data: null,
  activeKey: "cue_to_framework",
  query: "",
  module: "all",
  type: "all",
  page: 1,
  pageSize: 100
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value) {
  return String(value ?? "").trim();
}

function slugify(value) {
  return normalize(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDatasetKeys() {
  const datasets = state.data?.datasets || {};
  return DATASET_ORDER.filter(function (key) {
    return datasets[key];
  });
}

function getActiveDataset() {
  return state.data?.datasets?.[state.activeKey];
}

function getRows() {
  return getActiveDataset()?.rows || [];
}

function findColumn(columns, options) {
  return options.find(function (option) {
    return columns.includes(option);
  });
}

function getModuleColumn(dataset) {
  return findColumn(dataset.columns, ["Module", "Modules"]);
}

function getTypeColumn(dataset) {
  return findColumn(dataset.columns, [
    "Type",
    "Heading Type",
    "Style Type",
    "Citation Type",
    "Source Type",
    "Source Types",
    "Zone"
  ]);
}

function getSearchText(row) {
  const columns = SEARCH_COLUMNS[state.activeKey] || getActiveDataset()?.columns || [];
  return columns.map(function (column) {
    return row[column];
  }).join(" ").toLowerCase();
}

function valueMatchesFilter(value, selected) {
  if (selected === "all") return true;
  return normalize(value)
    .split(/[,;|]/)
    .map(function (part) {
      return part.trim();
    })
    .some(function (part) {
      return part === selected || part.includes(selected);
    });
}

function getFilteredRows() {
  const dataset = getActiveDataset();
  if (!dataset) return [];
  const moduleColumn = getModuleColumn(dataset);
  const typeColumn = getTypeColumn(dataset);
  const query = state.query.trim().toLowerCase();

  return getRows().filter(function (row) {
    if (query && !getSearchText(row).includes(query)) return false;
    if (moduleColumn && !valueMatchesFilter(row[moduleColumn], state.module)) return false;
    if (typeColumn && !valueMatchesFilter(row[typeColumn], state.type)) return false;
    return true;
  });
}

function uniqueValues(rows, column) {
  if (!column) return [];
  const values = new Set();
  rows.forEach(function (row) {
    normalize(row[column])
      .split(/[,;|]/)
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean)
      .forEach(function (part) {
        values.add(part);
      });
  });
  return Array.from(values).sort(function (a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  });
}

function getIndexDownloadHref(key) {
  return new URL(`../../downloads/gsl-indexes/${key}.xlsx`, DATA_PATH).href;
}

function renderIndexDirectory() {
  const datasets = state.data.datasets;
  return `
    <div class="gsl-index-directory" aria-label="Available GSL indexes">
      ${getDatasetKeys().map(function (key) {
        const dataset = datasets[key];
        const isActive = key === state.activeKey;
        const rowCount = dataset.rows.length;
        return `
          <article class="gsl-index-card${isActive ? " is-active" : ""}" id="gsl-card-${escapeHtml(slugify(key))}">
            <div class="gsl-index-card__body">
              <p class="gsl-index-card__eyebrow">Index option</p>
              <h3>${escapeHtml(dataset.label)}</h3>
              <p>${escapeHtml(dataset.description)}</p>
            </div>
            <div class="gsl-index-card__count" aria-label="${escapeHtml(rowCount)} entries">
              <strong>${escapeHtml(rowCount.toLocaleString())}</strong>
              <span>${rowCount === 1 ? "entry" : "entries"}</span>
            </div>
            <div class="gsl-index-card__actions">
              <button
                class="quiz-button ${isActive ? "quiz-button--primary" : "quiz-button--ghost"}"
                type="button"
                data-dataset="${escapeHtml(key)}"
                aria-current="${isActive ? "true" : "false"}"
              >
                ${isActive ? "Showing" : "Show index"}
              </button>
              <a
                class="quiz-button quiz-button--ghost"
                href="${escapeHtml(getIndexDownloadHref(key))}"
                download
              >
                Download Excel
              </a>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderSelect(label, id, value, options, disabled) {
  return `
    <label class="gsl-field" for="${escapeHtml(id)}">
      <span>${escapeHtml(label)}</span>
      <select id="${escapeHtml(id)}" ${disabled ? "disabled" : ""}>
        <option value="all">All</option>
        ${options.map(function (option) {
          return `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`;
        }).join("")}
      </select>
    </label>
  `;
}

function renderControls() {
  const dataset = getActiveDataset();
  const rows = getRows();
  const moduleColumn = getModuleColumn(dataset);
  const typeColumn = getTypeColumn(dataset);
  const moduleOptions = uniqueValues(rows, moduleColumn);
  const typeOptions = uniqueValues(rows, typeColumn);
  const typeLabel = typeColumn ? typeColumn.replace(" Type", "") : "Type";

  return `
    <div class="gsl-index-controls">
      <label class="gsl-field gsl-field--search" for="gsl-index-search">
        <span>Search within selected index</span>
        <input
          id="gsl-index-search"
          type="search"
          value="${escapeHtml(state.query)}"
          placeholder="Try market segmentation, Porter, italic, author name..."
          autocomplete="off"
        >
      </label>
      ${renderSelect("Module", "gsl-index-module", state.module, moduleOptions, !moduleColumn)}
      ${renderSelect(typeLabel, "gsl-index-type", state.type, typeOptions, !typeColumn)}
    </div>
  `;
}

function renderTable() {
  const dataset = getActiveDataset();
  const filteredRows = getFilteredRows();
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / state.pageSize));
  state.page = Math.min(Math.max(1, state.page), totalPages);
  const startIndex = (state.page - 1) * state.pageSize;
  const visibleRows = filteredRows.slice(startIndex, startIndex + state.pageSize);
  const rangeStart = filteredRows.length ? startIndex + 1 : 0;
  const rangeEnd = startIndex + visibleRows.length;

  return `
    <div class="gsl-index-meta">
      <div>
        <h3>${escapeHtml(dataset.label)}</h3>
        <p>${escapeHtml(dataset.description)}</p>
      </div>
      <p class="gsl-index-meta__count">
        Showing ${escapeHtml(rangeStart)}-${escapeHtml(rangeEnd)} of ${escapeHtml(filteredRows.length)}
      </p>
    </div>
    <div class="gsl-table-wrap" tabindex="0" aria-label="${escapeHtml(dataset.label)} table">
      <table class="gsl-index-table">
        <thead>
          <tr>
            ${dataset.columns.map(function (column) {
              return `<th scope="col">${escapeHtml(column)}</th>`;
            }).join("")}
          </tr>
        </thead>
        <tbody>
          ${visibleRows.length ? visibleRows.map(function (row) {
            return `
              <tr>
                ${dataset.columns.map(function (column) {
                  return `<td>${escapeHtml(row[column])}</td>`;
                }).join("")}
              </tr>
            `;
          }).join("") : `
            <tr>
              <td colspan="${escapeHtml(dataset.columns.length)}">No entries match the current filters.</td>
            </tr>
          `}
        </tbody>
      </table>
    </div>
    <div class="gsl-pagination" aria-label="Index pagination">
      <button class="quiz-button quiz-button--ghost" type="button" data-page-action="previous" ${state.page <= 1 ? "disabled" : ""}>
        Previous
      </button>
      <span>Page ${escapeHtml(state.page)} of ${escapeHtml(totalPages)}</span>
      <button class="quiz-button quiz-button--ghost" type="button" data-page-action="next" ${state.page >= totalPages ? "disabled" : ""}>
        Next
      </button>
    </div>
  `;
}

function renderIndex() {
  const root = document.getElementById("gsl-index-root");
  if (!root || !state.data) return;
  root.innerHTML = `
    ${renderIndexDirectory()}
    <div class="gsl-index-workspace" id="gsl-index-workspace">
      ${renderControls()}
      <div id="gsl-index-results">
        ${renderTable()}
      </div>
    </div>
  `;
}

function renderResultsOnly() {
  const results = document.getElementById("gsl-index-results");
  if (!results) {
    renderIndex();
    return;
  }
  results.innerHTML = renderTable();
}

function renderMap() {
  const root = document.getElementById("gsl-map-root");
  if (!root) return;
  root.innerHTML = `
    <div class="gsl-map" aria-label="GSL knowledge map">
      ${KNOWLEDGE_MAP.map(function (module) {
        return `
          <article class="gsl-map__module">
            <div class="gsl-map__module-head">
              <span>${escapeHtml(module.title)}</span>
              <strong>${escapeHtml(module.subtitle)}</strong>
            </div>
            <div class="gsl-map__branches">
              ${module.branches.map(function (branch) {
                return `
                  <section class="gsl-map__branch">
                    <h3>${escapeHtml(branch.label)}</h3>
                    <ul>
                      ${branch.items.map(function (item) {
                        return `<li>${escapeHtml(item)}</li>`;
                      }).join("")}
                    </ul>
                  </section>
                `;
              }).join("")}
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function setActiveDataset(key, scrollToResults) {
  if (!state.data?.datasets?.[key]) return;
  state.activeKey = key;
  state.module = "all";
  state.type = "all";
  state.page = 1;
  renderIndex();
  if (scrollToResults) {
    document.getElementById("gsl-index-workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function bindIndexEvents() {
  const root = document.getElementById("gsl-index-root");
  if (!root) return;

  root.addEventListener("click", function (event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const datasetButton = target.closest("[data-dataset]");
    if (datasetButton) {
      setActiveDataset(datasetButton.getAttribute("data-dataset"), true);
      return;
    }

    const pageButton = target.closest("[data-page-action]");
    if (pageButton) {
      const action = pageButton.getAttribute("data-page-action");
      state.page += action === "next" ? 1 : -1;
      renderResultsOnly();
    }
  });

  root.addEventListener("input", function (event) {
    const target = event.target instanceof HTMLInputElement ? event.target : null;
    if (!target || target.id !== "gsl-index-search") return;
    state.query = target.value;
    state.page = 1;
    renderResultsOnly();
  });

  root.addEventListener("change", function (event) {
    const target = event.target instanceof HTMLSelectElement ? event.target : null;
    if (!target) return;

    if (target.id === "gsl-index-module") {
      state.module = target.value;
      state.page = 1;
      renderResultsOnly();
    }

    if (target.id === "gsl-index-type") {
      state.type = target.value;
      state.page = 1;
      renderResultsOnly();
    }
  });
}

async function loadIndexData() {
  const root = document.getElementById("gsl-index-root");
  if (!root) return;

  try {
    const response = await fetch(DATA_PATH, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Could not load ${DATA_PATH}: ${response.status}`);
    }
    state.data = await response.json();
    const firstAvailable = getDatasetKeys()[0];
    if (firstAvailable) state.activeKey = firstAvailable;
    renderIndex();
    bindIndexEvents();
  } catch (error) {
    root.innerHTML = `
      <p class="quiz-error">
        Could not load the GSL index data. ${escapeHtml(error.message)}
      </p>
    `;
  }
}

renderMap();
loadIndexData();
