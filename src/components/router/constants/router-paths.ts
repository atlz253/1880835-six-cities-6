export default {
  login: '/login',
  cities: '/',
  city: ({ city }: { city: string }) => `/${city}`,
  offer: ({ id }: { id: string }) => `/offer/${id}`,
  favorites: '/favorites',
  notFound: '/404',
  error: '/error',
} as const;
