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
    users: {
      getUsers: 'users.get-users',
      createUser: 'users.create-user',
    },
  },
};
