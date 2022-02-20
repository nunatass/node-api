const http = require('http');
const { URL } = require('url');

const routes = require('./routes');
const bodyParser = require('./helpers/bodyParser');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(request.url, HOST);

  console.log(`RequestMethod: ${request.method} | Endpoint: ${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splittedEndpoint = pathname.split('/').filter(Boolean);

  if (splittedEndpoint.length > 1) {
    pathname = `/${splittedEndpoint[0]}/:id`;
    id = splittedEndpoint[1];
  }

  const route = routes.find(
    (route) => route.method === request.method && route.pathName === pathname
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () => console.log(`Server running on ${HOST}`));
