The `@dino/material/user-area` module provides the routed page containing all the editable
settings of a User Account, grouped in tabs: the password, the DINO-AI key and credits, the
Dino theme, data backup and restore, and the guided tour.

The active tab is driven by the host through `activeTab` / `tabChange`, so the application
can keep it in the url without the component knowing the route it is mounted at.
