The `@dino/material/list` module provides a Selection List component, its List Datasource and its Column Selector.
This is built upon the material "mat-table" component and the "MatTableDataSource" class, and extends the core List class in the 
`@dino/core/list` module.

The Selection List component is a sortable and filterable generic Table, with selection and bulk/individual action functionalities.
A sorting, a paginator and filtering components can be associated to it.
It allows the deletion, editing and inspection of the element rows.

The List Data Source provides the actual data to the Selection List, by generating queries and forwarding them to the Data Model Manager relative
to list Model.
It takes a string of query parameters from the FiltersService, when filters are present, and generates a Mango Query from it.

The Colums Selector is a dialog component associated with the Selection List. Its purpose is to allow the choice of which columns to display
in the table.



