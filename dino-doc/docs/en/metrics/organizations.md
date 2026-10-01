---
title: Organizations
description: Manage organizations in Dino – view, add, edit, delete, and import organizations.
---

# Organizations

The **Organizations** page lists all possible values of the organization metric. Organizations can be your project partners or any entity involved in your activities. Use this screen to view, add, edit, delete, and import organizations, and to manage the organizational hierarchy.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Table Columns

By default, the table shows the following columns:

- **Organization Name** – the name of the organization. This column is sortable.
- **Parent Organization** – the name of the parent organization, if any.

Additional columns (ID, Creation Date, Logo path, Website url, Additional Attributes) are hidden by default. Use the **Columns** button, above the table on the right, to show or hide them.

## Row Actions

Hover over a row to show the **View** and **Edit** icons. Click the row to select it: the action bar above the table then shows every action:

- **View** (visibility icon) – opens a read-only dialog with the organization details.
- **Edit** (pencil icon) – opens a dialog to change the organization's details.
- **Delete** (trash icon) – permanently deletes the organization. A confirmation dialog appears first.

!!! warning "Delete organizations with care"
    Deleting an organization cannot be undone. An organization that is used by forms, or that has child organizations, cannot be deleted; see [Metrics](index.md).

## Bulk Actions

Select one or more rows using the checkboxes in the first column. A toolbar appears above the table with the actions you can apply:

- With one row selected, you can view, edit, or delete that organization.
- With several rows selected, you can delete them all at once.

## Search and Filters

The filter bar at the top of the page offers:

- **Keyword search** – filter organizations by any text.
- **Filters** – open the filters dialog to narrow the list by creation date (**From date** / **To date**).
- **Export** – download the list as a file.

Applied filters appear as chips below the filter bar. Click the cancel icon on a chip to remove that filter.

## Adding and Importing Organizations

Two buttons are available in the toolbar above the table:

- **Add new ORGANIZATION** (plus icon) – opens a dialog to create a new organization.
- **Import ORGANIZATION** (cloud upload icon) – upload a file to bulk import organizations.

!!! tip "Organizational hierarchy"
    Set a **Parent Organization** when creating an organization to build a hierarchy of related entities.

## Steps: Create a New Organization

1. Click the **Add new ORGANIZATION** button in the toolbar.
2. In the dialog that opens, fill in the required fields, starting with the Organization Name. Optional fields are marked *(optional)*.
3. Optionally set a **Parent Organization** to place the new organization in a hierarchy.
4. Optionally add a logo path, website URL, and any additional attributes.
5. Click **Save**. The new organization appears immediately in the list.

## Steps: Import Organizations

1. Click the **Import ORGANIZATION** button in the toolbar.
2. Upload an `.xls`, `.xlsx` or `.csv` file and map its columns to the organization attributes.
3. Click **Apply import** and review the result. Organizations whose name already exists are reused, not updated.

## Steps: Export Organizations

1. Apply any filters you need.
2. Click the **Export** button in the toolbar.
3. Choose what to export: *Items in page* (the default), the items matching your filters, or *All items*.
4. Choose the format: *csv*, *xlsx* or *splitted xlsx*, then click **Export**.

## Related Pages

- [Metrics Overview](index.md) – all metric management pages.
- [Thematic Areas](areas.md) – manage thematic areas for organizations.
- [Cases](cases.md) – associate cases with organizations.
- [Locations](locations.md) – link locations to organizations.
- [Projects](projects.md) – connect organizations to projects.