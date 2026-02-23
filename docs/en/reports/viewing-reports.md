---
title: Viewing & Managing Reports
description: How to browse, filter, view, export, favourite, and delete reports in Dino.
---

# Viewing & Managing Reports

This page lists all the reports generated from a specific report schema. You can browse, search, view, export, mark as favourite, and delete individual reports from this central list.

---

## Browsing the List

The list displays all reports for the selected schema. Each row represents one report.

The list includes the following columns:

*   **User**: The person who created the report.
*   **Name**: The title of the report.
*   **Status**: The current status of the report.
*   **Collected Since / Collected Until**: The date range of data included in the report.
*   **Creation Date**: When the report was created.
*   **Project, Location, Area, Case, Organization**: These columns appear only if the corresponding metric types are active in your workspace.

Use the pagination controls at the bottom of the list to navigate between pages.

---

## Searching and Filtering

Use the filter bar above the list to narrow down the reports shown.

1.  Click on any filter field (like **Project** or **Location**) to select specific values.
2.  You can combine multiple filters.
3.  To save your filter combination for later use, click the preset menu icon in the filter bar and select **Save as preset**.
4.  To load a saved filter, open the preset menu and select the preset name.

---

## Actions on Reports

Each report row has action icons on the right. The actions available to you depend on your user permissions.

*   **View** (![eye icon](../imgs/reports/eye-icon.png)): Opens the report in a read-only view.
*   **Add to favourites** (![star icon](../imgs/reports/star-outline-icon.png)): Marks this report as a favourite for quick access.
*   **Remove from favourites** (![star icon](../imgs/reports/star-filled-icon.png)): Removes the report from your favourites list.
*   **Delete** (![bin icon](../imgs/reports/delete-icon.png)): Permanently deletes the report. You will be asked to confirm this action.

!!! tip "Permission-based actions"
    You may not see all actions. The icons displayed are based on the permissions granted to your user role.

---

## Adding a New Report

A floating **+** button is available if you have permission to create new reports for this schema.

1.  Click the **+** button.
2.  If the report schema uses AI features, a tooltip will show how many credits will be used. The report creation will proceed automatically.

!!! warning "Insufficient Credits"
    If you do not have enough AI credits, a warning message will appear. You will need to add more credits to your account before you can create this report.

---

## Viewing a Report

To view a report, click its row in the list or use the **View** action icon.

### 1. Selecting Metrics

If the report schema is linked to metrics, you will first see a metrics selection step.

1.  Choose values for the required metrics (e.g., Project, Location).
2.  Adjust the **Date Start** and **Date End** if needed.
3.  Click **Next** to generate and load the report.

### 2. Report Display

The report view shows the report title, date range, selected metrics, and the main report content, which is structured according to its schema.

!!! note "AI-generated content"
    If the report includes AI-generated text, you will see a progress indicator (e.g., "Generating report prompt 1 of 3") while the content is prepared. This happens automatically.

### 3. Exporting a Report

From the report view, you can export it in different formats.

*   **PDF**: Click the PDF button to download a PDF file.
*   **Excel (XLSX)**: Click the Excel button to download a spreadsheet.
*   **Word (DOCX)**: Click the Word button to download a Word document.

!!! warning "No exportable content"
    If you try to export to Excel and see a message that "No exportable widget was found," it means the report does not contain any table or chart data that can be put into a spreadsheet.

---

## Troubleshooting

### "No Forms were found for this Report"

!!! warning
    This error means the report could not be generated because there is no submitted data linked to it. Ensure that form submissions have been collected using the form schema connected to this report before trying to view it.