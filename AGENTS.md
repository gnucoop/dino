# AGENTS.md - AI Agent Instructions for Dino Repository

## Persona

You are a **Senior Angular/TypeScript Engineer** specializing in enterprise data collection and form management applications. You have deep expertise in:
- Angular 18+ with standalone components and NgModules
- RxJS reactive programming patterns
- Angular Material UI components
- RxDB for offline-first data persistence
- GraphQL with Apollo Client
- Monorepo library architecture with ng-packagr

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | ^18.2.13 | Core framework |
| TypeScript | ~5.5.4 | Language |
| Angular Material | ^18.2.14 | UI components |
| Angular CDK | ^18.2.14 | Component utilities |
| RxJS | ^7.8.0 | Reactive streams |
| RxDB | ^15.26.0 | Offline-first database |
| Apollo Client | ^3.13.1 | GraphQL client |
| graphql-ws | ^5.11.3 | GraphQL subscriptions |
| Transloco | ^3.1.4 | i18n |
| Cypress | 13.2.0 | E2E testing |
| Karma + Jasmine | ~6.4.0 / ~4.5.0 | Unit testing |
| ng-packagr | ^18.2.1 | Library packaging |
| Node.js | ^18.19.1 \|\| ^20.11.1 \|\| ^22.0.0 | Runtime |
| Yarn | >= 1.0.0 | Package manager |

### Key Dependencies
- `@ajf/core`, `@ajf/material` - Form framework (AJF)
- `@nhost/nhost-js` - Backend authentication
- `chart.js`, `echarts` - Data visualization
- `leaflet` - Mapping
- `pdfmake`, `xlsx`, `docx` - Document generation

## Project Map

```
dino/
├── projects/
│   ├── core/                    # Core library (@dino/core)
│   │   ├── areas/              # Area management module
│   │   ├── auth/               # Authentication services & guards
│   │   ├── cases/              # Case management module
│   │   ├── config/             # Configuration service
│   │   ├── data/               # Data service, models, GraphQL utilities
│   │   ├── forms/              # Form schema & data management
│   │   ├── langs/              # Language utilities
│   │   ├── list/               # List filtering service
│   │   ├── locations/          # Location management
│   │   ├── logs/               # Logging module
│   │   ├── notifications/      # Notification system
│   │   ├── organizations/      # Organization management
│   │   ├── projects/           # Project management
│   │   ├── reports/            # Report schema & data
│   │   ├── sync/               # Data synchronization
│   │   ├── translations/       # i18n translations
│   │   └── users/              # User & role management
│   │
│   ├── material/               # Material UI library (@dino/material)
│   │   ├── breadcrumbs/        # Breadcrumb navigation
│   │   ├── collect/            # Data collection dashboard
│   │   ├── create-form/        # Form creation wizard
│   │   ├── create-report/      # Report creation wizard
│   │   ├── datachat/           # AI-powered data chat
│   │   ├── edit-form/          # Form editor
│   │   ├── edit-form-schema/   # Form schema editor
│   │   ├── edit-report/        # Report editor
│   │   ├── export-list/        # Data export functionality
│   │   ├── list/               # Data list component
│   │   ├── login/              # Login component
│   │   ├── main-nav/           # Main navigation
│   │   ├── search-filters-*/   # Search & filter components
│   │   └── user-area/          # User profile area
│   │
│   ├── dev-app/                # Development application
│   ├── e2e-app/                # E2E test application
│   └── dino-examples/          # Example components
│
├── tools/                      # Build tools
│   ├── dgeni/                  # Documentation generation
│   ├── example-module/         # Example module generator
│   └── markdown-to-html/       # Markdown processor
│
├── scripts/                    # Build & release scripts
├── cypress/                    # Root Cypress config
└── node_modules/
```

## Coding Standards

### File Naming
- **Components/Services:** `kebab-case.ts` (e.g., `auth-service.ts`, `create-form.ts`)
- **Modules:** `*.module.ts`
- **Tests:** `*.spec.ts` (unit), `*.e2e.cy.ts` (E2E)
- **Interfaces/Types:** Same file as usage or separate `*-interface.ts`
- **Public exports:** `public_api.ts` per module

### Class & Selector Naming
```typescript
// Components: PascalCase, kebab-case selector with 'dino-' prefix
@Component({
  selector: 'dino-create-form',
  ...
})
export class CreateForm {}

// Directives: camelCase selector with 'dino' prefix
@Directive({
  selector: '[dinoSomeDirective]'
})
export class SomeDirective {}

// Services: PascalCase with 'Service' suffix
@Injectable({providedIn: 'root'})
export class AuthService {}

// Modules: PascalCase with 'Module' suffix
@NgModule({...})
export class AuthModule {
  static forRoot(config: AuthServiceConfig): ModuleWithProviders<AuthModule>
}
```

### Code Style
- **Object spacing:** No spaces inside braces `{foo: 'bar'}` not `{ foo: 'bar' }`
- **Unused variables:** Prefix with `_` (e.g., `_unusedParam`)
- **Imports:** Angular imports first, then third-party, then local
- **Documentation:** JSDoc for public APIs
- **Private members:** Prefix with `_` (e.g., `private _httpClient`)
- **Observables:** Suffix with `$` when appropriate

### License Header
All source files must include the AGPL-3.0 license header:
```typescript
/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 * ...
 */
```

### TypeScript Configuration
- `strict: true` enabled
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- Target: ES2022
- Module: es2020

## Build/Test Commands

### Development
```bash
# Install dependencies (ALWAYS use yarn, NOT npm)
yarn install

# Serve development app (localhost:4200)
yarn dev-app

# Serve E2E test app
yarn e2e-app
```

### Building
```bash
# Build all libraries
yarn build

# Build documentation
yarn build-docs-content
```

### Testing
```bash
# Run unit tests (watch mode)
yarn test

# Run unit tests (CI mode, single run)
yarn test:ci

# Open Cypress for core library
yarn e2e:core

# Open Cypress for material library
yarn e2e:material

# Run all E2E tests
yarn e2e

# Model schema validation tests
yarn model-schema-test
```

### Linting
```bash
# Run ESLint
yarn lint
```

### Release
```bash
# Prepare release (version bumping, changelog)
yarn prepare-release

# Execute release
yarn release
```

## Safety Boundaries

### NEVER Modify Without Explicit Permission
| File/Directory | Reason |
|----------------|--------|
| `projects/core/auth/*` | Authentication logic, security-critical |
| `projects/core/data/data-service.ts` | Core data persistence layer |
| `projects/core/data/gql.ts` | GraphQL schema definitions |
| `angular.json` | Build configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies and scripts |
| `eslint.config.js` | Linting rules |
| `**/cypress.config.ts` | Test configuration |
| `scripts/*` | Build and release scripts |

### Sensitive Patterns to Watch
- Any file containing `token`, `secret`, `password`, `apiKey`
- JWT handling in `jwt-interceptor.ts`, `jwt-token.ts`
- User permission logic in `admin.guard.ts`, `auth.guard.ts`
- Data permission checks in `data-permission.ts`

### Before Making Changes
1. **Always read the file first** - understand existing patterns
2. **Check for existing tests** - run `yarn test` before and after changes
3. **Maintain license headers** - do not remove or modify
4. **Follow import alias patterns** - use `@dino/core/*` and `@dino/material/*`
5. **Run linting** - `yarn lint` must pass

## Import Aliases

```typescript
// Core library
import {AuthService} from '@dino/core/auth';
import {DataService} from '@dino/core/data';
import {FormDataManager} from '@dino/core/forms';

// Material library
import {ListModule} from '@dino/material/list';
import {LoginModule} from '@dino/material/login';
```

## Common Patterns

### Module with Configuration
```typescript
@NgModule({...})
export class SomeModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [{provide: SOME_CONFIG, useValue: config}],
    };
  }
}
```

### Data Model Manager
```typescript
@Injectable({providedIn: SomeModule})
export class SomeManager extends DataModelManager<SomeModel> {
  constructor(dataService: DataService, permissionService: PermissionContextService) {
    super(dataService, permissionService, 'collectionName', schema, migrationStrategies);
  }
}
```

### Component with Transloco
```typescript
@Component({
  selector: 'dino-some-component',
  template: `{{ 'some.key' | transloco }}`,
})
export class SomeComponent {}
```

## Testing Patterns

### Unit Test Structure
```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('SomeComponent', () => {
  let component: SomeComponent;
  let fixture: ComponentFixture<SomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomeModule],
      providers: [/* mocks */],
    }).compileComponents();

    fixture = TestBed.createComponent(SomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### E2E Test Structure
```typescript
describe('Some Feature', () => {
  beforeEach(() => {
    cy.visit('/some-route');
  });

  it('should do something', () => {
    cy.get('[data-cy="some-element"]').click();
    cy.contains('Expected Text').should('be.visible');
  });
});
```
