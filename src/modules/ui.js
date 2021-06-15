import projectsLogic from './projects.js'
import format from '../../node_modules/date-fns/format'
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
    addTaskBtn : document.getElementById('add-task-btn'),
    allEdiTaskBtns : document.querySelectorAll('.edit-btn'),


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
            newListElement.addEventListener('click', function(){
                renderProject(this.dataset.projectId)
            })

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
function renderProject(projectID){
    const selectedProjectID = projectID
    const selectedProject = projectsLogic.getProjectsLibrary().find(x => {
       return x.projectID === selectedProjectID
    })
    DOMElements.projectTitle.innerText = selectedProject.projectName
    listTasks(selectedProjectID)
}

function listTasks(projectID) {
    DOMElements.tasksList.innerHTML = ''
    projectsLogic.getTasksLibrary().forEach(task => {

        if ((task.parentProjectID === projectID ||
             (projectID === 'PROJ_today' && task.isToday)))
        {
        const taskListItem = document.createElement('li')
        const taskIdForDom = projectsLogic.getTasksLibrary().indexOf(task)
        console.log(projectsLogic.getTasksLibrary())
        taskListItem.classList.add('task')
        taskListItem.dataset.parentProjectId = task.parentProjectID
        taskListItem.dataset.taskId = task.taskID
        taskListItem.innerHTML = `<div class="task-description">
        
               <input type="checkbox" id="box-${taskIdForDom}">
               <label for="box-${taskIdForDom}">${task.taskName}</label>
             </div>
             <div class="task-controls">
             <span class="priority">Priority: ${task.priority} </span> 
               <span>${format(new Date(task.dueDate), 'dd/MM/y')}</span>
               <button class="material-icons edit-btn" id="edit-task-${task.taskID}">edit</button><button class="material-icons delete-btn id="delete-task-${task.taskID}">delete</button>
             </div>`    

DOMElements.tasksList.appendChild(taskListItem)
const taskEditButtons = document.querySelectorAll('.edit-btn')
taskEditButtons.forEach(editButton => {
    editButton.addEventListener('click', showTaskEditBox)
})


}})

}

function showTaskEditBox(e) {

    //ID of task to Edit
    const taskID = e.target.id.substring(e.target.id.length - 14);
    console.log(taskID)

    //Get li container of task to Edit
    
    //Create edit Box
    const list = DOMElements.tasksList
    const editBox = document.createElement('li');
    editBox.classList.add('task-edit');

    const editBoxTemplate = `<label for="${taskID}-title-input">Task name:</label>
    <input type="text" class="task-title-input" name="${taskID}-title-input" id="${taskID}-title-input"></input>
    <label for="${taskID}-priority-select">Priority:</label>
    <select name="priority-list" id="${taskID}-priority-select" class="priority-list">
        <option value="high" selected="selected">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

    <label for="${taskID}-date-due">Due:</label>
    <input type="date" class="date" name="${taskID}-date-due" id="${taskID}-date-due"></input>
    
  <button id="edit-${taskID}-btn">Apply</button>`;

  editBox.innerHTML = editBoxTemplate  
  list.insertBefore(editBox, list.firstElementChild.nextSibling)

  //add Event Listener to apply button
  const applyEditsBtn = document.getElementById(`edit-${taskID}-btn`);

  applyEditsBtn.addEventListener('click', function(){
    
    const selectedTask = projectsLogic.getTasksLibrary().find(x => {
        return x.taskID === taskID
     })
     const newTaskName = document.getElementById(taskID + '-title-input').value
     const newTaskPriority = document.getElementById(taskID + '-priority-select').value
     const newTaskDueDate = document.getElementById(taskID + '-date-due').value
     
     projectsLogic.editTask(selectedTask, newTaskName, newTaskPriority, newTaskDueDate)     
     
     renderProject(selectedTask.parentProjectID)


  });



  

}
return {DOMElements, eventListeners, renderSidebar}
})();

export default userInterface