import {ListHeader} from '@dino/core/list';
import {Notification} from '@dino/core/notifications';

export const headers: ListHeader<Notification & {read?: boolean}>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'text', label: 'Text', displayed: true},
  {column: 'created_at', label: 'Creation Date', sortable: false, displayed: true},
];
