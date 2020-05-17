const UserService = require('./users')
const ClassroomService = require('./classroom')
const AreaService = require('./areas')
const SessionsService = require('./sessions')
const {
    StudentParticipationReport
} = require('./reports')

module.exports = ({ knex }) => {
    return {
        userService: UserService(knex),
        classroomService: ClassroomService(knex),
        areaService: AreaService(knex),
        sessionsService: SessionsService(knex),
        studentParticipationReport: new StudentParticipationReport(knex)
    }
}