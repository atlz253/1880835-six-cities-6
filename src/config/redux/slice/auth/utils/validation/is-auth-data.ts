import { Auth } from '../../../../../../components/auth/types';

export function isAuthData(value: unknown): value is Auth {
  return (
    typeof value === 'object' &&
    value !== null &&
    ['email', 'token', 'name', 'avatarUrl', 'isPro'].every((k) => k in value)
  );
}
