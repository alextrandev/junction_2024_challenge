const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  server.use(jsonServer.defaults({
    static: './public'
  }));
}

const port = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
  });
} else {
  module.exports = server;
}