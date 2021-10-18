"""
    Test the JSON schemas used to initializate RxDb collections that must reflect the current status
    of the corresponding Typescript interfaces.
"""

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "nodejs_test")
load("@build_bazel_rules_nodejs//:providers.bzl", "DeclarationInfo")

def _transitive_declarations_impl(ctx):
    declarations = []
    transitive_declarations = []
    for dep in ctx.attr.srcs:
        if DeclarationInfo in dep:
            declarations = declarations + dep[DeclarationInfo].declarations.to_list()
            transitive_declarations = transitive_declarations + dep[DeclarationInfo].transitive_declarations.to_list()
    return DefaultInfo(files = depset(declarations + transitive_declarations))

_transitive_declarations = rule(
    implementation = _transitive_declarations_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
    },
)

def model_schema_targets(models, name = "model-schemas", expose = "export", top_ref = True, js_doc = "extended"):
    """Set up the test targets to verify that the model JSON schemas against the corresponding Typescript interfaces.

    The JSON schema is generated from the Typescript interface through
    [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator).

    Args:
        models: Models to be tested.
        name: Macro name.
        expose:
            all: Create shared $ref definitions for all types.
            none: Do not create shared $ref definitions.
            export (default): Create shared $ref definitions only for exported types.
        top_ref: Whether to create a top-level $ref definition.
        js_doc:
            none: Do not use JsDoc annotations.
            basic: Read JsDoc annotations to provide schema properties.
            extended (default): Also read @nullable, and @asType annotations.
    """
    for model in models:
        [package_name, subpackage_name, entry_point_tail] = model.split("/", 2)

        entry_point = entry_point_tail[:-len("-json.ts")]

        target_name = "//src/%s/%s" % (package_name, subpackage_name)
        deps_target = "model-schema-deps-%s" % model
        _transitive_declarations(
            name = deps_target,
            srcs = [target_name],
        )

        args = [
            "--tsconfig",
            "./tools/model-schema/tsconfig-generate.json",
            "--source",
            "./src/%s/%s/%s.d.ts" % (package_name, subpackage_name, entry_point),
            "--expose",
            expose,
            "--jsDoc",
            js_doc,
            "--bazel_patch_module_resolver",
        ]
        if top_ref:
            args.append("--topRef")

        data = [
            target_name,
            "%s:source-files" % target_name,
            ":%s" % deps_target,
            "//:build-config.js",
            "//:package.json",
            "//tools/model-schema:model-schema",
            "//tools/model-schema:tsconfig-generate.json",
            "@npm//minimist",
            "@npm//ts-json-schema-generator",
        ]

        nodejs_test(
            name = "model-schema-%s" % model,
            data = data,
            entry_point = "//tools/model-schema:model-schema.ts",
            templated_args = args,
            tags = ["model_schema"],
        )

        nodejs_binary(
            name = "model-schema-%s.accept" % model,
            testonly = True,
            data = data,
            entry_point = "//tools/model-schema:model-schema.ts",
            templated_args = args + ["--accept"],
            tags = ["model_schema"],
        )
