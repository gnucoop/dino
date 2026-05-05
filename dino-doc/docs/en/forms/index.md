---
title: Forms
description: Access and manage all your form schemas and submissions in Dino. This is the starting point for entering, viewing, and analyzing collected data.
---

# Forms

The Forms page is your central workspace for all structured data in Dino. Here, you can access every form schema, submit new data, review past submissions, and explore your data on a map or through conversational analysis.

![Main view of the Forms page](../imgs/forms/index.png)

When you open this page, you see a list of all available form schemas. Each item shows the form's name and icon.

---

## Navigating the Page

The main page lists all form schemas you have permission to use. You can interact with this list in several ways:

1.  **Open a Form Schema**: Click on any form in the list to go to its dedicated page, where you can see all its submissions.
2.  **Search**: Use the search bar at the top to find a specific form by name.
3.  **Filter and Sort**: Use the available controls to filter the list or sort it by different columns.

!!! tip "Starting Point"
    This list is your launchpad. Each form schema represents a different type of report, survey, or data collection task for your project.

---

## Working with a Form Schema

After you click on a form schema, you are taken to its main page. From here, you can:

1.  **View Submissions**: See a table of all data previously submitted for this form.
2.  **Create a New Submission**: Click the **Create** button (floating "+" icon) to open a blank form and submit new data.
3.  **Import Submissions**: Click the **Import** button (cloud upload icon) to import multiple submissions from a file.
4.  **Explore Data**:
    *   Go to the [Map](forms-map.md) tab to see all submissions plotted on a map.
    *   Go to the [DataChat](datachat.md) tab to ask questions about your collected data using AI.

![Floating action button dialog](../imgs/forms/index-fab.png)

On a form's submission list, you can perform actions on individual entries:
*   **View**: See the full details of a submission.
*   **Edit**: Modify an existing submission (if permitted).
*   **Print/Export**: Generate a PDF or DOCX report of the submission.
*   **Duplicate**: Create a copy of a submission to use as a base for a new one.
*   **Delete**: Remove a submission (if permitted).

You can also select multiple submissions to perform bulk actions like delete or edit.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

---

## Key Workflows

### To submit new data:
1.  From the main Forms page, click on the desired form schema.
2.  On the form's page, click the **Create** button (floating "+" icon).
3.  Fill out all required fields in the form that opens.
4.  Click **Submit** to save your entry.

### To review or edit existing data:
1.  From the main Forms page, click on the relevant form schema.
2.  Browse the list of submissions. Click on any individual entry to **View** its full details.
3.  If you have permission, you can click **Edit** to modify a submission.

### To import data:
1.  Navigate to the desired form schema's page.
2.  Click the **Import** button (cloud upload icon).
3.  Follow the on-screen instructions to select and upload your data file.

### To export data:
1.  Navigate to the desired form schema's page.
2.  Use the filters to narrow down the list of submissions you want to export.
3.  Click the **Export** button in the filter bar.
4.  Choose your preferred export format.

!!! note "Managing Form Schemas"
    Creating new form schemas or editing their structure (adding/removing fields) requires administrator permissions. If you need to set up a new form type, contact your project administrator. You can learn more about editing a form's structure in the [Edit Form Schema](edit-form-schema.md) guide.

!!! warning "Permissions"
    The actions you see (Create, Edit, Delete, Import, Export) depend on your user permissions. If a button or action is missing, you may not have the required access.