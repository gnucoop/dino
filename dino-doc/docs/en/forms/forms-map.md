---
title: Forms Map
description: Visualize form submissions on an interactive map with filtering options.
---

# Forms Map

The Forms Map page displays your form submissions on an interactive map, allowing you to visualize data geographically. You can filter submissions by date and by specific data fields to focus on the information you need.

This page is only available if the location metric is active on the form schema. Moreover, each location must have its coordinates filled in.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

The page consists of two main areas:

*   **The Map**: An interactive map showing clustered markers for each submission. Each marker is placed based on the location data in the submission.
*   **The Filters Bar**: A set of controls at the top of the page to filter the data shown on the map.

At the top of the page, a counter shows how many pins are currently plotted and how many items were found by the active filters.

!!! tip "Switching views"
    Use the **Data**, **Map**, and **AI** buttons in the toolbar to move between the table, the map, and Datachat for the same form schema. The **Map** button is only enabled when the location metric is active.

## Viewing Submission Details

Each marker on the map represents one or more submissions at a specific location.

1.  Click on a marker to open its popup.
2.  The popup displays the location name followed by the values of the data columns you have displayed for this form.
3.  When several submissions share the same location, markers are grouped into a cluster. Click the cluster to zoom in until the individual markers appear.

## Filtering Submissions on the Map

Use the filters to narrow down which submissions appear on the map. Most of them are in the **Filters** dialog: click **Filters** in the toolbar to open it, set the filters in the **Simple** tab, then click **Search** to apply them.

### 1. Filter by Date Range

1.  In the **Filters** dialog, click the calendar icon of the **From date** field.
2.  Select a start date.
3.  Repeat for the **To date** field to set the end of the range.

### 2. Filter by Data Fields

Below the date fields, the **Simple** tab shows several input fields. Each field corresponds to a data column from your form (for example, "Point of care" or "Nationality"), and may also include status, user, location, area, case, organization, or project fields.

1.  Click into any field (for example, "Nationality").
2.  Start typing. A dropdown list shows matching values from your existing data.
3.  Select a value from the list, or type your own text to filter for submissions containing that text.
4.  To clear a filter, click the **X** icon that appears inside the field.

For fields that accept more than one value, you can tick several options in the dropdown before closing it.

!!! tip "Using Multiple Filters"
    You can apply filters across multiple fields at the same time. The map only shows submissions that match **all** the active filter criteria.

### 3. Use Advanced Filters

1.  Click **Filters** in the toolbar to open the filters dialog.
2.  Switch to the **Advanced** tab to build precise conditions, choosing the field, the operator, and the value, then click **Create Filter**.
3.  Use **All** or **Any** to decide whether submissions must match every condition or at least one.
4.  Click **Search** to apply your conditions, or **Reset filters** to start over.

Applied filters appear as chips below the toolbar. Click the **cancel** icon on a chip to remove that single filter.

### 4. Save and Reuse Filters

If you filter this form often, you can save your settings as a preset from the **Filters** dialog. The preset controls are not shown on small screens.

1.  Type a name in the **Pick a preset name** field.
2.  Click **Save** to store the current selection of filters.
3.  Later, choose the preset from the list and click **Apply** to restore it.

### 5. Export the Results

1.  Click **Export** in the toolbar.
2.  Choose the export format and the columns you want to include.
3.  Confirm to download a file containing the currently filtered submissions.

!!! warning "Location Data Required"
    Submissions can only appear on the map if they have valid geographic coordinates associated with their location. Submissions without this data are not displayed, and are not counted among the plotted pins.

## Related Pages

*   [Forms](index.md)
*   [Edit Form Schema](edit-form-schema.md)
*   [Locations](../metrics/locations.md)
*   [Import Data](import.md)