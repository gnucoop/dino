# Each individual package uses a placeholder for the version of Angular to ensure they're
# all in-sync. This map is passed to each ng_package rule to stamp out the appropriate
# version for the placeholders.
AJF_PACKAGE_VERSION = "^13.0.0 || ^14.0.0-0"
ANGULAR_PACKAGE_VERSION = "^13.0.0 || ^14.0.0-0"
ANGULAR_MATERIAL_PACKAGE_VERSION = "^13.0.0 || ^14.0.0-0"
APOLLO_ANGULAR_PACKAGE_VERSION = "^3.0.0"
APOLLO_CLIENT_PACKAGE_VERSION = "^3.5.0"
GRAPHQL_PACKAGE_VERSION = "^16.3.0"
POUCHDB_PACKAGE_VERSION = "^7.0.0"
RXJS_PACKAGE_VERSION = "^6.5.3 || ^7.0.0"
RXDB_PACKAGE_VERSION = "^10.0.0"
STWS_PACKAGE_VERSION = "^0.9.16"
TSLIB_PACKAGE_VERSION = "^2.3.0"
UUID_PACKAGE_VERSION = "^8.0.0"

# Each placeholder is used to stamp versions during the build process, replacing the key with it's
# value pair. These replacements occur during building of `npm_package` and `ng_package` stamping in
# the peer dependencies and versions, primarily in `package.json`s.
NPM_PACKAGE_SUBSTITUTIONS = {
    "0.0.0-AJF": AJF_PACKAGE_VERSION,
    "0.0.0-ANGM": ANGULAR_MATERIAL_PACKAGE_VERSION,
    "0.0.0-NG": ANGULAR_PACKAGE_VERSION,
    "0.0.0-APOLLO_ANGULAR": APOLLO_ANGULAR_PACKAGE_VERSION,
    "0.0.0-APOLLO_CLIENT": APOLLO_CLIENT_PACKAGE_VERSION,
    "0.0.0-GRAPHQL": GRAPHQL_PACKAGE_VERSION,
    "0.0.0-POUCHDB": POUCHDB_PACKAGE_VERSION,
    "0.0.0-RXDB": RXDB_PACKAGE_VERSION,
    "0.0.0-STWS": STWS_PACKAGE_VERSION,
    "0.0.0-TSLIB": TSLIB_PACKAGE_VERSION,
    "0.0.0-UUID": UUID_PACKAGE_VERSION,
    # Version of the local package being built, generated via the `--workspace_status_command` flag.
    "0.0.0-PLACEHOLDER": "{BUILD_SCM_VERSION}",
    # Version of `rxjs`
    "0.0.0-RXJS": RXJS_PACKAGE_VERSION,
}

NO_STAMP_NPM_PACKAGE_SUBSTITUTIONS = dict(NPM_PACKAGE_SUBSTITUTIONS, **{
    # When building NPM packages for tests (where stamping is disabled),
    # we use `0.0.0` for the version placeholder.
    "0.0.0-PLACEHOLDER": "0.0.0",
})

ANGULAR_PACKAGES_CONFIG = [
    ("@angular/animations", struct(entry_points = ["browser"])),
    ("@angular/cdk", struct(entry_points = ["a11y", "accordion", "bidi", "coercion", "collections", "drag-drop", "keycodes", "layout", "observers", "overlay", "platform", "portal", "scrolling", "stepper", "table", "text-field"])),
    ("@angular/common", struct(entry_points = ["http/testing", "http", "testing"])),
    ("@angular/compiler", struct(entry_points = ["testing"])),
    ("@angular/core", struct(entry_points = ["testing"])),
    ("@angular/forms", struct(entry_points = [])),
    ("@angular/material", struct(entry_points = ["autocomplete", "button", "button-toggle", "bottom-sheet", "card", "checkbox", "chips", "core", "datepicker", "dialog", "divider", "expansion", "form-field", "grid-list", "icon", "input", "list", "menu", "paginator", "progress-bar", "progress-spinner", "radio", "select", "sidenav", "slide-toggle", "slider", "snack-bar", "sort", "stepper", "table", "tabs", "toolbar", "tooltip"])),
    ("@angular/platform-browser", struct(entry_points = ["testing", "animations"])),
    ("@angular/platform-server", struct(entry_points = [], platform = "node")),
    ("@angular/platform-browser-dynamic", struct(entry_points = ["testing"])),
    ("@angular/router", struct(entry_points = [])),
]

THIRD_PARTY_NG_PACKAGES_CONFIG = [
    ("@ajf/core", struct(entry_points = ["barcode", "calendar", "chart", "checkbox-group", "common", "file-input", "forms", "image", "map", "node-icon", "page-break", "page-slider", "range", "reports", "table", "transloco", "text", "time", "utils"])),
    ("@ajf/material", struct(entry_points = ["barcode", "calendar", "checkbox-group", "forms", "form-builder", "image", "monaco-editor", "node-icon", "page-slider", "reports", "time"])),
]

THIRD_PARTY_PACKAGES_CONFIG = [
    ("@ngneat/transloco", "ngneat-transloco", struct(entry_points = [])),
]

ANGULAR_PACKAGES = [
    struct(
        name = name[len("@angular/"):],
        entry_points = config.entry_points,
        platform = config.platform if hasattr(config, "platform") else "browser",
        module_name = name,
    )
    for name, config in ANGULAR_PACKAGES_CONFIG
]

THIRD_PARTY_NG_PACKAGES = [
    struct(
        name = name.replace("@", "").replace("/", "_"),
        entry_points = config.entry_points,
        platform = "browser",
        module_name = name,
    )
    for name, config in THIRD_PARTY_NG_PACKAGES_CONFIG
]

THIRD_PARTY_PACKAGES = [
    struct(
        name = name,
        main_entry_point = ep,
        entry_points = config.entry_points,
        platform = "browser",
        module_name = name,
    )
    for name, ep, config in THIRD_PARTY_PACKAGES_CONFIG
]
