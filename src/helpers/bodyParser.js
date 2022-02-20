function bodyParser(request, next) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    request.body = body;
    next();
  });
}

module.exports = bodyParser;
