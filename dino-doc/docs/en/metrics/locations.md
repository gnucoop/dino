---
title: Locations
description: Manage geographic locations used across Dino metrics and forms.
---

# Locations

The **Locations** page lets you manage the geographic locations referenced by your forms, cases, and other metrics. You can add new locations, edit existing entries, import data in bulk, and export the current list.

![Main view of the Locations page](../imgs/metrics/locations.png)

## What you see

- **Breadcrumbs** – shows your current position in the navigation.
- **Search & Filters** – keyword search, date range picker, and configurable advanced filters (e.g., by metric, status, user). You can also save and load filter presets.
- **Table** – displays Location Name and Parent Location by default. Hidden columns (ID, Creation Date, Coordinates, Additional Attributes) can be shown via the **Customize columns** button (bottom right of the table header).
- **Pagination** – controls for navigating through pages.
- **Bulk actions** – select rows using checkboxes to delete or edit multiple locations at once.
- **Floating action buttons** – **Add New** (plus icon) and **Import** (cloud upload icon) remain available as you scroll.

## Row actions

Each row has three quick actions (visible when hovering over the row):

- **Edit** – opens the location dialog to modify details.
- **Delete** – removes the location after confirmation.
- **View** – opens a read‑only dialog showing all fields.

Clicking a row selects it (highlights) and, if the list is expandable, reveals a detail panel with additional data.

## Working with locations

### Add a new location

1. Click the **Add New** floating button (bottom‑right corner).
2. In the dialog, fill in the required fields (e.g., Location Name).
3. Optionally set a Parent Location, Coordinates, and Additional Attributes.
4. Click **Save**.

### Edit a location

1. Click the **Edit** icon (pencil) on the desired row.
2. Update the fields in the dialog.
3. Click **Save**.

### Delete a location

1. Click the **Delete** icon (trash) on the row.
2. Confirm deletion in the prompt.

### Import locations from a file

1. Click the **Import** floating button (cloud upload icon).
2. Select a CSV or Excel file following the expected format.
3. Map columns to location fields if needed.
4. Click **Import**.

!!! tip "Bulk editing"
    Select multiple rows using checkboxes, then click the **Edit** button (edit_note icon) that appears above the table to update several locations at once.

### Export the location list

1. Click the **Export** button (cloud download icon) in the filters bar.
2. Choose the export format (CSV or Excel).
3. The file downloads automatically.

## Related pages

- [Metrics Overview](index.md) – return to the metrics home.
- [Cases](cases.md) – manage cases that reference locations.
- [Organizations](organizations.md) – manage organizations tied to locations.
- [Projects](projects.md) – view projects associated with locations.

!!! warning "Deleting a location"
    Deleting a location may affect forms and cases that reference it. Ensure no active records rely on the location before removing it.