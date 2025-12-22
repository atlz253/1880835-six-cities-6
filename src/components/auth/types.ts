import { User } from '../user';

export interface Credentials {
  email: string;
  password: string;
}

export interface Auth extends User {
  email: string;
  token: string;
}
