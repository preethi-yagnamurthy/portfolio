# GSL PDF Indexer README

This documents the reproducible raw-extraction pipeline for `cpa - gsl.pdf`.

## Files Created

- `gsl_pdf_indexer.py`: reusable PyMuPDF + openpyxl extraction script.
- `gsl_pdf_extraction_master.xlsx`: workbook containing raw extraction sheets and classified index sheets.
- `gsl_pdf_extraction_master.csv`: flat CSV version of the classified master index.

## How To Run

From `/Users/nuppalap/Desktop/quiz`:

```bash
python3 gsl_pdf_indexer.py
```

Optional test run:

```bash
python3 gsl_pdf_indexer.py --max-pages 20 --output-xlsx tmp/gsl_pdf_extraction_test.xlsx --output-csv tmp/gsl_pdf_extraction_test.csv
```

## Extraction Logic

The script uses PyMuPDF as the raw extraction layer. It reads each PDF page as:

- blocks
- lines
- spans

A span is the smallest text unit with shared font properties. The script keeps both span-level and line-level data so every classified row can be traced back to its source.

The current classifier treats PyMuPDF output as a draft extraction, not as a final semantic index. It filters structural labels such as `PREVIEW`, `REVIEW`, `REFERENCES`, `APPENDIX A/B`, `INDEX`, and standalone `TABLE`/`FIGURE` markers out of the heading sheets. It also merges adjacent heading lines when the PDF splits one heading across multiple visual lines.

## Calibration

The script estimates the dominant body font size from the PDF itself instead of hardcoding a universal threshold. In the current run, the estimated body size is `10.0pt`.

This matters because table text, body text, and headings use different font families and sizes in the CPA PDF.

## Workbook Sheets

- `README`: run profile and extraction caveats.
- `Classified_Master`: relational master index containing all classified rows.
- `Raw_Lines`: all extracted text lines with font, size, coordinates, PDF page, book page, and module.
- `Raw_Spans`: all extracted font spans with bold/italic detection.
- `Headings_All`: all heading candidates.
- `Section_Headings`: section/subheading candidates.
- `Table_Headings`: table labels and captions.
- `Figure_Headings`: figure labels and captions.
- `Styled_Text`: bold, italic, and bold-italic spans.
- `Citations`: in-text author-year citations detected by regex.
- `Reference_Authors`: author strings detected in reference sections.
- `Authors_Index`: grouped author-name index with occurrences, years, and pages.

## Current Full Run Counts

- PDF pages processed: 599
- Raw lines: 38,967
- Raw spans: 43,943
- Classified rows: 11,598
- Headings: 2,995
- Tables: 100
- Figures: 127
- Styled text: 7,792
- Citations: 82
- Reference authors: 502
- Author index rows: 568

## Caveats

- This is still an extraction/classification layer, not a perfect final study index.
- Table and figure heading detection is strong because the CPA PDF uses clear `TABLE X.X` and `FIGURE X.X` labels.
- Heading detection is intentionally broad and includes low-confidence subheading candidates.
- Styled-text extraction is font/layout based and should be reviewed before exam reliance.
- Citation extraction is conservative; it captures explicit author-year patterns and may not capture every narrative author mention.
- Reference-author extraction is restricted to detected `REFERENCES` sections to avoid broad false positives.

## Recommended Workflow

1. Use `Raw_Lines` and `Raw_Spans` for audit/debugging.
2. Use `Classified_Master` for relational filtering.
3. Use the specific sub-sheets for review and cleanup.
4. Promote reviewed rows into the exam-facing workbook/web index only after checking quality.
