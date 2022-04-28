The `@dino/material/search-filters-preset-manager` module provides a Preset Manager component, that takes care of loading and saving presets
of Filters, as encoded strings of query parameters.
It is associated with a main filtering component, and communicates with it via the `@dino/core/list` FiltersService.

It retrieves and saves presets in the browser LocalStorage, showing the ones available as options in a "mat-autocomplete" component.
