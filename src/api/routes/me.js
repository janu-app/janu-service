const express = require('express')
const auth = require('../middleware/auth')

module.exports = ({ app, userService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      res.status(200).json(await userService.me(req))
    } catch(e) {
      console.error(e)
      next(e)
    }
  })

  app.use('/me', auth, router)
}