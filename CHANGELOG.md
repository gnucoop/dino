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

