const express = require('express')
const me = require('./routes/me')
const classrooms = require('./routes/classrooms')
const areas = require('./routes/areas')
const sessions = require('./routes/sessions')

module.exports = ({ userService, 
    classroomService,
    areaService,
    sessionsService }) => {
    const app = express.Router()
    me({ app, userService })
    classrooms({ app, classroomService })
    areas({ app, areaService })
    sessions({ app, sessionsService, userService })
    
    return app
}