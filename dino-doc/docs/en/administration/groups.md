---
title: Groups
description: Manage user permission groups in Dino to control access to forms, reports, and data.
---

# Groups

The **Groups** page allows you to define and manage user permission groups. A group determines what users can see and do within Dino by assigning them a role and granting access to specific forms, reports, data statuses, and organizational data.

You can access this page via **Administration > Groups**.

![Main view of the Groups page](../imgs/administration/groups.png)

The main list displays all existing groups. You can:
*   **View** a group's details.
*   **Edit** an existing group.
*   **Delete** a group.
*   **Create** a new group using the floating action button in the bottom-right corner.

## Creating a New Group

To create a new permission group:

1.  Click the **+** (Add) floating button in the bottom-right corner of the screen.
    ![Floating action button dialog](../imgs/administration/groups-fab.png)
2.  A configuration dialog will open.

## Configuring a Group

Whether creating a new group or editing an existing one, you configure it in the same dialog. The configuration involves selecting items from available categories on the left and adding them to the selected list on the right.

1.  **Enter a Group Name:** Provide a clear, descriptive name for the group at the top of the dialog.
2.  **Assign a Role (Required):** From the **User Role** category, you must add exactly one role (e.g., Administrator, Data Collector). This defines the base user capabilities.
3.  **Grant Data Access:** Add items from other categories to control what data the group can access. You can select individual items or choose the "All [Items]" option for a category.
    *   **Form Schemas:** Grants access to specific data collection [forms](../forms/index.md).
    *   **Report Schemas:** Grants access to specific [reports](../reports/index.md).
    *   **Form Statuses:** Grants access to data submissions with specific workflow statuses.
    *   **Areas, Cases, Locations, Organizations, Projects:** Grants access to data tagged with these specific organizational units (if these features are enabled in your Dino instance).
4.  Click **Save** to create or update the group.

!!! warning "Required Field"
    A group **must** have a **User Role** assigned. You cannot save a group without one.

## Viewing or Editing an Existing Group

From the main groups list, you have several actions for each group:

*   **To view details:** Click on the group's row, or click the **view** (eye) icon in its action menu. This opens a read-only dialog showing the group's full configuration.
*   **To edit:** Click the **edit** (pencil) icon in the group's action menu. This opens the configuration dialog where you can modify the group's name and permissions.
*   **To delete:** Click the **delete** (trash can) icon in the group's action menu. You will be asked to confirm this permanent action.

!!! warning "Deletion is Permanent"
    Deleting a group is immediate and cannot be undone. Any [users](users-list.md) assigned to this group will lose the permissions it granted.