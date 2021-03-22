import {createPackageBuildTasks} from '../package-tools';
import {
  corePackage,
  materialPackage,
} from './packages';

createPackageBuildTasks(corePackage);
createPackageBuildTasks(materialPackage);

import './tasks/clean';
import './tasks/unit-test';
import './tasks/ci';
