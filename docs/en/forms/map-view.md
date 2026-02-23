---
title: Exploring Data on a Map
description: How to use the map view to visualize and filter form submissions geographically.
---

# Exploring Data on a Map

The Map View shows all submissions for a form on an interactive map. Submissions are displayed as markers, which are grouped into clusters when many points are close together. You can use the filters on the left to narrow down the data displayed.

![Exploring Data on a Map](../imgs/forms/map-view.png)

## Using the Map

1.  **Navigate the Map**:
    *   **Pan**: Click and drag the map to move it.
    *   **Zoom**: Use the scroll wheel on your mouse or the `+` (zoom in) and `-` (zoom out) buttons in the bottom-right corner of the map.
2.  **View Submission Details**:
    *   **Click on a cluster** to zoom in and break it into individual markers.
    *   **Click on a single marker** to open a popup with details for that specific submission, such as the location and key data from the form.

!!! tip "Finding Your Data"
    When you first open the map, it will automatically zoom and center to show all available submissions for the current form.

## Filtering Submissions on the Map

A filter panel on the left side allows you to narrow down which submissions are shown on the map.

1.  **Set a Date Range**:
    *   Use the **Date range** picker to select a start ("From date") and end ("To date"). Only submissions created within this period will be displayed.

2.  **Filter by Form Data**:
    *   Additional filter fields (like Area, Case, Organization, or Project) appear based on the form's schema and the data collected.
    *   Click into a filter field to see an autocomplete list of all values that exist for that field in your data.
    *   Start typing to narrow the list, or select a specific value from the dropdown.

3.  **Apply Your Filters**:
    *   After setting your date range and any other filters, click the **Apply Filters** button.
    *   The map will refresh, showing only the markers that match all your selected criteria. The map will also re-center to fit the filtered results.

!!! warning "Clearing Filters"
    To clear a text filter, click the `X` icon inside its field. To clear the date range, delete the text in the date inputs. You must click **Apply Filters** after clearing for the changes to take effect.