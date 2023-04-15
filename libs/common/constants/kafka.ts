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
      GET_USERS: 'users.get-users',
      CREATE_USER: 'users.create-user',
    },
  },
} as const;
