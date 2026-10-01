---
title: Edit Form Schema
description: Build and modify form schemas — set name, icon, visibility, statuses, metrics, relationships, and the form structure itself.
---

# Edit Form Schema

The Edit Form Schema page lets you create a new form schema or modify an existing one. Here you define the form's general attributes, manage its statuses and metrics, control visibility, connect it to other form schemas, and build the actual questions your users will answer.

You can reach this page by:

- Clicking the **+** button (*Add New Forms Schema*) at the bottom right of the [Forms overview](index.md) to build a new schema.
- Selecting **Edit** on an existing schema's card or from its detail view.

Breadcrumbs at the top show your current position (e.g., **Forms / Schema / My Survey / Edit**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

The editor is organized into tabs — **Settings**, **Metrics**, **Status**, **Build**, and **Relationships**. The **Save** and **Import XLSForm** buttons stay visible on the tab row, so you can save your work from any tab.

## Settings Tab

The **Settings** tab holds the metadata and general configuration of the questionnaire.

| Field | Description |
|-------|-------------|
| **Form Name** | A unique system identifier (e.g., `survey_2025`). Dino warns you if the name is already taken. |
| **Form Label** | The human-readable name displayed in lists and reports. |
| **Icon Set** | Choose **Default** (material icons) or **Humanitarian** (custom SVG icons). |
| **Icon Identifier** | Pick an icon from the autocomplete list. The preview next to the field updates live. |
| **Visibility** | **Private** — only Dino users with permission to submit can send data to this form schema. **Public** — anyone with the link can submit. See [public forms](../public-forms/index.md) for details. |
| **Generate Report** | When **Yes**, Dino automatically generates a report for the form. If a report already exists, this option is locked to **Yes**; to disable it, delete the report's schema and data first. See [Auto reports](../reports/autoreports.md) for more details. |

!!! tip "Jump straight to the questions"
    Click **Go to build** at the bottom of the Settings tab to open the **Build** tab right away.

## Metrics Tab

On the **Metrics** tab you choose which metrics apply to this questionnaire and how they behave.

- **Form Metrics** — the metrics to collect for every submission. Select one or more from the list.
- **Metrics Set Behavior** — **Default** lets each metric value appear multiple times across submissions. **Unique** allows a metric value (e.g., a district name) to be used only once per form.
- **Metrics to include in the form** — select the metrics whose data should be included in the form.
- **Metrics included as choice options** — add one row per metric you want to expose as a choice origin. For each row, pick the metric, optionally list additional attributes to carry into the choice, and add a filter condition if you want to narrow the available options. The new choice origin is named `$metricName_metric_choice`.

!!! warning "Unique Metrics Set Behavior"
    Use **Unique** carefully — once a value is used for a metric, it cannot be reused in another submission of the same form schema.

## Status Tab

On the **Status** tab you define the statuses a submission of this questionnaire can have (for example Draft, Approved, Rejected).

1. Click the **Form Statuses** field to expand the list.
2. To add an existing status, select it in the list.
3. To create a new status, click **Create new Status**. A dialog opens where you can enter a label, choose a color, and save.
4. To edit an existing status, click the **edit** icon (pencil) next to it.
5. Click outside the dropdown to close it.

You can also associate a level with each status to establish an order. When new form data is created, it receives the status with the lowest level.

## Build Tab

The **Build** tab contains the form builder, where you drag, drop, and configure individual fields, slides, and sections. Changes are reflected immediately in the preview. Use this tab to define the questions users will actually answer.

## Relationships Tab

Relationships pull field values or choices from other form schemas into this one — for example, a sub-form that depends on a choice made in the main form.

1. Open the **Relationships** tab.
2. Click **Add relationship with other forms**.
3. In the new row, choose the **Form Schema** to pull from, then select the **Fields** to bring into this form.
4. Optionally choose one or more **Metric** values to filter the relationship.
5. To use a single field as a choice option, turn on **Field as option**, then pick the **Label field** and, if needed, an **Additional field**.

![Relationships tab of the form schema editor](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Save first"
    The Relationships tab and the metric data sections need a saved form schema. While you are still creating a schema, they stay locked with the reminder *Save the form first to add relationships*.

## Saving and Importing

- **Save** — stores all changes. The button is disabled while the form is invalid or already saving.
- **Import XLSForm** — opens a dialog where you drag an XLSForm file or click **Choose file** (`.xls` or `.xlsx`; the file needs the *survey*, *choices* and *settings* sheets), then click **Apply** to load it into the editor. Use this to reuse a schema structure from another project. Nothing is stored until you click **Save**.