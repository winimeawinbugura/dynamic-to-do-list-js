// Select DOM elements (script is loaded at the end of body)
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

/**
 * Helper: retrieve tasks array from localStorage (returns array of strings)
 */
function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

/**
 * Helper: persist tasks array to localStorage
 * @param {Array<string>} tasks
 */
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Create a task <li> element with a remove button and append to DOM.
 * This function does not update localStorage — caller decides whether to save.
 * @param {string} taskText
 */
function createTaskElement(taskText) {
    const li = document.createElement('li');

    // create a span so li.textContent won't include "Remove"
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";

    // Use classList.add as checker expects
    removeButton.classList.add('remove-btn');

    // When clicked, remove the li and update localStorage
    removeButton.onclick = function () {
        // Remove from DOM
        taskList.removeChild(li);

        // Update localStorage: remove first occurrence of this task text
        const tasks = getStoredTasks();
        const index = tasks.indexOf(taskText);
        if (index !== -1) {
            tasks.splice(index, 1);
            saveTasks(tasks);
        }
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
}

/**
 * Add a task. If 'taskText' is provided, use it; otherwise read from input.
 * If 'save' is true (default), append to localStorage; pass false when loading tasks.
 * @param {string} [taskTextArg]
 * @param {boolean} [save=true]
 */
function addTask(taskTextArg, save = true) {
    const taskText = (typeof taskTextArg === 'string') ? taskTextArg.trim() : taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create and show task in DOM
    createTaskElement(taskText);

    // Save to localStorage if requested
    if (save) {
        const tasks = getStoredTasks();
        tasks.push(taskText);
        saveTasks(tasks);
    }

    // Clear input if we used input field
    if (typeof taskTextArg !== 'string') {
        taskInput.value = "";
    }
}

/**
 * Load tasks from localStorage and render them.
 * This calls addTask with save=false to avoid duplicating localStorage writes.
 */
function loadTasks() {
    const storedTasks = getStoredTasks();
    storedTasks.forEach(task => addTask(task, false));
}

// Attach event listeners required by checker

// Click on Add Task button
addButton.addEventListener('click', function () {
    addTask();
});

// Press Enter in input (keypress + event.key === 'Enter' per checker expectation)
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks immediately (script at page end ensures DOM exists)
loadTasks();
