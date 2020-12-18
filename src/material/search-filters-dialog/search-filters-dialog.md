The `@dewco/material/search-filters-dialog` module provides a Dialog component containing all the non-basic (additional) filters, each displayed as
an individual widget, associated with a Selection List and a main filtering component (such as `@dewco/material/search-filters-bar` SearchFiltersBar).

The dialog content is a "mat-tab" component that identifies each group of filters with a single tab.
Each tab contains all the filters of its group, displayed as Widgets.

All the filters added, removed or modified in the Dialog, are stored in a temporary list of filters.
They are applied to the Selection List by clicking on the "Search" button.
