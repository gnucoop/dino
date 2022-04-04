load("//:packages.bzl", "ANGULAR_PACKAGES", "THIRD_PARTY_NG_PACKAGES", "THIRD_PARTY_PACKAGES")
load("//tools/esbuild:index.bzl", "esbuild")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "LinkerPackageMappingInfo")
load("@build_bazel_rules_nodejs//:providers.bzl", "ExternalNpmPackageInfo", "JSModuleInfo")

"""
  Starlark file exposing a definition for generating Angular linker-processed ESM bundles
  for all entry-points the Angular framework packages expose.

  These linker-processed ESM bundles are useful as they can be integrated into the
  spec bundling, or dev-app to avoid unnecessary re-linking of framework entry-points
  every time the bundler executes. This helps with the overall development turnaround and
  is more idiomatic as it allows caching of the Angular framework packages.
"""

def _linker_mapping_impl(ctx):
    return [
        # Pass through the `ExternalNpmPackageInfo` which is needed for the linker
        # resolving dependencies which might be external. e.g. `rxjs` for `@angular/core`.
        ctx.attr.package[ExternalNpmPackageInfo],
        JSModuleInfo(
            direct_sources = depset(ctx.files.srcs),
            sources = depset(ctx.files.srcs),
        ),
        LinkerPackageMappingInfo(
            mappings = {
                ctx.attr.module_name: "%s/%s" % (ctx.label.package, ctx.attr.subpath),
            },
        ),
    ]

_linker_mapping = rule(
    implementation = _linker_mapping_impl,
    attrs = {
        "package": attr.label(),
        "srcs": attr.label_list(allow_files = False),
        "subpath": attr.string(),
        "module_name": attr.string(),
    },
)

def _get_target_name_base(pkg, entry_point):
    return "%s%s" % (pkg.name, "_%s" % entry_point if entry_point else "")

def _get_third_party_target_name_base(pkg, entry_point):
    return "%s%s" % (pkg.name.replace("@", "").replace("/", "_"), "_%s" % entry_point if entry_point else "")

def _create_bundle_targets(pkg, entry_point, module_name):
    target_name_base = _get_target_name_base(pkg, entry_point)
    fesm_bundle_path = "fesm2020/%s.mjs" % (entry_point if entry_point else pkg.name)

    esbuild(
        name = "%s_linked_bundle" % target_name_base,
        output = "%s/index.mjs" % target_name_base,
        platform = pkg.platform,
        entry_point = "@npm//:node_modules/@angular/%s/%s" % (pkg.name, fesm_bundle_path),
        config = "//tools/angular:esbuild_config",
        # List of dependencies which should never be bundled into these linker-processed bundles.
        external = ["rxjs", "@angular", "domino", "xhr2"],
    )

    _linker_mapping(
        name = "%s_linked" % target_name_base,
        srcs = [":%s_linked_bundle" % target_name_base],
        package = "@npm//@angular/%s" % pkg.name,
        module_name = module_name,
        subpath = target_name_base,
    )

def _create_third_party_bundle_targets(pkg, entry_point, module_name):
    target_name_base = _get_third_party_target_name_base(pkg, entry_point)
    fesm_bundle_path = "fesm2015/%s.js" % (entry_point if entry_point else pkg.name)

    esbuild(
        name = "%s_linked_bundle" % target_name_base,
        output = "%s/index.mjs" % target_name_base,
        platform = pkg.platform,
        entry_point = "@npm//:node_modules/%s/%s" % (pkg.name, fesm_bundle_path),
        config = "//tools/angular:esbuild_config",
        # List of dependencies which should never be bundled into these linker-processed bundles.
        external = ["rxjs", "@angular", "@gic", "@ionic", "domino", "flat", "xhr2"],
    )

    _linker_mapping(
        name = "%s_linked" % target_name_base,
        srcs = [":%s_linked_bundle" % target_name_base],
        package = "@npm//%s" % pkg.name,
        module_name = module_name,
        subpath = target_name_base,
    )

def _create_third_party_ng_bundle_targets(pkg, entry_point, module_name):
    target_name_base = _get_target_name_base(pkg, entry_point)
    divider_pos = pkg.name.find("_")
    scope_name = pkg.name[:divider_pos]
    package_name = pkg.name[divider_pos + 1:]
    bundle_name = (entry_point if entry_point else package_name)
    if scope_name == "ajf":
        bundle_name = "ajf-%s" % ("%s-%s" % (package_name, entry_point) if entry_point else package_name)
    fesm_bundle_path = "fesm2020/%s.mjs" % bundle_name

    esbuild(
        name = "%s_linked_bundle" % target_name_base,
        output = "%s/index.mjs" % target_name_base,
        platform = pkg.platform,
        entry_point = "@npm//:node_modules/@%s/%s/%s" % (scope_name, package_name, fesm_bundle_path),
        config = "//tools/angular:esbuild_config",
        # List of dependencies which should never be bundled into these linker-processed bundles.
        external = ["rxjs", "@angular", "@gic", "@ionic", "@ngneat", "@zxing", "chart.js", "date-fns", "domino", "leaflet", "meriyah", "pdfmake", "xhr2", "xlsx", "@" + scope_name],
    )

    _linker_mapping(
        name = "%s_linked" % target_name_base,
        srcs = [":%s_linked_bundle" % target_name_base],
        package = "@npm//@%s/%s" % (scope_name, package_name),
        module_name = module_name,
        subpath = target_name_base,
    )

def create_angular_bundle_targets():
    for pkg in ANGULAR_PACKAGES:
        _create_bundle_targets(pkg, None, pkg.module_name)

        for entry_point in pkg.entry_points:
            _create_bundle_targets(pkg, entry_point, "%s/%s" % (pkg.module_name, entry_point))

def create_third_party_ng_bundle_targets():
    for pkg in THIRD_PARTY_NG_PACKAGES:
        _create_third_party_ng_bundle_targets(pkg, None, pkg.module_name)

        for entry_point in pkg.entry_points:
            _create_third_party_ng_bundle_targets(pkg, entry_point, "%s/%s" % (pkg.module_name, entry_point))

def create_third_party_bundle_targets():
    for pkg in THIRD_PARTY_PACKAGES:
        _create_third_party_bundle_targets(pkg, pkg.main_entry_point, pkg.module_name)

        for entry_point in pkg.entry_points:
            _create_third_party_bundle_targets(pkg, entry_point, "%s/%s" % (pkg.module_name, entry_point))

def create_apollo_bundle_targets():
    esbuild(
        name = "apollo-angular_linked_bundle",
        output = "apollo-angular/index.mjs",
        platform = "browser",
        entry_point = "@npm//:node_modules/apollo-angular/build/fesm2020/ngApollo.mjs",
        config = "//tools/angular:esbuild_config",
        # List of dependencies which should never be bundled into these linker-processed bundles.
        external = ["rxjs", "@angular", "@apollo", "apollo-angular", "graphql"],
    )

    _linker_mapping(
        name = "apollo-angular_linked",
        srcs = [":apollo-angular_linked_bundle"],
        package = "@npm//apollo-angular",
        module_name = "apollo-angular",
        subpath = "apollo-angular",
    )

    esbuild(
        name = "apollo-angular_http_linked_bundle",
        output = "apollo-angular_http/index.mjs",
        platform = "browser",
        entry_point = "@npm//:node_modules/apollo-angular/build/fesm2020/ngApolloLinkHttp.mjs",
        config = "//tools/angular:esbuild_config",
        # List of dependencies which should never be bundled into these linker-processed bundles.
        external = ["rxjs", "@angular", "@apollo", "apollo-angular", "graphql"],
    )

    _linker_mapping(
        name = "apollo-angular_http_linked",
        srcs = [":apollo-angular_http_linked_bundle"],
        package = "@npm//apollo-angular",
        module_name = "apollo-angular/http",
        subpath = "apollo-angular_http",
    )

LINKER_PROCESSED_FW_PACKAGES = [
    "//tools/angular:%s_linked" % _get_target_name_base(pkg, entry_point)
    for pkg in ANGULAR_PACKAGES
    for entry_point in [None] + pkg.entry_points
] + [
    "//tools/angular:%s_linked" % _get_target_name_base(pkg, entry_point)
    for pkg in THIRD_PARTY_NG_PACKAGES
    for entry_point in [None] + pkg.entry_points
] + [
    "//tools/angular:%s_linked" % _get_third_party_target_name_base(pkg, entry_point)
    for pkg in THIRD_PARTY_PACKAGES
    for entry_point in [pkg.main_entry_point] + pkg.entry_points
] + [
    "//tools/angular:apollo-angular_linked",
    "//tools/angular:apollo-angular_http_linked",
]
