---
title: Groups List
description: View and manage user groups on the Groups List page in Dino. Learn about filters, the data table, and how to create or edit groups.
---

# Groups List

The Groups List page displays all user groups in your Dino instance. From here you can view, filter, and create new groups, or edit existing ones.

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## What You See

The page contains:

- **Search and filter bar** – Use the available filters to narrow down the list of groups. Filters include Project, Location, Area, Case, and Organization. You can also use the general search box to find groups by name.
- **Data table** – Shows key information about each group, including the group name. Additional columns (ID, creation date) are hidden by default but can be made visible through the column picker.
- **Floating action button** – A "+" button in the bottom right corner opens the editor to create a new group.
- **Row actions** – Click on a row to reveal inline options for selecting or expanding more details about that group.

## Using Filters

1. Click the filter icon to open the filter bar.
2. Choose a filter type from the dropdown (e.g., **Project**).
3. Select or type the value you want to filter by.
4. The list updates automatically to show only matching groups.

!!! tip "Multiple filters"
    You can apply several filters at once to narrow the results further.

## Creating a New Group

1. Click the **+** floating button at the bottom right of the page.
2. The group editor opens. Enter the required information:
   - **Group Name** – A unique name for the group.
3. Optionally assign users to the group (see [Users List](users-list.md) for managing individual users).
4. Click **Save** to create the group. It appears in the list immediately.

## Editing or Viewing a Group

- **Click anywhere on a row** to expand or select the group. The available actions depend on your permissions.
- To open the full editor for a group, click the edit icon (pencil) that appears on the row.
- You can change the group name and its members.

!!! warning "Deleting groups"
    Deleting a group removes all its members from the group. This action cannot be undone. Delete via the row’s delete icon (trash can) after expanding or selecting the row.

## Related Pages

- [Users List](users-list.md) – Manage individual user accounts
- [Users](users.md) – Overview of user administration
- [Notifications](../notifications/index.md) – Configure notifications for groups