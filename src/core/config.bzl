# List of all entry-points of the Dino core package.
CORE_ENTRYPOINTS = [
    "areas",
    "auth",
    "config",
    "cases",
    "data",
    "error-handler",
    "forms",
    "langs",
    "list",
    "locations",
    "organizations",
    "projects",
    "reports",
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
    "areas/area",
    "cases/case",
    "forms/form-data",
    "forms/form-schema",
    "langs/lang",
    "locations/location",
    "organizations/organization",
    "projects/project",
    "reports/report-data",
    "reports/report-schema",
    "users/user-data",
    "users/user-group",
    "users/user-role",
]
