const express = require('express')
const auth = require('../middleware/auth')

module.exports = ({ app, areaService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    res.status(200).json(await areaService.list())
  })

  app.use('/areas', auth, router)
}