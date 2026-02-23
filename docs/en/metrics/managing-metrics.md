---
title: Managing Metrics
description: How to browse, create, edit, view, import, and delete metric entries (areas, cases, locations, organisations, projects) in Dino.
---

# Managing Metrics

In Dino, you can manage different types of structured data, called metrics. These include Thematic Areas, Cases, Locations, Projects, and Organisations. You access each type from the main navigation. Each metric type has a dedicated management page with a consistent layout for viewing and managing its entries.

![Managing Metrics](../imgs/metrics/managing-metrics.png)

!!! note "Permission required"
    Managing metric values requires specific permissions. If you cannot see the create, edit, or delete options, contact your administrator.

---

## Browsing the List

The main page shows a list of all entries for the selected metric type. You can:

*   **Search and Filter**: Use the search bar above the list to find entries by name or other attributes.
*   **Sort**: Click on column headers marked with a sort icon to reorder the list.
*   **Export**: Click the **Export** button in the toolbar to download the current list as a file.
*   **Select or Expand**: Click anywhere on a row to select it. Click the expand icon to see more details.

---

## Creating a New Entry

1.  Click the **+** button (the circular floating button at the bottom-right of the screen).
2.  A dialog will open with fields for the new entry.
3.  Fill in the required information and click **Save**.

---

## Editing or Viewing an Entry

Each row in the list has action icons on the right side.

1.  To view an entry's details without editing, click the **View (eye)** icon.
2.  To edit an entry, click the **Edit (pencil)** icon.
3.  The same editor dialog opens, populated with the entry's current data. Make your changes and click **Save**.

---

## Deleting Entries

You can delete entries individually or in bulk.

**To delete a single entry:**
1.  Click the **Delete (trash can)** icon on the row you wish to remove.
2.  A confirmation dialog will appear. Click **Confirm** to permanently delete the entry.

**To delete multiple entries:**
1.  Select the entries by checking the boxes on their rows.
2.  A toolbar will appear. Click the **Delete** action in this toolbar.
3.  Confirm the deletion in the dialog that appears.

---

## Importing Entries in Bulk

You can add many entries at once by importing them from a file.

1.  Click the **Import (cloud upload)** button, which is a floating button at the bottom-right of the screen.
2.  In the dialog, click **Choose file** and select an `.xls`, `.xlsx`, or `.csv` file from your device.
3.  (Optional) Check the box for **Don't import metrics if name exists** to avoid creating duplicate entries.
4.  Click **Apply** to start the import.
5.  Click **Close** when the process is complete.

---

## Understanding the Entry Editor

When you create, edit, or view an entry, a dialog opens with its fields. The available fields depend on the metric type.

### Common Fields
*   **Name** *(Required)*: The display name for this entry. It must be unique within its metric type.
*   **Parent**: An optional field to link this entry to a parent, creating a hierarchy (e.g., a sub-project within a project). Start typing to search for and select a parent.

### Metric-Specific Fields

| Metric Type | Key Fields (Beyond Name & Parent) |
| :--- | :--- |
| **Thematic Areas** | No additional standard fields. |
| **Cases** | **Code** (read-only), **Image** (upload or take a photo). |
| **Locations** | **Coordinates**. |
| **Organisations** | **Logo Path**, **Website URL**. |
| **Projects** | **Code**, **Sectors of Intervention**, **Donors**, **Start Date**, **End Date**. |

### Additional Attributes

Below the standard fields, you will find an **Additional attributes** section. Here you can attach custom key-value pairs to an entry.
*   Click **+** to add a new attribute row.
*   Click **-** next to an attribute to remove it.
*   This section is hidden in view mode if no custom attributes exist.

### Saving Your Work
Click **Save** to create or update the entry. A brief confirmation message will appear.

!!! warning "Saving Errors"
    If you see an error when saving, check that all required fields are filled and that the entry name is not already in use. If the problem continues, contact your administrator.

!!! warning "Offline Image Upload"
    If you save an entry with an image while offline, the image will not be uploaded. You must save the entry again once you are back online to upload the image file.