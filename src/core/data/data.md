The `@dino/core/data` module provides a generic service to perform CRUD operations and interact with [RxDb](https://rxdb.info) Collections and Documents.
The Data model manager represents the core class for all the Model Managers, and provides crud functionalities for the specific Model, within its collection.

The data service also takes care of the synchronization of the local RxDb collections to the remote database, via the [Hasura](https://hasura.io) backend.

