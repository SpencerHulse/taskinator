let taskIdCounter = 0;
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

  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  //send it as an argument to createTaskE1
  createTaskE1(taskDataObj);

  formE1.reset();
};

let createTaskE1 = (taskDataObj) => {
  //create list item
  let listItemE1 = document.createElement("li");
  listItemE1.className = "task-item";

  //add task id as a custom attribute
  listItemE1.setAttribute("data-task-id", taskIdCounter);

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

  //creates buttons for the task using the createTaskActions function
  let taskActionsE1 = createTaskActions(taskIdCounter);

  //append the buttons to the list item
  listItemE1.appendChild(taskActionsE1);

  //add entire list item to list
  tasksToDoE1.appendChild(listItemE1);

  //increase task counter for the next unique id
  taskIdCounter++;
};

let createTaskActions = (taskId) => {
  let actionContainerE1 = document.createElement("div");
  actionContainerE1.className = "task-actions";

  //create edit button
  let editButtonE1 = document.createElement("button");
  editButtonE1.textContent = "Edit";
  editButtonE1.className = "btn edit-btn";
  editButtonE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(editButtonE1);

  //create delete button
  let deleteButtonE1 = document.createElement("button");
  deleteButtonE1.textContent = "Delete";
  deleteButtonE1.className = "btn delete-btn";
  deleteButtonE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(deleteButtonE1);

  //create select dropdown menu
  let statusSelectE1 = document.createElement("select");
  statusSelectE1.className = "select-status";
  statusSelectE1.setAttribute("name", "status-change");
  statusSelectE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(statusSelectE1);

  let statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    //create option element
    let statusOptionE1 = document.createElement("option");
    statusOptionE1.textContent = statusChoices[i];
    statusOptionE1.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectE1.appendChild(statusOptionE1);
  }

  return actionContainerE1;
};

formE1.addEventListener("submit", taskFormHandler);
