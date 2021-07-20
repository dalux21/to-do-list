
import {format, parseISO} from '../../node_modules/date-fns'

//Project Factory
function projectFactory(projectID, projectName) {
    return {projectID, projectName}
    }

function taskFactory(taskID, parentProjectID, taskName, dueDate, priority, isTaskDone, isToday){
    taskID = 'TASK_' + Math.random().toString(36).substr(2,9)
    if (dueDate === format(new Date(), 'y-MM-dd')) isToday = true;
   
    return {
        taskID,
        parentProjectID, 
        taskName, 
        dueDate, 
        priority, 
        isTaskDone,
        isToday
        }
}

//Main IIFE dealing with projects Logic.
const projectsLogic = (function(){

    const projectsLibrary = []
    const tasksLibrary = []
    const today = format(new Date(), 'y-MM-dd');
    //All tasks due today will be grouped into this project called "Today"
    
    const projectToday = projectFactory('PROJ_today', 'Today')
    projectsLibrary.push(projectToday)

    
    
    //Creates a Project 
    //projectsLogic.createProject(projectNameInput)
    function createProject(projectNameInput){
        if (projectNameInput === '') projectNameInput = 'New Project'   

        //Creates a Unique ID for the new Project
        const projectID = 'PROJ_' + Math.random().toString(36).substr(2,9)

        const projectName = projectNameInput

        //Each new Project has a default Task for the 4th of May
        const defaultTask = taskFactory('', projectID, 'Default Task', '2021-06-15', 'medium', false, false)
 
        //Create New project and push to Library
        const newProject = projectFactory(projectID,projectName)
        projectsLibrary.push(newProject)
        tasksLibrary.push(defaultTask)

        
    }

    function editTask(selectedTask, newTaskName, newTaskPriority, newTaskDueDate){
        
         selectedTask.taskName = newTaskName
         selectedTask.priority = newTaskPriority
         selectedTask.dueDate = newTaskDueDate
         updateTodayProject()


    }
 
    function updateTodayProject() {
        tasksLibrary.forEach(task => {
            if (task.dueDate === today) task.parentProjectID = 'PROJ_today'
            
        })
    }

    function createTask(projectID, newTaskName, newTaskPriority, newTaskDueDate) {
        const createdTask = taskFactory('a', projectID, newTaskName, newTaskDueDate, newTaskPriority, false, false)
        tasksLibrary.push(createdTask)
    

        /// LEFT HERE. TASK CREATION ///


    }


    const getProjectsLibrary = () => projectsLibrary
    const getTasksLibrary = () => tasksLibrary

return {
    getProjectsLibrary, 
    getTasksLibrary,
    createProject,
    editTask,
    createTask
    }

})()
    export default projectsLogic