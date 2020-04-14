var admin = require('firebase-admin');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const [type, idToken] = authorization.split(' ')
    admin.auth().verifyIdToken(idToken)
      .then(function (decodedToken) {
        req.uid = decodedToken.uid
        next()
      }).catch(function (error) {
        res.sendStatus(403)
      });
  } else {
    res.sendStatus(401)
  }
}