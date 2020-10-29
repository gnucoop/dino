import {Project} from './projects';

declare module '@dewco/core/forms/form-data' {
  interface FormData {
    project: Project;
  }
}
