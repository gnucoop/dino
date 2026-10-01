---
title: Public Forms
description: How to access, fill out, and submit a public form in Dino without needing an account.
---

# Public Forms

Public forms allow anyone with a link to submit data to Dino without needing to log in or have an account. This is commonly used for surveys, registrations, or feedback collection. If you have received a public link to a form, you can use this page to complete it.

Public form addresses follow the pattern `/f/` followed by a unique identifier (e.g., `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). The identifier is the ID of the form schema. If any metric value is to be added to the form data, this can be included in the url using the following syntax (e.g. for the metric case): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
where the metric value ID is again the ID of the metric assigned by Dino.

There is no need to remember this syntax since the link is generated automatically by Dino once you click on the share icon of the form schema. Once generated, the link can be shared by email, WhatsApp or any other mechanism.

---

## Accessing a Public Form

1.  Click the public form link you received (e.g., via email or a shared message). The link will direct you to `/f/...` on your Dino instance.
2.  The form will open directly in your web browser. You do not need to sign in.
3.  Review the form title and any introductory text to confirm it's the correct form.

A language selector in the top bar of the screen lets you choose the language of the form. Use it to switch the form to the language you prefer before you start filling it out.

If the form includes multiple sections, a progress bar is shown beneath the title so you can see how far along you are.

!!! tip
    Public form links contain a long identifier (like `/f/abc123def`). If the page doesn't load, ensure the entire link was copied correctly.

---

## Completing and Submitting

1.  Fill in all the fields on the form. Fields marked with an asterisk (*) are **required**.
2.  If the form has multiple sections, use the **Next** and **Previous** buttons at the bottom of the form to move between them. The section title is shown at the top of each step.
3.  As you fill out fields, the form validates your input. Invalid entries are typically highlighted.
4.  Once all required fields are valid, the **Send** button becomes active.
5.  Click **Send** to submit your data.

!!! warning
    The **Next** button stays disabled if the current section is not yet valid, and the **Send** button stays disabled (greyed out) if any required field is empty or contains invalid data. Review the current section, or navigate back through earlier sections, to find and correct any highlighted issues.

---

## After Submission

Upon a successful submission, you will see a confirmation screen with a checkmark and the message: **"The form has been successfully submitted."**

A notification also appears at the bottom of your screen for a few seconds. Click **Fill out another one** in it to reload the page with a fresh, empty copy of the same form, allowing you to make another submission.

---

## Troubleshooting

### The Next or Send button is disabled.
This means the current section or the form as a whole is not yet valid. Check for:

*   **Empty required fields**: Ensure all fields marked with an asterisk (*) are filled.
*   **Invalid data**: Look for fields highlighted in red and correct the information (e.g., an invalid email format).

### "This form cannot be opened because some required information is missing from the link."
The link you used is incomplete. Some forms require metric information (such as a case, location, or organization) to be included in the address.

*   Contact the person who sent you the form link and ask them to share the complete link.

### "Unable to save form."
Your submission encountered a temporary error, often related to your internet connection.

1.  Check your internet connection.
2.  Click **"Try again"** in the notification at the bottom of the screen. This reloads the page with an empty form: **the answers you typed are lost** and you need to fill them in again.
3.  If it continues to fail, contact the person who sent you the form link.

### "Oops! We could not find this Form Schema."
The link you are using is incorrect or the form has been removed.

*   Verify you have the complete, correct URL.
*   Contact the person who shared the link with you for an updated one.

### The form does not load (blank page).

*   Refresh your browser page.
*   Ensure your internet connection is stable.
*   Confirm the link is complete and has not been truncated.

---

## Related Pages

*   [Forms](../forms/index.md)
*   [Edit Form Schema](../forms/edit-form-schema.md)
*   [Languages](../administration/languages.md)
*   [Metrics](../metrics/index.md)