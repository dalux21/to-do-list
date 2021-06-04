import projectsLogic from './projects.js'
//DOM Elements
const userInterface = (function(){

 const DOMElements = {
    //Sidebar elements
    todayProjectsList : document.getElementById('today-projects-list'),
    allProjectsList : document.getElementById('all-projects-list'),
    addProjectBtn : document.getElementById('add-project-btn'),
    newProjectNameInput : document.getElementById('project-name-input'),
    createProjectBtn : document.getElementById('create-project-btn'),
    addProjectForm : document.getElementById('add-project-form'),
    allProjectTitles : document.querySelectorAll('.projects-list-item'),

    //Main Content Elements
    projectTitle : document.getElementById('project-title'),
    tasksList : document.getElementById('tasks-list'),

    //Add Task to Project Elements
    taskTitleInput : document.getElementById('task-title-input'),
    taskPrioritySelect : document.getElementById('task-priority-select'),
    taskDateDueInput : document.getElementById('task-date-due'),
    addTaskBtn : document.getElementById('add-task-btn')

}

//Event Listeners
const eventListeners = (function(){

    DOMElements.addProjectBtn.addEventListener('click', showAddProjectForm)
    DOMElements.createProjectBtn.addEventListener('click', function(){
        const projectNameInput = DOMElements.newProjectNameInput.value
        projectsLogic.createProject(projectNameInput)
        renderSidebar()
    })

    DOMElements.addTaskBtn.addEventListener('click', function(){})
   
    })()



//Shows Add Project Form on Click Button
function showAddProjectForm(){
    DOMElements.addProjectForm.classList.remove('hide')
    DOMElements.addProjectForm.classList.add('flex-column')
    
}

function renderSidebar() {

    //Clear Projects List
    DOMElements.allProjectsList.innerHTML = ''
    //Go through Projects library
    if (projectsLogic.getProjectsLibrary().length) 
    {
        projectsLogic.getProjectsLibrary().forEach(project => {
            //Create Projects and assign data-ID
            const newListElement = document.createElement('li')
            newListElement.classList.add('projects-list-item');
            newListElement.dataset.projectId = project.projectID;

            newListElement.innerHTML = `<h4 class="project-name">
                                        ${project.projectName}</h4>`

            //Add Event Listener to the newly created list element
            newListElement.addEventListener('click', renderProject)

            //List Projects on sidebar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('material-icons', 'delete-btn');
            deleteButton.innerText = 'delete';
            deleteButton.dataset.deleteProjectID = project.projectID
            newListElement.appendChild(deleteButton)
            DOMElements.allProjectsList.appendChild(newListElement)
            });

        
        }
    else DOMElements.allProjectsList.innerHTML = '<h4 class="project-name">Create your First Project</h4>'
}

//Show project tasks on the right when project is clicked
function renderProject(){

    const selectedProjectID = this.dataset.projectId
    const selectedProject = projectsLogic.getProjectsLibrary().find(x => {
       return x.projectID === selectedProjectID
    })
    DOMElements.projectTitle.innerText = selectedProject.projectName
    listTasks(selectedProjectID)
}

function listTasks(projectID) {
    DOMElements.tasksList.innerHTML = ''
    projectsLogic.getTasksLibrary().forEach(task => {

        if (task.parentProjectID === projectID)
        {
        const taskListItem = document.createElement('li')
        const taskIdForDom = projectsLogic.getTasksLibrary().indexOf(task)
        console.log(projectsLogic.getTasksLibrary())
        taskListItem.classList.add('task')
        taskListItem.innerHTML = `<div class="task-description">
               <input type="checkbox" id="box-${taskIdForDom}">
               <label for="box-${taskIdForDom}">${task.taskName}</label>
             </div>
             <div class="task-controls">
               <input type="date" class="date" name="task-${taskIdForDom}-date"></input>
               <button class="material-icons edit-btn">edit</button><button class="material-icons delete-btn">delete</button>
             </div>`    

DOMElements.tasksList.appendChild(taskListItem)
} })

//     <div class="task-description">
//       <input type="checkbox" id="box-${taskIdForDom}">
//       <label for="box-${taskIdForDom}">${task.taskName}</label>
//     </div>
//     <div class="task-controls">
//       <input type="date" class="date" name="task-${taskIdForDom}-date"></input>
//       <button class="material-icons edit-btn">edit</button><button class="material-icons delete-btn">delete</button>
//     </div>

}
return {DOMElements, eventListeners, renderSidebar}
})();

export default userInterface