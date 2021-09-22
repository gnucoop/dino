DATA_DEPS = [
    "//tools/third-party-libs:amd_mock_socket",
    "//tools/third-party-libs:amd_pouchdb_adapter_idb",
    "//tools/third-party-libs:amd_pouchdb_adapter_memory",
    "//tools/third-party-libs:amd_rxdb",
    "//tools/third-party-libs:amd_rxdb_plugins_migration",
    "//tools/third-party-libs:amd_rxdb_plugins_pouchdb",
    "//tools/third-party-libs:amd_rxdb_plugins_replication_graphql",
    "//tools/third-party-libs:amd_subscriptions_transport_ws",
    "//tools/third-party-libs:amd_uuid",
]

AJF_DEPS = [
    "//tools/third-party-libs:amd_date_fns",
    "//tools/third-party-libs:amd_esprima",
    "//tools/third-party-libs:amd_flat",
    "//tools/third-party-libs:amd_numbro",
    "//tools/third-party-libs:amd_pdfmake",
    "//tools/third-party-libs:amd_zxing_browser",
    "//tools/third-party-libs:amd_zxing_library",
]

def get_amd_bundles():
    deps = AJF_DEPS + DATA_DEPS
    res = []
    for d in deps:
        res.append("%s_bundle.js" % d)
    return res
