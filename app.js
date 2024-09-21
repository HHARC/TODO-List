const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("tasks");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false,
    };

    addTaskToUI(task);
    saveTaskToLocalStorage(task);

    taskInput.value = "";
  }
}

function addTaskToUI(task) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check-task");
  checkbox.checked = task.completed;

  const taskSpan = document.createElement("span");
  taskSpan.innerText = task.text;

  if (task.completed) {
    taskSpan.style.textDecoration = "line-through";
  }

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash");

  deleteIcon.addEventListener("click", function () {
    li.remove();
    removeTaskFromLocalStorage(task.text);
  });

  checkbox.addEventListener("click", function () {
    task.completed = checkbox.checked;
    updateTaskCompletionInLocalStorage(task.text, task.completed);

    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
    } else {
      taskSpan.style.textDecoration = "none";
    }
  });

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(deleteIcon);

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    addTaskToUI(task);
  });
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCompletionInLocalStorage(taskText, completed) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    if (task.text === taskText) {
      task.completed = completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
