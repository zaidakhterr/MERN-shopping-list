const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  //Check for token
  if (!token) res.status(401).json({ msg: 'No token, authorizatio denied.' });

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));

    //Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
