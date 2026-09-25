---
title: Import Data
description: Learn how to bulk-import structured data into any form schema using a CSV or Excel file. The two-step wizard lets you upload a file and then map its columns to form fields.
---

# Import Data

The **Import Data** page lets you bulk-upload submissions into a form schema from an `.xls`, `.xlsx`, or `.csv` file. A two-step wizard guides you through uploading the file and mapping the file’s columns to the form’s fields.

![Main view of the Import Data page](../imgs/forms/import.png)

## Access the Import Page

1. Navigate to the **Forms** list and select a form schema.
2. From the form’s data view, click **Import** (the toolbar button).

## Step 1 — Upload File

The first step shows a drag‑and‑drop zone or a file picker.

- **Accepted formats:** `.xls`, `.xlsx`, `.csv`
- **Maximum file size:** 20 MB

To upload:

1. Drag a file onto the dashed area **or** click **Choose a file** to browse.
2. After selection, the file name appears in a chip along with the number of columns detected.
3. (Optional) Leave **Reuse existing metrics with the same name** checked (the default) so that any metric in the file whose name matches a metric already in the system is linked to that existing metric instead of creating a duplicate. Uncheck it to always create new metrics.
4. Click **Next** (or the stepper label “2 · Map fields”) to proceed.

### Formatting the import file
See the description in the section [below](#file-format)

!!! tip "Easy File formats"
    Dino accepts the same file obtained during the [export](index.md#export). So, the easiest way to obtain a file properly formatted for import, is to first export some form data from the same schema and then delete the raws containing the exported data, keeping only the column headers. In any case, ensure your column headers are clear – they will be used as suggestions during mapping.

!!! note "Metrics identified by ID"
    If a metric column in your file provides the metric's **ID** (UUID), that row is linked to the existing metric with that ID and no new metric is created. The ID takes precedence over the metric name, so this happens regardless of the **Reuse existing metrics with the same name** option (which only applies to matching by name).

## Step 2 — Map Fields

After uploading, you see a table listing all columns from your file. Each row has three columns:

- **File column** – the original header from your file.
- **Form field** – a dropdown where you select the corresponding form field.
- **Status** – shows whether the column is mapped, ignored, or has an error.

### Mapping Actions

- **Select a form field** – open the dropdown for a column and choose the correct field. You can search within the dropdown.
- **Ignore a column** – select the **— Ignore this column —** option in the dropdown, or click the **Ignore** button in the status column. Ignored columns are grayed out.
- **Restore an ignored column** – click the **Restore** button in the status column.

### Auto‑match

Click **Auto‑match** to let Dino automatically pair columns with form fields based on name similarity. This is a good starting point – review and adjust mappings as needed.

!!! tip "Auto‑match works best with headers that match field labels exactly or contain similar keywords."

### Repetition

If a selected form field is a repeating field (e.g., multiple phone numbers), a **Repetition** input appears below the dropdown. Enter the repetition index (0, 1, 2, …) to assign this file column to one occurrence of the repeating group.

### Toolbar Summary

At the top of the mapping area, you can see three chips:

- **Total columns** – number of file columns.
- **Mapped** – columns that have been assigned to a form field.
- **Ignored** – columns you chose to ignore.

Use the **Search columns** input to filter the table by file column name.

## Apply Import

When all desired columns are mapped and no errors exist, the **Apply import** button becomes enabled. Click it to start the import. While processing, a spinner appears. You can click **Back** to return to step 1 or cancel the import.

After a successful import, you are returned to the form’s data list, where the new submissions appear.

!!! warning "Duplicate mapping"
    If you map the same form field to more than one file column, a validation error is shown and the **Apply import** button remains disabled until corrected.


## File format

We describe the procedure to import some bulk data using a Google Sheet generated Excel file. The same procedure holds for CSV files or if working directly with Excel. 

We suppose that you want to import data in a form called Projects that has 2 slides, one of which is a repeating slide:

![The Projects form, with two slides one of which is a repeating slide](../imgs/forms/import-repeating-slide.png)

The form Projects was created using the following XLSForm. The “survey” sheet is 

| type | name | label |
| ----- | ----- | ----- |
| **begin group** | **start** | **Start** |
| select\_one countries | country | Country |
| select\_multiple countries | country\_other | Other Countries |
| text | title | Project Title |
| date | project\_date\_start | Start date |
| select\_one donors | selected\_donor | Donor |
| integer | budget | Budget |
| boolean | isleader | Leading applicant |
| **end group** |  |  |
| **begin repeat** | **indicators** | **Indicators** |
| text | indic | Indicator description |
| integer | value\_indic | Value reached |
| **end repeat** |  |  |

and the “choices” is 

| list\_name | name | label |
| ----- | ----- | ----- |
| donors | ue | UE |
| donors | govita | ITALIAN GOVERNMENT |
| donors | un | UN |
| donors | pub | ALTRI DONATORI PUBBLICI |
| donors | la | ENTI LOCALI |
| donors | priv | DONATORI PRIVATI |
| donors | other | Others |
|  |  |  |
| countries | AFG | Afghanistan |
| countries | ALB | Albania |
| countries | DZA | Algeria |
| countries | ASM | American Samoa |

Follow these steps:

1. Create an empty file with only one sheet (file and sheet names do not matter).   
2. In the first row you need to put the names of the form fields and of the DINO-specific form fields. In this example, form fields can be:  
   1. **country**  
   2. **country\_other**  
   3. **title**  
   4. **project\_date\_start**  
   5. **selected\_donor**  
   6. **budget**  
   7. **isleader**  
   8. ***indic*** (\*)  
   9. ***value\_indic*** (\*)

   be careful that fields which are within repeating slides need to be treated differently (that’s why we put an asterisk). Please refer to the specific section below. 

   DINO-specific fields can be:

   10. **created\_at**. The form creation date. Specify this, only if you want your forms to have a  creation date different from the import date;  
   11. **user\_data\_ref\_id**. The ID of the user that will  be associated to the form (default is the ID of the user who is importing the forms);  
   12. **area\_id**. The ID of the metric AREA to be associated with the form;  
   13. \[area\_name\]  
   14. **case\_id**. The ID of the metric CASE to be associated with the form;  
   15. \[case\_name\]	  
   16. **project\_id**. The ID of the metric PROJECT to be associated with the form;  
   17. \[project\_name\]  
   18. \[project\_code\]  
   19. **location\_id**. The ID of the metric LOCATION to be associated with the form;  
   20. \[location\_name\]  
   21. **organization\_id**. The ID of the metric ORGANISATION to be associated with the form;  
   22. \[organization\_name\]

3. every row will correspond to a different new form. So, if we create a file with one header \+, let’s say, 5 rows of data, if the upload is successful, we will create 5 new forms in DINO.   
4. It is not necessary to have a column for every field of the form; it is not necessary to fill all rows of a given column, but If one field is empty for all rows, it can be left out,   
5. Date fields must be formatted YYYY-MM-DD as text (be careful).   
6. Single choice fields must contain one of the accepted options as specified in the “choices” (see the form builder or the XLSForm file).   
7. Multiple choice fields must be formatted according to the following pattern: \[opt1, opt2\] (i.e. a list of options in square brackets). 

For example, a valid file could be the following:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

In this case we are importing 2 forms, for both of them we are selecting only the metric AREA. Moreover, notice that we do not provide all form fields for all forms, but for the fields where we provide a value, we strictly follow the indications described above. 

### Dealing with metrics during import

During the import of some form data, as far as metrics are concerned, you might want to:

- create new metrics during the import  
- reuse metrics already  created

The rules to follow to correctly manage metrics are the following:

| METRIC | CREATE FROM UI | CREATE FROM IMPORT | CREATE \+ ASSIGN FROM IMPORT | USE FROM IMPORT | CREATE \+ ASSIGN FROM IMPORT (parent) | USE AS PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Case** | name | name | name | id, or name (with the reuse option), or both | name | id, or name (with the reuse option), or both |
| **Organization** | name | name | name | id, or name (with the reuse option), or both | name | id, or name (with the reuse option), or both |
| **Location** | name | name | name | id, or name (with the reuse option), or both | name | id, or name (with the reuse option), or both |
| **Area** | name | name | name | id, or name (with the reuse option), or both | name | id, or name (with the reuse option), or both |
| **Project** | name, code | name, code | name, code | id | name, code | id |

## Repeating slides

If you have field in repeating slides, they need to be named differently. Every field in the repeating slide need to be called \<field\_name\>\_\_X where X is the repetition number, from 0 (corresponding to one repetition) to N-1 where N is the total number of slide repetitions in that form.   
For example, suppose you have only 1 repetition of the repeating slide and you want to add both fields “Indicator description” and “Value reached”. You would need to add these two columns to your import file:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

So for example we could have:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

## Errors

Check the IDs in your file before importing. If a column refers to an entity by its ID (a metric or a user) and no entity with that ID exists in Dino, the imported forms cannot be synchronized with the server.
