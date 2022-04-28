The `@dino/core/list` module provides the core List class for the creation of lists and tables with row/element selection and filtering capabilities.

The List class also handles and calls the appropriate method for any action to be performed on a single element or a selection of elements in the list
(Eg. Delete, Edit, View etc.).

The SearchFiltersComponent class represents the core class of all the basic filtering components that can be associated with the list or table.
It provides the default filters Keywords and Date of creation From/To.

The FiltersService handles all the filtering perfomed on the list or table data.
It maintains the state of all Filters and is responsible for their updating and the communication between the list or table, all of its associated
Filters Components and the List Data Source.

The FiltersService generates all the basic filters from the properties of the Model Schema provided by the List Data Source.
It also takes care of updating all the filters when loading a Filters Preset, and builds a string of query parameters from the filters values, that
is sent to the List Data Source.
