# Directory Structure

```
android/
  app/
    src/
      androidTest/
        java/
          com/
            getcapacitor/
              myapp/
                ExampleInstrumentedTest.java (13 lines)
      main/
        assets/
          capacitor.config.json (9 lines)
          capacitor.plugins.json (14 lines)
        java/
          io/
            gnucoop/
              dino/
                cpa/
                  MainActivity.java (1 lines)
        res/
          drawable/
            ic_launcher_background.xml (170 lines)
          drawable-v24/
            ic_launcher_foreground.xml (34 lines)
          layout/
            activity_main.xml (12 lines)
          mipmap-anydpi-v26/
            ic_launcher_round.xml (5 lines)
            ic_launcher.xml (5 lines)
          values/
            ic_launcher_background.xml (4 lines)
            strings.xml (7 lines)
            styles.xml (22 lines)
          xml/
            config.xml (6 lines)
            file_paths.xml (5 lines)
        AndroidManifest.xml (46 lines)
      test/
        java/
          com/
            getcapacitor/
              myapp/
                ExampleUnitTest.java (9 lines)
    .gitignore (2 lines)
    build.gradle (58 lines)
    capacitor.build.gradle (21 lines)
    proguard-rules.pro (21 lines)
  fastlane/
    metadata/
      android/
        en-US/
          title.txt (1 lines)
    Appfile (2 lines)
    Fastfile (36 lines)
  gradle/
    wrapper/
      gradle-wrapper.properties (6 lines)
  .gitignore (96 lines)
  build.gradle (29 lines)
  capacitor.settings.gradle (12 lines)
  Gemfile (3 lines)
  gradle.properties (22 lines)
  gradlew (244 lines)
  gradlew.bat (92 lines)
  settings.gradle (5 lines)
  variables.gradle (16 lines)
scripts/
  postinstall/
    index.mjs (0 lines)
    patch-rxdb.mjs (3 lines)
  loadenv.mjs (1 lines)
  postinstall.mjs (0 lines)
src/
  actions/
    actions.common.ts (189 lines)
    actions.custom.ts (2 lines)
    email-templates.interface.ts (18 lines)
    email-templates.notification.ts (3 lines)
  ajf-functions/
    ajf-functions.common.ts (82 lines)
    ajf-functions.custom.ts (2 lines)
  app/
    aggregation-list/
      components/
        aggregation-list.component.html (30 lines)
        aggregation-list.component.scss (0 lines)
        aggregation-list.component.spec.ts (3 lines)
        aggregation-list.component.ts (64 lines)
      aggregation-list-routing.module.ts (5 lines)
      aggregation-list.module.ts (13 lines)
      conf.ts (4 lines)
    areas/
      components/
        areas.component.html (7 lines)
        areas.component.scss (0 lines)
        areas.component.spec.ts (3 lines)
        areas.component.ts (10 lines)
      areas-routing.module.ts (5 lines)
      areas.module.ts (8 lines)
      conf.ts (2 lines)
    cases/
      components/
        cases.component.html (9 lines)
        cases.component.scss (0 lines)
        cases.component.spec.ts (3 lines)
        cases.component.ts (10 lines)
      cases-routing.module.ts (5 lines)
      cases.module.ts (8 lines)
      conf.ts (2 lines)
    checkout/
      components/
        checkout.component.html (1 lines)
        checkout.component.ts (5 lines)
      checkout-routing.module.ts (5 lines)
      checkout.module.ts (9 lines)
      conf.ts (0 lines)
    create-form/
      components/
        create-form.component.html (14 lines)
        create-form.component.scss (0 lines)
        create-form.component.spec.ts (3 lines)
        create-form.component.ts (11 lines)
      conf.ts (1 lines)
      create-form-routing.module.ts (5 lines)
      create-form.module.ts (11 lines)
    create-report/
      components/
        create-report.component.html (6 lines)
        create-report.component.scss (0 lines)
        create-report.component.spec.ts (3 lines)
        create-report.component.ts (6 lines)
      conf.ts (1 lines)
      create-report-routing.module.ts (5 lines)
      create-report.module.ts (12 lines)
    dashboard/
      components/
        dashboard/
          dashboard-menu.component.html (4 lines)
          dashboard-menu.component.scss (7 lines)
          dashboard-menu.component.spec.ts (2 lines)
          dashboard-menu.component.ts (20 lines)
          dashboard-report.component.html (22 lines)
          dashboard-report.component.scss (25 lines)
          dashboard-report.component.ts (15 lines)
      conf.ts (1 lines)
      dashboard-routing.module.ts (7 lines)
      dashboard.module.ts (16 lines)
    datachat/
      components/
        datachat.component.html (8 lines)
        datachat.component.ts (7 lines)
      conf.ts (1 lines)
      datachat-routing.module.ts (5 lines)
      datachat.module.ts (9 lines)
    edit-form/
      components/
        edit-form.component.html (13 lines)
        edit-form.component.scss (0 lines)
        edit-form.component.spec.ts (3 lines)
        edit-form.component.ts (20 lines)
      conf.ts (1 lines)
      edit-form-routing.module.ts (5 lines)
      edit-form.module.ts (11 lines)
    edit-form-schema/
      components/
        edit-form-schema.component.html (3 lines)
        edit-form-schema.component.scss (0 lines)
        edit-form-schema.component.spec.ts (3 lines)
        edit-form-schema.component.ts (6 lines)
      conf.ts (0 lines)
      edit-form-schema-routing.module.ts (5 lines)
      edit-form-schema.module.ts (10 lines)
    edit-public-form/
      components/
        edit-public-form.component.html (3 lines)
        edit-public-form.component.scss (0 lines)
        edit-public-form.component.spec.ts (3 lines)
        edit-public-form.component.ts (8 lines)
      conf.ts (0 lines)
      edit-form-public-routing.module.ts (6 lines)
      edit-form-public.module.ts (8 lines)
    edit-report/
      components/
        edit-report.component.html (8 lines)
        edit-report.component.scss (10 lines)
        edit-report.component.spec.ts (3 lines)
        edit-report.component.ts (4 lines)
      conf.ts (1 lines)
      edit-report-routing.module.ts (5 lines)
      edit-report.module.ts (12 lines)
      functions.ts (7 lines)
    edit-report-schema/
      components/
        edit-report-schema.component.html (1 lines)
        edit-report-schema.component.scss (0 lines)
        edit-report-schema.component.spec.ts (3 lines)
        edit-report-schema.component.ts (5 lines)
      conf.ts (0 lines)
      edit-report-schema-routing.module.ts (5 lines)
      edit-report-schema.module.ts (11 lines)
    forms-collect/
      components/
        home/
          forms-collect.component.html (9 lines)
          forms-collect.component.scss (0 lines)
          forms-collect.component.spec.ts (3 lines)
          forms-collect.component.ts (6 lines)
      forms-collect-routing.module.ts (5 lines)
      forms-collect.module.ts (11 lines)
    forms-list/
      components/
        forms-list.component.html (44 lines)
        forms-list.component.scss (3 lines)
        forms-list.component.spec.ts (3 lines)
        forms-list.component.ts (113 lines)
      conf.ts (6 lines)
      forms-list-routing.module.ts (5 lines)
      forms-list.module.ts (14 lines)
    forms-map/
      components/
        forms-map.html (18 lines)
        forms-map.scss (80 lines)
        forms-map.ts (57 lines)
        text-input-autocomp.html (11 lines)
        text-input-autocomp.scss (3 lines)
        text-input-autocomp.ts (14 lines)
      forms-map-routing.module.ts (5 lines)
      forms-map.module.ts (16 lines)
    gpt/
      components/
        gpt.component.html (21 lines)
        gpt.component.scss (121 lines)
        gpt.component.spec.ts (3 lines)
        gpt.component.ts (49 lines)
      conf.ts (1 lines)
      gpt-routing.module.ts (5 lines)
      gpt.module.ts (8 lines)
    groups-list/
      components/
        groups-editor.component.html (7 lines)
        groups-editor.component.scss (0 lines)
        groups-editor.component.spec.ts (3 lines)
        groups-editor.component.ts (110 lines)
        groups-list.component.html (20 lines)
        groups-list.component.scss (0 lines)
        groups-list.component.spec.ts (3 lines)
        groups-list.component.ts (17 lines)
      conf.ts (2 lines)
      groups-list-routing.module.ts (5 lines)
      groups-list.module.ts (15 lines)
    install-app/
      components/
        install-app.component.html (22 lines)
        install-app.component.scss (0 lines)
        install-app.component.spec.ts (3 lines)
        install-app.component.ts (10 lines)
      services/
        app-install.service.ts (23 lines)
        app-update.service.ts (13 lines)
      install-app.module.ts (11 lines)
    langs/
      components/
        langs.component.html (3 lines)
        langs.component.scss (0 lines)
        langs.component.spec.ts (3 lines)
        langs.component.ts (3 lines)
      conf.ts (0 lines)
      langs-routing.module.ts (5 lines)
      langs.module.ts (9 lines)
    locations/
      components/
        locations.component.html (7 lines)
        locations.component.scss (0 lines)
        locations.component.spec.ts (3 lines)
        locations.component.ts (8 lines)
      conf.ts (2 lines)
      locations-routing.module.ts (5 lines)
      locations.module.ts (9 lines)
    login/
      components/
        login/
          login.component.html (32 lines)
          login.component.scss (7 lines)
          login.component.spec.ts (3 lines)
          login.component.ts (43 lines)
      conf.ts (1 lines)
      login-routing.module.ts (6 lines)
      login.module.ts (15 lines)
    main-nav/
      components/
        main-nav.component.html (19 lines)
        main-nav.component.scss (25 lines)
        main-nav.component.spec.ts (3 lines)
        main-nav.component.ts (18 lines)
      conf.ts (7 lines)
      main-nav.module.ts (11 lines)
    metrics/
      components/
        metrics.component.html (3 lines)
        metrics.component.scss (0 lines)
        metrics.component.spec.ts (3 lines)
        metrics.component.ts (13 lines)
      conf.ts (0 lines)
      metrics-routing.module.ts (5 lines)
      metrics.module.ts (9 lines)
    network-status/
      services/
        network-status.service.ts (10 lines)
      network-status.module.ts (7 lines)
    notifications-list/
      components/
        notifications-list.component.html (12 lines)
        notifications-list.component.scss (0 lines)
        notifications-list.component.spec.ts (3 lines)
        notifications-list.component.ts (38 lines)
      conf.ts (2 lines)
      notifications-list-routing.module.ts (5 lines)
      notifications-list.module.ts (17 lines)
    organizations/
      components/
        organizations.component.html (7 lines)
        organizations.component.scss (0 lines)
        organizations.component.spec.ts (3 lines)
        organizations.component.ts (8 lines)
      conf.ts (2 lines)
      organizations-routing.module.ts (5 lines)
      organizations.module.ts (9 lines)
    projects/
      components/
        projects.component.html (8 lines)
        projects.component.scss (0 lines)
        projects.component.spec.ts (3 lines)
        projects.component.ts (8 lines)
      conf.ts (2 lines)
      projects-routing.module.ts (5 lines)
      projects.module.ts (9 lines)
    rag/
      components/
        rag.component.html (42 lines)
        rag.component.scss (58 lines)
        rag.component.spec.ts (3 lines)
        rag.component.ts (30 lines)
      conf.ts (1 lines)
      rag-routing.module.ts (5 lines)
      rag.module.ts (8 lines)
    reports-collect/
      components/
        reports-collect.component.html (3 lines)
        reports-collect.component.scss (0 lines)
        reports-collect.component.spec.ts (3 lines)
        reports-collect.component.ts (5 lines)
      reports-collect-routing.module.ts (5 lines)
      reports-collect.module.ts (11 lines)
    reports-list/
      components/
        reports-list.component.html (28 lines)
        reports-list.component.scss (0 lines)
        reports-list.component.spec.ts (3 lines)
        reports-list.component.ts (38 lines)
      conf.ts (3 lines)
      reports-list-routing.module.ts (5 lines)
      reports-list.module.ts (15 lines)
    reset-password/
      components/
        reset-password.component.html (3 lines)
        reset-password.component.spec.ts (3 lines)
        reset-password.component.ts (5 lines)
      conf.ts (1 lines)
      reset-password-routing.module.ts (5 lines)
      reset-password.module.ts (7 lines)
    users/
      components/
        users.component.html (1 lines)
        users.component.scss (0 lines)
        users.component.spec.ts (3 lines)
        users.component.ts (3 lines)
      conf.ts (0 lines)
      users-routing.module.ts (5 lines)
      users.module.ts (9 lines)
    users-list/
      components/
        users-editor.component.html (1 lines)
        users-editor.component.scss (0 lines)
        users-editor.component.spec.ts (3 lines)
        users-editor.component.ts (10 lines)
        users-list.component.html (17 lines)
        users-list.component.scss (0 lines)
        users-list.component.spec.ts (3 lines)
        users-list.component.ts (15 lines)
      conf.ts (3 lines)
      users-list-routing.module.ts (5 lines)
      users-list.module.ts (15 lines)
    actions.service.ts (25 lines)
    backendless-services.ts (34 lines)
    base-webmanifest.ts (0 lines)
    conf.ts (0 lines)
    dino-routing.module.ts (8 lines)
    dino.component.html (1 lines)
    dino.component.scss (8 lines)
    dino.component.spec.ts (3 lines)
    dino.component.ts (27 lines)
    dino.module.ts (121 lines)
    email.service.ts (40 lines)
    error-handler.service.ts (67 lines)
    login.guard.ts (41 lines)
  assets/
    fonts/
      humanitarian-icons-set.svg (1436 lines)
    icons/
      logos/
        dino-bar-logo-dark.svg (22 lines)
        dino-bar-logo-light.svg (22 lines)
        dino-login-dark.svg (21 lines)
        dino-login-light.svg (76 lines)
        dino-spinner-dark.svg (11 lines)
        dino-spinner-light.svg (11 lines)
      svg/
        dati.svg (1 lines)
        esci.svg (1 lines)
        formulari.svg (1 lines)
        guida.svg (1 lines)
        refresh.svg (1 lines)
        report.svg (1 lines)
        utente_pico.svg (1 lines)
        utenti.svg (1 lines)
        vetrina.svg (1 lines)
    svg/
      azuread.svg (6 lines)
      google.svg (1 lines)
    themes/
      dino-theme-default.css (249 lines)
      dino-theme-orange.css (249 lines)
    .gitkeep (0 lines)
  custom-themes/
    _pico.scss (96 lines)
    styles.pico.scss (152 lines)
  environments/
    environment-interface.ts (878 lines)
    environment.e2e.ts (1 lines)
    environment.ts (1 lines)
  manifests/
    exampleManifest.ts (1 lines)
    webmanifest_generator.ts (8 lines)
  testing/
    fake-data-generator.ts (23 lines)
    fake-data-initializer.ts (34 lines)
    mock-services.ts (52 lines)
    test-ajf-formdata.ts (1 lines)
    test-ajf-formschema.ts (0 lines)
    test-ajf-reportdata.ts (0 lines)
    test-ajf-reportschema.ts (6 lines)
    test-projects.ts (1 lines)
  ui-tours/
    tour.example.ts (1 lines)
  _typography.scss (83 lines)
  index.html (23 lines)
  main.ts (5 lines)
  manifest.webmanifest (61 lines)
  polyfills.ts (56 lines)
  styles.scss (216 lines)
  test.ts (9 lines)
.gitignore (61 lines)
.prettierrc (9 lines)
angular.json (221 lines)
capacitor.config.ts (1 lines)
eslint.config.js (34 lines)
karma.conf.js (11 lines)
ngsw-config.json (22 lines)
package.json (118 lines)
README.md (27 lines)
tsconfig.app.json (15 lines)
tsconfig.json (20 lines)
tsconfig.spec.json (19 lines)
vercel-build-step.sh (14 lines)
```