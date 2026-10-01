---
title: Projects
description: Manage your projects in Dino. View, add, edit, delete, import, and export project records with filtering and bulk actions.
---

# Projects

The **Projects** page in Dino lets you manage all values of the Project metric. This can be used to map your organization's projects, a program, collaborations with donors, or any other structured group of activities relevant to your work. You can view a sortable list of projects, add new ones, edit existing ones, delete them, import data in bulk, and export the list for offline analysis. The page also offers filtering tools to quickly find the project you need.

![Main view of the Projects page](../imgs/metrics/projects.png)

## Navigating to Projects

To open the Projects page, click **Metrics** in the main navigation, then the **Projects** card. The browser URL will end with `/metrics/projects`.

## Understanding the Project List

The main table shows a list of all projects. Each row corresponds to one project and displays the following columns by default:

- **Project Name** – The name of the project. You can sort the list by this column.
- **Parent Project** – The higher-level project this project belongs to, if any.
- **Code** – A manually assigned project code.
- **Auto Code** – An automatically generated code. Dino sets it: it is not shown in the project dialog and cannot be edited.
- **Sectors of Intervention** – The sectors the project focuses on.
- **Donors** – The funding sources for the project.
- **Start Date** – The date the project begins.
- **End Date** – The date the project ends.

Hidden columns (ID, Creation Date, and Additional Attributes) can be shown with the **Columns** button (tooltip *Customize the columns*), above the table on the right.

!!! tip "Read-only fields"
    The **Auto Code** field is automatically generated and cannot be changed. It is shown in the list but not in the project dialog.

The top toolbar displays the total number of items found and a paginator. You can choose how many projects to view per page.

## Managing Projects

### Adding a New Project

1. Click the **Add new PROJECT** button in the toolbar above the table.
2. A dialog opens where you fill in the project details. Optional fields are marked *(optional)*.
3. Press **Save** to create the project. It appears in the list immediately.

### Editing a Project

1. Hover over the project's row and click the **edit** icon (pencil), or select the row and click **Edit** in the action bar above the table.
2. Modify the fields in the dialog.
3. Click **Save** to apply your changes.

### Viewing a Project

- Hover over the project's row and click the **view** icon (eye), or select the row and click **View** in the action bar, to open a read-only version of the project details dialog.

### Deleting a Project

1. Click the project's row to select it, then click **Delete** in the action bar above the table.
2. Confirm the deletion in the pop-up. The project is permanently removed.

!!! warning "Deleting a project"
    Deleting a project removes it from the system. This action cannot be undone. A project that is used by forms, or that has child projects, cannot be deleted; see [Metrics](index.md).

## Searching and Filtering

The **search and filters** bar sits below the page heading. You can:

- **Search by keyword** – Type any term in the keyword field; the list filters automatically.
- **Filter by date range** – Click **Filters**, set a **From date** and a **To date**, then click **Search**. The dates filter by the project's creation date, not by its start or end date.

Filter chips appear below the filter bar, showing the active filters. You can remove individual chips by clicking the **cancel** icon on each.

## Exporting and Importing

### Exporting Projects

1. Click the **Export** button in the toolbar.
2. Choose what to export: *Items in page* (the default), the items matching your filters, or *All items*.
3. Choose the format: *csv*, *xlsx* or *splitted xlsx*, then click **Export**.

### Importing Projects

1. Click the **Import PROJECT** button in the toolbar above the table.
2. Upload an `.xls`, `.xlsx` or `.csv` file and map its columns to the project fields.
3. Click **Apply import** and review the result for any errors or warnings. Projects whose name already exists are reused, not updated.

## Bulk Actions

You can select multiple projects using the checkboxes at the left of each row. With several projects selected, the action bar above the table offers **Delete**, which removes all selected projects after confirmation. There is no bulk edit.

After deleting, the list updates automatically.

## Related Pages

- [Metrics Overview](index.md)
- [Thematic Areas](areas.md)
- [Organizations](organizations.md)
- [Locations](locations.md)
- [Cases](cases.md)