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

The number of items found appears above the table, next to the paginator. Use the **Columns** button (tooltip *Customize the columns*), above the table on the right, to change which columns are displayed.

## Searching and filtering

Use the **search by keyword** field in the toolbar to filter groups by name. Open the **Filters** dialog for more options:

1. Click **Filters**.
2. Set a **From date** and **To date** to restrict results to groups created in that range.
3. Narrow the list by one or more metric filters — **Project**, **Location**, **Area**, **Case**, or **Organization** — depending on which are active in your deployment.
4. Click **Search** to apply the filters, or **Reset filters** to clear them.

Applied filters appear as chips below the toolbar. Click the **cancel** icon on a chip to remove that filter.

## Actions on groups

Hover over a row to show the **Edit** and **View** icons. Click a row to select it: the action bar above the table then shows every action you can use on it:

- **View** – View group details (opens the group page in read‑only mode)
- **Edit** – Edit group properties
- **Delete** – Remove the group (confirmation required)

## Creating a new group

Groups are created and edited on a dedicated page, not in a dialog.

1. Click **Add New Group** in the toolbar. The *Create group* page opens.
2. Type the **Group name** in the header of the page.
3. Choose the items of the group, one tab at a time. Each tab shows how many items it holds, and appears only if its category has items:
    - **User role** (required – a group holds exactly one role; adding another one replaces it)
    - **Form schema**
    - **Form status**
    - **Report schema**
    - One tab per active metric type (**Area**, **Case**, **Project**, **Location**, **Organization**)
4. In the left panel, search the items and click **Add** next to each one you want, or **Add all shown** to add every item listed. The right panel (*In group*) shows what the group holds for that category.
5. Click **Save**. It is enabled only when the group has a name and a user role.

!!! tip "All option"
    Every category except User role has an "All …" option at the top of its list (for example *All form schemas*). Choosing it replaces the single items; adding a single item removes it. For metrics with a hierarchy, adding a value also adds its children.

!!! note "Administrator groups"
    If the group's role is an administrator role, **Form schema** and **Report schema** are always set to **All** and locked, as shown by a lock icon: only a group holding **All** on them can create new schemas. Choose a different role to release the lock.

## Editing or viewing a group

1. In the table, click the **Edit** or **View** icon for the group. The *Edit group* or *View group* page opens.

    ![Editor for modifying a user permissions group](../imgs/administration/groups-list-edit.png)

2. In edit mode you can:
    - Change the **Group name**.
    - Add items from the left panel, or remove them from the right panel with the × button (**Clear** removes every item of the category).
3. Click **Save** to apply the changes. There is no Cancel button: to leave without saving, go back through the breadcrumbs.

In view mode everything is read‑only and there is no **Save**.

## Deleting a group

1. Click the group's row to select it, then click **Delete** in the action bar.
2. Confirm the deletion in the dialog that appears.

!!! warning "Irreversible action"
    Deleting a group cannot be undone. Make sure no users rely on the group before removing it.

## Related pages

- [Users List](users-list.md) – manage individual user accounts and their group assignments.
- [Metrics](../metrics/index.md) – configure metric types that can be assigned to groups (areas, cases, projects, etc.).
- [Form Schemas](../forms/edit-form-schema.md) – create and edit form schemas that can be linked to groups.
- [Report Schemas](../reports/edit-report-schema.md) – manage report schemas available to groups.
- [Interface overview](../interface/index.md) – learn about navigation and general layout.