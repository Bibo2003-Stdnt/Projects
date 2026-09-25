const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskCounter = document.getElementById('taskCounter');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');

function addTask(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('taskItem');

    const taskText = document.createElement('p');
    taskText.classList.add('taskText');
    taskText.textContent = task;

    const taskAction = document.createElement('div');
    taskAction.classList.add('taskAction');

    const completeButton = document.createElement('button');
    completeButton.classList.add('completeButton');
    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", () => {
        listItem.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        let choice = confirm("Are you sure you want to delete this task?");

        if(choice) {
            listItem.remove();
            updateTaskCounter();
            choice = false;
        } else {
            return;
        }
    });

    taskAction.append(completeButton, deleteButton);

    listItem.append(taskText, taskAction);

    taskList.append(listItem);

    updateTaskCounter();
}

function updateTaskCounter() {
    const taskCount = taskList.children.length;
    const word = taskCount === 1 ? 'task' : 'tasks';
    taskCounter.textContent = `${taskCount} ${word}`;
}

taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const task = taskInput.value.trim();
        if(task === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(task);

        taskInput.value = '';
        taskInput.focus();
});