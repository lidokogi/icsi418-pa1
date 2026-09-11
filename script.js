//html elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

// store tasks in an array
const tasks = [];

// used to give each task a unique id so we can find/remove it later
let nextId = 1;

// respond to form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // reject empty task names
    if (taskName === "") {
        errorMessage.textContent = "Task name cannot be empty.";
        return;
    }

    errorMessage.textContent = "";

    // create the task object and add it to the array
    const task = {
        id: nextId++,
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    tasks.push(task);

    // reset the form for the next entry
    taskInput.value = "";
    priorityInput.value = "low";
    taskInput.focus();

    displayTasks();
});

// display tasks
function displayTasks() {
    // clear the current list before re-rendering
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.classList.add("priority-" + task.priority);

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // task info (name + priority label)
        const infoElement = document.createElement("div");
        infoElement.classList.add("task-info");

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("task-name");
        nameSpan.textContent = task.name;

        const prioritySpan = document.createElement("span");
        prioritySpan.classList.add("task-priority");
        prioritySpan.textContent = task.priority;

        infoElement.appendChild(nameSpan);
        infoElement.appendChild(prioritySpan);

        // buttons container
        const buttonsElement = document.createElement("div");
        buttonsElement.classList.add("task-buttons");

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-btn");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", function () {
            toggleComplete(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        buttonsElement.appendChild(completeButton);
        buttonsElement.appendChild(deleteButton);

        taskElement.appendChild(infoElement);
        taskElement.appendChild(buttonsElement);

        taskList.appendChild(taskElement);
    });
}

// complete a task 
function toggleComplete(id) {
    const task = tasks.find(function (t) {
        return t.id === id;
    });

    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

// delete a task
function deleteTask(id) {
    const index = tasks.findIndex(function (t) {
        return t.id === id;
    });

    if (index !== -1) {
        tasks.splice(index, 1);
        displayTasks();
    }
}