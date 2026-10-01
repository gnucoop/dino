---
title: Managing Languages
description: How to manage the translations of Dino — find a key, translate it in every language, add or rename keys, and import or export a language file.
---

# Managing Languages

The **Languages** page allows administrators to manage all the translated text used throughout Dino. Every piece of text has a **translation key** — usually the English text itself — and one value for each available language. From here you can find a key, translate it, add new keys, and import or export the whole dictionary of a language.

![Main view of the Languages page](../imgs/administration/languages.png)

The page header shows a summary of your translation coverage: the total number of translation keys and the percentage that is complete. Below the header, the page is split into two areas — the list of translation keys on the left and the detail of the selected key on the right.

!!! warning "Administrator access only"
    This area is only visible to users with the Administrator role. If you cannot see it in the navigation, contact your system administrator.

---

## Browsing Translation Keys

Each row of the list shows a key and, in a ring on its left, the percentage of languages that already translate it. If the text contains dynamic placeholders, such as `{{language}}`, they are listed under the key.

### Searching and Filtering the List

- Type in the **Search key or text…** field to find a key. The search looks both in the keys and in their translations.
- Use the two buttons next to the search field to choose what is listed:
    - **All keys** — every translation key.
    - **To translate** — only the keys that are still missing in at least one language.

The search and the filter work together: with **To translate** selected, the search looks only among the keys still to translate.

---

## Translating a Key

1. Click a key in the list. Its detail opens on the right.
2. The detail shows one card per language, marked **Translated** or **Missing**, with a text box holding its value.
3. Type the translation in the box of each language you want to complete.

There is no save button: each change is saved automatically a moment after you stop typing. The header of the detail shows **Saving…** while it is being stored and **Saved** when it is done; if something goes wrong it shows **Save failed**. A progress bar next to it shows how many languages translate the key.

!!! tip "Placeholders"
    Keep the placeholders of the key, such as `{{language}}`, unchanged in every translation: Dino replaces them with the actual value when it shows the text. They are highlighted in the key shown at the top of the detail.

### Renaming or Removing a Key

At the top of the detail, next to the key:

- **Rename key** (pencil icon) — turns the key into an editable field. Type the new key and press **Enter**, or click outside the field, to apply it; press **Esc** to cancel.
- **Remove** (bin icon) — deletes the key and all its translations, after you confirm with **Yes**.

!!! warning "Keys are used by the application"
    Dino looks texts up by their key. Renaming or removing a key the application uses makes that text appear untranslated, so change keys only when you know where they are used.

---

## Adding a New Translation Key

1. Click **Translation** (plus icon) in the page header. The **New translation** dialog opens.
2. Type the **Key**. It is mandatory. Use `{{` and `}}` around a name, such as `{{name}}`, for dynamic placeholders.
3. Optionally fill in the translations: the dialog lists every available language, and a counter shows how many you have filled. The languages you leave empty stay marked as missing, and you can complete them later from the detail.
4. Click **Save translation**, or **Undo** to close the dialog without adding the key.

---

## Working with a Whole Language

Click **All languages** in the page header to open the dialog that shows the complete dictionary of each language.

1. On the left, pick a language from **Available languages**. Use **Search language…** to find it in a long list. A colored dot next to each language shows how complete it is; hover over a language to see how many values it has.
2. On the right, the dialog shows a read-only preview of the selected language: each key with its value, or *Missing*. Use **Search in file…** to look for a key or a value. Single translations are edited from the main page, not here.
3. The footer shows how many values are present out of the total.

### Exporting a Language

Click **Export** followed by the language code (for example **Export ITA**). Dino downloads a JSON file named after the language, such as `ita.json`, with the keys that the language translates. Keys that are still missing are left out.

### Importing a Language File

1. Select the language you want to update.
2. Click **Import file** and choose a `.json` file. The dialog checks it and shows **Valid JSON** or **Invalid JSON**; a valid file is shown in the preview with its name and number of rows.
3. Click **Save** to store it. **Save** is enabled only after a file has been imported.

The values in the file replace the existing values with the same key; the keys that are not in the file keep their current values. Nothing is stored until you click **Save**: **Close** discards the imported file.

!!! tip "Translating outside Dino"
    To have a language translated by someone without access to Dino, export it, have the JSON file completed, then import it back into the same language.

---

## Related Pages

- [Interface](../interface/index.md) — how to change the language in which you use Dino.
- [Users List](users-list.md) — manage the users who can access this page.
