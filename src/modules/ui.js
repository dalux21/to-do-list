import projectsLogic from './projects.js'
import format from '../../node_modules/date-fns/format'
import { parseISO } from '../../node_modules/date-fns'
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
    addTaskBox : document.getElementById('add-task-box'),
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
    });
    DOMElements.addTaskBtn.addEventListener('click', function(){
        const projectID = DOMElements.projectTitle.dataset.projectId
        const newTaskName = DOMElements.taskTitleInput.value
        const newTaskPriority = DOMElements.taskPrioritySelect.value
        
        const newTaskDueDate = DOMElements.taskDateDueInput.value
        projectsLogic.createTask(projectID, newTaskName, newTaskPriority, newTaskDueDate)
        renderProject(projectID)
    })
   
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
    DOMElements.addTaskBox.classList.remove('hide');
    
    const selectedProjectID = projectID
    const selectedProject = projectsLogic.getProjectsLibrary().find(x => {
       return x.projectID === selectedProjectID
    })
    DOMElements.projectTitle.innerText = selectedProject.projectName
    DOMElements.projectTitle.dataset.projectId = selectedProjectID
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
        taskListItem.classList.add('task')
        taskListItem.dataset.parentProjectId = task.parentProjectID
        taskListItem.dataset.taskId = task.taskID
        taskListItem.innerHTML = `<div class="task-description">
        
               <input type="checkbox" id="box-${task.taskID}" class="task-checkbox"">
               <label for="box-${task.taskID}">${task.taskName}</label>
             </div>
             <div class="task-controls">
             <span class="priority">Priority: ${task.priority} </span> 
               <span>${format(new Date(task.dueDate), 'dd/MM/y')}</span>
               <button class="material-icons edit-btn" id="edit-task-${task.taskID}">edit</button><button class="material-icons delete-btn" id="delete-task-${task.taskID}">delete</button>
             </div>`    

DOMElements.tasksList.appendChild(taskListItem)
const taskEditButtons = document.querySelectorAll('.edit-btn')
taskEditButtons.forEach(editButton => {
    editButton.addEventListener('click', showTaskEditBox)
})
const deleteTaskButtons = document.querySelectorAll('.delete-btn')
deleteTaskButtons.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', deleteTask)
})
const listedTasksCheckBoxes = document.querySelectorAll('.task-checkbox')

listedTasksCheckBoxes.forEach(checkbox => {

    if (task.isTaskDone) checkbox.checked = true
    else checkbox.checked = false;
    checkbox.addEventListener('change', function(){
            if (checkbox.checked) task.isTaskDone = true;
            else task.isTaskDone = false;

    })
})

}})

}

function findTask(e){
        //ID of task to Delete
        const taskID = e.target.id.substring(e.target.id.length-14);
    
        return projectsLogic.getTasksLibrary().find(x => {
            return x.taskID === taskID
        })
        
}

function deleteTask(e){
    //ID of task to Delete
    const selectedTask = findTask(e)
    projectsLogic.deleteTask(selectedTask)
    renderProject(selectedTask.parentProjectID)
}

function showTaskEditBox(e) {

    //ID of task to Edit
    const taskID = e.target.id.substring(e.target.id.length - 14);
    const selectedTask = findTask(e)

    //Get li container of task to Edit
    
    const list = DOMElements.tasksList
    const editBox = document.createElement('li');
    editBox.classList.add('task-edit');

    //Create edit Box
    const editBoxTemplate = `<label for="${taskID}-title-input">Edit Task ${selectedTask.taskName}:</label>
    <input type="text" class="task-title-input" name="${taskID}-title-input" id="${taskID}-title-input" value="${selectedTask.taskName}" required></input>
    <label for="${taskID}-priority-select">Priority:</label>
    <select name="priority-list" id="${taskID}-priority-select" class="priority-list" required>
        <option value="high" selected="selected">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

    <label for="${taskID}-date-due">Due:</label>
    <input type="date" class="date" name="${taskID}-date-due" id="${taskID}-date-due" value="${format(parseISO(selectedTask.dueDate), 'y-MM-dd')}"  required></input>
    
  <button id="edit-${taskID}-btn">Apply</button>`;


  editBox.innerHTML = editBoxTemplate  
  
  list.appendChild(editBox)

  //add Event Listener to apply button
  const applyEditsBtn = document.getElementById(`edit-${taskID}-btn`);

  applyEditsBtn.addEventListener('click', function(){
    

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