const UserService = require('./users')
const ClassroomService = require('./classroom')
const AreaService = require('./areas')
const SessionsService = require('./sessions')

module.exports = ({ knex }) => {
    return {
        userService: UserService(knex),
        classroomService: ClassroomService(knex),
        areaService: AreaService(knex),
        sessionsService: SessionsService(knex)
    }
}