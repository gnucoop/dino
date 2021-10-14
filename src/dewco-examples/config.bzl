ALL_EXAMPLES = [
    # TODO(devversion): try to have for each entry-point a bazel package so that
    # we can automate this using the "package.bzl" variables. Currently generated
    # with "bazel query 'kind("ng_module", //src/dewco-examples/...:*)' --output="label"
    "//src/dewco-examples/dewco/dummy",
]
