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

![][image1]

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
5. Data field must be formatted YYYY-MM-DD as text (be careful).   
6. Single choice fields must contain one of the accepted options as specified in the “choices” (see the form builder or the XLSForm file).   
7. Multiple choice fields must be formatted according to the following pattern: \[opt1, opt2\] (i.e. a list of options in square brackets). 

For example, a valid file could be the following:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

In this case we are importing 2 forms, for both of them we are selecting only the metric AREA. Moreover, notice that we do not provide all form fields for all forms, but for the fields where we provide a value, we strictly follow the indications described above. 

### Dealing with metrics during import

During the import of some from data, as far as metrics are concerned, you might want to:

- create new metrics during the import  
- reuse metrics already  created

The rules to follow to correctly manage metrics are the following:

| METRICA | CREAZIONE DA UI | CREAZIONE DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT | UTILIZZO DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT (parent) | UTILIZZO PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Case** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Organization** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Location** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Area** | name | name | name | id oppure name (con opzione reuse), oppure entrambe | name | id oppure name (con opzione reuse), oppure entrambe |
| **Project** | name, code | name, code | name, code | id | name, code | id |

# Repeating slides

If you have field in repeating slides, they need to be named differently. Every field in the repeating slide need to be called \<field\_name\>\_\_X where X is the repetition number, from 0 (corresponding to one repetition) to N-1 where N is the total number of slide repetitions in that form.   
For example, suppose you have only 1 repetition of the repeating slide and you want to add both fields “Indicator description” and “Value reached”. You would need to add there three columns to your import file:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

So for example we could have:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

# Errors

If an error occurs during synchronization, the system will force a logout and no data is synchronized. This can happen when providing a wrong ID for some of the entities that are referred to by their IDs (like metrics and users). 

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAloAAAGACAYAAAB1Fsw+AAA/L0lEQVR4Xu2dB5hV5bmoPWn33px7k5xzUk6MiYIoFhRRLCgeEmJI0CBGEcVIEEQCajAgghIUUAiCDTAoIBhBIlJVRESUXkRpghQBpfcy9F7+y/eP/2Ltb+01s/6ZPcye4X2f531WX7sm6/Xfmz1nfO973zPf+c53zDe+8Q3zzW9+006dbvmb3/jmCXOnbjllv5jl3ONyTV1/cr/wberj0q2302/q407e37THucfx9XG5509/Pj2fcpw9NrQ+dP+9jlP7hu9/5Lg0583ruG8lPM7tp4/Xx7n7bfdPc5zbHrltdX/SHpfuPqv7UeDjvpVme+i4k9tCx8nj+9a3Eh739e0kOC7YT0/jHkcBjsudT30O4o6LnF89d269aJ/3mOPkMaced/L9kfI4Eh7nbk9eu7jjwo/ZPV73GMLHBevyOC7YNwPHhafh43Kn6Y8Lnockx4X2D/YLnp+Tz7t937v7le9x7nZijgsdr28veO7zO05tC/ZJd5xd/vp/S1//7zf1+U89Z7DP18vftttOHhu+P7LNbg+dwy27bbnHn7xdt8+3v31y//B53DZ33Mnz595GuuPcY0i9/18vh243vD33eU99bwb7f31sWuU49d6MPS603f5vMDQf3s+tT3pcftellPlvRK9n2sIeJ9N0+9r5r6/nuedMXZ/fcfp2f/C975vzy51vrr7yGnPNCc+44MKLzTllzjU//8U5iIiIiFhAzz6nrLnwogqm+q9vMD8/6+fmvHPPN2fonRARERGxcF50IriuuKIyoYWIiIhYFFaqdEX2h9bFF19qKla8ArNEeT30a4SIiIjpzerQ0hd5zB71a4WIiIhRsza09IUds0/9miEiImKqeYbWE1ddafbeWsvMqfkbU/bsMpHtdp8GF5u9I6rYqd7m/M6rVc2/jatuftC4YmRbnPqijtmnfs0QEREx1djQkrAyt9dOUe+zsM+Vxrx3beCivldG9vn269ebM6bcEPjtQddH9kmnvqiLF12U/vta5ctfHFmHRa9+zRARETHV2NCSUaz8QiscWU69TziynHqfdOqLunjWWb8wP//52ebss8uaSy+tZM45p6xd/u53vxfZF4te/Zql87PP5kfWISIini7GhtbhOjdnXWiJZ/68jPnRmRJX37fTn/3s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gcNNy24vBbcj07xCS6YdXxpg/t73X5HzF7WEVmbUb0BERMTSbKLQkqmEVdjwtoIq38HS67JVQisz6jcgIiJiaTZRaOWl3r+0SmhlRv0GRERELM3mG1qYK6GVGfUbEBERsTRLaCWU0MqM+g2IiIhYmiW0ElpcoXXg+CG9KoDQQkREzG4JrYQmCa29e/eaMmXKmAoVKpj9+/ebbdu26V0sM2bM0KvSUn7ZX82da7vr1QFxoXX33XebJYuXRNa//NLLpkqVKmb5suWRbeKsWbMi63wtt+QvZvHypZH1Tv0GRERELM0SWglNElobN260ofXBBx+Y3bt3m4kTJ5qWLVua+fPnm7Zt25q6deuaxYsXm2rVqulDI/zXkkbm0PEjenUKeYXW9GnTTf369c3NN99sOnXqZAYPHmxD64YbbjDPdHvGDB823IwYMcLUq1fPPN3laTP63dFm0KBB5sYbbzTvjX7PTJo4yVxe6XLz7qh3zT333GNuu+22yO2E/XDZTHuf84osUb8BERERS7OEVkKThNbYsWPNrl27zNSpU8348ePNokWLbGC9++67pnnz5qZ///7m2LFjpnbt2inHvZIzPmVZRrLyiywhv9Dq0qWLjboHHnjALFq4KAitZs2a2eVZn84yNX9X07R/or15f8z7VtkuI14SYk2aNLHnGzlipGl8b+OU22i29KVgPmlkifoNiIiIWJoltBKaJLRycnLsiJa4c+dOGzmvvvqqXZaRIwktoWHDhub48ePBcRP3LjJtNg2y8/l9XBgmaWiN/2i8Oeuss4LQmjplql2eM3uOueSSS+z80KFDzVVXXWXvrywvmL/AhtaypctM1apVTbeu3VJu46dLmpimX8dW0sgS9RsQERGxNEtoJTRJaBWGM7/4s/npF00SR5YQF1qnSomtny65L3FkifoNiIiIWJoltBJa1KFVEIo7tAqifgMiIiKWZs/QF29ID6GVGfUbEBERsTRLaCWE0MqM+g2IiIhYmiW0EkJoZUb9BkRERCzNEloJIbQyo34DIiIilmYJrYQQWplRvwERERFLs4RWQgitzKjfgIiIiKVZQishOrQWL11uTv7kaPFQ0kJr1eo1kTcgIiJiaZbQSogOLURERMT8JLQSQmghIiKir4RWQggtRERE9DVRaJUrV85aGAYPHmy6detmXnzxRb2pREBoISIioq+JQqtM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>