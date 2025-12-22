import { User } from '../types';

export function getUserMock(): User {
  return {
    name: 'Demo User',
    avatarUrl: 'https://placehold.jp/150x150.png',
    isPro: true,
  };
}
