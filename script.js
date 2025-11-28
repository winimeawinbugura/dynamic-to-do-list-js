// Select DOM elements
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create li element and set text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Assign onclick event to remove the task
    removeButton.onclick = function () {
        taskList.removeChild(li);
    };

    // Append remove button to li, then append li to taskList
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}

// Event listener for Add Task button
addButton.addEventListener('click', addTask);

// Event listener for Enter key
taskInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
