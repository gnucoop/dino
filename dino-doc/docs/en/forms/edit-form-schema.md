---
title: Edit Form Schema
description: Learn how to create and edit form schemas in Dino to define the structure of your data collection forms.
---

# Edit Form Schema

The **Edit Form Schema** page lets you design or modify the structure of a form — the fields, their types, validation rules, and how they relate to one another. You can create a brand-new schema or update an existing one.

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Create a New Form Schema

1. From the **Forms** section, click **Create Form Schema**.
2. Enter a **Name** and optionally a **Description** for the schema.
3. Add fields using the **Add Field** button. For each field you can set:
   - **Field Label** – the question or prompt shown to data collectors.
   - **Field Type** – e.g., text, number, date, select, geolocation.
   - **Required** toggle – makes the field mandatory.
   - **Validation** rules – like min/max values, allowed file extensions, etc.
4. Rearrange fields by dragging them into the desired order.
5. Click **Save** to create the schema.

## Edit an Existing Form Schema

1. Navigate to the **Forms** page and click on the schema you want to modify.
2. Click the **Edit** button (or open the schema’s actions menu and select **Edit**).
3. The editor opens with all existing fields loaded. You can:
   - Add new fields.
   - Edit existing field settings by clicking on the field.
   - Delete a field using its trash icon.
   - Reorder fields by drag-and-drop.
4. Click **Save** to apply your changes.

!!! warning "Editing a schema that already has submissions"
    Changing field types or removing fields may affect existing submissions. Dino will warn you before saving if any incompatibilities are detected.

## Defining Field Relationships (Dependencies)

You can set up conditional logic so that certain fields only appear when a specific value is selected in another field.

1. While editing a schema, select a field that you want to be conditional.
2. Click the **Relationships** tab or button.
3. In the dialog that opens, choose the **parent field** and the **value** that must be selected for this field to be shown. You can also add multiple conditions (AND/OR logic).
4. Click **Apply** to save the relationship.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Testing dependencies"
    After saving the schema, you can test your conditional logic by opening the form in the [Edit Form](edit-form.md) view and verifying that dependent fields appear or hide correctly.

## Next Steps

Once your form schema is ready, you can [create a form instance](edit-form.md) based on it, or use the schema in a [Forms Map](forms-map.md) to assign it to specific areas and collectors.