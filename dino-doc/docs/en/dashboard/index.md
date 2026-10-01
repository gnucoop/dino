---
title: Dashboard
description: The Dino Dashboard is your home screen, providing quick access to forms, reports, and other features.
---

# Dashboard

The Dashboard is the first screen you see after logging into Dino. It serves as your central hub for navigating the application. Depending on your system's configuration, your Dashboard will appear in one of two layouts: a **Menu Dashboard** or a **Report Dashboard**.

![Main view of the Dashboard page](../imgs/dashboard/index.png)

---

## Menu Dashboard

In this layout, the Dashboard presents a grid of navigation cards. Each card provides quick access to a major area of the application that you have permission to use.

You will typically see the following cards:

*   **Forms**: Navigate to the [Forms](../forms/index.md) area to create form schemas, collect data, and review submissions.
*   **Reports**: Navigate to the [Reports](../reports/index.md) area to create, view, and manage reports based on your collected data.
*   **Metrics**: Navigate to the [Metrics](../metrics/index.md) area to manage reference data like projects, locations, and organizations.
    !!! warning "Visibility"
        The Metrics card is hidden if your user account has guest-only permissions.
*   **Users**: Navigate to the [Users List](../administration/users-list.md) area to manage user accounts and groups.
    !!! tip "Admin Access"
        The Users card is only visible to users with administrator privileges.

To navigate, simply click on the card for the area you wish to access.

---

## Report Dashboard

In this layout, your Dashboard is personalized to display a single report that you have marked as a favorite. This allows you to view key data visualizations immediately upon login.

If you have not yet selected a favorite report, you will see a welcome message prompting you to add one.

### Setting a Favorite Report

1.  Go to the [Reports](../reports/index.md) area.
2.  Open the report you want to see on your Dashboard.
3.  In the report's list, click the report row to select it, then click the heart button (**Add to favourites**) in the action bar. This option is available only if favourites are enabled for your Dino instance.
4.  Refresh or return to your Dashboard. The selected report will now be displayed.

### Changing or Removing a Favorite

To change your favorite report, simply add a different report to your favorites. The new report will replace the old one on your Dashboard. To clear the Dashboard, select the favorite report in the list and click the filled heart button to remove it from your favorites.

!!! tip "Working with the displayed report"
    The report shown on your Dashboard is the same report you open from the [Reports](../reports/index.md) area. If it contains filter widgets, you can use them here too to narrow the data it shows.

## Guided Tour

The first time you access Dino, a guided tour may start automatically from the Dashboard to introduce the main areas of the application.

*   Follow the on-screen prompts to learn about navigation and key actions.
*   If you skip or finish the tour, you can restart it at any time with **Start Dino Tour** in the **Tutorials** tab of the [User Area](../user-area/index.md). The tab is shown only when the guided tour is configured for your Dino instance.
