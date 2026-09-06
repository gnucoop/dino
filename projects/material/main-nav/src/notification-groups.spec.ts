import {Notification} from '@dino/core/notifications';

import {groupNotifications, notificationAge, ReadNotification} from './notification-groups';

const NOW = new Date('2026-09-06T12:00:00.000Z');

function notification(
  id: string,
  text: string,
  createdAt: string,
  read: boolean = false,
): ReadNotification {
  return {
    id,
    created_at: createdAt,
    updated_at: createdAt,
    recipients: ['user'],
    readers: read ? ['user'] : [],
    text,
    type: 'info',
    read,
  } as Notification & {read: boolean};
}

describe('notificationAge', () => {
  it('says "Now" under a minute', () => {
    const age = notificationAge(new Date('2026-09-06T11:59:30.000Z'), NOW);
    expect(age).toEqual({label: 'Now', translate: true});
  });

  it('counts whole minutes, then whole hours', () => {
    expect(notificationAge(new Date('2026-09-06T11:42:00.000Z'), NOW)).toEqual({
      label: '{{count}} min',
      count: 18,
      translate: true,
    });
    expect(notificationAge(new Date('2026-09-06T09:30:00.000Z'), NOW)).toEqual({
      label: '{{count}} h',
      count: 2,
      translate: true,
    });
  });

  it('falls back to a date once the age stops being relative', () => {
    const age = notificationAge(new Date('2026-08-01T09:00:00.000Z'), NOW);
    expect(age.translate).toBe(false);
    expect(age.label).toBe('01/08');
  });
});

describe('groupNotifications', () => {
  it('returns no groups for an empty or missing list', () => {
    expect(groupNotifications([], NOW)).toEqual([]);
    expect(groupNotifications(null, NOW)).toEqual([]);
  });

  it('heads each day with its own label, in the order the list arrives', () => {
    const groups = groupNotifications(
      [
        notification('1', 'today', '2026-09-06T11:00:00.000Z'),
        notification('2', 'yesterday', '2026-09-05T11:00:00.000Z'),
        notification('3', 'older', '2026-08-20T11:00:00.000Z'),
      ],
      NOW,
    );
    expect(groups.map(group => group.label)).toEqual(['Today', 'Yesterday', 'Earlier']);
    expect(groups.every(group => group.entries.length === 1)).toBe(true);
  });

  it('collapses a run of the same text into one row and counts it', () => {
    const groups = groupNotifications(
      [
        notification('1', 'ciao', '2026-09-06T11:58:00.000Z'),
        notification('2', 'ciao', '2026-09-06T11:57:00.000Z'),
        notification('3', 'ciao', '2026-09-06T11:56:00.000Z'),
      ],
      NOW,
    );
    expect(groups.length).toBe(1);
    expect(groups[0].entries.length).toBe(1);
    const entry = groups[0].entries[0];
    expect(entry.count).toBe(3);
    expect(entry.all.length).toBe(3);
    // The row takes its identity and its age from the newest of the run.
    expect(entry.id).toBe('1');
    expect(entry.age).toEqual({label: '{{count}} min', count: 2, translate: true});
  });

  it('leaves repeats that are not consecutive as separate rows', () => {
    const groups = groupNotifications(
      [
        notification('1', 'ciao', '2026-09-06T11:58:00.000Z'),
        notification('2', 'altro', '2026-09-06T11:57:00.000Z'),
        notification('3', 'ciao', '2026-09-06T11:56:00.000Z'),
      ],
      NOW,
    );
    expect(groups[0].entries.map(entry => entry.count)).toEqual([1, 1, 1]);
  });

  it('never collapses across a day boundary', () => {
    const groups = groupNotifications(
      [
        notification('1', 'ciao', '2026-09-06T11:00:00.000Z'),
        notification('2', 'ciao', '2026-09-05T11:00:00.000Z'),
      ],
      NOW,
    );
    expect(groups.map(group => group.label)).toEqual(['Today', 'Yesterday']);
    expect(groups.every(group => group.entries[0].count === 1)).toBe(true);
  });

  it('marks a collapsed row unread while any of its notifications is unread', () => {
    const groups = groupNotifications(
      [
        notification('1', 'ciao', '2026-09-06T11:58:00.000Z', true),
        notification('2', 'ciao', '2026-09-06T11:57:00.000Z', false),
      ],
      NOW,
    );
    expect(groups[0].entries[0].unread).toBe(true);
  });

  it('leaves a row read when every notification behind it is read', () => {
    const groups = groupNotifications(
      [
        notification('1', 'ciao', '2026-09-06T11:58:00.000Z', true),
        notification('2', 'ciao', '2026-09-06T11:57:00.000Z', true),
      ],
      NOW,
    );
    expect(groups[0].entries[0].unread).toBe(false);
  });
});
