import {Location} from './locations';

declare module '@dewco/core/forms/form-data' {
  interface FormData {
    location: Location;
  }
}
