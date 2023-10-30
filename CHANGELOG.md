<a name="15.2.5"></a>
# 15.2.5 "shared-bobolink" (2023-10-30)
### Bug Fixes
* **material/edit-form:** populate choice-origin from metric even when there are no other relationships ([8818e88](https://bitbucket.org/gnucoop/dino/commits/8818e886a16384c5dc66d4acdea848b3e487e8dd))
* **material/edit-report:** Fixed a bug causing Metrics to be displayed as Undefined in View Report ([a46cb59](https://bitbucket.org/gnucoop/dino/commits/a46cb59ec42ecc2e1e661d6ed9edf50abdcf5805))
* **material/list:** format metric date in list ([5b5fcdc](https://bitbucket.org/gnucoop/dino/commits/5b5fcdccf66befdbdabc72d4e7d0dd338eff4406))
* **material/metric-editor:** Fixed a bug allowing the user to choose the metric itself or a child as its parent in the UI. ([4071e3d](https://bitbucket.org/gnucoop/dino/commits/4071e3dba389956a3ff7800949cbf47f396342f4))
* **multiple:** fix relationship initialization chain ([29a03f0](https://bitbucket.org/gnucoop/dino/commits/29a03f0ea733912ac147eb8ac6682309c33500af))
### Features
* **material/collect:** Collect grid items now show a 'unique' icon for Collect Items with unique metrics set. ([bc93269](https://bitbucket.org/gnucoop/dino/commits/bc932694a2b1f84283e925513e546990a3280f64))
* **material/edit-form-schema:** Added 'uniqueMetricsSet' form field to Form Builder form attributes. ([51e46dd](https://bitbucket.org/gnucoop/dino/commits/51e46dd221ecac0dcb6499dc203bfa149e04901f))
* **material/edit-report:** add border spacing in table ([10f78b3](https://bitbucket.org/gnucoop/dino/commits/10f78b38d97f7d258a12a1591f37e520408ed35e))
* **material/export-list:** Export Forms module renamed to Export List. Metric Lists can now be exported, like Forms List. ([3a458a5](https://bitbucket.org/gnucoop/dino/commits/3a458a5521f97564b8733d677022ae64672ebdf1))
* **material/list:** Export methods split for different list types (Forms, Metrics). Added list-type type. ([89a2f21](https://bitbucket.org/gnucoop/dino/commits/89a2f215d77bd33d76410dfdd416869b6ebe8ce9))
* **multiple:** Material Create/Edit Form now check for the schema attribute 'uniqueMetricsSet', and behave accordingly by limiting form creation/editing. ([10ef30d](https://bitbucket.org/gnucoop/dino/commits/10ef30d925c59963d08315c3155108035a71d853))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.4"></a>
# 15.2.4 "liquid-ocelot" (2023-10-11)
### Bug Fixes
* **core/form-schema-deps:** Undo rename model to avoid to force logout ([fe46e84](https://bitbucket.org/gnucoop/dino/commits/fe46e844b4e5c3841eec2bc6d24bb6b48612e794))
* **core/forms:** Changed form-schema-deps model version and migration strategies. Regenerated its rxJsonschema. Added migration strategies to form-schema-deps-manager. ([56becd6](https://bitbucket.org/gnucoop/dino/commits/56becd6ca47e6444b24ecdc905ecb2d16b308fa5))
* **material/edit-form-schema:** increase relationship dialog width ([5d90db0](https://bitbucket.org/gnucoop/dino/commits/5d90db0a6267c09aa6188cfe134c6c0744806e91))
### Features
* **material/edit-report:** export all widgets button ([13ae84f](https://bitbucket.org/gnucoop/dino/commits/13ae84f71c9a7eb52b801ac4e19bd493b9291316))
* **material:** additional metric attributes added in import/export and improved import controls ([f15b8d2](https://bitbucket.org/gnucoop/dino/commits/f15b8d215995dd31399672363565bb2bfea2d7f7))
* **multiple:** relationship with choice origin from metrics ([abc97c9](https://bitbucket.org/gnucoop/dino/commits/abc97c9f4482d021d0a779f71bd9daf183f263df))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.3"></a>
# 15.2.3 "still-crocodile" (2023-09-15)
### Bug Fixes
* **material/form-metric-selector:** Fixed a bug in Form Metric Selector causing newly created metrics not to be automatically selected in the form. ([ac3e0d1](https://bitbucket.org/gnucoop/dino/commits/ac3e0d16a3f8f1425e7c3f5ac24261740efd3bf8))
* **material/form-metric-selector:** Fixed a bug in Form Metric Selector validator functions causing the fms fields values never to be valid. ([38bc673](https://bitbucket.org/gnucoop/dino/commits/38bc6737c902beec93dddc5d2239db88a85dc884))
* **material/metric-editor:** Fixed a bug in Metric Editor causing the Metric Creation subscription not to be unsubscribed (Duplicating metrics) ([524cbde](https://bitbucket.org/gnucoop/dino/commits/524cbdea1509e080f21034f4d90a06a37d95d449))
### Features
* **material/collect:** Added Share Url functionality in collect form items (public forms). ([03c55d0](https://bitbucket.org/gnucoop/dino/commits/03c55d067bc03dd976383a004da9081f5d8ac81f))
* **material/form-metric-selector:** Added 'shareUrl' context option for form metric selector and dialog. ([dd1976c](https://bitbucket.org/gnucoop/dino/commits/dd1976c47ffbef7be7a0e4c28181dbc05181c13d))
* **material/image-capture:** Added Image Capture module and component ([a8f9481](https://bitbucket.org/gnucoop/dino/commits/a8f9481c71fb640b506a0a7f6dbdd5cfccb7556b))
* **material/list:** add check before delete metrics ([9d53a49](https://bitbucket.org/gnucoop/dino/commits/9d53a4923d5a5f52e74152a30beffc975e8012bb))
* **material/metric-editor:** Added Image Capture tab to Case Editor ([241e124](https://bitbucket.org/gnucoop/dino/commits/241e1243bd2f53c6f3be43e3a4321f7a933f530b))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.2"></a>
# 15.2.2 "extreme-monkey" (2023-08-03)
### Bug Fixes
* **material/edit-form-schema:** Added transloco pipe to Form Metrics field options. ([f504178](https://bitbucket.org/gnucoop/dino/commits/f50417890c4c50506cd97c5fd0adff6501a5f5c3))
* **material/langs:** Added missing Date Value pipe export in public api. ([be9fc96](https://bitbucket.org/gnucoop/dino/commits/be9fc96951be1a41cf668fb13beab9d2409af824))
* **material/list:** format date by locale in list for repeating slide ([0faaca2](https://bitbucket.org/gnucoop/dino/commits/0faaca2f55bb86c884924ebc5f857c5b81373f6e))
* **material/metric-editor:** remove close dialog on click ([70b97ef](https://bitbucket.org/gnucoop/dino/commits/70b97efae3034ccd11d2e9299b0ad0e7a103797b))
### Features
* **core/list:** Added 'bulkFormEdit' actionType and abstract method to List. ([de35553](https://bitbucket.org/gnucoop/dino/commits/de355535cc5b066f5e5047ced62142aef542b701))
* **e2e-material/forms-list:** Added bulkActionsAvailable stream, to determine which bulk actions are available based on user permissions. ([b6a3c6a](https://bitbucket.org/gnucoop/dino/commits/b6a3c6ad1a034a70acefce4692a5fc94fd9520ed))
* **e2e-material/multiple:** Added secondaryMetricFieldsDisplayed to multiple e2e-app components. ([37f564f](https://bitbucket.org/gnucoop/dino/commits/37f564fcaabea514f33c4a6e8c118a8f98d2e51a))
* **material/form-metric-selector:** Created Form Metric Selector Dialog component. ([e6710d9](https://bitbucket.org/gnucoop/dino/commits/e6710d9adce4e18b14da6cd9de16066fdbb98246))
* **material/form-metric-selector:** Implemented Metric Secondary fields display. ([b1b3f90](https://bitbucket.org/gnucoop/dino/commits/b1b3f90221f604b26e8b2f9d7eef6c18d2605d62))
* **material/list:** Added BulkFormEdit action to list. ([555df42](https://bitbucket.org/gnucoop/dino/commits/555df42b7fa506a3e4f7baa6878b61fff0447414))
* **material/list:** Added selection changed event emitter. Added secondaryMetricFieldsDisplayed and bulkActionsAvailable inputs. ([4647ac4](https://bitbucket.org/gnucoop/dino/commits/4647ac43ab88ba926fdb8329d8a30ca2fd1bcf52))
* **material/multiple:** Added secondaryMetricFieldsDisplayed input to edit/create form/report components and to form-metric-selector-dialog. ([a78a4b3](https://bitbucket.org/gnucoop/dino/commits/a78a4b36e2d7c48a46d00c16862fce1224f4a8b0))
* **material/search-filters-bar:** Implemented Metric Secondary fields display in metric filters. ([25e982f](https://bitbucket.org/gnucoop/dino/commits/25e982fc8ff61242e32fca64e2ebbbb3cf414c00))
* **material/user-area:** add email in user profile dialog ([3200554](https://bitbucket.org/gnucoop/dino/commits/32005548ac4b65ae3bf88995e7ab8dd1a9260580))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.1"></a>
# 15.2.1 "live-rodent" (2023-07-14)
### Bug Fixes
* **material/form-metric-selector:** add DateAdapter for change runtime date format ([3834b40](https://bitbucket.org/gnucoop/dino/commits/3834b40bb309b8ed73692e46baa3ca87e8be6671))
* **material/form-metric-selector:** Fixed a bug causing the Report edit/create stepper to behave as the Form one. ([62b7f11](https://bitbucket.org/gnucoop/dino/commits/62b7f115f9b593ffb2feee9ae746c8dc53105710))
* **material/form-metric-selector:** Removed a console.log -_- ([b224efb](https://bitbucket.org/gnucoop/dino/commits/b224efb207846c6eeec5852c5e49bff75258edd0))
* **material/list:** Fixed a bug in query creation for Repeating Slides fields, when choosing "All" as a condition in Filters Dialog. ([ee8f286](https://bitbucket.org/gnucoop/dino/commits/ee8f286643b42fcce37f5fb625f4b962b3714ecd))
* **multiple:** format dates by locale ([a726997](https://bitbucket.org/gnucoop/dino/commits/a726997c5748b00555fe8a22a3b519c1619a74d2))
### Features
* **edit-public-form:** add metrics in link and center in the page ([03fbb32](https://bitbucket.org/gnucoop/dino/commits/03fbb322ca2c95f92e4649485722e70ea51a97b1))
* **material/list:** remove edit status button if invalid form ([895f225](https://bitbucket.org/gnucoop/dino/commits/895f225894d6118b2ceceb7845f44543bfd5c4b5))
* **material/main-nav:** A subscription now checks for a token in the localStorage that signals a new app version, showing a download icon in the nav bar. ([f5c6bda](https://bitbucket.org/gnucoop/dino/commits/f5c6bda2eaf970ebed75fdb93f9ec8c02cdcc84f))
* **material/metric-section:** add logo in env for case card ([c01fb7d](https://bitbucket.org/gnucoop/dino/commits/c01fb7d5b450130bbf2577e80786780c69afd1ff))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.0"></a>
# 15.2.0 "doubtful-tahr" (2023-06-15)
### Bug Fixes
* **core/forms:** Fixed a bug in FormSchemaManager 'getLabelFromFieldName' method causing logs not to be generated for repeating slides changes. ([cad50a8](https://bitbucket.org/gnucoop/dino/commits/cad50a82c3ca2c31e05fb50728c7e906c386a100))
* **material/metric-editor:** add translate for placehoder ([720b9c2](https://bitbucket.org/gnucoop/dino/commits/720b9c2e434b5ea446b5a5f6deae7e36a94950bf))
* **material/metric-section:** fit bar code in print case card ([17a4318](https://bitbucket.org/gnucoop/dino/commits/17a4318d36369f026d2d7e909d79a19ec26414a9))
### Features
* **core/data:** Added 'on_custom_trigger' to TriggerType in action-trigger.ts ([24ebf41](https://bitbucket.org/gnucoop/dino/commits/24ebf41f375ff585ba5a519abc9bcff3d2274264))
* **core/forms:** Added 'form_schema_metrics' attribute to form schema model. Refactored 'generateMetricsHeaders' method in baseFormSchemaManager. ([dde5634](https://bitbucket.org/gnucoop/dino/commits/dde563415d3f6337561458b620009224fdc23abf))
* **core/list:** Added 'mainActions' array. Those row action icons will always be displayed, if available. ([9c8e665](https://bitbucket.org/gnucoop/dino/commits/9c8e66599f04c9cfcd5944433ea705ed7655f6d8))
* **core/list:** Added abstract method 'initFilters' to core searchFiltersSearchFiltersComponent class. ([9e62648](https://bitbucket.org/gnucoop/dino/commits/9e62648d8f07f1c1ef3822c2671cac1e739e686a))
* **e2e-material:** Form List additionalBasicFilters now take the Form Schema available metrics into account. ([7274b9b](https://bitbucket.org/gnucoop/dino/commits/7274b9bd6dcea596fa706bdd2ded36ee252eddcd))
* **material/edit-form-schema:** Added available Metrics select field in form schema editor. ([b4cdfa1](https://bitbucket.org/gnucoop/dino/commits/b4cdfa10183c0923ae729541bd58485fbe7c1480))
* **material/edit-report-schema:** replace schema names in xls reports with uuids ([6446eac](https://bitbucket.org/gnucoop/dino/commits/6446eac0a3e49a1e1f96ae6fe15bfbd96da272b1))
* **material/form-metric-selector:** Added 'fill the form' button. It moves to the Form Data step of the Form editor. ([b8f2d27](https://bitbucket.org/gnucoop/dino/commits/b8f2d271432747860b24d5040db751ab90df0f6f))
* **material/form-metric-selector:** Form Metric Selector now displays metric fields based on Form Schema available Metrics. ([4d414a9](https://bitbucket.org/gnucoop/dino/commits/4d414a91c316e2fd1f3f72296d4bb5e2b5272614))
* **material/list:** Actions divided in primary (view, edit, delete) and secondary. Secondary actions are displayed by clicking on 'more' icon. ([bd67dd1](https://bitbucket.org/gnucoop/dino/commits/bd67dd1c0266d5d6a815821fab6f8cd495066222))
* **material/main-nav:** Added signaling of unsynced data (useful for non-live sync) in the Main Navigation bar. ([cae6f26](https://bitbucket.org/gnucoop/dino/commits/cae6f26270d165117af46be0d9e3742616d7e937))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.2"></a>
# 15.1.2 "big-planarian" (2023-05-23)
### Bug Fixes
* **core/forms:** Refactored 'compareFormDatasData' so that it compares form datas correctly, including multiple choices arrays and undefined values. ([cc247cd](https://bitbucket.org/gnucoop/dino/commits/cc247cde10270ea0238789a40a0e6a055117fa9e))
* **core/list:** Added missing checks on list cell content in List Cell File pipes. ([fda04d0](https://bitbucket.org/gnucoop/dino/commits/fda04d09a20a2d69031c3808400535f4027a8634))
* **material/edit-form:** Added "isView" check in edit-form template, to determine whether Save Draft button should be displayed. ([adad091](https://bitbucket.org/gnucoop/dino/commits/adad091672e7ad2edb70e1d4389a3bb6c403452e))
* **material/edit-form:** check  field to initialise error number ([d09a1c2](https://bitbucket.org/gnucoop/dino/commits/d09a1c246beec8b0eb612e96d47ab299e4a9d9e8))
* **material/import-form:** check for second header in xls for metrics ([82e2bf5](https://bitbucket.org/gnucoop/dino/commits/82e2bf5f0619c37711d8c11d15c03016dc33c7cf))
* **material/metric-editor:** add translate for jpg/png message ([57d0442](https://bitbucket.org/gnucoop/dino/commits/57d04423070d186b1b9f65a6267c39009b7ccb4a))
* **material/metric-section:** add timestamp to request url for storage images ([c598ef0](https://bitbucket.org/gnucoop/dino/commits/c598ef0823d7bae2932ce2a0bd039509facc1261))
* **material/metric-section:** Added 'esModuleInterop' and 'allowSyntheticDefaultImports' flags to compiler options. JsBarcode default import. ([4d4bc1a](https://bitbucket.org/gnucoop/dino/commits/4d4bc1a36042b1a1f45c116450dbcc4326b3c11b))
* **material/metric-section:** change get request to httpclient ([aaa5ac0](https://bitbucket.org/gnucoop/dino/commits/aaa5ac074da66a29af0bb163877ca7e696d86c1e))
* **material/metric-section:** Linting minor fixes (removed unnecessary import). ([0591963](https://bitbucket.org/gnucoop/dino/commits/05919636535a578a808e243cf61d2acee328f9b1))
* **material/pipeline-stepper:** Fixed a bug causing the stepper not to be aligned with the slides. ([5b2f7f6](https://bitbucket.org/gnucoop/dino/commits/5b2f7f61651efdaa6ba50a812e31ac8f43e3d595))
### Features
* **core/auth:** Added and exported b64<->utf8 conversion methods. ([df4a328](https://bitbucket.org/gnucoop/dino/commits/df4a32807f82bbff9e1ca6d6eddf9f88a4737476))
* **core/cases:** Added filter label 'case_code' on module load. ([2ba6f3c](https://bitbucket.org/gnucoop/dino/commits/2ba6f3c1838c0691d4243c250cd1cdd3f14f3fd8))
* **core/data:** Added 'on_form_data_export' action trigger type. ([3321cf4](https://bitbucket.org/gnucoop/dino/commits/3321cf4e6960bbac1c9450eb4fdca7a72412be0d))
* **core/list:** Added 'user_data' default basic filter label to FilterService. Added method to handle Metric Sub Filters (eg. 'case_code'). ([d815f1f](https://bitbucket.org/gnucoop/dino/commits/d815f1f3bd4866829a001978cce154e40761f094))
* **e2e-material:** Added 'user_data' basic filter to aggregation list and forms list components. Added 'case_code' basic filter to aggregation list. ([275b9b1](https://bitbucket.org/gnucoop/dino/commits/275b9b1aa6c55cac20d66fa8ba7c158b4cf075f7))
* **e2e-material:** Added a 'processExportTrigger' method to the forms-list component in E2e app. ([c42d2bf](https://bitbucket.org/gnucoop/dino/commits/c42d2bfa5f473b98a6afe89205dc7d53cf803276))
* **e2e-material:** Added Humanitarian svc icon set. ([538d110](https://bitbucket.org/gnucoop/dino/commits/538d11043caa754ce315ad84158e6cd49b94fe50))
* **material/breadcrumbs:** Added support for custom svg icons. ([b4762fb](https://bitbucket.org/gnucoop/dino/commits/b4762fb2d3f8918e4de1646809dd322d0746c89d))
* **material/collect:** Added support for custom svg icons. ([da30f82](https://bitbucket.org/gnucoop/dino/commits/da30f8292423171b3af34c1ddd21eb55d71101c1))
* **material/create-edit-form:** New "Card" UI for Ajf Forms. ([2ae9cd2](https://bitbucket.org/gnucoop/dino/commits/2ae9cd24b03e41131e2b1fde517925ac0ce3e4a6))
* **material/create-edit-form:** New "Card" UI for Ajf Forms. ([4384b76](https://bitbucket.org/gnucoop/dino/commits/4384b76da161f83d66508c0bddfc8d9de912b8a7))
* **material/edit-form-schema:** Added Icon Set selector. Added support for custom svg humanitarian icons. ([2175d9b](https://bitbucket.org/gnucoop/dino/commits/2175d9b27bd8a29f7876002f1b8800653fb4183e))
* **material/edit-report-schema:** Added Icon Set selector. Added support for custom svg humanitarian icons. ([04cc1ca](https://bitbucket.org/gnucoop/dino/commits/04cc1ca89438937a3dbb4497ae4ed23475a2eba1))
* **material/export-form:** Added an export trigger that emits with the serialized export file in its triggerData. ([4302324](https://bitbucket.org/gnucoop/dino/commits/4302324917b17364aa7a66f757fe1f8a766169b8))
* **material/form-creator-hub:** Added support for custom svg icons. ([80a5d47](https://bitbucket.org/gnucoop/dino/commits/80a5d47ebe78cfdaa3dfb6628599a26fe095c895))
* **material/icons-service:** Added Humanitarian Icons list. ([1ef88b8](https://bitbucket.org/gnucoop/dino/commits/1ef88b869b2c85313ee19543b7af0f48e7ecad06))
* **material/list:** Case Image is now displayed as an image preview in List. Added "ListCellIsStorageImageUrl" to list-cell-file pipes. ([f17afeb](https://bitbucket.org/gnucoop/dino/commits/f17afebcb9d3fef011ff602993b457483ed3bdf7))
* **material/metric-editor:** add new image field in case metric and in metric editor ([a516384](https://bitbucket.org/gnucoop/dino/commits/a516384ae6599ea1b29a593ff834dd47a2080722))
* **material/metric-section:** add print pdf function for case card ([bfa9441](https://bitbucket.org/gnucoop/dino/commits/bfa9441d0b4e8c2beffdb9b2ef899318a20a6b90))
* **material/metric-section:** change case card template ([ef89da9](https://bitbucket.org/gnucoop/dino/commits/ef89da9d9e109752ca637ba37db3fd14fd445ade))
* **material/search-filters-bar:** Added methods and refactors to handle Metric Sub Filters (eg. 'case_code') and User Data filter with autocomplete options. ([6766a77](https://bitbucket.org/gnucoop/dino/commits/6766a770bf0916a1cac5baa7b5adbbacf9957d8f))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.1"></a>
# 15.1.1 "historic-ape" (2023-05-08)
### Bug Fixes
* **core/list:** Added missing checks on list cell content in List Cell File pipes. ([fda04d0](https://bitbucket.org/gnucoop/dino/commits/fda04d09a20a2d69031c3808400535f4027a8634))
* **material/edit-form:** Added "isView" check in edit-form template, to determine whether Save Draft button should be displayed. ([adad091](https://bitbucket.org/gnucoop/dino/commits/adad091672e7ad2edb70e1d4389a3bb6c403452e))
* **material/import-form:** check for second header in xls for metrics ([82e2bf5](https://bitbucket.org/gnucoop/dino/commits/82e2bf5f0619c37711d8c11d15c03016dc33c7cf))
* **material/metric-section:** Added 'esModuleInterop' and 'allowSyntheticDefaultImports' flags to compiler options. JsBarcode default import. ([4d4bc1a](https://bitbucket.org/gnucoop/dino/commits/4d4bc1a36042b1a1f45c116450dbcc4326b3c11b))
* **material/metric-section:** change get request to httpclient ([aaa5ac0](https://bitbucket.org/gnucoop/dino/commits/aaa5ac074da66a29af0bb163877ca7e696d86c1e))
* **material/pipeline-stepper:** Fixed a bug causing the stepper not to be aligned with the slides. ([5b2f7f6](https://bitbucket.org/gnucoop/dino/commits/5b2f7f61651efdaa6ba50a812e31ac8f43e3d595))
### Features
* **core/auth:** Added and exported b64<->utf8 conversion methods. ([df4a328](https://bitbucket.org/gnucoop/dino/commits/df4a32807f82bbff9e1ca6d6eddf9f88a4737476))
* **core/data:** Added 'on_form_data_export' action trigger type. ([3321cf4](https://bitbucket.org/gnucoop/dino/commits/3321cf4e6960bbac1c9450eb4fdca7a72412be0d))
* **e2e-material:** Added a 'processExportTrigger' method to the forms-list component in E2e app. ([c42d2bf](https://bitbucket.org/gnucoop/dino/commits/c42d2bfa5f473b98a6afe89205dc7d53cf803276))
* **material/create-edit-form:** New "Card" UI for Ajf Forms. ([2ae9cd2](https://bitbucket.org/gnucoop/dino/commits/2ae9cd24b03e41131e2b1fde517925ac0ce3e4a6))
* **material/create-edit-form:** New "Card" UI for Ajf Forms. ([4384b76](https://bitbucket.org/gnucoop/dino/commits/4384b76da161f83d66508c0bddfc8d9de912b8a7))
* **material/export-form:** Added an export trigger that emits with the serialized export file in its triggerData. ([4302324](https://bitbucket.org/gnucoop/dino/commits/4302324917b17364aa7a66f757fe1f8a766169b8))
* **material/metric-editor:** add new image field in case metric and in metric editor ([a516384](https://bitbucket.org/gnucoop/dino/commits/a516384ae6599ea1b29a593ff834dd47a2080722))
* **material/metric-section:** add print pdf function for case card ([bfa9441](https://bitbucket.org/gnucoop/dino/commits/bfa9441d0b4e8c2beffdb9b2ef899318a20a6b90))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.0"></a>
# 15.1.0 "glamorous-toucan" (2023-04-12)
### Bug Fixes
* **core/data:** Fixed a bug in base-data-model-manager causing "organizeDocsHierarchy" not to include docs without their parent in the hierarchy. ([a4f2fa9](https://bitbucket.org/gnucoop/dino/commits/a4f2fa9639760205838cb90ce9026d3fb37184dc))
* **core/data:** state.error$ JWT expired error now correctly intercepted. ([b6cb688](https://bitbucket.org/gnucoop/dino/commits/b6cb688e86d505c4f986f443b8a4e73a6ae34580))
* **core/notifications:** Fixed filtering for locally created notifications. ([3dcdbdf](https://bitbucket.org/gnucoop/dino/commits/3dcdbdffc04921c2e3224ff7ac580761c44e586a))
* **material/list:** icons min width fixed ([bbfa342](https://bitbucket.org/gnucoop/dino/commits/bbfa342df151e5899f04f6b8ceb801015164be9c))
* **multiple:** move edit and create trigger after save subscription ([38d5c93](https://bitbucket.org/gnucoop/dino/commits/38d5c93f47c6f9b5c0687a187a3d145f9170cd1f))
### Features
* **core/forms:** Added various utility methods to FormData and FormSchema managers. ([7680d4f](https://bitbucket.org/gnucoop/dino/commits/7680d4f60e895c525b3046687f217803ba4567a6))
* **core/logs:** Added Logs module, model and manager. ([f763e83](https://bitbucket.org/gnucoop/dino/commits/f763e837a96ca2534632e48f45e180f913d5d5b1))
* **core/notifications:** add isHighlighted function in list for read/unread notifications ([5fd7864](https://bitbucket.org/gnucoop/dino/commits/5fd786449b83c20a4126b92d890ea23d9a06fe8d))
* **e2e-material:** Added optional LogsModule to e2e-app main module and mockconfig ([7636fac](https://bitbucket.org/gnucoop/dino/commits/7636facbe361be50f8d5669a128bf8e0cae74007))
* **e2e-material:** Edit Form "on_form_data_change" and List "on_status_change" triggers now generate Logs. ([c5204e3](https://bitbucket.org/gnucoop/dino/commits/c5204e3bbed343196d13e7985d47f8d3778d9f7c))
* **material/list:** Added LogViewer dialog component. ([2b0fb03](https://bitbucket.org/gnucoop/dino/commits/2b0fb03bdd0b3b650a2dc5d9e3e775740d234db7))
* **material/list:** File columns cells now display an icon to preview images or open uploaded files. ([f9a5ee1](https://bitbucket.org/gnucoop/dino/commits/f9a5ee1fb0d7bcb1da4f63ee2fab7c68e8b66f57))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.0.2"></a>
# 15.0.2 "whole-penguin" (2023-03-17)
### Bug Fixes
* **core/notifications:** Fixed a bug in NotificationManager causing the active User to see all notifications created locally. ([7285d89](https://bitbucket.org/gnucoop/dino/commits/7285d897c6879d2c0c06a5c8942aa182f84407ef))
* **core/users:** Fixed a bug in UserDataManager causing the 'on_signup' trigger not to emit. ([1051f53](https://bitbucket.org/gnucoop/dino/commits/1051f53d6d071b10704566bb8bb8b3bc6ac90513))
* **core/users:** replace  in query, it doesn't work in v15.. ([93bb429](https://bitbucket.org/gnucoop/dino/commits/93bb429d2e6ec0da3c837123cad90a0d1b1ec288))
* **material/user-area:** Fixed a bug causing the Db json file not to be exported correctly ([3d19027](https://bitbucket.org/gnucoop/dino/commits/3d190270e6fa5239ed10093c368a35dd10b9c740))
* **multiple:** additional info in dino_form_info ([6e2cf87](https://bitbucket.org/gnucoop/dino/commits/6e2cf87404a95f4e0b81fe18df457dfadb263ce9))
* **multiple:** set dino controls in ajf form in the correct order ([9b2f677](https://bitbucket.org/gnucoop/dino/commits/9b2f6779b98b047644bd75f0034d7817fd6fd13a))
### Features
* **core/data:** Added '$elemMatch' operator to DataQuerySelector type ([92a5305](https://bitbucket.org/gnucoop/dino/commits/92a530507c961e51eb5eb27f27daf921a2eebdde))
* **core/data:** Added methods for importing/exporting the local db as a json. ([7c311f9](https://bitbucket.org/gnucoop/dino/commits/7c311f94761cce4eb318d45d91891d9881a045f5))
* **material/create-form:** if draft no default status for the new form ([07935e9](https://bitbucket.org/gnucoop/dino/commits/07935e949ef1252d6f59883fe033016c77f0ee3d))
* **material/edit-form:** Add formdata id into dino-form-info ([775566f](https://bitbucket.org/gnucoop/dino/commits/775566ff3d1c7998a43d191a943d6008cae94274))
* **material/export-form:** add export for data analysis for repeating slide ([462e613](https://bitbucket.org/gnucoop/dino/commits/462e613e0818a27014b300f66e07ff17c443b5f7))
* **material/export:** add export option for data analysis format ([2c4c2d7](https://bitbucket.org/gnucoop/dino/commits/2c4c2d7a14f5dd0f6fa03a217f151e366c8d8d6b))
* **material/list:** Paginator last selected page size is now stored in Localstorage as 'dino_page_size'. ([5d4132a](https://bitbucket.org/gnucoop/dino/commits/5d4132a290c37afd58e50bc5bb30d50d0271bc08))
* **material/user-area:** Added UI for DB Backup/Restore. ([a606a08](https://bitbucket.org/gnucoop/dino/commits/a606a08fdafc6025f60194d31aec41b9262e2923))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.0.1"></a>
# 15.0.1 "eligible-reindeer" (2023-02-28)
### Bug Fixes
* **core/data:** BulkDelete method refactor. Fixed a bug causing bulk deletion not to work correctly. ([ca0ee55](https://bitbucket.org/gnucoop/dino/commits/ca0ee55dd3949d021d7d9790d94a4d676820d976))
* **core/data:** Fixed a bug causing runsync not to end correctly. Added 'all' as an accepted recipient for notifications (readable by all users) ([0341e6c](https://bitbucket.org/gnucoop/dino/commits/0341e6c81ee6f7f9fbfd5476ca0e12c03e965cd3))
* **core/data:** Fixed check on socketJwtExpiredCode in graphql-ws-client 'newClient' function ([d50a6e9](https://bitbucket.org/gnucoop/dino/commits/d50a6e905da28875e225cf1bbd8ed0bee4e32367))
* **core/data:** Graphql Client creation in data service is now provided the correct websocket url (syncOptions.url.ws) ([1d7b819](https://bitbucket.org/gnucoop/dino/commits/1d7b819e1978b1203300f608f831f8eb358a285a))
* **core/data:** Pull query (for sync) no longer looks for docs updated 30 days before the checkpoint. ([c3db709](https://bitbucket.org/gnucoop/dino/commits/c3db70911b80202039421e96f1c392d4afce1cd8))
* **core/data:** Push query builder 'where' conditions now correctly checks for '_lte' update_at ([5b792a1](https://bitbucket.org/gnucoop/dino/commits/5b792a15a0c1c1ede8583143e4378c601fbbfee5))
* **core/notifications:** Added a small delay to methods that retrieve changes in notifications. ([ecf8163](https://bitbucket.org/gnucoop/dino/commits/ecf8163f83a5c1203a812c2074e8c700831d0c21))
* **material/core:** Fixed styles duplication in dino-theme ([3e42693](https://bitbucket.org/gnucoop/dino/commits/3e42693f1ba5858c28c0cdeab0386f10cb0e5477))
* **material/core:** Icon theme css overflow fix ([6c65f1a](https://bitbucket.org/gnucoop/dino/commits/6c65f1a3f88cb87976387ef89146affff692fb32))
* **material/edit-report:** move ajf report to prevent graph errors ([75e8af2](https://bitbucket.org/gnucoop/dino/commits/75e8af2741ed19785cae0d45493d0fb1ed477f80))
* **material/main-nav:** 'unreadNotificationsNumber' and 'lastNotifications' are now emitting on auth event 'init' too. ([e226557](https://bitbucket.org/gnucoop/dino/commits/e2265576981b576255e82b9d08225083f827030e))
* **material/main-nav:** Notification dropdown menu style fixes. ([606407a](https://bitbucket.org/gnucoop/dino/commits/606407a04d917379403cefd925bd327c8341114c))
* **material/metric-editor:** add translate to metric notes hint and change metric name label ([fee9412](https://bitbucket.org/gnucoop/dino/commits/fee9412159a92021ddc8d3d8505df571cf0d5b10))
* **material/pipeline-stepper:** Minor css fix for Stepper (viewonly). Fixed a bug causing the scroll bar not to be interactable with. ([24ae28d](https://bitbucket.org/gnucoop/dino/commits/24ae28d2d4caf46cc6c572e9d7fd945f764ce3b5))
### Features
* **core/data:** Added 'getWhichFormCanBeCreated' method to Data Context Service ([2cd40f8](https://bitbucket.org/gnucoop/dino/commits/2cd40f8b26811c0229a2cf1fbc0cc5ec3934ab58))
* **e2e-material:** Added Form Creator Hub button to Aggregation list in E2e app. ([b7f8a1c](https://bitbucket.org/gnucoop/dino/commits/b7f8a1ce282d5a7b07d0b824269280bca71149c3))
* **material/form-creator-hub:** Added Form Creator Hub module and component. ([f744850](https://bitbucket.org/gnucoop/dino/commits/f7448502af419ab820e735f4eabff80ff2abc362))
* **material/form-metric-selector:** Metric creation can now be allowed/disabled for each single metric type. ([ed85b63](https://bitbucket.org/gnucoop/dino/commits/ed85b63918a68ea94380cf1a35016af31a521d7c))
* **material/list:** Invalid form warning icon is now displayed in the list when needed ([0623a50](https://bitbucket.org/gnucoop/dino/commits/0623a508fa76bbbaa2253b9a00ae6a33539e2d5c))
* **material/search-filters-bar:** Added 'clear filter' suffix icon to clear filter inputs. ([b3a3760](https://bitbucket.org/gnucoop/dino/commits/b3a376036ee90037109d0eba02543ca3f1835890))
* **multiple:** Create/edit form Save Draft now writes "$invalid: true" in the Data attribute of the form. ([f407afc](https://bitbucket.org/gnucoop/dino/commits/f407afc4aa55641b623a40257c2955a49e330f37))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.4.2"></a>
# 13.4.2 "sporting-sole" (2023-01-29)
### Bug Fixes
* **core/data:** 'organizeDocsHierarchy' method in baseDataModelManager now handles missing parent docs correctly ([190e176](https://bitbucket.org/gnucoop/dino/commits/190e1760cbffa0ea05a59d9330273ac4d1c373d1))
* **core/data:** Dataservice 'firstReplicationComplete' now emits true when loading the app while offline ([441c42a](https://bitbucket.org/gnucoop/dino/commits/441c42a20226d3e375731e7ed013c780b13bd7e0))
* **material/core:** Sidenav css theme and base background color fix ([80debec](https://bitbucket.org/gnucoop/dino/commits/80debecfa9768229df2f9049b5abb25c787ab574))
* **material/edit-form:** check if formgroup is initialized before load relationships ([61cf06d](https://bitbucket.org/gnucoop/dino/commits/61cf06d8f860d6452b7901d73149b3b51aa0dad7))
* **material/edit-form:** Fixed a bug causing the ajfFormValidation state not to emit. ([f5f0f39](https://bitbucket.org/gnucoop/dino/commits/f5f0f39c7a3d8d93bb466793d0a3f77b69c86327))
* **material/edit-report:** add formschema in report context also when there are no relationships ([0d93c5e](https://bitbucket.org/gnucoop/dino/commits/0d93c5eaa08e3b264ed188b464d7092d63b0eb30))
* **material/edit-report:** Fixed a bug causing reports not to load correctly when they do not have any form deps. ([225f0b0](https://bitbucket.org/gnucoop/dino/commits/225f0b09c3562cc12bf8d250ae9f00729faaa5df))
* **material/form-deps-editor:** filter null field names ([6ba52cd](https://bitbucket.org/gnucoop/dino/commits/6ba52cd417af7926b21224db4503e6e9fe5077ba))
* **multiple:** add null check ([97440c6](https://bitbucket.org/gnucoop/dino/commits/97440c6fff6de9e77c2c495b5fe51bf811de00b3))
### Features
* **core/list:** add duplicate form action in list ([d6f9611](https://bitbucket.org/gnucoop/dino/commits/d6f96113683f89b0ad3730659662176bfd29873f))
* **core/notifications:** Added Notifications model, manager and module. ([9c46de9](https://bitbucket.org/gnucoop/dino/commits/9c46de93c4b5eca16760a4359dbf5a3b48ff4e1a))
* **core/users:** add function to get users belonging to a list of groups ([0559575](https://bitbucket.org/gnucoop/dino/commits/055957591a223c3cc49d4e8e68c2680d58188eac))
* **e2e-material:** Added notifications list component to E2e app ([669725e](https://bitbucket.org/gnucoop/dino/commits/669725edc1e562aca7af2395890a91adb2c8d6a6))
* **material/create-form:** add mainUnsubscribe ([b74b3ee](https://bitbucket.org/gnucoop/dino/commits/b74b3ee979eb2526f31775c7a55b2642167111eb))
* **material/edit-form:** add metrics info and created_at in form ([a2bdd17](https://bitbucket.org/gnucoop/dino/commits/a2bdd17a59ab5197c83b2b3d80a7d1c429f4ff9f))
* **material/list:** Added Icons and redirect buttons to list for notifications list ([b1a1f13](https://bitbucket.org/gnucoop/dino/commits/b1a1f13d3bc50826fba5c0a007a014f7db3e5e0e))
* **material/main-nav:** Added Notifications UI to main nav. ([03a609c](https://bitbucket.org/gnucoop/dino/commits/03a609cc2d78589b466e5867eb7c9d3cd7de4fcb))
* **multiple:** add save draft in create and edit form ([015e0aa](https://bitbucket.org/gnucoop/dino/commits/015e0aa548f7947849107ba46dc7498e84126af0))
* **multiple:** Icons in collect/dashboard, side navigation, main navigation toolbar can now be svg icons. ([76c754e](https://bitbucket.org/gnucoop/dino/commits/76c754e43b9675c5a04e9816cad877164d5bc729))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.4.1"></a>
# 13.4.1 "quintessential-herring" (2022-12-05)
### Bug Fixes
* **core/data:** filter JWTExpired sync errors ([974a675](https://bitbucket.org/gnucoop/dino/commits/974a67575d1c8e900c0909417d627de6010f7b5b))
* **core/file-upload:** fix duplicated uploaded files ([07d28a4](https://bitbucket.org/gnucoop/dino/commits/07d28a4ed7b374b34d489ce09f9a5992e58a5d54))
* **core/langs:** Langs are now correctly saved and loaded on initialization. ([2852e2c](https://bitbucket.org/gnucoop/dino/commits/2852e2ceca5cbfe06cd1beb750f3ad6e1b7b258b))
* **e2e-app:** add translations into pdf form ([783970d](https://bitbucket.org/gnucoop/dino/commits/783970d0835030ce544bb28c455fd8781bf5bb28))
* **e2e-material:** Added schema filter in Report collect ([54a1b68](https://bitbucket.org/gnucoop/dino/commits/54a1b68a127a737c266d713b1dba429ddaf4f977))
* **e2e-material:** Users and Groups lists column presets are now saved and loaded correctly. ([ffef6a4](https://bitbucket.org/gnucoop/dino/commits/ffef6a49250db9fff2ee6b5511def82bc9c899b6))
* **material/core:** Fixed css for checkbox theme background property ([034744a](https://bitbucket.org/gnucoop/dino/commits/034744a5b5c47e544423f4054d66d0d137053813))
* **material/edit-form-schema:** Create new status button is now displayed in the Form Status UI (autocomplete) even when no statuses exist. ([fb4924c](https://bitbucket.org/gnucoop/dino/commits/fb4924cc8ed80e5ad54e62ca7cf9236e6450d5e1))
* **material/edit-form-schema:** disable relationship button when the schema is being created ([8cd2c3c](https://bitbucket.org/gnucoop/dino/commits/8cd2c3c5772673c45367048638736ecc79ac2aef))
* **material/form-metric-selector:** fix creation date in metric selector for different timezone ([1c39f5b](https://bitbucket.org/gnucoop/dino/commits/1c39f5b02edd15d262a3d8b5d7d58fb57066617b))
* **material/form-metric-selector:** Fixed a bug causing Project 'code_auto' not to be recognized as readonly ([2f2d78a](https://bitbucket.org/gnucoop/dino/commits/2f2d78abf24028198757787e7a03f3ac03c14c9d))
* **material/list:** Added null check on dataSource.dataResults before subscribing to it. ([9b9baac](https://bitbucket.org/gnucoop/dino/commits/9b9baacb8104c45bfb352d40c1565b8a4741cb69))
* **material/list:** Selection is now cleared whenever the data in the listDataSource changes. ([327e19e](https://bitbucket.org/gnucoop/dino/commits/327e19ebb56503ab046210bb753d70930625eddf))
* **material/metric-editor:** Fixed font size of dialog titles ([cfc0b92](https://bitbucket.org/gnucoop/dino/commits/cfc0b924e6935ee0ab9be9f47dc45ac11cff36ce))
* **material/metric-section:** Column presets are now saved for Metric lists ([e7d588a](https://bitbucket.org/gnucoop/dino/commits/e7d588a5b4d6ac90124597c651a84539a7c5991c))
* **multiple:** Fixed a bug causing form datas not to be found by reports in backendless mode. ([ce047de](https://bitbucket.org/gnucoop/dino/commits/ce047de80868cd78106eb834f3c7d23100659c86))
### Features
* **core/data:** Added 'findMatchingAncestors' and 'organizeDocsHierarchy' methods to base data model manager. ([8d2934d](https://bitbucket.org/gnucoop/dino/commits/8d2934d85a0c98121f458e07011483310674bc9b))
* **core/projects:** Added 'code_auto' property to Project model ([9d0a81e](https://bitbucket.org/gnucoop/dino/commits/9d0a81e35d2fd69c75512e30d477f2d54dae2c05))
* **e2e-material:** Added metric_data column to all metrics and code_auto column to project. ([22c5c52](https://bitbucket.org/gnucoop/dino/commits/22c5c522685694b6f3b5652a11452d35212eaf46))
* **material/edit-form:** add sort for relationships choices origin ([1ab6a86](https://bitbucket.org/gnucoop/dino/commits/1ab6a86f2e57f48fe903fc04d01753a97f772f47))
* **material/edit-report:** add relationships external form data into report dataset ([0092681](https://bitbucket.org/gnucoop/dino/commits/0092681722b3aa979eb7766daa7f815047262ac7))
* **material/form-deps-editor:** add Create choice option in relationships ([ecc6de7](https://bitbucket.org/gnucoop/dino/commits/ecc6de74109b508909c002f221f0921111386e4f))
* **material/form-deps-editor:** add required metrics and hide fields already added ([ff9ecc9](https://bitbucket.org/gnucoop/dino/commits/ff9ecc9222ea9a9aa699d243d553aedda4407e31))
* **material/form-deps-editor:** relationship with the same form ([5ffbfd1](https://bitbucket.org/gnucoop/dino/commits/5ffbfd1ef742aa4237ebcf3b703f4aeb3488d972))
* **material/form-metric-selector:** Metrics are now displayed hyerarchically in the selector autocomplete. ([f16e4a7](https://bitbucket.org/gnucoop/dino/commits/f16e4a7030ffdf553b712d46eca00a648d7bda8d))
* **material/list:** Added Item Count to list. Pagination now has correct total pages number. ([baf4717](https://bitbucket.org/gnucoop/dino/commits/baf4717a9105922c9973c6a35178fea4aeb25cea))
* **material/list:** Added status getStatusProgress method to fill the status progress bar in the list. ([1be0748](https://bitbucket.org/gnucoop/dino/commits/1be0748d97a1df6848c97cc1354f63ab44a91f88))
* **material/list:** Created StatusDisplay type, used to determine which way form statuses are displayed in a forms list (Default, Progress bar, etc.) ([b578d40](https://bitbucket.org/gnucoop/dino/commits/b578d40872535837e60055782219ec4100760f70))
* **material/metric-editor:** Added UI for managing Metric Data attributes. ([58225eb](https://bitbucket.org/gnucoop/dino/commits/58225eb010936097031caf74b8fe9d69c9d6494b))
* **material/pipeline-stepper:** Added Pipeline Stepper module and component. ([aa8be9b](https://bitbucket.org/gnucoop/dino/commits/aa8be9bcec619630d63ad7ff355e1ca1c53d3c44))
* **material/search-filters-bar:** Added Status filter to aggregation. Colored options and header icon. ([c3624c4](https://bitbucket.org/gnucoop/dino/commits/c3624c4e3cf612bccf6e80d2403318d11cce1445))
* **material/search-filters-bar:** Metrics options are now displayed hyerarchically in the metric fields autocomplete list ([76185b6](https://bitbucket.org/gnucoop/dino/commits/76185b64eca284d3ac53b28fb37480ed9b29ab2a))
* **multiple:** Added "metric_data" field to the Metric model. All metrics json schemas updated accordingly. ([738074f](https://bitbucket.org/gnucoop/dino/commits/738074f608f3e6cb73f744c7149223436306c9d7))
* **multiple:** Form Status filter added to additional basic filters in Filter Bar. Form Status column added to Aggregation. ([d4c2899](https://bitbucket.org/gnucoop/dino/commits/d4c28993a6920cf9f9cf2bd4996a18ee546a6b2e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.4.0"></a>
# 13.4.0 "possible-hookworm" (2022-11-11)
### Bug Fixes
* **core/data:** filter JWTExpired sync errors ([974a675](https://bitbucket.org/gnucoop/dino/commits/974a67575d1c8e900c0909417d627de6010f7b5b))
* **material/core:** Fixed css for checkbox theme background property ([034744a](https://bitbucket.org/gnucoop/dino/commits/034744a5b5c47e544423f4054d66d0d137053813))
* **material/edit-form-schema:** Create new status button is now displayed in the Form Status UI (autocomplete) even when no statuses exist. ([fb4924c](https://bitbucket.org/gnucoop/dino/commits/fb4924cc8ed80e5ad54e62ca7cf9236e6450d5e1))
* **material/edit-form-schema:** disable relationship button when the schema is being created ([8cd2c3c](https://bitbucket.org/gnucoop/dino/commits/8cd2c3c5772673c45367048638736ecc79ac2aef))
* **material/form-metric-selector:** fix creation date in metric selector for different timezone ([1c39f5b](https://bitbucket.org/gnucoop/dino/commits/1c39f5b02edd15d262a3d8b5d7d58fb57066617b))
* **material/form-metric-selector:** Fixed a bug causing Project 'code_auto' not to be recognized as readonly ([2f2d78a](https://bitbucket.org/gnucoop/dino/commits/2f2d78abf24028198757787e7a03f3ac03c14c9d))
* **material/list:** Added null check on dataSource.dataResults before subscribing to it. ([9b9baac](https://bitbucket.org/gnucoop/dino/commits/9b9baacb8104c45bfb352d40c1565b8a4741cb69))
* **material/list:** Selection is now cleared whenever the data in the listDataSource changes. ([327e19e](https://bitbucket.org/gnucoop/dino/commits/327e19ebb56503ab046210bb753d70930625eddf))
### Features
* **core/projects:** Added 'code_auto' property to Project model ([9d0a81e](https://bitbucket.org/gnucoop/dino/commits/9d0a81e35d2fd69c75512e30d477f2d54dae2c05))
* **e2e-material:** Added metric_data column to all metrics and code_auto column to project. ([22c5c52](https://bitbucket.org/gnucoop/dino/commits/22c5c522685694b6f3b5652a11452d35212eaf46))
* **material/form-deps-editor:** add Create choice option in relationships ([ecc6de7](https://bitbucket.org/gnucoop/dino/commits/ecc6de74109b508909c002f221f0921111386e4f))
* **material/form-deps-editor:** add required metrics and hide fields already added ([ff9ecc9](https://bitbucket.org/gnucoop/dino/commits/ff9ecc9222ea9a9aa699d243d553aedda4407e31))
* **material/list:** Added Item Count to list. Pagination now has correct total pages number. ([baf4717](https://bitbucket.org/gnucoop/dino/commits/baf4717a9105922c9973c6a35178fea4aeb25cea))
* **material/metric-editor:** Added UI for managing Metric Data attributes. ([58225eb](https://bitbucket.org/gnucoop/dino/commits/58225eb010936097031caf74b8fe9d69c9d6494b))
* **material/search-filters-bar:** Added Status filter to aggregation. Colored options and header icon. ([c3624c4](https://bitbucket.org/gnucoop/dino/commits/c3624c4e3cf612bccf6e80d2403318d11cce1445))
* **multiple:** Added "metric_data" field to the Metric model. All metrics json schemas updated accordingly. ([738074f](https://bitbucket.org/gnucoop/dino/commits/738074f608f3e6cb73f744c7149223436306c9d7))
* **multiple:** Form Status filter added to additional basic filters in Filter Bar. Form Status column added to Aggregation. ([d4c2899](https://bitbucket.org/gnucoop/dino/commits/d4c28993a6920cf9f9cf2bd4996a18ee546a6b2e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.3.3"></a>
# 13.3.3 "increased-gerbil" (2022-10-24)
### Bug Fixes
* **e2e-material:** export forms e2e test fixed ([285c388](https://bitbucket.org/gnucoop/dino/commits/285c3884d3db21c595cc272ab2d89879dd13afa7))
* **material/core:** Theme Service now correctly sets the initial dark/light mode based on the provided theme config. ([3d57d28](https://bitbucket.org/gnucoop/dino/commits/3d57d2884c03dcc2c948a33c8f0afd75df361503))
* **material/edit-form:** decrease loading time for relationships ([da9d393](https://bitbucket.org/gnucoop/dino/commits/da9d393b5e17f51313a518ace6e8559e96d01717))
* **material/edit-report:** Fixed loading spinner css ([bf59a02](https://bitbucket.org/gnucoop/dino/commits/bf59a02f07139eec5ef8cea5326a1cfe5bec4d88))
* **material/list:** Fixed bug that caused list selection not to be reset after changing page or pagesize. ([42bb1b5](https://bitbucket.org/gnucoop/dino/commits/42bb1b592e68a1ec0d90ea3e3f30c41d03335f79))
* **material/list:** ListDatasource "emptyQueryStringFilter" now formatted and stringified correctly. ([d67eb34](https://bitbucket.org/gnucoop/dino/commits/d67eb34c1aa748c881feacd4e8ea279f94fcec50))
### Features
* **core/data:** logout on sync errors only when there is a GraphQL push error ([1bc8ae2](https://bitbucket.org/gnucoop/dino/commits/1bc8ae2f7ecbb5b16cd0774deae8d3bdd816b790))
* **core/list:** Added AdditionalFilterLogic ('and'/'or') to FilterService. ([561d1ea](https://bitbucket.org/gnucoop/dino/commits/561d1ea762b9be01da999061912f69ebe9151041))
* **core/online-user-data-manager:** Added Online-only User data manager. Utilized by public forms to get the default anonymous user. ([553e940](https://bitbucket.org/gnucoop/dino/commits/553e94077ebe82c34bd8d5bd0eb200914278e944))
* **e2e-material:** Added Edit Public Form module and related route to e2e app. Added Apollo options config to main module. ([a62293e](https://bitbucket.org/gnucoop/dino/commits/a62293e2f3073399378e65541d393e5b7871fc2b))
* **material/core:** Added Theme mgmt functionalities to theme service. Component themes altered. ([a304f23](https://bitbucket.org/gnucoop/dino/commits/a304f23f9a520464fff7391c4a455229b12c5a21))
* **material/create-form:** populate choices with relationships data if field in repeating slide ([0774ec6](https://bitbucket.org/gnucoop/dino/commits/0774ec651d73f0d0737ed658cbba3116cf84e8de))
* **material/edit-form-schema:** Changed UI of Form Statuses select. Form Status Editor component integrated. ([269e0f0](https://bitbucket.org/gnucoop/dino/commits/269e0f0e15e12c72a9cf99951e64d38b318b22e1))
* **material/export-form:** add export forms options for all and filtered forms ([5221894](https://bitbucket.org/gnucoop/dino/commits/5221894c5f4e7dcfa4239e65d3943b7f05fb4648))
* **material/form-status-editor:** Added Form Status Editor module. ([758fcb8](https://bitbucket.org/gnucoop/dino/commits/758fcb89d864cd967a722427ae2015ddd1090b6f))
* **material/main-nav:** Added dark/light toggle to main nav. ([1a46aaf](https://bitbucket.org/gnucoop/dino/commits/1a46aafa97bc61a560b727c1c345efdce4a60010))
* **material/main-nav:** Added inputs for disabling toolbar functions and buttons. Added tooltips to linkIcons. ([e103ea8](https://bitbucket.org/gnucoop/dino/commits/e103ea8d7a3909ef5498e78fab7a1d148f2b7f43))
* **material/search-filters-dialog:** Added LogicToggle ('all'/'any'). ([87043bd](https://bitbucket.org/gnucoop/dino/commits/87043bdaa297181359965636cd9e950cec68ed9f))
* **material/user-area:** Added Dino Theme management section to User Area ([5ee4ea2](https://bitbucket.org/gnucoop/dino/commits/5ee4ea209cbb3363c3950425235e4a5f69b56b30))
* **material/user-area:** Added User Area for small screens (breakpoint small, mobile devices). Css adjustments. ([d1eda3c](https://bitbucket.org/gnucoop/dino/commits/d1eda3ce9524a729719e03c69b75e336db4f0276))
* **search-filters-widget:** Complete Widget overhaul. ([3643a9c](https://bitbucket.org/gnucoop/dino/commits/3643a9c3aa2edc05420dd1a7b8f49e80f6693951))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.3.2"></a>
# 13.3.2 "defensive-moose" (2022-10-04)
### Bug Fixes
* **core/data:** export ajf custom function ([2dfe218](https://bitbucket.org/gnucoop/dino/commits/2dfe2189b6ed8183de78bd9c2032d49a503f1d7a))
* **core/list:** Loading columns selectore presets now preserves "isEditable" and "editMethod" functions of the default list headers. ([1336ff0](https://bitbucket.org/gnucoop/dino/commits/1336ff0775b29cb91a1efeb824440348ef563d3a))
* **material/column-selector:** Fixed a bug causing the column filter to search among untranslated labels ([890025c](https://bitbucket.org/gnucoop/dino/commits/890025c49c653cdef7c00c612a8df076f8f6d279))
* **material/create-form:** add check on metric selected type when metrics change ([70dede3](https://bitbucket.org/gnucoop/dino/commits/70dede37ba7e948768ec173a4fe886d52548bf33))
* **material/edit-form:** Save button no longer appears in view form ([534e72c](https://bitbucket.org/gnucoop/dino/commits/534e72c80c45bd3d49d98bb60e357724735517ca))
* **material/export-form:** fix export for duplicated choice values and change format to xlsx ([3b6e3e4](https://bitbucket.org/gnucoop/dino/commits/3b6e3e4d561519a020b7e7a59bb2230c198330fc))
* **material/import-form:** add trim to excel string ([bc19c81](https://bitbucket.org/gnucoop/dino/commits/bc19c817b6d61f315d7009729def01d6236c680a))
* **material/main-nav:** Added "Initializing data" text to custom spinner loading view ([6e9d653](https://bitbucket.org/gnucoop/dino/commits/6e9d6531ef1f1f8f5d8c78758d7c435af6ebf406))
* **material/main-nav:** Css and template fixes for the Initializing Data loading view. ([3857663](https://bitbucket.org/gnucoop/dino/commits/38576630bdc76cf9b98039baf0dc393fa7742a77))
* **material/reset-password:** Link expired text is now responsive ([c681031](https://bitbucket.org/gnucoop/dino/commits/c681031d9434c79031e51eb9ca524d542036d434))
### Features
* **core/data:** add ajf custom function type ([a2c6ba4](https://bitbucket.org/gnucoop/dino/commits/a2c6ba4c6f703c449a049c88dc17e72806a38409))
* **core/data:** Added "findDescendants" method to baseModelManager, to find all descendants doc based on parent_id ([fa0525f](https://bitbucket.org/gnucoop/dino/commits/fa0525fc4b431dabccad1a57457f92e96e40aa5c))
* **mat-forms-list:** add metric info in pdf header ([1d9f409](https://bitbucket.org/gnucoop/dino/commits/1d9f409ed7bb4d48d6ea709c6773dc30cf057b03))
* **material/main-nav:** Added "Initializing data" screen, linked to first sync replication cycle completion. ([7131b4a](https://bitbucket.org/gnucoop/dino/commits/7131b4a3c9d1162bd2de0f90a37ed3e35237da56))
* **material/search-filters-bar:** When filtering by metric, all items associated with the metric descendants are now displayed. ([3ee787e](https://bitbucket.org/gnucoop/dino/commits/3ee787e24ff4cf15f04fb7ff8e83c6fd9ded9af7))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.3.1"></a>
# 13.3.1 "harsh-vole" (2022-09-20)
### Bug Fixes
* **material/edit-report:** Fixed a bug causing the loading spinner to not appear. Ajf tables and chart canvas css fixes. ([a1e8cf9](https://bitbucket.org/gnucoop/dino/commits/a1e8cf931d8e834705982262e5e538f6390abdd0))
* **material/export-form:** Fixed css of export dialog so that list items can be scrolled vertically. ([fd615b4](https://bitbucket.org/gnucoop/dino/commits/fd615b466b1b8ff0d1bb9fe0d9d8c5b4cf99c0ff))
### Features
* **core/auth:** Added "changePasswordWithResetTicket" method to authService. ([c05e613](https://bitbucket.org/gnucoop/dino/commits/c05e6137b027ff6541018264957d7b8107e0e757))
* **e2e-material:** Added Reset Password module and component to E2e app ([e525ea4](https://bitbucket.org/gnucoop/dino/commits/e525ea4fd6720103ab189cb05a3a76ac72c78ffc))
* **material/floating-button:** Added input for disabling the floating button ([a46e94f](https://bitbucket.org/gnucoop/dino/commits/a46e94f8f439de23e9ca3dab66e05b646825cf1a))
* **material/reset-password:** Added material Reset Password module and component ([cf47f7b](https://bitbucket.org/gnucoop/dino/commits/cf47f7bce426080a98e127a287a3b94db64df497))
* **multiple:** Added new Floating Save Button to create/edit form/report. ([c4414a5](https://bitbucket.org/gnucoop/dino/commits/c4414a5b9adcb0421d02a54ef61632129d073e0b))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.3.0"></a>
# 13.3.0 "random-jaguar" (2022-09-09)
### Bug Fixes
* **e2e-material:** Restored "menu" dashboard in mockconfig for main nav test ([1e21ce6](https://bitbucket.org/gnucoop/dino/commits/1e21ce6cd1de87f190f3d52e7c1727352a155776))
* **material/edit-form-schema:** fixed a bug causing the relationship not to be saved ([51fd957](https://bitbucket.org/gnucoop/dino/commits/51fd957adb326491ea8ccaf7867acad7df39a647))
* **material/edit-report:** Fixed translations and report title in the template ([2b3ad86](https://bitbucket.org/gnucoop/dino/commits/2b3ad86a9f9de0824b5e1230d384ae81a3bb045c))
* **material/main-nav:** Fixed a bug causing the loading spinner to be always displayed. ([c7e3d7e](https://bitbucket.org/gnucoop/dino/commits/c7e3d7e214c61ad3c3c1459911602e952222c447))
### Features
* **core/data:** Added "favorites" actions to getAllowedActions method in context service. ([1a34237](https://bitbucket.org/gnucoop/dino/commits/1a34237d97fb25ce24f1bc382aee83faee569a3b))
* **core/list:** Added Favorites actions to list action interface. ([2036d5a](https://bitbucket.org/gnucoop/dino/commits/2036d5a11278f4bb4a853fbf5b3205e1cee98652))
* **e2e-material:** Added Dashboard Report component to e2e-app. ([70204c8](https://bitbucket.org/gnucoop/dino/commits/70204c87ca7df604ac315a42859f311771f83161))
* **material/edit-report:** Edit report can now display an Ajf Report outside Mat Stepper, without a Metric Selector. ([675ac7d](https://bitbucket.org/gnucoop/dino/commits/675ac7d6a0235d1adcc819b35e79abdc5c04e320))
* **material/list:** Added "add to favorites" and "remove from favorites" list actions. ([d56884c](https://bitbucket.org/gnucoop/dino/commits/d56884c711ae2fb009911370b1a28a713087d38b))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.1"></a>
# 13.2.1 "disappointed-nightingale" (2022-08-10)
### Bug Fixes
* **core/data:** setCollectionLastPushCheckpoint is now correctly called  even when Live setting is false. ([0ace655](https://bitbucket.org/gnucoop/dino/commits/0ace6555b5f3260856beafc146f3653912f6665e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.0"></a>
# 13.2.0 "comparable-fish" (2022-08-08)
### Bug Fixes
* **material/import-form:** Fixed a bug causing getStatusDictionary to not emit. ([25c8ff1](https://bitbucket.org/gnucoop/dino/commits/25c8ff11cd051ccf49c699ec9a28430d5d36dfcf))
* **material/list:** dinoListCellValue check that value isn't a number before trying to transform it with parseISO ([51f3fe9](https://bitbucket.org/gnucoop/dino/commits/51f3fe9295432255347857dac82869b571fa6c28))
* **material/list:** Removed transloco pipe from bulk delete action icon name ([7233be6](https://bitbucket.org/gnucoop/dino/commits/7233be6634b7dc49b5d25972b784cae1e9f56faf))
### Features
* **e2e-material:** Added availableLanguages and live settings for the E2e app ([9fa7ac3](https://bitbucket.org/gnucoop/dino/commits/9fa7ac30e9c0b56f604a6412c135e3cc4d34bb84))
* **material/edit-report:** Added form status properties to report context ([4aba2c5](https://bitbucket.org/gnucoop/dino/commits/4aba2c5b59a7be18f4594c55217510e25deac330))
* **material/export-form:** Form Status is now exported ([e9265f7](https://bitbucket.org/gnucoop/dino/commits/e9265f779a84c99b887abddcf700e9a82dfcd729))
* **material/import-form:** Form Statuses are now imported based on the Status Name. New statuses are currently not created on import. ([231b8f2](https://bitbucket.org/gnucoop/dino/commits/231b8f2cb067f895fdc6f90c72d5cc9b0d296751))
* **multiple:** Available languages can now be specified in the config/environment ([64878cf](https://bitbucket.org/gnucoop/dino/commits/64878cfb9802f437f83b6bdbb5df213bd5ffb566))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.0"></a>
# 13.1.0 "itchy-boar" (2022-07-25)
### Bug Fixes
* **core/data:** checkPermission method modified ([80042f0](https://bitbucket.org/gnucoop/dino/commits/80042f0b6431c47737cd1a4f1bd78b0a36bc978c))
* **core/data:** Collection Subscriptions now log the user out when receiving a JWT token error message different from 'JWT expired' message. ([e7c44dc](https://bitbucket.org/gnucoop/dino/commits/e7c44dcb45ef8adbef0e205f0ecea883b1f729e6))
* **core/data:** List Datasource 'keyword' filters use '$eq' as operator in the query Selector. ([4320151](https://bitbucket.org/gnucoop/dino/commits/4320151e5f449f3481288058acd9138313b178ba))
* **core/list:** Filters Service is now provided in 'root' ([f8bc5f0](https://bitbucket.org/gnucoop/dino/commits/f8bc5f08b2f4dd51198bcba0f7dbea72d4897833))
* **e2e-material:** Fixed a bug causing collections reinitialization on authtoken refresh ([310a752](https://bitbucket.org/gnucoop/dino/commits/310a7528ce6e158b8d6bc74a6185607e42588b9c))
* finish rebase and update ajf to v13.2.0 ([55a0e18](https://bitbucket.org/gnucoop/dino/commits/55a0e18ad09be11ce449bf0a2ffdb9e6665f8711))
* **material/collect:** Collect filter now filters by Items Label ([abc0771](https://bitbucket.org/gnucoop/dino/commits/abc07718aa2e8a735905173269232e60714a0b3e))
* **material/create-report:** Fixed a bug that forbid progressing to step 2 of Report creation when metrics are optional. ([5de4963](https://bitbucket.org/gnucoop/dino/commits/5de4963b34b0a70518f879ed69f603d9f96d3f4c))
* **material/import-form:** Added missing dino/core/users import for UserDataManager ([94d4131](https://bitbucket.org/gnucoop/dino/commits/94d4131d7fd072cddcc722ab203b17d53a521692))
* **material/import-form:** added missing mock provider into test ([8740df2](https://bitbucket.org/gnucoop/dino/commits/8740df205d97f4b8d911e12940a9ae2fb94e3abf))
* **material/import-form:** fix userid and check for null value before import ([f6fcf43](https://bitbucket.org/gnucoop/dino/commits/f6fcf436980bfea2f0c8b2d5c847f05a9c6c3a41))
* **material/list:** List rows now display Labels instead of values of single/multiple choice fields. ([63debd4](https://bitbucket.org/gnucoop/dino/commits/63debd43b2c96cd7ee802a1e57f926d75a79d4e7))
* **material/login:** Css fix for login form, both small and large screens ([605de42](https://bitbucket.org/gnucoop/dino/commits/605de4286c1ef6340f0149d6385caab13e1e53fa))
* **material/search-filters-bar:** Spacebar no longer triggers the advanced filters expansion panel opening. ([4e96f89](https://bitbucket.org/gnucoop/dino/commits/4e96f89b0bc4462f7ebe771bb30f486ad6ebd63a))
* **multiple:** Fixed a bug that forbid advancing to step 2 of create/edit form, even when metrics were optional ([caecb10](https://bitbucket.org/gnucoop/dino/commits/caecb102a472f89a8c532667dd70ee37b5f2ee68))
### Features
* **core/auth:** Added Reset Password process. Added Privacy Policy terms input to signup. ([c1bfca3](https://bitbucket.org/gnucoop/dino/commits/c1bfca3fc0f1585653937e75053909af99185d8a))
* **core/data:** Action trigger interfaces added. ([33db829](https://bitbucket.org/gnucoop/dino/commits/33db829b00b18c4f66781e403b1863c4d20c0f6d))
* **core/data:** Sync and collection creation overhaul ([3565a9a](https://bitbucket.org/gnucoop/dino/commits/3565a9ab19c199df5352739f7518fdd293d49a1d))
* **core/file-upload:** add delete file function ([725a215](https://bitbucket.org/gnucoop/dino/commits/725a215d3139f81f987a0c00b3f6ba9b25996687))
* **core/file-upload:** add delete file function ([9c370b8](https://bitbucket.org/gnucoop/dino/commits/9c370b8a0a6ece481fe273e5b1f021edf6bd1078))
* **core/file-upload:** upload formdata files into nhost storage ([6c6dfc9](https://bitbucket.org/gnucoop/dino/commits/6c6dfc9f4c7fe2013d0bca087800fe2d8a88731d))
* **core/file-upload:** upload formdata files into nhost storage ([cf1f9a0](https://bitbucket.org/gnucoop/dino/commits/cf1f9a07986d41989d12776b0e272ecda6697f42))
* **core/list:** Added custom text argument to "askConfirm" abstract method ([83d95fc](https://bitbucket.org/gnucoop/dino/commits/83d95fc0392d82f495c423c9507c058984c7b486))
* **core/users:** Created AdminGuard, to prevent access to admin routes by non-admin users. ([e73869f](https://bitbucket.org/gnucoop/dino/commits/e73869f30e7d9c805f404743abc3a6ab746e9136))
* **e2e-material:** E2e app initialization overhaul. ([299afa3](https://bitbucket.org/gnucoop/dino/commits/299afa34e1b2425f859f0c57c844f928c6c7de10))
* **material/create-form:** add upload file on storage ([21acab6](https://bitbucket.org/gnucoop/dino/commits/21acab65c3a23dc898a5200ff1d105873baa35e8))
* **material/create-form:** add upload file on storage ([e0f4db8](https://bitbucket.org/gnucoop/dino/commits/e0f4db8c14d0b60fd3b17ee6ac307b112881c0a6))
* **material/edit-form:** delete file on save ([f848029](https://bitbucket.org/gnucoop/dino/commits/f84802980acfa0c1561c71a578692a11bde45e3a))
* **material/form-metric-selector:** Added ng content projection for a Message that will appear before the Metric Selector fields ([f5b007a](https://bitbucket.org/gnucoop/dino/commits/f5b007a660572294c24a2e817810f116be971b51))
* **material/loading-spinner:** Added Custom Loading Spinner module and component ([7ed9962](https://bitbucket.org/gnucoop/dino/commits/7ed996223f1bbee3a0433fdb911776470c941db7))
* **material/main-nav:** Added initialExtendedSidenav input, for displaying the expanded menu from the start. ([c2c4a24](https://bitbucket.org/gnucoop/dino/commits/c2c4a24a47a9e10edf5c6f67e7059071d99f060f))
* **material/main-nav:** Added Loading spinner and Logout availability observable. ([643854a](https://bitbucket.org/gnucoop/dino/commits/643854a14d850f01bfc6d8fa9a0481ea5c5da497))
* **material/user-interactions:** Added User Interactions module. ([ae3800c](https://bitbucket.org/gnucoop/dino/commits/ae3800c7b55402fc9f8a5830bb08454757ba1de7))
* **multiple:** Added Action Trigger emission to edit/create form ([297d71d](https://bitbucket.org/gnucoop/dino/commits/297d71de5f3ab41c97936ff0ce206db0a9d6a9a5))
* **multiple:** Metric creation in Metric Selector is now allowed or forbidden depending on a dedicated Input ([9f4a3b0](https://bitbucket.org/gnucoop/dino/commits/9f4a3b043f1e125994c4cfaf2a3c4f71ba8210fe))
* use date-fns for dates ([5f19713](https://bitbucket.org/gnucoop/dino/commits/5f19713c3d31e75b3c75b6e21c05669c59fbf1c0))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.8"></a>
# 13.0.8 "incredible-magpie" (2022-06-28)
### Bug Fixes
* **core/data:** Added where conditions to pushquery builder. Checks for 'updated_at' older than doc, before inserting ([6501a75](https://bitbucket.org/gnucoop/dino/commits/6501a75b1bb49dddb7f758445808eb621b2cb042))
* **core/data:** Changed '_lt' to '_lte' in where conditions for Push query builder. ([a227985](https://bitbucket.org/gnucoop/dino/commits/a227985828f15a0a0e6c64b7ca45cd43f0c6e2b7))
* **core/forms:** add missing export ([75426db](https://bitbucket.org/gnucoop/dino/commits/75426dbc50aa702f4da87efaf8c43c192ff7e2ee))
* **core/forms:** fix schema deps model ([9a644b3](https://bitbucket.org/gnucoop/dino/commits/9a644b3aa0ab84a178e6ac852d3af515246bc19c))
* **material/create-form:** format date with timezone and fix css for multiple choices select ([e4e5b46](https://bitbucket.org/gnucoop/dino/commits/e4e5b4602ffc8f1bc9b22a844e904f60871aef40))
### Features
* **core/auth:** change isOnLine to protected ([8cd5e5f](https://bitbucket.org/gnucoop/dino/commits/8cd5e5f3512a5327d1b4f382389390c342c78f7e))
* **core/cases:** add notes field in case metric ([e93b6e1](https://bitbucket.org/gnucoop/dino/commits/e93b6e1914ad8724df53b4dd83d36b23c63a348d))
* **core/forms:** add requested metric properties in formdata context ([20a23d7](https://bitbucket.org/gnucoop/dino/commits/20a23d758110c6c3a63ce2ac1657f08d811db13b))
* **core/forms:** take metric properties from metric selector ([32200b3](https://bitbucket.org/gnucoop/dino/commits/32200b3d686120dc71f56643b91d1224f2e5d38b))
* **material/create-form:** add deps into new form context ([726a4cb](https://bitbucket.org/gnucoop/dino/commits/726a4cb646d715626bdbed572bd493c5b5a21a56))
* **material/edit-form-schema:** add form relationships editor ([f0f58a9](https://bitbucket.org/gnucoop/dino/commits/f0f58a9a27d190fdf35a77da9e06b497cf159010))
* **material/edit-form:** add into context external related form datas ([c534ac8](https://bitbucket.org/gnucoop/dino/commits/c534ac8c75b71fc156de80713d6382972cd34853))
* **material/form-deps-editor:** filter form schemas in relationships editor ([da8aff3](https://bitbucket.org/gnucoop/dino/commits/da8aff3fd7ab48f455f5490903edb61bf937916a))
* **material/main-nav:** change sync icon rotation ([f62d967](https://bitbucket.org/gnucoop/dino/commits/f62d967390fead09d57c14a0571c789af6f2af6e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.7"></a>
# 13.0.7 "historical-gorilla" (2022-06-03)
### Bug Fixes
* **multiple:** Fixed a bug causing the wrong evaluation of the metrics selector validity status, in case of mandatory metrics. ([f28c85e](https://bitbucket.org/gnucoop/dino/commits/f28c85ee205f451d39797aee7e468ad503076cb9))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.6"></a>
# 13.0.6 "silly-weasel" (2022-05-24)
### Bug Fixes
* **core/data:** Fixed a null check in data context service ([2f73d5e](https://bitbucket.org/gnucoop/dino/commits/2f73d5ea56d641fc6acf492be765cf2b65842dea))
### Features
* **core/auth:** SignUp and ChangePassword feats added. ([01411d0](https://bitbucket.org/gnucoop/dino/commits/01411d0a105418b32bc3aab898291a01c1956224))
* **core/forms:** Added Form Status model and manager ([0e5985e](https://bitbucket.org/gnucoop/dino/commits/0e5985e80d41341f926b3305625594ab2d9c6c10))
* **core/list:** Added isEditable and editMethod properties to list-header interface. ([f5f6691](https://bitbucket.org/gnucoop/dino/commits/f5f669122efb05bb08f53a125365e42d4259666d))
* **core/users:** Added Form Status ref id  to user groups. ([29c7dcb](https://bitbucket.org/gnucoop/dino/commits/29c7dcbdda8ea2f94c1d3e0af05f3f18f287b118))
* **core/users:** UserDataManager creates userData for newly signed-up users ([4945ab3](https://bitbucket.org/gnucoop/dino/commits/4945ab38c23ebb603ff7db54d33c7516a223469c))
* **e2e-material:** Added statuses to Group Editor in e2e-app. Added status editor and permissions check in forms list. ([c70df54](https://bitbucket.org/gnucoop/dino/commits/c70df54795a15a4482cb5179c67b845230554cfa))
* **material/edit-form-schema:** Added Form Statuses selection to Form Schema Editor ([4fbe5e3](https://bitbucket.org/gnucoop/dino/commits/4fbe5e3954c1d792b1338d40d9eeb4037ad4e9ca))
* **material/form-status-editor:** Added Form Status Editor module and component ([200c02a](https://bitbucket.org/gnucoop/dino/commits/200c02a0f5dea18441a5f3b8ea13317f95177e12))
* **material/list:** Added status edit button to list rows ([a6f97a7](https://bitbucket.org/gnucoop/dino/commits/a6f97a79e78bf4c1752650055f35bd5547d422e7))
* **material/login:** Added Signup form. ([f0a39a6](https://bitbucket.org/gnucoop/dino/commits/f0a39a676c5eb39a62012cc11e13f15b7754c818))
* **material/main-nav:** UserArea can now be opened from the Main Nav top bar. ([ca22b68](https://bitbucket.org/gnucoop/dino/commits/ca22b6892ec42c039513db287fc68abdb44ad6c1))
* **material/mixed-editor:** Tooltip info added to mixed editor. ([0573f85](https://bitbucket.org/gnucoop/dino/commits/0573f85ef9a8baef9c78a2b24295ac740eabac4c))
* **material/user-area:** Added UserArea module and component. ([b4a7565](https://bitbucket.org/gnucoop/dino/commits/b4a7565ca5034e47c4129d799b51389d498b7008))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.5"></a>
# 13.0.5 "labour-duck" (2022-05-11)
### Bug Fixes
* **material/form-metric-selector:** Fixed a bug causing metric name filtering not to work properly. ([1073ea5](https://bitbucket.org/gnucoop/dino/commits/1073ea58d7c918b1086ae9b39859f7ce7634f9f1))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.4"></a>
# 13.0.4 "nearby-carp" (2022-05-03)
### Bug Fixes
* **core/data:** BaseDataModelManager list/query without selector now automatically excludes deleted docs ([a2edc0d](https://bitbucket.org/gnucoop/dino/commits/a2edc0df1dd95f91092f6677e73286e997fc0df4))
* **core/forms:** FormSchemaManager no longer generates headers for ajf empty fields (notes) ([e17b098](https://bitbucket.org/gnucoop/dino/commits/e17b098de59bf5deae1db90163fecf1b47285eca))
* **material/core:** include all components themes in dino theme ([d68ad5d](https://bitbucket.org/gnucoop/dino/commits/d68ad5de88de309cb4b5f5ad02dba80980311b2f))
* **material/export-form:** missing null check in export ([a9eb2f0](https://bitbucket.org/gnucoop/dino/commits/a9eb2f0755d9733557d27eaa05d7c4d2ccc07861))
* **material/form-metric-selector:** Newly created metrics can now be selected immediately in the Form Metric Selector ([d7197e8](https://bitbucket.org/gnucoop/dino/commits/d7197e83f60bdd2dfc61cf80e11549e23d85502f))
* **material/list:** Fixed a layout problem causing list not to be displayed correctly on mobile devices ([5b757ec](https://bitbucket.org/gnucoop/dino/commits/5b757ecc5dc5952f45272c5f7a50c0f9b694766c))
* **multiple:** Css minor fixes ([9171336](https://bitbucket.org/gnucoop/dino/commits/91713368aa4690cee12636ef133d31339177321a))
### Features
* **material/core:** theme configuration via css variables ([22e9af3](https://bitbucket.org/gnucoop/dino/commits/22e9af399f0df32eefb3e5ff4c4cabd4aaa600b0))
* **material/list:** format dates based on current locale ([b26c1ef](https://bitbucket.org/gnucoop/dino/commits/b26c1efba7f987f6a767c16f6dee9fc5e8e22f52))
* **material/search-filters-widget:** Added text search operators to filter widget ([b513e97](https://bitbucket.org/gnucoop/dino/commits/b513e9711dd1a64d161a4ce5bec338922fc47eef))

<!-- CHANGELOG SPLIT MARKER -->

