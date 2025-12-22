import { User } from '../user';

export interface Comment {
  comment: string;
  rating: number;
}

export interface PostedComment extends Comment {
  id: number;
  date: string;
  user: User;
}
