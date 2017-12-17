# OAuth2-auth0
Simple way to authenticate your user with OAuth2

This make this work we would need a server which would host the API's which we can access securly

<code>
  var express = require('express');
  var app = express();
  var jwt = require('express-jwt');
  var jwks = require('jwks-rsa');
  var cors = require('cors');

  var port = process.env.PORT || 8080;

  var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: "API-REGISTRATION-AUTH0"
      }),
      audience: 'API-REGISTRATION-AUTH0',
      issuer: "API-REGISTRATION-AUTH0",
      algorithms: ['RS256']
  });

  app.use(cors());
  app.use(jwtCheck);

  app.get('/authorized', function (req, res) {
    res.json({message :'this is a secured endpoint'});
  });

  app.listen(port);
  console.log("Server running on port 8080");
</code>

Would need to update the API-REGISTRATION-AUTH0 from you Auth0 Registration details

