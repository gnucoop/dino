# List of all entry-points of the Dino core package.
entryPoints = [
    "breadcrumbs",
    "breakpoint-observer",
    "collect",
    "create-form",
    "create-report",
    "edit-form",
    "export-form",
    "edit-form-schema",
    "edit-report",
    "edit-report-schema",
    "floating-button",
    "form-metric-selector",
    "icons-service",
    "list",
    "login",
    "lang-selector",
    "main-nav",
    "metric-editor",
    "metric-section",
    "mixed-editor",
    "search-filters-bar",
    "search-filters-chips",
    "search-filters-dialog",
    "search-filters-preset-manager",
    "search-filters-widget",
    "user-editor",
]

scssOnlyEntryPoints = [
    "button",
    "card",
    "cdk-drop-list",
    "checkbox",
    "chips",
    "datepicker",
    "dialog",
    "form-field",
    "icon",
    "grid",
    "paginator",
    "select",
    "sidenav",
    "slide-toggle",
    "table",
    "tabs",
]

# List of all non-testing entry-points of the Dino material package.
MATERIAL_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not "/testing" in ep
]

# List of all testing entry-points of the Dino material package.
MATERIAL_TESTING_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not ep in MATERIAL_ENTRYPOINTS
]

# List of all entry-point targets of the Dino material package.
MATERIAL_TARGETS = ["//src/material"] + ["//src/material/%s" % ep for ep in MATERIAL_ENTRYPOINTS]

# List of all testing entry-point targets of the Dino material package.
MATERIAL_TESTING_TARGETS = ["//src/material/%s" % ep for ep in MATERIAL_TESTING_ENTRYPOINTS]

MATERIAL_SCSS_LIBS = [
    "//src/material/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in MATERIAL_ENTRYPOINTS + scssOnlyEntryPoints
]
