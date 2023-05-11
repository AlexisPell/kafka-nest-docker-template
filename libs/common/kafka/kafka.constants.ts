export const KAFKA = {
  CONSUMERS: {
    USERS: 'users-consumer',
    AUTH: 'auth-consumer',
  },
  CLIENT_IDS: {
    USERS: 'users',
    AUTH: 'auth',
  },
  TOPICS: {
    USERS: {
      GET_USER_BY_EMAIL: 'users.get-user-by-email',
      CREATE_USER: 'users.create-user',
    },
    AUTH: {
      SIGN_IN: 'auth.sign-in',
      SIGN_UP: 'auth.sign-up',
      REFRESH_TOKEN: 'auth.refresh-token',
      LOGOUT: 'auth.logout',
    },
  },
} as const;
