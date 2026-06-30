---
title: Forms
description: Manage structured data collection with forms, view and edit submissions, filter, export, and import data.
---
# Forms

The **Forms** page is your central hub for all structured data collection in Dino. Here you can manage form schemas, view and edit submissions, and perform bulk actions on your data.

![Main view of the Forms page](../imgs/forms/index.png)

## Form Schema Grid

When you first open the Forms page, you see a grid of all available form schemas. Each tile displays the schema name and icon. Hover over a tile to reveal action buttons:

- **Edit Schema** — Opens the schema editor to modify the form’s structure.
- **Delete Schema** — Removes the schema and all its submissions.
- **Share Public Url** — Generates a public link to the schema for external data collection.
- **View Map** — Opens the [Forms Map](forms-map.md) showing geolocated submissions.
- **Chat with your data** — Launches [DataChat](datachat.md) to ask questions about submissions.

Click a tile to open the list of submissions for that schema.

!!! tip "Use the filter bar"
    At the top of the page you can filter schemas by keyword. The grid updates automatically.

## Submission List

After selecting a form schema, you are taken to a detailed list view. This table shows all submissions (entries) for that schema. Each row displays key fields, including the status (if defined) and any custom metrics.

![Submission list for a form schema](../imgs/forms/index-list.png)

From this list you can:

- **Add a new submission** — Click the floating **+** button (bottom right) to open a blank form.
- **Edit an existing submission** — Click the row’s **edit** icon.
- **View submission details** — Click the **view** icon.
- **Delete a submission** — Click the **delete** icon.
- **Print or download** a PDF or DOCX of the submission.
- **Print a badge** (if the case metric is active).
- **Expand a row** to see nested details (if configured).

### Filtering and Searching

Use the expandable filter panel at the top of the list:

- **Keyword search** — Find submissions by any text.
- **Date range** — Filter by creation date.
- **Metric filters** — Narrow down by location, project, area, case, organization, or other custom metrics.
- **Status filter** — Filter by form status (e.g., Approved, Pending).
- **User filter** — Show only submissions created by a specific user.

You can save and reload filter presets using the **preset manager**.

### Bulk Actions

Select multiple rows using the checkboxes. Then perform bulk operations:

- **Delete** — Remove selected submissions.
- **Bulk edit** — Modify a field across all selected submissions.

### Export and Import

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

Click the **export** button (cloud download icon) to open the export dialog. Choose between CSV or XLSX format and download all filtered submissions.

![Import dialog for uploading multiple submissions from a file](../imgs/forms/index-import.png)

If an **import** button (cloud upload icon) appears, you can upload a file (CSV or XLSX) to add multiple submissions at once.

!!! warning "Permissions"
    Some actions (edit schema, delete, export, import) are only available if you have the required permissions. Contact your administrator to request access.

## Related Pages

- [Edit Form Schema](edit-form-schema.md) — Customize a form’s structure.
- [Forms Map](forms-map.md) — View geolocated submissions on a map.
- [DataChat](datachat.md) — Ask questions about your form data.
- [Edit Form](edit-form.md) — Fill out or modify a single submission.
- [Reports](../reports/index.md) — Create summaries and visualizations from your data.
