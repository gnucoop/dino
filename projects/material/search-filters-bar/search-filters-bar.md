The `@dino/material/search-filters-bar` module provides a main filtering component that can be associated to a Selection List
ad it's usually displayed as a toolbar on top of it.
It displays the default basic filters, inherited from `@dino/core/list` SearchFiltersComponent, and allows the setting and displaying of 
additional basic filters.

When additional filters generated from the "data" attribute of the List model are present, it displays a button for opening a secondary
filtering component (usually a Dialog) containing the additional filters.
