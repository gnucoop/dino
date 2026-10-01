---
title: Edit Report
description: Learn how to create a report from a report schema in Dino, open a saved report, and export the results.
---

# Edit Report

A report is generated from a [report schema](edit-report-schema.md): it applies the schema to the submissions that match the metrics and the dates you choose. This page explains how to create a new report and how to open and export a saved one.

![A saved report opened on its Report Metrics step](../imgs/reports/edit-report.png)

## Creating a Report

1. Go to the [Reports](index.md) page and click the card of the report schema you want to use. The list of its reports opens.
2. Click **Add New Report** above the table. If the report uses AI prompts, the number of DINO-AI tokens it will consume is shown on the button.
3. If your Dino uses metrics, the page opens on the **Report Metrics** step:
    1. Check the **Creation Date**, and click **Change** to pick another one if needed.
    2. Optionally pick a **Form Status**, among the form statuses you are allowed to use. The field is shown only when there are any.
    3. Choose the metric values the report is about, such as a location or a project. The metrics marked with an asterisk (*) are required by the report schema; the others are optional and narrow the data further. If a value you need does not exist yet, click **New** next to its field to create it, when you are allowed to.
    4. Click **Continue**.
4. In the **Report Data** step:
    1. Enter the **Report Name**. It is required.
    2. Optionally set **Collected Since** and **Collected Until**: only the submissions created within that range are included in the report. You can set only one of the two, or neither, in which case no date filter is applied.
5. Click the **Save report** button at the bottom right. It is enabled once the required metrics and the name are filled in.

Dino confirms that the document was created and takes you back to the list of reports, where the new report appears.

!!! warning "Reports with AI prompts"
    Creating a report that uses AI prompts consumes DINO-AI tokens. If you do not have enough, Dino does not create the report and asks you to add more tokens.

!!! tip "Metric values cannot be changed later"
    The metrics, the status and the date range are fixed when the report is created. To see the same schema applied to other values, create another report.

## Opening a Saved Report

1. Go to the [Reports](index.md) page and click the card of the report schema.
2. In the list of reports, hover over the report's row and click the **View** (eye) icon, or click the row to select it and click **View** in the action bar above the table.

If your Dino uses metrics, the report opens on the **Report Metrics** step, which shows the values the report was created with. They cannot be changed here. Click **View the Report** to move to the **Report Data** step, where the report is displayed.

While the report is loading, Dino shows a spinner. A report that uses AI prompts shows a progress bar instead, with the message *Generating report prompt X of Y*. If no submission matches the report, the page shows *No Forms were found for this Report*.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Reading the Report

The top of the **Report Data** step shows the title of the report schema, the **Collected Since** and **Collected Until** dates when the report has them, and the metric values it was created with. The report itself follows, as designed in its [XLSReport](xlsreport.md) file: tables, charts and text.

If the report contains filter widgets, you can use them to narrow the data shown, without changing the saved report.

## Exporting a Report

Next to **Export as:**, at the top of the **Report Data** step, choose a format:

* **pdf portrait** / **pdf landscape** — a PDF document in the chosen orientation.
* **docx portrait** / **docx landscape** — a Word document in the chosen orientation.
* **xlsx** — an Excel file with the report data.

!!! note "Where the export buttons are"
    The export buttons belong to the **Report Data** step. When your Dino has no active metrics, and on the [Dashboard](../dashboard/index.md), the report is shown directly, without the steps and without the export buttons.

## Related Pages

* [Reports](index.md) — browse report schemas and their reports.
* [Edit Report Schema](edit-report-schema.md) — create or change the schema a report is generated from.
* [Auto reports](autoreports.md) — reports generated automatically from a form schema.
