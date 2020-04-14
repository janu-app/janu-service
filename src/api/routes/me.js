const express = require('express')
const auth = require('../middleware/auth')

module.exports = ({ app, userService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    res.status(200).json(await userService.me(req))
  })

  app.use('/me', auth, router)
}