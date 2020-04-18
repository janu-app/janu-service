const reportTemplateQuery = `
select stats.session_id, teachers.code, coalesce(grades.cicle, '-') as cicle, grades.grade, grades.section,
(select count(*) from student_classroom_assignment where classroom_id = classrooms.id) student_count,
sessions.week_number, sessions.number, coalesce(areas.name, '-') as area_name, sessions.competences, sessions.name, 
stats.participated, stats.web, stats.tv, stats.radio, 
case when stats.homework > 0 then 'Sí' else 'No' end had_homework,
people.name as teacher_name, people.lastname || ' ' || people.lastname2 as teacher_lastname,
stats.optional_homework,
case when stats.optional_meeting > 0 then 'Sí' else 'No' end had_meetings,
stats.optional_meeting,
coalesce((select optional_meeting_via from session_student where session_id = stats.session_id and optional_meeting_via is not null limit 1), '-') as optional_meeting_via,
coalesce((select optional_theme from session_student where session_id = stats.session_id and optional_theme is not null limit 1), '-') as optional_theme,
coalesce((select session_student.comments from session_student where session_id = stats.session_id and session_student.comments is not null limit 1), '-') as session_comments
from
(select session_id, 
count (*) filter (where participated) as participated,
count (*) filter (where web) as web,
count (*) filter (where tv) as tv,
count (*) filter (where radio) as radio,
count (*) filter (where homework) as homework,
count (*) filter (where optional_meeting) as optional_meeting,
count (*) filter (where optional_homework) as optional_homework
from session_student
group by session_id) as stats
left join sessions on sessions.id = stats.session_id
left join areas on areas.id = sessions.area_id
left join teachers on teachers.person_id = sessions.teacher_id
left join people on people.id = teachers.person_id
left join classrooms on classrooms.id = sessions.classroom_id
left join grades_opened on grades_opened.id = classrooms.grade_opened_id
left join grades on grades.id = grades_opened.grade_id 
`

module.exports = {
    reportTemplateQuery
}