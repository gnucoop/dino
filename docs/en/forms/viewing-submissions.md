---
title: Viewing & Managing Submissions
description: How to browse, search, view, edit, export, and manage form submissions in Dino.
---

# Viewing & Managing Submissions

This page shows all submissions for a specific form schema. You can browse, search, view details, edit, export, and manage individual entries from this list.

---

## Browsing the List

The list displays all submissions for the selected form. The total number of entries matching your current filters is shown at the top.

Use the **pagination controls** to move between pages, or jump to the first or last page.

You can also change which **columns** are visible by clicking the **column selector button** (grid icon) in the table header.

---

## Searching and Filtering

A filter bar above the list lets you narrow down which entries are shown:

- **Keyword search** — type any word to filter entries whose fields contain that text.
- **From date / To date** — show only entries created within a date range.
- **Metric filters** — filter by project, location, area, case, organization, or other linked data.
- **Status filter** — show only entries with a specific workflow status.
- **User filter** — show only entries created by a specific user or user group.
- **Saved filters (presets)** — save your current filter combination as a preset for quick access later. Use the preset menu in the filter bar to save, load, or delete presets.

To remove a filter, click the **×** inside that field.

---

## Row Actions

Each row has a set of action icons on the right. The actions available depend on your permissions:

- **View** (eye icon) — open the entry in read-only mode.
- **Edit** (pencil icon) — open the entry for editing.
- **Print** (printer icon) — generate a PDF version of the entry.
- **Export as Word** (document icon) — download the entry as a Word document.
- **Duplicate** (copy icon) — create a new draft entry pre-filled with this entry's data.
- **Delete** (bin icon) — permanently delete the entry. A confirmation prompt will appear.
- **Print badge** (badge icon) — generate a badge document for this entry (available if the form is linked to a case).
- **View log** (history icon) — see the history of changes made to this entry.

!!! note "Permission-based actions"
    Not all actions are visible to every user. The actions shown depend on your assigned permissions. Some actions, like edit or delete, may only be available if the entry's status allows it.

---

## Bulk Actions

To act on multiple entries at once:

1. Select the entries you want to manage by ticking the checkbox on their rows.
2. Use the **bulk action** buttons that appear in the toolbar to delete or edit all selected entries at once.

!!! warning "Bulk edit restrictions"
    Bulk editing is only available if all selected entries have a status that permits editing.

---

## Adding a New Entry

Click the **+ button** (floating circular button at the bottom-right of the page) to open a blank form and record a new submission.

---

## Importing Entries

Click the **import button** (cloud upload icon, floating button at the bottom-right) to bulk-import entries from a file.

---

## Exporting the List

Click the **Export button** (download icon) in the filter bar to download the current list of entries as a file.

---

## Viewing Data on a Map

If submissions include geographic data, click the **Map button** in the filter bar to open the [Map View](map-view.md) for this form.