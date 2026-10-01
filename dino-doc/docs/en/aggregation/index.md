---
title: Aggregation
description: View, filter, and manage all form submissions across your form schemas from a single page.
---

# Aggregation

The Aggregation page gives you a centralized view of all form submissions across your form schemas. Instead of opening each form individually, you can browse every submission in one table, narrow it down with filters, and take actions such as viewing, editing, printing, or deleting.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Viewing the Aggregation List

The table displays one row per submission. By default you see the **Form Schema** and **Status** columns; use the **Columns** button above the table, on the right, to choose which columns are displayed.

- Each row shows a status icon. If a submission has validation issues, a warning icon appears on the row.
- Hover over a row to show the **View** and **Edit** icons; click anywhere on a row to select it and reveal all available actions.
- The **Items found** counter and the paginator at the top of the page tell you how many submissions exist and let you move between pages.

If you do not apply any filter, the list shows every submission you are allowed to see, based on your user permissions.

## Filtering and Searching

1. Type in the **search by keyword** field in the toolbar to search across the submissions.
2. Click **Filters** in the toolbar to open the filter panel.
3. Pick a **From date** and a **To date** to filter by creation date.
4. Fill in any of the additional filters: **Area**, **Case**, **Case code**, **Location**, **Organization**, **Project**, **Form Status**, and **User**. The values offered depend on the metrics configured in your Dino.
5. Click **Search** to apply your filters, or **Reset filters** to clear them.

Active filters appear as chips below the toolbar. Click the **cancel** icon on a chip to remove that filter.

!!! tip "No saved presets"
    The Aggregation page does not support saved filter presets or advanced filter conditions. You combine the filters each time you need a custom view; removing a chip is the quickest way to loosen an existing search.

## Row Actions

Hover over a row to show the **View** (eye) and **Edit** (pencil) icons. To see every action, click the row to select it: the action bar above the table then shows a button for each action you are allowed to use.

| Action | Description |
|--------|-------------|
| **View** | Open the submission in read-only mode. |
| **Edit** | Modify the submission data. |
| **Print** | Generate a PDF of the submission. |
| **Delete** | Remove the submission. |

**Print** and **Delete** ask for confirmation (*Do you want to print the selected items?*, **Yes** / **No**) before executing.

## Creating a New Submission

The **Add New form** button in the toolbar lets you start a new submission. It is shown only if creating submissions from the Aggregation page is enabled for your Dino instance.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Click **Add New form**. The **Create Form** dialog opens, listing the available form schemas.
2. Select the form schema you want to use.
3. Click **Create Form**. You are taken to the [Edit Form](../forms/edit-form.md) page, where you fill in and save the data.

## Printing a PDF

You can generate a PDF of any submission. The PDF includes the form schema label, the active metric names, and the data that was filled in.

1. Click the row you want to print to select it, then click **Print** in the action bar.
2. Confirm with **Yes**.
3. The PDF opens in a new browser tab or downloads automatically.

The PDF header includes the form schema title and all metric names currently active in the system.

!!! warning "Metric availability"
    The PDF includes only the metrics that are active at the moment you trigger the print. A metric added after the submission was created will not appear.

## Related Pages

- [Forms](../forms/index.md) — manage the form schemas behind your submissions.
- [Edit Form](../forms/edit-form.md) — fill in and update submission data.
- [Import Data](../forms/import.md) — bring submissions into Dino in bulk.
- [Metrics](../metrics/index.md) — configure the metrics that drive filters and printed output.
