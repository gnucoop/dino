---
title: Managing Users & Groups
description: How to create, edit, and manage user accounts and permission groups in Dino.
---

# Managing Users & Groups

The Users area lets administrators manage who can access Dino and what they are allowed to do. It is divided into two sections: **Users**, for individual accounts, and **Groups**, for sets of permissions that can be assigned to multiple users at once.

![Managing Users & Groups](../imgs/administration/users.png)

!!! warning "Administrator access only"
    This area is only visible to users with the Administrator role. If you cannot see it in the navigation, contact your system administrator.

---

## Navigating the Users Area

When you open the Users area, you will see a menu with two options:

- **Users** — manage individual user accounts.
- **Groups** — manage permission groups.

Click either option to open the corresponding section.

---

## Users

### Browsing the User List

The Users list shows all accounts in the system, displaying each user's **email address**, **full name**, and a **Disabled** toggle indicating whether the account is currently active.

The total number of users matching your current filters is shown at the top of the list.

### Searching and Filtering

- Type in the **keyword search** field to filter users by any text in their details.
- Use the **From date** and **To date** fields to filter by account creation date.
- Use the **User Groups** filter to show only users who belong to a specific permission group.
- Clear any filter by clicking the **×** icon inside that field.

### Enabling or Disabling a User

Each row contains a toggle in the **Disabled** column. Click the toggle directly in the list to enable or disable a user account without opening the editor.

### Adding a New User

!!! note
    Creating new accounts requires an active internet connection. If you are offline, the add button will show a connectivity icon and the action will not be available.

1. Click the **+ button** (floating button at the bottom-right of the page).
2. A dialog will open. Fill in the following fields:
    - **Full Name** — required.
    - **Email** — required.
    - **Password** and **Confirm Password** — required in some installations (at least 9 characters).
    - **User Permission Groups** — select one or more groups from the dropdown to control what this user can access.
3. Click **Save** to create the account.

A confirmation message will appear at the bottom of the screen when the user has been saved successfully.

### Editing a User

1. Find the user in the list and click the **pencil icon** on their row.
2. The editor dialog will open in edit mode. You can update the **Full Name** and the **User Permission Groups**.
3. Click **Save** to apply your changes, or **Close** to discard them.

### Viewing a User

Click the **eye icon** on a user's row to open their details in read-only mode. No changes can be made in this mode. Click **Close** when done.

### Deleting a User

1. Click the **delete icon** on the user's row.
2. A confirmation prompt will appear. Confirm to permanently delete the account.

!!! warning
    Deleting a user account is permanent and cannot be undone.

---

## Groups

Permission groups define what areas, forms, reports, and data a set of users can access. Assigning a user to a group grants them all the permissions defined for that group.

### Browsing the Groups List

The Groups list shows all permission groups by name. The total count is shown at the top of the page.

### Searching and Filtering

- Use the **keyword search** field to filter groups by name.
- Use the **From date** and **To date** fields to filter by creation date.
- Use the metric filters (**Project**, **Location**, **Thematic Area**, **Case**, **Organization**) to find groups associated with specific data scopes.
- Clear any filter by clicking the **×** icon inside that field.

### Adding a New Group

1. Click the **+ button** (floating button at the bottom-right of the page).
2. A dialog will open showing a categorised list of available items to assign to the group. Items are grouped into categories such as **Roles**, **Form Schemas**, **Form Statuses**, **Report Schemas**, and any active metric types.
3. Enter a **group name** in the name field at the top of the dialog.
4. Select the items you want to include in the group by clicking them. At least one **Role** must be selected before you can save.
5. Click **Save** to create the group.

A confirmation message will appear with the group name when it has been saved.

### Editing a Group

1. Click the **pencil icon** on a group's row.
2. The editor dialog will open with the group's current configuration pre-loaded.
3. Update the name or add and remove items as needed. At least one Role must remain selected.
4. Click **Save** to apply your changes.

### Viewing a Group

Click the **eye icon** on a group's row to open its configuration in read-only mode. Click **Close** when done.

### Deleting a Group

1. Click the **delete icon** on the group's row.
2. A confirmation prompt will appear. Confirm to permanently delete the group.

!!! warning
    Deleting a group is permanent. Users who were only assigned to that group will lose the associated permissions immediately.

---

## Troubleshooting

### "New User accounts cannot be created while offline."

!!! warning
    Your device is not connected to the internet. New user accounts can only be created when online. Check your connection and try again. Editing and viewing existing users is still available while offline.

### "Oops! Something went wrong while saving the User."

!!! warning
    The user could not be saved, possibly due to a validation error or a temporary server problem. Check that all required fields are filled in correctly and try again. If the problem persists, contact your system administrator.

### "Oops! Something went wrong while performing the requested action."

!!! warning
    This message can appear when saving or deleting a group. It may indicate a server-side issue or a conflict with existing data. Try again after a moment. If the problem continues, contact your system administrator.