---
title: Auto Report
description: Create or modify an automatically generated report
---

# Auto reports

An auto report is a report that Dino builds for you from a form schema. You do not
write it yourself: you turn it on while editing the form schema, and Dino creates
the report schema and a first report for you.

Use an auto report when you want to see the data a form collects without designing a
report first. When you need full control over the layout, the calculations or the
charts, build the report with the [XLSReport format](xlsreport.md) instead.

## Turn on an auto report

1. Open the **Forms** section and select the form schema you want the report for.
2. Go to the **Settings** tab.
3. Set **Generate Report** to **Yes**.
4. Save the form schema.

Dino creates the report a few seconds after saving. You can find it in the
[Reports](index.md) section, listed like any other report.

## What Dino creates

Saving a form schema with **Generate Report** set to **Yes** produces two things:

| Item | Details |
|---|---|
| A report schema | Named after the form, with the label **&lt;form label&gt; Auto Report** and the same icon as the form. It stays linked to the form schema it was generated from. |
| A first report | Created a few seconds later, dated with the current day and attributed to you. It has no area, case, location, organization or project filter, so it covers all the data the form has collected. |

You can open the generated report and work with it like any other: the report it
produces is a starting point, not a fixed result.

## Turn off an auto report

Once an auto report exists, the **Generate Report** field on the form schema locks on
**Yes** and shows a hint saying so. There is no way to withdraw the report from that
screen.

To remove it, go to the **Reports** section and delete the generated report's schema
along with its data. The field on the form schema unlocks as soon as the report is
gone, and you can set it back to **No**.

## Related pages

- [Edit Form Schema](../forms/edit-form-schema.md) — where the **Generate Report**
  option lives
- [The XLSReport format](xlsreport.md) — for reports you design yourself
- [Reports](index.md) — the section where generated reports appear
