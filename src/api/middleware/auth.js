var admin = require('firebase-admin');

module.exports = (req, res, next) => {
  let idToken = ''
  if (req.headers.authorization) {
    const [type, idTokenString] = req.headers.authorization.split(' ')
    idToken = idTokenString
  } else {
    idToken = req.query.access_token
  }
  if (idToken) {
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