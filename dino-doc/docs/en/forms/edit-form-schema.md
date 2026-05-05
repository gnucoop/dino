---
title: Edit Form Schema
description: Create or modify form schemas in Dino to define the structure of your data collection forms.
---

# Edit Form Schema

The Edit Form Schema screen is where you create new form schemas or modify existing ones. A form schema defines the structure, fields, and validation rules for the forms used to collect data in Dino.

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

On this screen, you can add, remove, and configure the fields that will appear in your data collection form.

## Creating a New Form Schema

1.  Navigate to the **Forms** section in the main menu.
2.  Click the **Create Form Schema** button.
3.  You will be taken to the Edit Form Schema screen with a blank canvas.

## Editing an Existing Form Schema

1.  From the **Forms** list, find the schema you want to edit.
2.  Click the **Edit** button (often represented by a pencil icon) next to the schema's name.
3.  You will be taken to the Edit Form Schema screen with the current schema loaded.

## Working with Fields

The main area of the screen is the form builder, where you construct your schema.

### Adding a Field

1.  In the sidebar or toolbar, locate the list of available field types (e.g., Text, Number, Date, Dropdown).
2.  Click on a field type or drag and drop it into the form preview area on the right.

### Configuring a Field

Once a field is added to your form, you can configure its properties.

1.  Click on the field in the preview area. Its properties panel will open, typically on the left side of the screen.
2.  Configure the field's details:
    *   **Label:** The text users will see next to the field.
    *   **Key/Name:** The internal identifier for the field in the data.
    *   **Required:** Toggle whether users must fill in this field.
    *   **Default Value:** Set a value that appears automatically.
    *   **Help Text:** Add instructions or clarifications for users.
    *   **Validation:** Set rules like minimum/maximum length or value ranges.

### Reordering or Removing Fields

*   To change the order of fields, drag and drop them within the preview area.
*   To remove a field, select it and click the delete (trash can) icon, usually found in the field's properties panel or a toolbar above it.

## Saving Your Schema

After building your form, you must save it.

1.  Click the **Save** or **Update** button at the top of the screen.
2.  You will be prompted to enter a **Name** and optionally a **Description** for your schema if you are creating a new one.
3.  Click **Confirm**. You will be redirected back to the Forms list, where your new or updated schema will appear.

!!! tip "Preview Your Form"
    Use the preview area on the right to see how your form will look to users as you build it. This helps ensure the layout and flow are correct.

!!! warning "Test Before Use"
    After saving a schema, it's a good practice to create a test submission using the [Edit Form](edit-form.md) feature to verify all fields work as expected before using it for live data collection.