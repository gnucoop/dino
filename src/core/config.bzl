# List of all entry-points of the Dewco core package.
CORE_ENTRYPOINTS = [
    "auth",
    "data",
]

CORE_ENTRYPOINTS_WITH_STYLES = [
]

# List of all entry-point targets of the Dewco core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS_WITH_STYLES
]
