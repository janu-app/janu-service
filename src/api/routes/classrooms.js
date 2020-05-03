const express = require('express')
const auth = require('../middleware/auth')
const { handle } = require('../middleware/errors')

module.exports = ({ app, classroomService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    res.status(200).json(await classroomService.list())
  })

  router.get('/:id/students', async (req, res, next) => {
    res.status(200).json(await classroomService.students(req.params.id))
  })

  router.post('/:id/students', handle(async (req, res) => {
    res.status(200).json(await classroomService.assignStudent(req.body))
  }))

  app.use('/classrooms', auth, router)
}