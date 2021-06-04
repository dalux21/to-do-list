import {format} from '../../node_modules/date-fns'
//Project Factory
function projectFactory(projectID, projectName, defaultTask) {
    return {projectID, projectName}
    }

function taskFactory(taskID, parentProjectID, taskName, dueDate, priority, isTaskDone){
    taskID = 'TASK_' + Math.random().toString(36).substr(2,9)
    return {
        taskID,
        parentProjectID, 
        taskName, 
        dueDate, 
        priority, 
        isTaskDone}
}

//Main IIFE dealing with projects Logic.
const projectsLogic = (function(){

    const projectsLibrary = []
    const tasksLibrary = []
    const today = format(new Date(), 'P');
    
    //All tasks due today will be grouped into this project called "Today"
    function createTodayProject(){
    const projectToday = projectFactory('PROJ_today', 'Today')
    projectsLibrary.push(projectToday)
    }
    
    //Creates a Project 
    //projectsLogic.createProject(projectNameInput)
    function createProject(projectNameInput){
        if (projectNameInput === '') projectNameInput = 'New Project'   

        //Creates a Unique ID for the new Project
        const projectID = 'PROJ_' + Math.random().toString(36).substr(2,9)

        const projectName = projectNameInput

        //Each new Project has a default Task for the 4th of May
        const defaultTask = taskFactory('', projectID, 'Default Task', '04/05/2022', 'medium', false)
 
        //Create New project and push to Library
        const newProject = projectFactory(projectID,projectName)
        projectsLibrary.push(newProject)
        tasksLibrary.push(defaultTask)
        
    }


    const getProjectsLibrary = () => projectsLibrary
    const getTasksLibrary = () => tasksLibrary

return {
    getProjectsLibrary, 
    getTasksLibrary,
    createProject
    }

})()
    export default projectsLogic