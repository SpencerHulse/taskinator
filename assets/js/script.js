let taskIdCounter = 0;
let formE1 = window.document.querySelector("#task-form");
let tasksToDoE1 = document.querySelector("#tasks-to-do");
let tasksInProgressE1 = document.querySelector("#tasks-in-progress");
let tasksCompletedE1 = document.querySelector("#tasks-completed");
let pageContentE1 = document.querySelector("#page-content");

let taskFormHandler = (event) => {
  event.preventDefault();
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check for data-task-id to determine whether something is being edited
  let isEdit = formE1.hasAttribute("data-task-id");

  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  //has data attribute, so get the task id and call function to complete edit process
  if (isEdit) {
    let taskId = formE1.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  //no data attribute, so create data object as normal and pass to createTaskE1 function
  else {
    //package data as an object
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };

    createTaskE1(taskDataObj);
  }

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

let taskButtonHandler = (event) => {
  let targetE1 = event.target;

  //edit button was clicked
  if (targetE1.matches(".edit-btn")) {
    //get element's task id
    let taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetE1.matches(".delete-btn")) {
    let taskId = targetE1.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

let deleteTask = (taskId) => {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

let editTask = (taskId) => {
  //get task list item element
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  let taskType = taskSelected.querySelector("span.task-type").textContent;

  //updating the form
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formE1.setAttribute("data-task-id", taskId);
};

let completeEditTask = (taskName, taskType, taskId) => {
  //find the matching task list item
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formE1.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

let taskStatusChangeHandler = (event) => {
  //get the task items id
  let taskId = event.target.getAttribute("data-task-id");

  //get the currently selected option's value and convert to lowercase
  let statusValue = event.target.value.toLowerCase();

  //find the parent item element based on the id
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //decide where to place it
  if (statusValue === "to do") {
    tasksToDoE1.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressE1.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedE1.appendChild(taskSelected);
  }
};

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);
