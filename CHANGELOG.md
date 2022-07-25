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

