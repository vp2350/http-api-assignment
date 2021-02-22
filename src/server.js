const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlResponseHandler.getIndex,
  '/style': htmlResponseHandler.getStyle,
  '/success': jsonResponseHandler.getSuccess,
  '/internal': jsonResponseHandler.getInternal,
  '/notImplemented': jsonResponseHandler.getImplemented,
  '/badRequest': jsonResponseHandler.getBadRequest,
  '/forbidden': jsonResponseHandler.getForbidden,
  '/unauthorized': jsonResponseHandler.getUnauthorized,
  notFound: jsonResponseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);
  console.log(params);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }

  if (request.url === '/favicon.ico') {
    console.log('favicon request');
  }

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log('request received');
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
