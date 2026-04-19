# GSL Index README

This README documents the GSL open-book exam indexes built from the textbook file `cpa - gsl.pdf` and the editable workbook `gsl_index_workbook_extended.xlsx`.

## Live Pages

- Index page: `https://preethi-yagnamurthy.github.io/portfolio/gsl/index`
- Quiz page: `https://preethi-yagnamurthy.github.io/portfolio/gsl/quiz`
- Editable workbook download: `docs/downloads/gsl_index_workbook_extended.xlsx`
- Web index data: `docs/assets/data/gsl-indexes.json`

## Indexes Built So Far

| Index | Rows | What it is for |
| --- | ---: | --- |
| Hierarchical Index | 137 | Concept-tree lookup by module, section, type, entry, and page. This is the main "where does this concept sit?" index. |
| A-Z Index | 137 | Alphabetical lookup for important concepts and exam terms. Useful when the question gives a keyword but not the section. |
| Cue to Framework | 22 | Maps exam trigger wording to likely frameworks, primary page, backup page, use case, and common confusion. |
| Weakness Tracker | 6 | Targets grey/dark areas with topic, page, trigger words, and key subpoints. This is meant to complement your weaker retrieval areas. |
| Priority Tabs | 11 | Short printable tab list for high-value sections that should be easy to flip to in the physical material. |
| All Headings | 932 | Broad extracted heading index with module, heading type, heading text, book page, and PDF page. |
| Section Headings | 50 | Dedicated major-section index with section number, section heading, book page, and PDF page. |
| Table Headings | 100 | Dedicated table index with table label, caption/heading, book page, and PDF page. |
| Figure Headings | 127 | Dedicated figure index with figure label, caption/heading, book page, and PDF page. |
| Bold / Italic Text | 5,701 | Extracted styled-text index covering bold, italic, and bold-italic text with book and PDF pages. |
| Citations | 367 | In-chapter citation index with citation type, citation text, author string, year, book page, and PDF page. |
| Reference Authors | 636 | Reference-style author strings extracted from bibliographic/reference-like text. |
| Author Names | 710 | Dedicated author-name index with occurrences, years, book pages, modules, and source types. |

There is also a compact knowledge-map visualization for orientation. It is not a page-level index; it is a study/navigation aid for major Module 2 and Module 3 concept clusters.

## How The Indexes Were Built

The work is split into two categories.

Curated open-book indexes:

- `Hierarchical_Index`
- `A_Z_Index`
- `Cue_to_Framework`
- `Weakness_Tracker`
- `Priority_Tabs`

These were designed around exam retrieval, not just textbook structure. The aim was to support fast lookup from a question cue to the relevant textbook section. For example, a concept like market segmentation can be found as its own entry, as part of a broader market/segmentation branch, and through related cue words or frameworks.

Extraction-based indexes:

- `Headings_All`
- `Section_Headings`
- `Table_Headings`
- `Figure_Headings`
- `Styled_Text`
- `Citations`
- `Reference_Authors`
- `Authors_Index`

These were produced from the PDF/textbook extraction pass and loaded into the Excel workbook. The web page then exports selected workbook sheets into `docs/assets/data/gsl-indexes.json` so the browser can search, filter, and paginate the data.

## Page Number Handling

Where available, the indexes keep two page concepts separate:

- `Book Page`: the textbook's printed/internal page number.
- `PDF Page`: the actual PDF page position.

For exam use, prefer `Book Page` when the printed material follows textbook numbering. Use `PDF Page` when navigating the PDF file directly.

## Current Web Implementation

- `docs/gsl/index.html` serves the exact clean URL `/gsl/index`.
- `docs/gsl/index/index.html` also serves the index page at `/gsl/index/`.
- `docs/gsl/quiz/index.html` serves the quiz page at `/gsl/quiz`.
- `docs/assets/js/gsl-index.js` loads `gsl-indexes.json`, renders dataset tabs, search, module/type filters, paginated tables, and the knowledge map.
- `docs/assets/js/quiz.js` is the shared quiz renderer used by the existing quiz page and the GSL quiz page.

## Caveats

- Styled text and heading extraction is font/layout based. It is useful for recall and search, but critical entries should be verified against the textbook before relying on them in exam conditions.
- Some diagram/table text can be extracted as heading-like or styled text because PDF structure is visual, not semantic.
- The current quiz JSON is a starter GSL bank. The index data is the main source-backed study material; quiz questions should be expanded separately with source-backed citations.

## Recommended Use In The Exam

1. Start with `Cue to Framework` if the question wording contains trigger phrases.
2. Use `A-Z Index` if you recognize a term but not its textbook location.
3. Use `Hierarchical Index` when you need the parent concept or neighboring subtopics.
4. Use `Section/Table/Figure Headings` when the answer is likely in a named exhibit or structured textbook section.
5. Use `Bold / Italic Text`, `Citations`, and `Author Names` for narrow lookups where the question hints at an emphasized term, model, or researcher.
