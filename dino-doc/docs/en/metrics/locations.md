---
title: Locations
description: Manage geographic locations used across Dino metrics and forms.
---

# Locations

The **Locations** page lets you manage the geographic locations referenced by your forms, cases, and other metrics. You can add new locations, edit existing entries, import data in bulk, and export the current list.

![Main view of the Locations page](../imgs/metrics/locations.png)

## What you see

- **Breadcrumbs** – shows your current position in the navigation.
- **Search & Filters** – a keyword search field, and the **Filters** button to filter by creation date (**From date** / **To date**).
- **Items found counter** – shows how many locations match the current filters.
- **Table** – displays Location Name and Parent Location by default. Hidden columns (ID, Creation Date, Coordinates, Additional Attributes) can be shown via the **Columns** button, above the table on the right.
- **Pagination** – controls for navigating through pages.
- **Bulk actions** – select rows using checkboxes to delete multiple locations at once.
- **Toolbar buttons** – **Add new LOCATION** (plus icon) and **Import LOCATION** (cloud upload icon) sit above the table.

## Row actions

Hover over a row to show the **Edit** and **View** icons. Click the row to select and highlight it: the action bar above the table then shows every action:

- **Edit** – opens the location dialog to modify details.
- **Delete** – removes the location after confirmation.
- **View** – opens a read-only dialog showing all fields.

## Working with locations

### Add a new location

1. Click the **Add new LOCATION** button above the table.
2. In the dialog, fill in the required fields (for example, Location Name). Optional fields are marked *(optional)*.
3. Optionally set a Parent Location, Coordinates, and Additional Attributes.
4. Click **Save**.

### Edit a location

1. Hover over the row and click the **Edit** icon (pencil), or select the row and click **Edit** in the action bar.
2. Update the fields in the dialog.
3. Click **Save**.

### Delete a location

1. Click the row to select it, then click **Delete** in the action bar above the table.
2. Confirm the deletion in the prompt.

A location that is used by forms, or that has child locations, cannot be deleted; see [Metrics](index.md).

### Import locations from a file

1. Click the **Import LOCATION** button above the table.
2. Upload an `.xls`, `.xlsx` or `.csv` file.
3. Map the file's columns to location fields.
4. Click **Apply import** and review the result.

Locations whose name already exists are reused, not updated.

### Export the location list

1. Click **Export** in the toolbar.
2. Choose what to export: *Items in page* (the default), the items matching your filters, or *All items*.
3. Choose the format: *csv*, *xlsx* or *splitted xlsx*, then click **Export**.

!!! tip "Bulk deleting"
    Select multiple rows using the checkboxes, then click **Delete** in the action bar above the table to delete several locations at once.

### Location coordinates

If you set the **coordinates** attribute for a location, that information is used to visualize your form data on a [map](../forms/forms-map.md).

## Related pages

- [Metrics Overview](index.md) – return to the metrics home.
- [Cases](cases.md) – manage cases that reference locations.
- [Organizations](organizations.md) – manage organizations tied to locations.
- [Projects](projects.md) – view projects associated with locations.