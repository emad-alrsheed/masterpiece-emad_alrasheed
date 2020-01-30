const jwt = require('jsonwebtoken')

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  }else{
    jwt.verify(token, req.app.get('secret'), function(err, decoded) {
        console.log(decoded, err)
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      }else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

exports.withAuth = withAuth;