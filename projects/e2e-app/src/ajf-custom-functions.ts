import {AjfCustomFunctions} from '@dino/core/data';
import {FormInfo} from '@dino/core/forms';

export function readonly(stepLevel: number, info: FormInfo | null): boolean {
  if (info == null) {
    return stepLevel == 0 ? false : true;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;
  return currentStatusLevel >= stepLevel;
}
export function visibility(stepLevel: number, info: FormInfo | null): boolean {
  if (info == null) {
    return stepLevel == 0 ? true : false;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;

  return currentStatusLevel >= stepLevel - 1;
}

export const ajfCustomFunctions: AjfCustomFunctions = {
  readonly,
  visibility,
};
