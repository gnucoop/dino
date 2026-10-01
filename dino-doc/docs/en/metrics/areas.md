---
title: Managing Metric Values – Thematic Areas
description: Learn how to view, add, edit, delete, and search thematic areas in Dino's metric management section.
---

# Managing Metric Values – Thematic Areas

The **Thematic Areas** page (accessible from the Metrics section) lets you organize your metric data by hierarchical categories. Here you can view, create, edit, and delete thematic areas, as well as filter and export the list.

![Main view of the Thematic Areas page](../imgs/metrics/areas.png)

## What You See

- **Breadcrumbs** at the top show your current location in the application (e.g., **Metrics > Thematic Areas**).
- The main table lists all thematic areas, displaying columns such as **Area Name**, **Parent Area**, and (if configured) other attributes. You can customize the visible columns by clicking the **Columns** button above the table.
- A **search by keyword** field and the **Filters** button let you find areas by name or by creation date.
- The **Export** button (cloud_download) allows you to download the current list as a file.
- Two toolbar buttons are available:
    - **Add new AREA** – creates a new thematic area.
    - **Import AREA** – opens the import page, where you upload an `.xls`, `.xlsx` or `.csv` file, map its columns and review the result. Areas whose name already exists are reused, not updated.

## Working with Thematic Areas

### Adding a New Thematic Area

1. Click the **Add new AREA** button in the toolbar.
2. In the dialog that opens, fill in the **Area Name** and, if needed, the **Parent Area** and any additional attributes. Optional fields are marked *(optional)*.
3. Click **Save** to create the new area.

!!! tip "Parent Area"
    To create a sub‑area, start typing in the **Parent Area** field and pick the parent from the suggestions. If left blank, the new area becomes a top‑level entry.

### Editing an Existing Area

1. Find the area you want to change in the table.
2. Hover over its row and click the **edit** icon (pencil), or click the row to select it and click **Edit** in the action bar above the table.
3. Modify the fields in the dialog and click **Save**.

![Edit dialog for modifying a metric value](../imgs/metrics/areas-edit.png)

### Viewing Details

- Hover over a row and click the **visibility** (eye) icon, or select the row and click **View** in the action bar, to open a read‑only dialog showing all fields of the area.

### Deleting an Area

1. Click the area's row to select it, then click **Delete** in the action bar above the table.
2. Confirm the deletion in the dialog that appears.

!!! warning "Delete Considerations"
    An area that is used by forms, or that has child areas, cannot be deleted. If only reports use it, Dino warns you and lets you confirm. User groups that grant the area are not checked: remove it from them first. See [Metrics](index.md).

## Searching and Filtering

- Use the **keyword search** field above the list to filter areas by name.
- Click **Filters** to set a **From date** and a **To date**, which filter by creation date, then click **Search**.
- Applied filters appear as chips below the toolbar; click the **cancel** icon on a chip to remove it.

## Exporting the List

1. Click the **Export** button in the toolbar.
2. Choose what to export: *Items in page* (the default), the items matching your filters, or *All items*.
3. Choose the format: *csv*, *xlsx* or *splitted xlsx*, then click **Export**.

## Bulk Actions

To perform actions on multiple areas at once, select the checkboxes next to the rows. When one row is selected, its individual actions appear in the action bar above the table; when several rows are selected, the bar offers the bulk actions. The Thematic Areas screen currently supports **bulk delete** only.

## Navigating with Breadcrumbs

The breadcrumbs show your current location (e.g., **Metrics > Thematic Areas**). Click any breadcrumb link to jump to a higher level.

## Related Pages

- [Metrics Overview](index.md)
- [Managing Metric Values – Cases](cases.md)
- [Managing Metric Values – Locations](locations.md)
- [Managing Metric Values – Organizations](organizations.md)
- [Managing Metric Values – Projects](projects.md)
- [Users and Groups](../administration/users.md)