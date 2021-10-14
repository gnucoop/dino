load("//src/core:config.bzl", "CORE_ENTRYPOINTS")
load("//src/material:config.bzl", "MATERIAL_ENTRYPOINTS", "MATERIAL_TESTING_ENTRYPOINTS")

# Base list of externals which should not be bundled into the APF package output.
# Note that we want to disable sorting of the externals as we manually group entries.
# buildifier: disable=unsorted-list-items
PKG_EXTERNALS = [
    # Framework packages.
    "@angular/animations",
    "@angular/cdk/collections",
    "@angular/cdk/drag-drop",
    "@angular/cdk/layout",
    "@angular/common",
    "@angular/common/http",
    "@angular/common/http/testing",
    "@angular/common/testing",
    "@angular/core",
    "@angular/core/testing",
    "@angular/forms",
    "@angular/material/autocomplete",
    "@angular/material/button",
    "@angular/material/button-toggle",
    "@angular/material/card",
    "@angular/material/checkbox",
    "@angular/material/chips",
    "@angular/material/core",
    "@angular/material/datepicker",
    "@angular/material/dialog",
    "@angular/material/expansion",
    "@angular/material/form-field",
    "@angular/material/grid-list",
    "@angular/material/icon",
    "@angular/material/input",
    "@angular/material/list",
    "@angular/material/paginator",
    "@angular/material/progress-bar",
    "@angular/material/select",
    "@angular/material/sidenav",
    "@angular/material/slide-toggle",
    "@angular/material/snack-bar",
    "@angular/material/sort",
    "@angular/material/stepper",
    "@angular/material/table",
    "@angular/material/tabs",
    "@angular/material/toolbar",
    "@angular/material/tooltip",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/platform-browser-dynamic/testing",
    "@angular/platform-browser/animations",
    "@angular/platform-server",
    "@angular/router",

    # Primary entry-points in the project.
    "@dewco/core",
    "@dewco/ionic",
    "@dewco/material",

    # Third-party libraries.
    "@ajf/core/common",
    "@ajf/core/forms",
    "@ajf/core/models",
    "@ajf/core/reports",
    "@ajf/core/transloco",
    "@ajf/material/forms",
    "@ajf/material/reports",
    "pouchdb-adapter-idb",
    "pouchdb-adapter-memory",
    "rxdb",
    "rxdb/dist/types/types/rx-schema",
    "rxdb/plugins/migration",
    "rxdb/plugins/pouchdb",
    "rxdb/plugins/replication-graphql",
    "rxjs",
    "rxjs/operators",
    "subscriptions-transport-ws",
    "selenium-webdriver",
    "uuid",
]

# Creates externals for a given package and its entry-points.
def setup_entry_point_externals(packageName, entryPoints):
    PKG_EXTERNALS.extend(["@dewco/%s/%s" % (packageName, ep) for ep in entryPoints])

setup_entry_point_externals("core", CORE_ENTRYPOINTS)
setup_entry_point_externals("material", MATERIAL_ENTRYPOINTS + MATERIAL_TESTING_ENTRYPOINTS)

# External module names in the examples package. Individual examples are grouped
# by package and component, so we add configure such entry-points as external.
setup_entry_point_externals("dewco-examples/material", [])
