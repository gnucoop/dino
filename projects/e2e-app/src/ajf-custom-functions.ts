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

export function isUserInGroup(groupName: string, info: FormInfo | null): boolean {
  let allUserGroups: string[] = [];
  if (groupName && info && info.activeUserGroups) {
    allUserGroups = info.activeUserGroups.map(g => g.groupName);
  }
  return allUserGroups.includes(groupName);
}

/**
 * Return true if the user is anonymous (on a public form)
 */
export function isAnonymousUser(info: FormInfo | null): boolean {
  return info?.activeUser == null || info.activeUser.full_name == 'dino_anonymous_user';
}

// Is a user in at least one group of the list
export function isUserInAtLeastOneGroup(groupNames: string[], info: FormInfo | null): boolean {
  let allUserGroups: string[] = [];
  if (groupNames && info && info.activeUserGroups) {
    allUserGroups = info.activeUserGroups.map(g => g.groupName);
  }
  return allUserGroups.some(ug => groupNames.includes(ug));
}

export const ajfCustomFunctions: AjfCustomFunctions = {
  readonly,
  visibility,
  isUserInGroup,
  isUserInAtLeastOneGroup,
  isAnonymousUser,
};
