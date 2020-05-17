const express = require('express')
const me = require('./routes/me')
const classrooms = require('./routes/classrooms')
const areas = require('./routes/areas')
const sessions = require('./routes/sessions')

module.exports = ({ userService, 
    classroomService,
    areaService,
    sessionsService,
    studentParticipationReport }) => {
    const app = express.Router()
    me({ app, userService })
    classrooms({ app, classroomService })
    areas({ app, areaService })
    
    sessions.api({ app, sessionsService, userService })
    sessions.reports({ app, studentParticipationReport })
    
    return app
}