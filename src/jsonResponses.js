const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const responseJson = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const returnString = JSON.stringify(responseJson);

  return respond(request, response, 200, returnString, 'application/json');
};

const getForbidden = (request, response, acceptedTypes) => {
  const responseJson = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    responseXML = `${responseXML} <id>${responseJson.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const returnString = JSON.stringify(responseJson);

  return respond(request, response, 403, returnString, 'application/json');
};

const getInternal = (request, response, acceptedTypes) => {
  const responseJson = {
    message: 'Internal Server Error. Something Went Wrong',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    responseXML = `${responseXML} <id>${responseJson.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const returnString = JSON.stringify(responseJson);

  return respond(request, response, 500, returnString, 'application/json');
};

const getImplemented = (request, response, acceptedTypes) => {
  const responseJson = {
    message: 'A get request for this page has not been implemented yet',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    responseXML = `${responseXML} <id>${responseJson.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const returnString = JSON.stringify(responseJson);

  return respond(request, response, 501, returnString, 'application/json');
};

const getBadRequest = (request, response, acceptedTypes, params) => {
  const responseJson = {
    message: 'This query has the required parameter',
  };
  let status = 200;

  // Check for valid param
  if (!params.valid || params.valid !== 'true') {
    responseJson.message = 'Missing valid query parameter set equal to true';
    responseJson.id = 'badRequest';
    status = 400;
  }

  // Check for response type
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    if (responseJson.id) {
      responseXML = `${responseXML} <id>${responseJson.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;

    return respond(request, response, status, responseXML, 'text/xml');
  }

  const returnString = JSON.stringify(responseJson);

  return respond(request, response, status, returnString, 'application/json');
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const responseJson = {
    message: 'You have successfuly viewed the content',
  };
  let status = 200;

  // Check for valid param
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJson.message = 'Missing loggedIn query parameter set to yes';
    responseJson.id = 'unauthorized';
    status = 401;
  }

  // Check for response type
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    if (responseJson.id) {
      responseXML = `${responseXML} <id>${responseJson.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;

    return respond(request, response, status, responseXML, 'text/xml');
  }

  const returnString = JSON.stringify(responseJson);

  return respond(request, response, status, returnString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseJson = {
    message: 'The page was not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJson.message}</message>`;
    responseXML = `${responseXML} <id>${responseJson.i}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const returnString = JSON.stringify(responseJson);

  return respond(request, response, 404, returnString, 'application/json');
};

module.exports = {
  getSuccess,
  notFound,
  getImplemented,
  getBadRequest,
  getUnauthorized,
  getInternal,
  getForbidden,
};
