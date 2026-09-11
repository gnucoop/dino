---
title: XLSReport
description: An overview of the Excel-based format used to create reports in Dino.
---

# The XLSReport Format

## What is XLSReport

XLSReport is a spreadsheet-based authoring format for building **DINO / AJF (Advanced JSON Forms) reports** without writing JSON or code by hand. A report author fills in an ordinary Excel workbook (`.xlsx`) following a set of conventions, and a converter (`xls-report.ts`, part of the AJF `reports` library) parses that workbook into an `AjfReport` JSON schema that the DINO platform can render as a live dashboard: tables, charts, KPI numbers, images, graphs, heatmaps, and more.

Two things make this possible:

- **Sheet-to-widget mapping** — each sheet in the workbook (with a few special exceptions) becomes one report widget. The order of the sheets in the workbook is the order the widgets are stacked in the rendered report.
- **A small formula DSL** ("indicator language") — cells don't hold literal values only; most of them hold short expressions (e.g. `SUM(D04, $persone, $tipo='corso')`) written in a compact, whitelisted mini-language. This DSL is parsed by `hindikit-parser.ts` and translated into JavaScript, which is then executed against the underlying form data at render/refresh time using a library of built-in functions (`expression-utils.ts`).

This means an XLSReport is really two things layered together: a **layout description** (which sheets produce which widgets, in which order) and a **computation description** (which formulas compute the numbers, arrays, and datasets those widgets display). Because the underlying data comes from DINO forms (submissions), any XLSReport formula ultimately reads from one or more form datasets and shapes them into whatever a widget needs (a single number, an array for a chart, or a table of rows).

XLSReport is platform- and project-agnostic: the same workbook conventions apply to any DINO instance and any set of forms — nothing in the format is specific to a particular organization or deployment.

## File structure

An XLSReport is a single `.xlsx` workbook. The converter iterates the workbook's sheets **in order** and decides what to do with each one by looking for a **keyword substring in the sheet name** (not an exact match) — e.g. a sheet named `table_activities` or `2_table` is both recognized as a "table" sheet because the name *contains* `table`.

### Sheet categories

| Sheet name contains | Role |
|---|---|
| `variables` (exact name) | Declares named variables/datasets used by later sheets. Does not produce a widget itself. |
| `filter` | Declares a filter form (ODK/XLSForm-style `survey` + `choices`) attached to the *next* sheet in the workbook. Does not produce a widget of its own. |
| `filter` **and** `global` | Same as above, but the resulting filter applies to the whole report instead of a single widget. |
| `choices` | A companion sheet holding choice lists (`list_name`, `name`, `label`), used together with `filter` sheets. |
| `table` | A `DynamicTable` or `PaginatedTable` widget. |
| `chart` | A `Chart` widget (bar, line, pie, etc.). |
| `image` | An `Image` widget. |
| `html` | A `Text` widget that renders raw HTML. |
| `graph` | A `Graph` (node/network) widget. |
| `heatmap` | A `HeatMap` widget. |
| `single` | One or more `Text` widgets forming a KPI/"big number" card. |
| `paginatedlist` | A `PaginatedList` widget (one row = a mini table widget). |
| `paginatedDialogList` | A `PaginatedList` widget whose rows open a detail dialog. |

Sheet names are free-form otherwise — use them to keep the workbook self-documenting (e.g. `table_beneficiaries_by_month`, `chart_gender_split`). Because matching is a substring check, avoid picking names that accidentally contain another keyword (e.g. don't name a chart sheet `charttable`).

### Row conventions inside a sheet

Every widget sheet is read as a normal spreadsheet-to-JSON conversion: **row 1 holds column headers**, and **row 2 onward holds data**, one JSON object per row keyed by the header text. Beyond that generic rule, each sheet type defines its own meaning for the header row and the first one or two data rows (documented per-widget in section 5).

### Overall layout

The whole workbook is wrapped into **one top-level layout containing one column**, and every non-special sheet contributes exactly one widget (or, for `single`, several) appended to that column in sheet order. In other words:

- The report is always a **single vertical stack of widgets** — there is no spreadsheet-level way to create side-by-side columns or nested containers; the only "nesting" that exists is generated internally by `paginatedlist` / `paginatedDialogList` (each row is itself a small table or dialog widget).
- A `filter`-named sheet attaches its filter to whichever widget sheet **immediately follows it**; a `global filter` sheet attaches to the report's outer container instead of a single widget.

### The universal escape hatch: `js:`

Any cell that is normally parsed through the formula DSL can instead start with `js:` — everything after that prefix is treated as **raw JavaScript** and passed through unparsed. This gives access to every function exported by the runtime utility library, not just the ones whitelisted in the DSL grammar (see section 4), and to arbitrary JS expressions (IIFEs, `Set`/`Map` usage, custom inline helper functions, etc.). Use it when a computation doesn't fit the DSL's function whitelist or argument shapes.

## Declaring variables

The `variables` sheet is where you load form data and precompute anything reused by multiple widgets later in the workbook (datasets, filters, indicator values, labels).

### Columns

| Column | Meaning |
|---|---|
| `name` | The variable's identifier. Must be a valid identifier (letters, digits, underscore, not starting with a digit) — invalid names are rejected. |
| `value` | An expression, parsed through the same formula DSL as every other cell (or `js:`-prefixed raw JavaScript). |
| `isAIPrompt` (optional) | Boolean; marks the variable as the result of an AI prompt rather than a plain formula, so it can later be read back with `PROMPT_RESULT`. |

Rows with an empty `name` are skipped. Variables are evaluated top-to-bottom, and **each variable can reference any variable declared above it** by its bare name (no `$` prefix — that prefix is reserved for form *fields*, see section 4).

### Loading form data

Two runtime lookups are always available:

- `forms['<form name>']` — the raw array of submissions for a given DINO form.
- `schemas['<form name>']` — the form's schema (used to resolve repeating-group structure and choice labels).

The exact form name string to use is the identifier DINO assigns to that form — obtain it from the DINO admin/forms configuration for your instance (it will typically match, but is not guaranteed to exactly match, the form's xlsform filename; check for spacing/casing/trailing-space differences).

The standard opening block of a `variables` sheet loads each form you need and turns it into a structured dataset:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` splits each flat submission into non-repeating top-level fields plus a `reps` object grouping repeating-group ("repeat"/slide) instances by their real group name (derived from the schema). Without a schema, it falls back to a generic heuristic. From this point on, `D01` is the dataset you filter, aggregate, and display.

### Scoping / filtering a dataset once, for every later use

A very common and recommended pattern is to **filter a dataset and reassign it to the same variable name**, so that every formula referencing that variable from that point onward automatically inherits the filter — instead of repeating the filter condition in every single formula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

This is especially important because **form datasets are frequently shared across more than one project, campaign, or scope on the same DINO instance** — never assume a `forms['...']` array is already scoped to just the data you care about. If your forms carry a project/scope field (its exact name depends on your instance's form design, e.g. something like `$project_name`), filter every dataset explicitly:

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

If a dataset has a repeating group whose individual instances need their own scoping (e.g. a "participants" repeat where a single collective record can include participants belonging to different scopes), filter at the per-instance level too, typically via `FLATTEN_REPS` combined with `FILTER_BY` on the flattened array, before pulling out the values you need with `ALL_VALUES_OF` (see section 4 for these functions). Always check the field actually holding a repeating instance's identifying/reference value — it may not hold what its name suggests (for example, a "participant" reference field inside a repeat may store the linked record's *display name* rather than its *code/id*; verify against real exported data before joining/deduplicating on it, and use the same key on both sides of any comparison).

### AI-prompt variables

If `isAIPrompt` is set on a variable row, its value represents the result of an AI-generated prompt rather than a plain computed formula. Elsewhere in the workbook you can retrieve that text with `PROMPT_RESULT(report_data, '<variable name>')` and interpolate it into an HTML or single-indicator widget.

## Overview of the formula DSL

Every non-`js:` cell is parsed by a small recursive-descent parser into a JavaScript expression, then evaluated against a data context at runtime.

### Core syntax

| Syntax | Meaning |
|---|---|
| `$fieldname` | A form field reference. Translated to `form.fieldname` (`form` is whatever record is in scope in that part of the expression). |
| `bareIdentifier` | A reference to a `variables`-sheet name, a function name, or a literal keyword. |
| `'text'` / `"text"` | String literal. |
| `123`, `1.5`, `1e3` | Number literal. |
| `[a, b, c]` | Array literal. |
| `func(arg1, arg2, ...)` | Function call — only whitelisted function names are accepted (see below); anything else must go through `js:`. |
| `=` | Equality (compiles to JS `==`). |
| `!=` | Inequality. |
| `+ - * /` , `< <= > >=` | Arithmetic / comparison, same meaning as in JavaScript. |
| `AND` / `OR` | Logical and/or (compile to `&&` / `\|\|`). |
| `!expr` | Logical not. |
| `(expr)` | Grouping. |
| `IF(cond, thenExpr, elseExpr)` | Ternary conditional — a built-in special form, not a regular function. |

Example:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Argument kinds

Because the DSL compiles to JavaScript but must know *how* to interpret each function argument, every whitelisted function has a fixed argument signature made of these kinds:

- **`arg`** — parsed as a normal expression and passed through as-is (so `$field` becomes `form.field`, i.e. the field's *value*).
- **`field`** — parsed as an expression; if it turns out to be a bare `$field` reference, it is converted into the **quoted field name string** instead of the field's value (e.g. `$age` → `'age'`), because the function expects to know *which field* to operate on, not a value.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — parsed as an expression (typically a boolean/relational condition written with `$field`), then wrapped into a JS arrow function with the stated parameter name(s), e.g. `$gender = 'male'` as a `func(form)` argument becomes `(form) => form.gender == 'male'`.
- A trailing `?` on an argument marks it **optional** — omit it and everything after it.

Knowing the argument kind tells you when to write `$field` (to reference a field's current value) versus when the same `$field` syntax is silently turned into a field-name string.

### Function reference

**Loading & shaping datasets**

| Function | Signature (kinds) | Description |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Splits flat submissions into top-level fields + `reps` (repeating-group instances), using the schema if given. |
| `FLATTEN_REPS` | `(arg, arg)` | Produces one output row per instance of a named repeating group, merging the parent's top-level fields with that instance's fields. |
| `FROM_REPS` | `(arg, func(form))` | Evaluates an expression once per repeating-group instance (across all given records), collecting non-null results into a flat array. |
| `APPLY` | `(arg, field, func(form))` | Returns a copy of the dataset with a new/derived field set on every record (and its reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Replaces raw choice values with their human-readable labels (from the schema) for the given list of field names, on every record and its reps. |
| `GET_LABELS` | `(arg, arg)` | Standalone lookup: maps an array of raw choice values to their labels using a schema. |
| `MAP` | `(arg, func(elem))` | Plain array map. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Zips two arrays index-by-index, combining each pair with a binary expression. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Left join of two datasets by matching a key field on each side. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Like `JOIN_FORMS`, but also joins each matched pair's repeating-group instances by a sub-key. |

**Filtering**

| Function | Signature | Description |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Returns a filtered copy of a dataset; keeps a record if it matches at top level, or keeps only the matching repeating-group instances if the match is at that level. |

**Counting & aggregation**

| Function | Signature | Description |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Counts records matching a condition, counting each record once even if the condition matches more than one of its repeating instances. |
| `COUNT_REPS` | `(arg, func(form)?)` | Counts every matching top-level record *and* every matching repeating instance separately — use for "number of occurrences" rather than "number of records". |
| `SUM` | `(arg, field, func(form)?)` | Sum of a numeric field across records and repeating instances, with an optional filter. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Standard aggregate statistics with an optional filter. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Collects every value a field takes across records and repeating instances matching an optional filter, **de-duplicated**. The standard tool for "distinct X count": wrap with `LEN(...)`. |
| `LEN` | `(arg)` | Length of an array. |
| `REMOVE_DUPLICATES` | `(arg)` | De-duplicates an array (by deep-equality identity), preserving order. |
| `INCLUDES` | `(arg, arg)` | Whether an array (or string) contains a value. |

**Dates**

| Function | Signature | Description |
|---|---|---|
| `TODAY` | `()` | Today's date, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | A date plus N days. |
| `DAYS_DIFF` | `(arg, arg)` | Whole-day difference between two dates. |
| `GET_AGE` | `(arg, arg?)` | Age in whole years given a date of birth (and an optional as-of date, default today). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Date comparisons. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Inclusive date-range check. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Buckets a date as before/within/after a range, with optional custom labels. |

**Numbers & formatting**

| Function | Signature | Description |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Rounds a number to N decimals (default 0). |
| `PERCENT` | `(arg, arg)` | `a/b` as a percentage string. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Percent change between a value and a reference value. |
| `CHART_TO_DATA` | `(arg, arg)` | Zips parallel label/value arrays into a single object. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | various | Render an array of rows/columns/records as an HTML `<table>` string, useful inside `html` widgets. |

**Selection**

| Function | Signature | Description |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Finds the earliest/latest record by a date field (default a standard "created at" field) and evaluates an expression against it. |

**AI / debugging**

| Function | Signature | Description |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Reads back the text produced by an `isAIPrompt` variable. |
| `CONSOLE_LOG` | `(arg)` | Logs a value to the console and returns it unchanged — handy for debugging a formula inline. |

**Deprecated (kept for backward compatibility; prefer the alternative shown)**

| Function | Prefer instead |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Beyond the whitelist**

The DSL only accepts the functions above (plus `IF`). The underlying runtime library exposes additional helper functions (statistical helpers like standard deviation, internal table/widget-dataset builders used by the converter itself, etc.) that are **not** reachable through plain formula syntax — only through the `js:` raw-JavaScript escape hatch described in section 2.4.

## Supported widgets and their properties

### `table` — dynamic table

Row 1: column header labels. Row 2: a short style code per column, `[colspan][alignment][sortable]`:
- First character: colspan (a digit, usually `1`).
- Second character: `l` = left, `r` = right, anything else = center.
- Third character: `s` = sortable column, omitted/anything else = not sortable.

From row 3 onward, the sheet behaves in one of two modes:

**A. Form-list table** (bound to a dataset) — used when a `dataset` column is present:

| Config column | Meaning |
|---|---|
| *(each header's own column)* | The field name to display in that column, pulled from each record of the dataset. |
| `dataset` | Name of the (array-valued) variable to iterate — typically a dataset built in `variables`. |
| `pagination` | Truthy → produces a paginated table instead of a plain one. |
| `dialog_fields` / `dialog_fields_labels` | Comma-separated extra field names / labels shown in a "read more" detail dialog per row. |
| `link_field` / `link_position` | Field to use as a link URL, and which column index should render it as a link. |

**B. Static / computed table** (no `dataset` column) — every remaining row is a literal output row, and every cell is itself a formula (or literal, or `js:` expression); wrap a literal string in quotes so it isn't mistaken for a bare variable reference (e.g. `"140"` for the text `140`, versus `my_indicator` to display a computed variable's value).

Header cells are styled centered, bold, white text on a solid background; body cells alternate row background colors automatically.

### `chart`

Row 1 only (except Scatter/Bubble, see below). Recognized option columns (removed from the row before the rest are treated as data series):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` must be one of: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (optional) — a formula producing the array of category/axis labels.
- Every other column header names one data series; its cell value is a formula producing that series' array of numbers.
- `Scatter` charts need exactly 2 data rows (X values, Y values); `Bubble` charts need exactly 3 (X, Y, radius); every other chart type needs exactly 1 data row.
- Colors are assigned automatically from a built-in palette (one color per series, or one per data point for pie/doughnut/polar-area).

### `image`

Row 1 only. Required: `url` (a formula producing the image URL, or a literal string; prefix with `js:` for a raw-JS expression). Optional: `align` (`left`/`center`/`right`), `width`, `height` (CSS length strings).

### `html`

Row 1 only, single column `html`, holding a raw HTML string (not parsed by the formula DSL). Supports `[[expression]]` double-bracket interpolation markers, which are evaluated and substituted at render time — use this to embed a computed variable's value inside otherwise-static markup.

### `single` — KPI / big-number card

Row 1 only:

| Column | Meaning |
|---|---|
| `html` (optional) | A heading shown above the number. |
| `current_value` | Required. The variable/expression whose value is shown as a large number (rendered via `[[current_value]]`). |
| `percentage_change` (optional) | If present, adds a trend indicator (up/down/flat arrow with color) based on its sign, shown as `[[percentage_change]]%`. |

Because the same cell text is reused both as an interpolated value and as a raw comparison expression, `current_value` / `percentage_change` should generally be plain variable names defined in the `variables` sheet, not full inline formulas.

### `graph`

Every row needs a non-empty `id` column. **Every** column in every row (aside from `id`) is parsed as a formula, producing one graph-node dataset per row.

### `heatmap`

Row 1 only, all columns optional with sensible defaults: `values` (a raw-JS/formula string producing the intensity data — not parsed through the bracket-DSL, must already be valid), `idProp` (default `'id'`), `features` (a GeoJSON string), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Row 1: a numeric column-width percentage per column. Row 2 (config row): per-column field name, plus `dataset`, `title`, `pageSize` (default 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (a raw style-object literal), `backgroundColorA`/`backgroundColorB` (zebra-stripe colors). Each resulting row is rendered as its own compact table widget rather than one big table.

### `paginatedDialogList`

Same configuration as `paginatedlist`, plus two additional rows (when present): dialog field **labels**, then dialog field **names** — clicking a row opens a popup listing those fields as label/value pairs.

### `filter` / `global filter`

Structured like an ODK/XLSForm `survey` sheet (with a companion `choices` sheet in the same workbook), converted into a form schema and attached as an interactive filter control:

- A sheet named with `filter` (but not `global`) attaches to the very next sheet's widget.
- A sheet named with both `filter` and `global` attaches to the whole report instead of a single widget.

## Quick checklist for building a new XLSReport

1. Identify the DINO form(s) you need and their exact form names/schemas on your instance.
2. Start a `variables` sheet: load each form with `forms[...]`/`schemas[...]`, build datasets with `BUILD_DATASET`, and apply any project/scope filters immediately (reassigning the same variable name).
3. Precompute anything reused by more than one widget as its own named variable.
4. Add one sheet per widget, named with the right keyword, in the order you want them to appear.
5. Prefer the DSL whitelist in section 4.3; drop into `js:` only when a computation doesn't fit it.
6. Double-check field names and choice values against the actual schema/exported data on your instance rather than assuming they match the source xlsform's field names exactly.
