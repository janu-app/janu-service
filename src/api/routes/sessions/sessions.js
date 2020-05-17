const express = require('express')
const auth = require('../../middleware/auth')

module.exports = ({ app, sessionsService, userService }) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      const me = await userService.me(req)
      res.status(200).json(await sessionsService.list(Object.assign({ teacherId: me.person_id }, req.query)))
    } catch(e) {
      next(e)
    }
  })

  router.get('/report', async (req, res, next) => {
    try {
      res.status(200).json(await sessionsService.queryReporteDirectivosData(req.query))
    } catch(e) {
      next(e)
    }
  })

  router.get('/report/xlsx', async (req, res, next) => {
    try {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
      await sessionsService.exportReporteDirectivosData(Object.assign({}, req.query, { sout: res }))
    } catch(e) {
      next(e)
    }
  })

  router.get('/:sessionId', async (req, res, next) => {
    try {
      res.status(200).json(await sessionsService.loadById(req.params))
    } catch(e) {
      next(e)
    }
  })

  router.put('/:sessionId', async (req, res, next) => {
    try {
      res.status(200).json(await sessionsService.update(Object.assign({}, req.body, { sessionId: req.params.sessionId })))
    } catch(e) {
      next(e)
    }
  })

  router.put('/:sessionId/detail/:detailId', async (req, res, next) => {
    try {
      res.status(200).json(await sessionsService.updateDetail(Object.assign({}, req.body, { id: req.params.detailId})))
    } catch(e) {
      next(e)
    }
  })
  
  router.post('/', async (req, res, next) => {
    try {
      const me = await userService.me(req)
      const result = await sessionsService.create(Object.assign({}, req.body, { teacher_id: me.person_id }))
      res.status(200).json(result)
    } catch(e) {
      next(e)
    }
  })

  app.use('/sessions', auth, router)
}