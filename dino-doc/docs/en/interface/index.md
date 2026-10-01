---
title: Navigation & Interface
description: An overview of the Dino application shell — the sidebar, data sync, notifications, the user menu, and logging out.
---

# Navigation & Interface

After you log in, every page of Dino is framed by a **sidebar** on the left. It holds the navigation between the areas of the application and, at the bottom, the data sync, the notifications, and your user card.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## The Sidebar

At the top of the sidebar are the logo and the **menu button**, which expands the sidebar to show the section names or collapses it to icons only.

!!! tip "Collapsed menu"
    When the sidebar is collapsed to icons only, hover over an icon to see the name of its section as a tooltip.

On a phone or a small screen the sidebar is hidden. A slim bar at the top of the page then shows the menu button, which opens the sidebar over the page, the logo, and the sync button.

### Sections

The navigation lists the areas of Dino you can use. Which ones appear depends on how your Dino instance is configured and on your permissions.

**User sections**, under the **User** heading:

| Section | Description |
|---|---|
| Dashboard | The home screen. See [Dashboard](../dashboard/index.md). |
| Forms | Data collection forms and submissions. See [Forms](../forms/index.md). |
| Reports | Generated reports. See [Reports](../reports/index.md). |
| Aggregation | Unified view of submissions across all forms. See [Aggregation](../aggregation/index.md). |
| AI | The DinoAi assistant, when enabled for your instance. |
| Metrics | Reference data (projects, locations, organisations, etc.). See [Metrics](../metrics/index.md). *(Hidden for guest-only users.)* |

**Admin sections**, under the **Administration** heading, visible to administrators only:

| Section | Description |
|---|---|
| Users | User accounts and permission groups. See [Users](../administration/users.md). |
| Languages | Interface translation management. See [Managing Languages](../administration/languages.md). |

Your instance may move some sections, such as Metrics, Reports or Aggregation, among the admin sections. When the sidebar is collapsed, the two groups are separated by a line instead of their headings.

---

## Data Synchronisation

Dino keeps your data on the device and synchronises it with the server in the background. The **Synchronize** button at the bottom of the sidebar shows the current state and, when the sidebar is expanded, the time of the last completed sync (or *Never synchronized*). Click it to start a sync.

| Button | Meaning |
|---|---|
| `sync` icon | All data is up to date. |
| `sync` icon, spinning | A sync is in progress. |
| `sync_problem` icon on a colored button | You have local changes that have not been synced yet. Click to sync them. |
| `!` badge on the icon | A problem was encountered during the last sync. Check your notifications for details. |
| `sync_disabled` icon, *Offline* | The device is offline; sync is not available until the connection is back. |

When a sync completes, a message appears briefly at the bottom of the screen:

- *"Synchronization complete"* — all data synced successfully.
- *"Synchronization complete with errors. Could not synchronize: [items]. Please check your notifications."* — one or more data collections could not be synced. A notification is also created in your notification list.

!!! warning "Expired session"
    If your session has expired, the sync stops and the sync button shows `sync_problem`. Your data stays on this device. Click the button: Dino tries to renew the session and, if it cannot, offers **Go to the login page**, keeping the data on this device, or **Later**. Sign in again with the same account to synchronise the data.

---

## Utility Buttons

Below the sync button, a row of small buttons gives access to:

- **New version** — a download icon appears when a new version of Dino is ready. Click it to reload the application and apply the update.
- **Notifications** — the bell, with a badge counting your unread notifications. See [Notifications](#notifications) below.
- **Light / dark mode** — a sun and a moon button. They are shown when the sidebar is expanded and on small screens; you can also switch mode from the [User Area](../user-area/index.md).
- **DINO-AI Credits** — a badge with your remaining AI credits, shown only when DINO-AI is configured for your account. Click it to open the AI tab of the User Area.

---

## Notifications

Click the **bell** to open the notifications panel. Its header shows how many notifications are unread. Notifications are grouped by day, each with its age, and repeated messages are collapsed into a single row with a counter (for example ×3).

![Notifications dropdown open](../imgs/interface/index-notifications.png)

From the panel you can:

1.  **Click a notification** to mark it as read. If it links somewhere in Dino, shown by an arrow on the right, the click also takes you there.
2.  **Mark all as read** — shown when there are unread notifications.
3.  **View all notifications** — opens the full [Notifications](../notifications/index.md) page.

---

## User Card and Menu

At the very bottom of the sidebar, the user card shows your initials, your name, and a line with your role, the active interface language, and the version of Dino. Click the card to open the user menu:

- **User Area** — your account page, to change your password, see your DINO-AI key and credits, customise the theme, and more. See [User Area](../user-area/index.md).
- **Language** — choose the language of the interface.
- **Help** — a link to the guidelines configured for your instance, when there are any.
- The build information of the installation.

---

## Logging Out

Click the **Logout** button next to your user card. Dino always asks what to do with the data on this device:

- **Log out and delete the data** — ends the session and deletes all the local data from this device.
- **End the session and keep the data** — ends the session and takes you to the login page, keeping the data on this device for your next login.
- **Cancel** — stays signed in.

The Logout button is greyed out and cannot be used while a sync is in progress or when the device is offline.

!!! warning "Data not yet synchronised"
    Data you have not synchronised yet exists only on this device: deleting it on logout loses it for good. If you are unsure, synchronise first, or choose **End the session and keep the data**. Signing in later with a different account also deletes it — see [Logging In](../getting-started/login.md).
