import {AjfCustomFunctions} from '@dino/core/data';
import {FormInfo} from '@dino/core/forms';

/**
 * Return true if the slide, based only on its state, is to be readonly:
 * @param stepLevel the step level to check
 * @param info dino_form_info
 * @param pipelineFirstStep optional parameter: if present is the level of the first step of a pipeline form.
 *                          This is the only editable slide when status_level is null (on create form)
 * @returns true if current status of the form is equal or greater than the stepLevel
 * (so the slide is supposed to be already completed)
 */
export function readonly(
  stepLevel: number,
  info: FormInfo | null,
  pipelineFirstStep?: null | number,
): boolean {
  if (info == null || info.status == null || info.status.status_level == null) {
    return pipelineFirstStep != null && stepLevel !== pipelineFirstStep ? true : false;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;
  return currentStatusLevel >= stepLevel;
}

/**
 * Return true if the slide is to be visible
 * @param stepLevel the step level to check
 * @param info dino_form_info
 * @param pipelineFirstStep optional parameter: if present is the level of the first step of a pipeline form.
 *                          This is the only visible slide when status_level is null (on create form)
 * @returns true if current status of the form is equal or greater than the previous stepLevel
 * i.e.
 * if the input stepLevel is 13, then the slide will be visible if the pipeline has at least reached state (currentStatusLevel) 12
 */
export function visibility(
  stepLevel: number,
  info: FormInfo | null,
  pipelineFirstStep?: null | number,
): boolean {
  if (info == null || info.status == null || info.status.status_level == null) {
    return pipelineFirstStep != null && stepLevel !== pipelineFirstStep ? false : true;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;
  return currentStatusLevel >= stepLevel - 1;
}

/**
 * Return true if the slide, based on its state and on the user group, is to be readonly
 * @param statusLevel the step level to check
 * @param info dino_form_info
 * @param group the name of the group that can edit the slide
 * @param pipelineFirstStep optional parameter: if present is the level of the first step of a pipeline form.
 *                          This is the only editable slide when status_level is null (on create form)
 * @returns true if current status of the form is equal or greater than the stepLevel
 * (so the slide is supposed to be already completed) or user is not in the group
 */
export function readonlySlide(
  statusLevel: number,
  info: FormInfo | null,
  group: string | null,
  pipelineFirstStep?: null | number,
): boolean {
  if (group) {
    return readonly(statusLevel, info, pipelineFirstStep) || !isUserInGroup(group, info);
  }
  return readonly(statusLevel, info, pipelineFirstStep);
}

/**
 * Return true if the user belongs to the indicated groupName
 * @param groupName
 * @param info
 * @returns
 */
export function isUserInGroup(groupName: string, info: FormInfo | null): boolean {
  let allUserGroups: string[] = [];
  if (groupName && info && info.activeUserGroups) {
    allUserGroups = info.activeUserGroups.map(g => g.groupName);
  }
  return allUserGroups.includes(groupName);
}

/**
 * Return true if the form status name is equals to the input statusName
 * @param statusName the status name to check
 * @param info dino_form_info
 * @returns
 */
export function isFormStatusNameEqualTo(statusName: string, info: FormInfo | null): boolean {
  if (info == null || info.status == null || info.status.name == null) {
    return false;
  }
  const currentStatusName = info?.status?.name ?? '';
  return currentStatusName === statusName;
}

/**
 * Return true if the form status level is equals to the input statusLevel
 * @param statusLevel the status level to check
 * @param info dino_form_info
 * @returns
 */
export function isFormStatusLevelEqualTo(statusLevel: number, info: FormInfo | null): boolean {
  if (info == null || info.status == null || info.status.status_level == null) {
    return false;
  }
  const currentStatusLevel = info?.status?.status_level ?? 0;
  return currentStatusLevel === statusLevel;
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

export const ajfCommonFunctions: AjfCustomFunctions = {
  readonly,
  readonlySlide,
  visibility,
  isUserInGroup,
  isAnonymousUser,
  isUserInAtLeastOneGroup,
  isFormStatusLevelEqualTo,
  isFormStatusNameEqualTo,
};
