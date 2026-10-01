---
title: Edit a Form Submission
description: Learn how to edit an existing form submission in Dino, including form metrics, drafts, and saving your changes.
---

# Edit a Form Submission

The Edit Form screen lets you modify a submission that has already been saved. You see the same form interface used for data entry, but with all previously saved answers already filled in. From here you can correct values, complete missing information, or save your progress as a draft and finish later.

![Main view of the Edit Form page](../imgs/forms/edit-form.png)

## How to Open a Submission for Editing

1. Go to the [Forms](index.md) page.
2. Open the form schema that contains the submission.
3. Locate the submission you want to change in the list of submissions.
4. Hover over its row and click the **Edit** (pencil) icon, or click the row to select it and click **Edit** in the action bar above the table. The Edit Form screen opens with the saved data loaded.

## Working with Form Metrics

If your form uses metrics, the screen opens on the **Form Metrics** step before showing the questionnaire. These values decide how the submission is dated and grouped in reports and aggregations — they are not part of the questionnaire itself.

1. Review or change the **Creation Date** by clicking **Change** and picking a new date.
2. Fill in any metric fields shown, such as location, project, or organization.
3. If the form schema has statuses, pick the **Form Status** of the submission.
4. Click **Fill the Form** to move on to the questionnaire. When you opened the submission with **View**, the button reads **View the Form**.

!!! tip "Creating a new metric on the fly"
    If a metric you need does not exist yet, click **New** next to the metric field to create it without leaving the form. This option only appears if you have permission to create metrics.

![The Form Metrics step](../imgs/forms/index-create.png)

## Editing Your Answers

Once the questionnaire is displayed, you can change any field you have permission to edit. Depending on how the form was set up, fields may be arranged in one, two, or three columns, and some may be validated as you type.

1. Click into a field and update its value.
2. Move through the remaining steps or sections of the questionnaire.
3. When you are finished, choose an action at the top of the form:
    * **Save form**: Saves all your changes and updates the submission.
    * **Save draft**: Stores your current changes without finalizing them, so you can return and continue later. This button only appears if drafts are enabled for your form.

!!! tip "Tracking changes"
    When the logs module is enabled for your Dino instance, Dino records the changes made to each submission. Select a submission in the list and click **View History** in the action bar to see who changed what and when.

!!! warning "Editing critical data"
    Other reports or analyses may depend on the values in this submission. If you are correcting a serious error, consider whether a new submission might be more appropriate than changing an old one.

## Reviewing the Submitted Form

If you open a submission with the **View** action instead of **Edit**, the form opens in read-only mode. All fields are visible but cannot be edited, and the save actions are unavailable. Use this view to verify what was recorded.

![Compiled form view after clicking View the Form](../imgs/forms/edit-form-view.png)

## Related Actions

* To change the structure of the form itself — its fields, sections, and validation rules — see [Edit Form Schema](edit-form-schema.md).
* To understand how fields relate to each other and how dependencies behave, see the relationships options in [Edit Form Schema](edit-form-schema.md).
* To view submissions on a map, see [Forms Map](forms-map.md).
* To create a brand new submission instead, start from the [Forms](index.md) page.