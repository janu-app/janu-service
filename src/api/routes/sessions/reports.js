const express = require('express')
const auth = require('../../middleware/auth')
const { handle } = require('../../middleware/errors')

class SessionsReportController {

  constructor(studentParticipationReport) {
    this.service = studentParticipationReport
  }

  async studentParticipation(req, res) {
    const results = await this.service.findStudentParticipation(req.query)
    res.status(200).json({ results })
  }

  async studentParticipatioXlsx(req, res) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", `attachment; filename=participation_${req.params.grade}.xlsx`);
    await this.service.exportFindStudentParticipation(Object.assign({}, req.query, { sout: res, grade: req.params.grade }))
  }

}

module.exports = ({ app, studentParticipationReport }) => {
  const router = express.Router()
  const controller = new SessionsReportController(studentParticipationReport)

  router.get('/participation', handle((req, res) => controller.studentParticipation(req, res)))

  router.get('/participation/:grade/xlsx', handle((req, res) => controller.studentParticipatioXlsx(req, res)))

  app.use('/reports/sessions', auth, router)
}