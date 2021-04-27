// Module handling projects (i.e. Categories)
// Objective: Handle creation, editing and deletion of Projects

const projectLibrary = []

const projectFactory = (projectName, projectTasks) => {

    return {projectName, projectTasks}
};

const createProject = (function(){
    const projectName = 'Dummy Project 1'
    const projectTasks = [
        task1 = {
            name: 'task1',
            dueDate: '02/03/2021',
            priority: 'high',
            completed: true          
        },
        task2 = {
            name: 'task2',
            dueDate: '02/04/2022',
            priority: 'low',
            completed: false          
        }];
})();


