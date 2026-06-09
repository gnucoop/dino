---
title: Edit Report Schema
description: Create or modify a report schema to define the structure, layout, and data sources for reports in Dino.
---

# Edit Report Schema

The **Edit Report Schema** page allows you to create a new report schema or modify an existing one. A report schema defines the structure, layout, and data sources for a report in Dino.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

On this page, you configure the report’s name, description, and the specific data fields that will appear in the report from your form submissions.

## Creating a New Report Schema

To create a new report schema:

1. Navigate to the **Reports** section in the main menu.
2. Click **Create Report Schema**.
3. You are taken to the Edit Report Schema page.
4. Enter a descriptive **Name** for your report.
5. (Optional) Provide a **Description** to explain the report’s purpose.
6. Configure the report’s data and layout using the available options.
7. Click **Save** to create the schema.

## Editing an Existing Report Schema

To modify a report schema you have already created:

1. Navigate to the **Reports** section.
2. Find the report schema you wish to edit in the list and click on it.
3. Click the **Edit** button (often represented by a pencil icon).
4. You are taken to the Edit Report Schema page with the current configuration loaded.
5. Make your desired changes to the name, description, or data configuration.
6. Click **Save** to update the schema.

!!! tip "Saving Your Work"
    Always remember to click **Save** after making changes. Your modifications are not applied until you save the schema.

## Configuring Report Data

The core of the report schema is defining which data from your form submissions will appear in the report. You can typically:

* **Select Data Source:** Choose the form schema that contains the data you want to report on.
* **Select Data Fields:** Choose specific fields from your connected form schemas to include as columns in the report.
* **Set Display Names:** Customize the column header shown in the report for each selected field.
* **Define Filters:** Set conditions to include only specific submissions that meet your criteria (for example, submissions from a certain date range).

!!! warning "Data Source"
    A report schema must be connected to at least one form schema to have data to display. Ensure the relevant form exists before creating your report.

## Next Steps

After saving your report schema, you can:

* Navigate to the [Reports](index.md) page to view and run your new report.
* Return to this page to make further adjustments as needed.