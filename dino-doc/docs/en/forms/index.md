---
title: Forms
description: Manage form schemas and collect structured data submissions in Dino.
---

# Forms

The **Forms** page is your starting point for structured data collection in Dino. From here you can browse, create, and manage form schemas, then view and work with the submissions gathered through each form.

![Main view of the Forms page](../imgs/forms/index.png)

The main view displays a **grid of form schema tiles**. Each tile shows the form’s label and icon. Hovering over a tile reveals action buttons:

- **Edit Schema** – Modify the form’s structure (fields, validation, metrics).
- **Delete Schema** – Remove the form schema (and all its submissions).
- **Share URL** – Get a public link to allow external submissions.
- **View Map** – Open the map view for submissions with location data.
- **Chat with your data** – Use the [DataChat](datachat.md) feature to ask questions about submissions in natural language.

!!! tip
    The actions available on a tile depend on your permissions. You may not see all buttons.

To create a new form schema, click the **+** floating button at the bottom right. You will be taken to the [Edit Form Schema](edit-form-schema.md) page to design your form.

## Working with Submissions

Click a form schema tile to enter its **submission list**. This table shows all data entries collected for that schema.

![Submission list (data table) for a form schema](../imgs/forms/index-list.png)

The list includes a **filter bar** that lets you search by keyword, date range, metrics, status, user, and more. You can also save filter presets for quick reuse.

### Export

Use the **export** button to download submissions in CSV or XLSX format.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

The export dialog lets you specify some important parameters for the export:

1) How many forms to export.   
   1) *Forms on page*. Export only the forms that were displayed on the previous page, potentially filtered and divided into pages.   
   2) *Add filters* or *All items/1filters* . If you have already applied one filter to your form list, only the filtered form can be exported (second option). If you do not have applied any filter yet, the first option is displayed and it allows you to add more filters.   
   3) *All forms*. All forms, without filtering or pagination.   
2) Format.   
    1) *CSV*. The data will be exported to a CSV file. Each extracted form will be a row in a file where the fields will be the columns.   
    2) *XLSX*. Export in Excel format.  
    3) *Splitted XLSX*. Export to Excel format where each slide is a different sheet.   
3) Field options  
    1) *Select all form fields*. Allows you to export all form fields.  
    2) *Label values*. For fields that have prefixed values (single or multiple selection fields), the exported value is the displayed value, not the internal code used to represent that value.   
    3) *Data Analysis format*. Forms that contain repeating slides and multiple choice are exported in multiple rows, each row containing only one repeating slide and only one multiple choice, the other fields remain the same. An extra column is added, called *conta*. This columns takes the value 1 only in the first row of the repetition group, and 0 in the others.  
    4) *Separate Columns*. Multiple choice are exported as multiple columns 
4) *Selection slide*. Allows you to view the list of fields on each slide, if you want to export only some of the fields and not all of them.   
5) *Selection of fields*. You can select/deselect single fields.   

Some columns of the exported file cannot be unselected. These are:

- Form ID
- Creation date
- Update date
- DINO User data (name and ID)
- Metrics data (id, name, etc...)
- Dinoinvalid

### Row Actions

Click a row to expand its details, or use the row actions (view, edit, delete, print as PDF, download as DOCX, print badge). The available actions depend on your permissions and the form’s configuration.

### Creating a New Submission

Click the **+** floating button on the list page to open a blank form for data entry.

![Blank form opened to submit a new data entry](../imgs/forms/index-create.png)

Fill out the fields and submit. The new submission will appear in the list.

### Bulk Operations

Select multiple submissions using the checkboxes to perform bulk **delete** or **edit** (change the same field value in all selected entries).

## Additional Views

- **Map** – View submissions with geographic coordinates on an interactive map. Learn more in [Forms Map](forms-map.md).
- **DataChat** – Query your form data using natural language. See [DataChat](datachat.md) for details.

!!! warning
    The DataChat feature may consume credits. Check your account’s credit balance before using it.