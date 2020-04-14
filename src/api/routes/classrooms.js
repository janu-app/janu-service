const express = require('express')
const auth = require('../middleware/auth')

module.exports = ({ app, classroomService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    res.status(200).json(await classroomService.list())
  })

  router.get('/:id/students', async (req, res, next) => {
    res.status(200).json(await classroomService.students(req.params.id))
  })

  app.use('/classrooms', auth, router)
}