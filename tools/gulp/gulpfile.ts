import {createPackageBuildTasks} from '../package-tools';
import {
  corePackage,
  ionicPackage,
  materialPackage,
} from './packages';

createPackageBuildTasks(corePackage);
createPackageBuildTasks(ionicPackage);
createPackageBuildTasks(materialPackage);

import './tasks/clean';
import './tasks/unit-test';
import './tasks/ci';
