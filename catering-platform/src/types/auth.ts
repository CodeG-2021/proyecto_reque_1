export type UserRole =
  | 'administrator'
  | 'coordinator'
  | 'chef'
  | 'purchasing'
  | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthUser extends User {
  permissions: string[];
}
