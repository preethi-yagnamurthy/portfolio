# Excel Layout Generalization Guidance

Purpose:
- This file captures how to generalize the currently hard-coded worksheet row anchors once the actual Excel workbooks are available in project context.
- The current Mermaid graph still contains some temporary observed layout anchors, such as the exits area beginning near row 5 and extending through about row 389.
- Those anchors should be treated as provisional observations, not permanent automation rules.

## Generalization Principles

- Prefer structural discovery over fixed row numbers.
- Use worksheet content, formatting, headers, named regions, formulas, and contiguous populated blocks to detect placement zones.
- Preserve existing business-owned content unless the workflow explicitly says a region is safe to replace.
- When a section is append-only, determine the next available row dynamically from the last populated row in that section.
- When one section must be placed after another, compute the second section's start row relative to the first section's actual end row instead of relying on a preselected row number.

## Roster Mapping Generalization

Current temporary assumptions:
- The yellow exits processing area begins around row 5.
- The currently populated exits data extends through about row 389.
- The remaining roster rows are placed after the exits area with four to five blank spacer rows.

Future generalized workflow:
1. Open the `Roster Mapping for Group Lead` workbook and inspect the `Roster` worksheet or relevant worksheet where exits are stored.
2. Detect the exits processing area using layout cues rather than row numbers. Possible cues:
- yellow background fill
- section title or heading text
- the first populated row of the existing exits block
- a contiguous block of exit-shaped records
3. Determine the last populated row of the existing exits block.
4. Append new exit rows after that last populated row.
5. Leave four to five blank spacer rows after the final appended exit row.
6. Use the next row after that spacer as the dynamic start row for the remaining non-exit roster rows.
7. Preserve formula columns such as `Column N` by copying only allowed source columns or writing into non-formula columns only.

Recommended implementation rule:
- Compute `remaining_roster_start_row = last_exit_row_after_append + spacer_row_count + 1`
- Where `spacer_row_count` is configurable and defaults to `4` or `5` depending on the workbook layout observed at runtime.

## Exit Section Generalization

Current temporary assumptions:
- Exit rows are visually identified by red font.
- The exits area is the yellow-highlighted top section.

Future generalized workflow:
1. Detect exit rows in `Employee Roster March 26` by formatting-aware inspection, not by fixed bottom-row ranges.
2. Detect the destination exits area in the Group Lead mapping workbook by formatting or headings, not by fixed rows.
3. Confirm whether existing exit records should be de-duplicated before append, using business keys such as Login, Employee ID, or a workbook-specific unique identifier once the actual files are known.
4. Append only genuinely new exit rows unless the business later specifies a full refresh strategy.

## Level Column Generalization

Current temporary assumptions:
- `Level Jan` through `Level December` live in output columns `Z:AK`.
- `Level March` is updated from the current Employee Roster workbook.

Future generalized workflow:
1. Detect the level columns by header names instead of relying only on fixed column letters.
2. Map the active run month to the correct target level column dynamically.
3. For March 2026, the active month column is `Level March`.
4. For a future month, use that month's corresponding level column while still carrying forward prior-month values as required by the business rule for that run.
5. Normalize incoming level values by parsing the source string and keeping only the suffix-style category, such as `L1`, `L2`, `Intern`, or `Contractor`.

Recommended implementation rule:
- Build a header-to-column-index map from the `FTE Data` worksheet.
- Resolve `Level Jan`, `Level Feb`, and the active run month header from that map at runtime.

## Client Comparison Range Generalization

Current temporary assumption:
- Only columns `AT:DK` may be updated in `CMP H by Client`.

Future generalized workflow:
1. Verify whether `AT:DK` is a stable business-controlled range or just the current layout.
2. If the workbook reveals stable header boundaries for the imported section, prefer resolving the destination range by header markers.
3. Keep the current `AT:DK` restriction until the actual workbook proves a safer generalized rule.

## Validation Rules Once Workbooks Are Available

- Detect and preserve pivot tables by inspecting worksheet objects or protected regions.
- Detect and preserve formula cells in protected columns or regions before writing.
- Validate that only the intended worksheets and target regions changed.
- Record discovered anchors in a machine-readable config file so the workflow does not have to rediscover stable layout facts on every run.

## Future Revision Trigger

Revise the Mermaid graph and execution-order spec when these become available:
- the actual Excel workbooks
- actual worksheet names where ambiguities remain
- confirmed column mappings for source-to-destination writes
- confirmed unique keys for de-duplication of exit rows
- confirmed rules for month-to-column mapping in `FTE Data`
