import { Auth } from '../types';

export function getAuthMock(): Auth {
  return {
    email: 'test@test.com',
    token: 'token',
    name: 'test',
    avatarUrl: 'https://placehold.jp/150x150.png',
    isPro: false,
  };
}
