import {AjfCustomFunctions} from '@dino/core/data';
import {FormInfo} from '@dino/core/forms';

export function readonly(stepLevel: number, info: FormInfo | null): boolean {
  return false;
  /*
  if (info == null) {
    return stepLevel == 0 ? false : true;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;
  return currentStatusLevel >= stepLevel;*/
}
export function visibility(stepLevel: number, info: FormInfo | null): boolean {
  return true;
  /*
  if (info == null) {
    return stepLevel == 0 ? true : false;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;

  return currentStatusLevel >= stepLevel - 1;*/
}

export function isUserInGroup(groupName: string, info: FormInfo | null): boolean {
  if (groupName !== 'Admin') {
    return false;
  }
  return true;
}

export const ajfCustomFunctions: AjfCustomFunctions = {
  readonly,
  visibility,
  isUserInGroup,
};
