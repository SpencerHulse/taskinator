let formE1 = window.document.querySelector("#task-form");
let tasksToDoE1 = document.querySelector("#tasks-to-do");

let taskFormHandler = (event) => {
  event.preventDefault();
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  //package data as an object
  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  //send it as an argument to createTaskE1
  createTaskE1(taskDataObj);
};

let createTaskE1 = function (taskDataObj) {
  //create list item
  let listItemE1 = document.createElement("li");
  listItemE1.className = "task-item";

  //create div to hold task info and add to list item
  let taskInfoE1 = document.createElement("div");

  //give it a class name
  taskInfoE1.className = "task-info";

  //add HTML to div
  taskInfoE1.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemE1.appendChild(taskInfoE1);

  //add entire list item to list
  tasksToDoE1.appendChild(listItemE1);
};

formE1.addEventListener("submit", taskFormHandler);
