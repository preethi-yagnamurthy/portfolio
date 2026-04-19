# GSL Study Console

This directory owns the private GSL study pages under `docs/gsl/`.

## Files

- `docs/gsl/index/index.html` is the dedicated GSL index page.
- `docs/gsl/index.html` serves the exact `/gsl/index` clean URL as an index-only page.
- `docs/gsl/quiz/index.html` is the dedicated GSL quiz page.
- `docs/assets/data/gsl-quiz-batches.json` is the GSL question bank loaded by the page.
- `docs/assets/js/quiz.js` is the shared quiz renderer used by both the existing quiz page and the GSL page.
- `docs/gsl-console.html` is a direct-access redirect into the GSL index page.

## Question Schema

Each batch follows this shape:

```json
{
  "id": "gsl-foundations",
  "title": "GSL Foundations",
  "subtitle": "Multiple-choice practice",
  "questions": [
    {
      "id": "gsl-foundations-q1",
      "prompt": "Question text",
      "options": [
        { "key": "A", "text": "Option A" },
        { "key": "B", "text": "Option B" },
        { "key": "C", "text": "Option C" },
        { "key": "D", "text": "Option D" }
      ],
      "answer": "A",
      "citation": "Source note or explanation shown after revealing the answer key."
    }
  ]
}
```

## Content Notes

The current JSON is a valid starter bank so the page works immediately. Replace or extend it with source-backed GSL questions once the real GSL material is available.
