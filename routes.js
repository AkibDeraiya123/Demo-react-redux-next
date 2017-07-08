const nextRoutes = require('next-routes');

// eslint-disable-next-line no-multi-assign
const routes = module.exports = nextRoutes();

// this is demo route we can add more route here and it will be use for routing in application
routes.add('test', '/test/:id');
