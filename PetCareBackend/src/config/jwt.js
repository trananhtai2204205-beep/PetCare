module.exports = {
  secret: process.env.JWT_SECRET || 'petcare_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'petcare_refresh_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
