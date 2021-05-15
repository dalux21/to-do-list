import createProject from './projects.js'
//DOM Elements

 const DOMElements = {
    //Sidebar elements
    todayProjectsList : document.getElementById('today-projects-list'),
    allProjectsList : document.getElementById('all-projects-list'),
    addProjectBtn : document.getElementById('add-project-btn'),
    newProjectNameInput : document.getElementById('project-name-input'),
    createProjectBtn : document.getElementById('create-project-btn'),

    //Main Content Elements
    projectTitle : document.getElementById('project-title'),
    tasksList : document.getElementById('tasks-list'),

    //Might need to add more

    //Add Task to Project Elements
    taskTitleInput : document.getElementById('task-title-input'),
    taskPrioritySelect : document.getElementById('task-priority-select'),
    taskDateDueInput : document.getElementById('task-date-due'),
    addTaskBtn : document.getElementById('add-task-btn')

}

const eventListeners = (function(){
    DOMElements.addProjectBtn.addEventListener('click', createProject)
    DOMElements.createProjectBtn.addEventListener('click', function(){})
    DOMElements.addTaskBtn.addEventListener('click', function(){})
})();

export default DOMElements
export {eventListeners} 