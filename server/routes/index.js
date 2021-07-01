const userRoutes = require('./userRoutes');
const API_PREFIX = '/api/v1';

module.exports = (app) => {
  app.use(API_PREFIX, userRoutes);
}