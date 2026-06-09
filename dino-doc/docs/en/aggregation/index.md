---
title: Aggregation
description: Use the Aggregation view in Dino to browse, filter, and manage form submissions from all your form schemas in a single, unified list.
---

# Aggregation

The Aggregation page provides a unified view of all form submissions across your organization. Instead of viewing submissions for one form schema at a time, you can see entries from multiple schemas together in a single, filterable list.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Browsing the List

The list displays all submissions you have permission to view. Each row represents a single submission. The following columns are shown by default:

*   **Form Schema**: The name of the form schema this submission belongs to.
*   **Status**: The current workflow status of the submission.
*   Additional columns for metrics like **Project**, **Location**, or **Organization** may also appear, depending on your system's configuration.

You can click on any row to select it or expand it to see more details.

## Filtering the List

A filter bar is located above the list. Use it to narrow down the submissions shown. You can filter by:

*   Project
*   Location
*   Area
*   Case
*   Case Code
*   Organization
*   Form Status
*   User

!!! tip "Filtering Tips"
    The Aggregation filter bar is designed for quick, cross-schema filtering. For advanced features like saved filter presets or data export, navigate to the [submissions list for a specific form schema](../forms/index.md).

## Row Actions

When you hover over a row, a set of action icons appears on the right. The actions available for a specific submission depend on your permissions for its form schema.

*   **View**: Open the submission in a read-only view.
*   **Edit**: Open the submission for editing.
*   **Print**: Generate and open a PDF version of the submission. You will be asked to confirm before the PDF is created.
*   **Delete**: Permanently delete the submission. You will be asked to confirm this action.

## Creating a New Submission

You can start a new form submission directly from the Aggregation page.

1.  Click the **+** (Add) button in the bottom-right corner of the screen.
2.  A dialog opens, showing a list of form schemas you have permission to create submissions for.
3.  Select the desired form schema from the list.
4.  Click **Create Form**. You will be taken to the form to begin filling it out.