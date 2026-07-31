---
title: Groups List
description: Manage user groups in Dino — view, create, edit, and delete permission groups with assigned roles, forms, reports, and metrics.
---

# Groups List

The **Groups List** page shows all user groups in Dino. From here you can view, edit, delete, and create groups. Each group defines a set of permissions and access rules by linking a user role to specific form schemas, report schemas, form statuses, and metric types (such as areas, cases, projects, locations, or organizations).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## List overview

The table displays the following columns:

- **Group Name** – the name of the user group (visible by default).
- **ID** – internal identifier (hidden by default).
- **Creation Date** – when the group was created (hidden by default).

You can customize which columns appear by clicking the **column view** icon (also called **hotdog** icon by software prgrammers!) in the right side of the table header.

## Searching and filtering

Use the **search bar** at the top of the page to filter groups by keyword. The **Filters** panel (expandable) lets you narrow the list by:

- Date range (from/to)
- Any metric type defined in your deployment, i.e. one or more of the following: Project, Location, Area, Case, Organization

You can also save and load filter presets using the preset manager.

## Actions on groups

Each row has three action icons on the right:

- **View** – View group details (opens the editor in read‑only mode)
- **Edit** – Edit group properties
- **Delete** – Remove the group (confirmation required)


## Creating a new group

1. Click the **+** floating button at the bottom right of the screen.
2. In the editor dialog that opens, enter a **Group name** (required).
3. Navigate through the tabs to select:
    - **User role** (required – you must pick exactly one role)
    - **Form schemas**
    - **Form statuses**
    - **Report schemas**
    - **Metric types** (all types active for your deployment: Area, Case, Project, Location, Organization) – if active
4. In the **available items** dialog on the right side, select one or more items by clicking the **add** icon next to each item to move it to the **Group items** panel.
5. Click **Save**.

!!! tip "All option"
    For metric types and other categories, you may see an “All …” option. Selecting this applies the restriction to every item of that type.

## Editing or viewing a group

1. In the table, click the **Edit** (edit) or **View** (view) icon for the group you want to modify.
2. In the editor dialog, you can:
    - Change the **Group name**.
    - Add or remove items from any tab (only in edit mode).
    - Remove items by clicking the **delete** icon next to them.
3. Click **Save** to apply changes (view mode shows a **Close** button only).

## Deleting a group

1. Click the **delete** icon for the group.
2. Confirm the deletion in the dialog that appears.

!!! warning "Irreversible action"
    Deleting a group cannot be undone. Make sure no users rely on the group before removing it.

## Related pages

- [Users List](users-list.md) – manage individual user accounts and their group assignments.
- [Metrics](../metrics/index.md) – configure metric types that can be assigned to groups (areas, cases, projects, etc.).
- [Form Schemas](../forms/edit-form-schema.md) – create and edit form schemas that can be linked to groups.
- [Report Schemas](../reports/edit-report-schema.md) – manage report schemas available to groups.
- [Interface overview](../interface/index.md) – learn about navigation and general layout.