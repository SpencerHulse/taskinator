let buttonE1 = window.document.querySelector("#save-task");
let tasksToDoE1 = document.querySelector("#tasks-to-do");

let createTaskHandler = () => {
  let taskItemE1 = document.createElement("li");
  taskItemE1.className = "task-item";
  taskItemE1.textContent = "This is a new task";
  tasksToDoE1.appendChild(taskItemE1);
};

buttonE1.addEventListener("click", createTaskHandler);
