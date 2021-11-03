# List of all entry-points of the Dino core package.
CORE_ENTRYPOINTS = [
    "areas",
    "auth",
    "config",
    "data",
    "error-handler",
    "forms",
    "reports",
    "list",
    "locations",
    "organizations",
    "projects",
    "sync",
    "translations",
    "users",
]

CORE_ENTRYPOINTS_WITH_STYLES = [
]

# List of all entry-point targets of the Dino core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS_WITH_STYLES
]

CORE_MODELS = [
    "forms/form-data",
    "forms/form-schema",
    "reports/report-data",
    "reports/report-schema",
    "locations/location",
    "projects/project",
    "areas/area",
    "organizations/organization",
    "users/user-model",
    "users/user-group",
    "users/user-role",
]
