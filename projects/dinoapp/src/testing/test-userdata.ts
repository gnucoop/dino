import {UserData} from '@dino/core/users';
import {InsertModel} from '@dino/core/data';

export const userData: InsertModel<UserData>[] = [
  {
    created_at: '2025-06-01T08:00:00.000Z',
    email: 'admin@dino.test',
    full_name: 'Alice Nakamura',
    user_group_ids: [],
    user_auth_ref_id: null,
    disabled: false,
  },
  {
    created_at: '2025-07-10T09:30:00.000Z',
    email: 'marco.bianchi@dino.test',
    full_name: 'Marco Bianchi',
    user_group_ids: [],
    user_auth_ref_id: null,
    disabled: false,
  },
  {
    created_at: '2025-08-05T11:15:00.000Z',
    email: 'fatima.hassan@dino.test',
    full_name: 'Fatima Hassan',
    user_group_ids: [],
    user_auth_ref_id: null,
    disabled: false,
  },
  {
    created_at: '2025-09-12T14:00:00.000Z',
    email: 'john.ochieng@dino.test',
    full_name: 'John Ochieng',
    user_group_ids: [],
    user_auth_ref_id: null,
    disabled: false,
  },
  {
    created_at: '2025-10-01T10:45:00.000Z',
    email: 'lucia.ferreira@dino.test',
    full_name: 'Lucia Ferreira',
    user_group_ids: [],
    user_auth_ref_id: null,
    disabled: true,
  },
];
