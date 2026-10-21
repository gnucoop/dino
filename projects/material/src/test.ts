// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {getTestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// TestBed is zoneless by default since Angular 21, while the app still runs on zone.js.
@NgModule({providers: [provideZoneChangeDetection()]})
class ZoneTestingModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZoneTestingModule],
  platformBrowserDynamicTesting(),
);
