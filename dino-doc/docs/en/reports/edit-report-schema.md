---
title: Edit Report Schema
description: Create or modify a report schema by importing an XLSReport file, then check it in the preview before saving.
---

# Edit Report Schema

The **Edit Report Schema** page allows you to create a new report schema or modify an existing one. A report schema defines the structure, layout, and data sources for a report in Dino. Its content comes from an [XLSReport](xlsreport.md) file that you import on this page.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

## Page fields

| Field | Description |
|-------|-------------|
| **Report Name** | Required. Must be unique: if it is already in use, the page shows *This name is already being used.* |
| **Report Label** | Required. The name displayed in lists and cards. |
| **Icon Set** | **Default** or **Humanitarian**. |
| **Icon Identifier** | Pick an icon from the autocomplete list. The preview updates live. |
| **Required Metrics** | The metrics that must be chosen when a report is generated from this schema. |

Below the fields, the page shows:

- **Associated Form Schemas** – the form schemas the report uses, read-only. They are taken from the imported XLSReport file when you save.
- **Report Preview** – the report rendered from the imported or saved schema.

Data sources, columns and filters are all defined in the XLSReport file: the page has no controls to choose them.

## Creating a New Report Schema

1. Open the **Reports** section in the main menu.
2. Click the **+** button (*Add new Reports schema*) in the bottom-right corner.
3. Enter the **Report Name** and **Report Label**, and optionally the icon and the **Required Metrics**.
4. Click **Import**, then **Choose file** and select your XLSReport file (.xls or .xlsx).
5. Click **Apply**: the file is loaded into the page and shown in the **Report Preview**.
6. Click **Save** to store the schema. **Save** stays disabled until the required fields are valid.

!!! warning "Import before saving"
    A new report schema cannot be saved without an imported file: saving it empty shows *Oops! Something went wrong saving the Report*. **Apply** only loads the file into the page; nothing is stored until you click **Save**.

## Editing an Existing Report Schema

1. Open the **Reports** section.
2. On the report schema's card, click the pencil icon (*Edit Report Schema*).
3. Change the fields, or import a new XLSReport file to replace the report's content.
4. Click **Save** to update the schema.

To delete a report schema, click the bin icon (*Delete Report Schema*) on its card. A schema that still has reports cannot be deleted: delete its reports first.

## Next Steps

After saving your report schema, you can:

* Navigate to the [Reports](index.md) page to view and run your new report.
* Use [Edit Report](edit-report.md) to work with the report itself once the schema is in place.
* Return to this page to make further adjustments as needed.
