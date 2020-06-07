export default {
  jwt: {
    secret: process.env.APP_TOKEN_SECRET || '',
    expiresIn: process.env.APP_TOKEN_SECRET_EXPIRES_IN || '1d',
  },
};
