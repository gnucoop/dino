---
title: Managing Form Schemas
description: How to create and edit form schemas in Dino, including the form builder, statuses, metrics, and import options.
---

# Managing Form Schemas

Form schemas define the structure and fields used when collecting data. Administrators and users with the appropriate permissions can create new schemas, edit existing ones, and configure how they behave.

![Managing Form Schemas](../imgs/forms/managing-templates.png)

!!! warning "Permission required"
    Managing form schemas requires specific permissions. If you cannot see the create or edit options, contact your administrator.

---

## Accessing Schema Management

From the Data Collection hub, navigate to the schema you want to edit and click its **edit** action, or use the navigation to reach the **Create** option for a new schema. Both paths open the same schema editor.

---

## Schema Settings

At the top of the editor, fill in the following fields before designing the form structure:

- **Form Name** — a unique internal identifier for this schema. An error will appear if the name is already in use.
- **Form Label** — the display name shown to users in the interface.
- **Icon Set** — choose between *Default* (standard icons) and *Humanitarian* (icons specific to humanitarian contexts).
- **Icon Identifier** — type to search for and select the icon that represents this form.
- **Form Statuses** — select one or more workflow statuses that entries created with this schema can move through. You can also create new statuses or edit existing ones inline: click the **edit** icon next to a status, or select **Create new Status** at the bottom of the dropdown.
- **Form Metrics** — select the metric types (such as project, location, or organisation) that entries created with this schema will be linked to.
- **Visibility** — set to *Private* (accessible only to authorised users) or *Public* (shareable via a public link).
- **Metrics Set Behavior** — *Default* allows multiple entries with the same metric combination; *Unique* prevents duplicate metric sets for this form.
- **Generate Report** — if set to *Yes*, an automatic report will be generated and linked to this schema when it is saved. This option is only shown if no auto-report already exists for the schema.

---

## Building the Form Structure

The lower section of the page contains the form builder, where you can add, arrange, and configure the fields that will appear when users fill in this form.

Use the form builder controls to:

- Add new fields (text, number, date, file, choice, and more)
- Organise fields into pages or sections
- Set field labels, hints, and validation rules

The **Save** button remains disabled if the form builder reports any validation errors. Resolve all errors before attempting to save.

---

## Importing a Form Structure

If you have an existing form definition in XLSForm format, you can import it instead of building the structure manually.

1. Click the **Import** button in the toolbar.
2. Select your XLSForm file from your device.
3. Review the imported structure in the form builder.
4. Make any adjustments needed, then save.

---

## Configuring Relationships

!!! note "Existing schemas only"
    The Relationships button is only available when editing an existing schema, not when creating a new one.

Click the **Relationships** button to open the relationships editor. This lets you link fields in this form to data from other forms, so that certain field values or dropdown choices can be pre-filled based on related form data.

---

## Saving the Schema

Click **Save** to save the schema. A confirmation message will appear briefly at the bottom of the screen.

After saving, you will be returned to the Data Collection hub.

!!! warning "Oops! Something went wrong saving the Form"
    If an error message appears when saving, check that the **Form Name** and **Form Label** fields are filled in and that the Form Name is not already used by another schema. If the problem persists, contact your administrator.