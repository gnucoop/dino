---
title: Reports
description: An overview of the Reports area in Dino — how to find report schemas and navigate to your reports.
---

# Reports

The Reports area is your hub for accessing all available report schemas. A report schema defines the structure and content of a report that can be generated from your collected data. From here, you can browse schemas and access the reports that have already been created for each one.

![Main view of the Reports page](../imgs/reports/index.png)

Report schemas are created from an Excel-based format called [XLSReport](xlsreport.md), or generated automatically from a form schema (see [Auto reports](autoreports.md)). To create one from a file, you first prepare an XLSReport file and then import it into Dino. For the full procedure, see [Edit Report Schema](edit-report-schema.md).

---

## Browsing Report Schemas

When you open the Reports page, you see a card for each report schema you have permission to access. Cards are sorted alphabetically by the schema's label.

To find a specific schema:

1. Use the **Filter** field at the top of the page.
2. Type any part of the schema's name or label.
3. The list filters as you type, showing only matching schemas.

To open a schema's reports, click anywhere on its card.

On each card you can edit, the icons along the top-right corner let you manage the schema directly:

- **Edit** (pencil icon) — opens the schema for editing. See [Edit Report Schema](edit-report-schema.md).
- **Delete** (trash icon) — removes the schema after you confirm. A schema that still has reports cannot be deleted: delete its reports first.

A fingerprint icon on a card means the report schema is *unique*: it can only produce one report for a given exact set of metrics. If you try to create a report that already exists for those metrics, Dino will not create a duplicate.

!!! tip "No Schemas Yet?"
    If you see the message "There are not any Reports currently available," no report schemas have been created yet or shared with you. Ask your Dino administrator to create one, or add one yourself if you have permission.

---

## Adding a New Report Schema

You can start creating a new report schema from the main Reports page.

1. Click the **+** button (*Add new Reports schema*) in the bottom-right corner of the screen. It is shown only if you are allowed to create report schemas.
2. Follow the steps described in [Edit Report Schema](edit-report-schema.md).

---

## Opening a Schema's Reports

Clicking a schema card takes you to the list of reports generated from that schema. From there you can:

1. Browse the existing reports in a table, with details such as the user who created the report, the report name, and the collected date range.
2. Filter and search the list to narrow down the reports you need. Use the keyword search, the date range fields, and the **Filters** button for more advanced conditions. You can also save a set of filters as a preset and apply it again later.
3. Open a report to review it: hover over its row and click the **View** (eye) icon, or select the row and click **View** in the action bar above the table. See [Edit Report](edit-report.md).
4. Delete a report you no longer need: select its row, then click **Delete** in the action bar.

To create a new report from the selected schema, click **Add New Report** above the table. Reports that use AI prompts consume DINO-AI Tokens. The number of tokens the report will use is shown next to the button, so you always know the cost before you start.

!!! warning "Not Enough Tokens"
    If you do not have enough DINO-AI Tokens in your account, Dino will not start the report and will show a message asking you to add more tokens. Add tokens to your account and try again.

---

## What You Can Do Next

From the Reports area, you can move on to these tasks:

* **[Edit Report](edit-report.md)** — Review a report and export it.
* **[Edit Report Schema](edit-report-schema.md)** — Create new report schemas or edit existing ones to define what appears in your reports. This typically requires administrator permissions.
* **[Aggregation](../aggregation/index.md)** — Browse the submissions of all your form schemas in a single list.
