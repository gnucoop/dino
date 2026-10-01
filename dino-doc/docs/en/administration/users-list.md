---
title: Users List
description: View, edit, and manage user accounts in your Dino organization.
---

# Users List

The Users List page provides a complete list of all user accounts in your Dino organization. From here, you can view user details, edit accounts, and create new users.

![Main view of the Users List page](../imgs/administration/users-list.png)

## Understanding the Users List

The main list displays key information for each user:

*   **Email:** The user's login email address.
*   **Full Name:** The name associated with the account.
*   **Disabled:** A toggle indicating if the account is active or disabled. You can click this toggle directly in the list to change the status.

You can sort the list by the **Email**, **Full Name**, or **Creation Date** columns. The **ID** and **Creation Date** columns are hidden by default. To show or hide columns, click the **Columns** button above the list, on the right, and select the ones you want to display.

## Working with the List

### Searching and Filtering

Use the search bar at the top of the page to find users by their email or full name.

To apply more specific filters:

1.  Click the **Filters** button in the search bar.
2.  Set a **From date** and a **To date** to filter by creation date, and select one or more user groups to narrow the list to members of those groups.
3.  Click **Search** to apply the filters, or **Reset filters** to clear them.

Applied filters appear as chips below the search bar. Click the **cancel** icon on a chip to remove that filter.

### User Actions

Hover over a user's row to show the **Edit** and **View** icons. Click anywhere on the row to select it: the action bar above the list then shows every action you can perform on the selected user:

*   **Edit:** Open the user editor to modify the account details.
*   **View:** Open a read-only view of the user's details.
*   **Delete:** Permanently remove the user account. You will be asked to confirm this action.

## Creating a New User

To add a new user to your organization:

1.  Click the **Add New User** button in the toolbar above the list.
2.  A form will open. Enter the new user's **Full Name** and **Email**, and assign them to the appropriate groups in **User Permission Groups**. For more information on groups, see [Groups List](groups-list.md).
    Depending on how your Dino signs users in, the form may also ask for a **Password** and **Confirm Password**, at least 9 characters long.
3.  Click **Save** to create the account.

The **Save** button stays unavailable until all required fields are filled in correctly.

!!! tip "Viewing and Editing Modes"
    The same form is used for creating, editing, and viewing users. In **view** mode, all fields are read-only and only the **Close** button is shown.

## Editing a User

To modify an existing user's information:

1.  Hover over the user's row and click the **Edit** icon, or select the row and click **Edit** in the action bar.
2.  In the editor, update the user's full name or group assignments. The email address cannot be changed here.
3.  Click **Save** to apply the changes.

!!! tip "Quick Disable"
    You can quickly enable or disable a user's ability to log in by clicking the **Disabled** toggle directly in the list, without opening the full editor.

## Related Pages

*   [Users](users.md)
*   [Groups List](groups-list.md)