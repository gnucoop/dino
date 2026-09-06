/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Notification} from '@dino/core/notifications';
import {format, isToday, isYesterday} from 'date-fns';

/**
 * A notification as the shell reads it: the stored model plus whether the active user has
 * read it.
 */
export type ReadNotification = Notification & {read: boolean};

/**
 * How old a notification is, as the panel shows it.
 *
 * Under a week the age is relative and needs translating, so `label` is a key and `count`
 * its interpolation. Past that it is a plain date, already formatted, and `translate` says
 * which of the two the label is.
 */
export interface NotificationAge {
  /**
   * The transloco key, or the formatted date when the age is no longer relative.
   */
  label: string;

  /**
   * Interpolation for `label`. Absent when the key takes no count.
   */
  count?: number;

  /**
   * True when `label` is a translation key rather than a formatted date.
   */
  translate: boolean;
}

/**
 * One row of the panel.
 *
 * A row usually stands for a single notification, but a run of repeats of the same text
 * collapses into one - a job that notifies on every retry should cost one row, not ten.
 */
export interface NotificationEntry {
  /**
   * A stable identity for trackBy: the id of the newest notification of the run.
   */
  id: string;

  /**
   * The notification the row is drawn from, the newest of the run.
   */
  notification: ReadNotification;

  /**
   * Every notification the row stands for, newest first. More than one when repeats were
   * collapsed, which is what marking the row read has to walk.
   */
  all: ReadNotification[];

  /**
   * How many notifications the row stands for.
   */
  count: number;

  /**
   * True while any of them is still unread.
   */
  unread: boolean;

  /**
   * The age of the newest one.
   */
  age: NotificationAge;
}

/**
 * A day's worth of rows, under one heading.
 */
export interface NotificationGroup {
  /**
   * The heading, as a translation key: 'Today', 'Yesterday' or 'Earlier'.
   */
  label: string;

  /**
   * The rows of the day, newest first.
   */
  entries: NotificationEntry[];
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Describes how old a notification is, in the shortest form that still says it.
 * @param date When the notification was created
 * @param now The instant to measure against, injectable so the result can be asserted
 * @returns The age, as a translation key with its count or as a formatted date
 */
export function notificationAge(date: Date, now: Date = new Date()): NotificationAge {
  const elapsed = now.getTime() - date.getTime();
  if (elapsed < MINUTE) {
    return {label: 'Now', translate: true};
  }
  if (elapsed < HOUR) {
    return {label: '{{count}} min', count: Math.floor(elapsed / MINUTE), translate: true};
  }
  if (elapsed < DAY) {
    return {label: '{{count}} h', count: Math.floor(elapsed / HOUR), translate: true};
  }
  if (isYesterday(date)) {
    return {label: 'Yesterday', translate: true};
  }
  if (elapsed < 7 * DAY) {
    return {label: '{{count}} d', count: Math.floor(elapsed / DAY), translate: true};
  }
  return {label: format(date, 'dd/MM'), translate: false};
}

/**
 * The heading a notification belongs under.
 * @param date When the notification was created
 * @returns The translation key of the day group
 */
function groupLabel(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return 'Earlier';
}

/**
 * Turns the flat notification list into the panel's day groups, collapsing runs of the
 * same text on the way.
 *
 * The list arrives newest first and stays in that order: the groups follow the data rather
 * than a fixed Today/Yesterday/Earlier sequence, so a heading is only ever emitted for a
 * day that actually has notifications.
 *
 * @param notifications The notifications, newest first
 * @param now The instant ages are measured against, injectable so the result can be asserted
 * @returns The day groups, newest first
 */
export function groupNotifications(
  notifications: ReadNotification[] | null,
  now: Date = new Date(),
): NotificationGroup[] {
  if (notifications == null || notifications.length === 0) {
    return [];
  }
  const groups: NotificationGroup[] = [];
  for (const notification of notifications) {
    const date = new Date(notification.created_at);
    const label = groupLabel(date);
    let group = groups[groups.length - 1];
    if (group == null || group.label !== label) {
      group = {label, entries: []};
      groups.push(group);
    }
    // Only a run of repeats collapses, never two occurrences with something else between
    // them: a row has one position in time, and it has to be the position of its own run.
    const previous = group.entries[group.entries.length - 1];
    if (previous != null && previous.notification.text === notification.text) {
      previous.all.push(notification);
      previous.count += 1;
      previous.unread = previous.unread || !notification.read;
      continue;
    }
    group.entries.push({
      id: notification.id,
      notification,
      all: [notification],
      count: 1,
      unread: !notification.read,
      age: notificationAge(date, now),
    });
  }
  return groups;
}
