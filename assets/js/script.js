let taskIdCounter = 0;
let tasks = [];
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
      status: "to do",
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

  //send id to taskDataObj for saving to local
  taskDataObj.id = taskIdCounter;

  //push entire object to the tasks array
  tasks.push(taskDataObj);

  //increase task counter for the next unique id
  taskIdCounter++;

  //save tasks to local storage
  saveTasks();
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

  //create new array to hold updated tasks
  let updatedTasks = [];

  //loop through current tasks
  for (let i = 0; i < tasks.length; i++) {
    //if tasks[i].id does not match the deleted task's id, then preserve it on a new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTasks.push(tasks[i]);
    }
  }

  //reassign the updatedTasks array to the tasks array
  tasks = updatedTasks;

  //save tasks to local storage
  saveTasks();
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

  //loop through tasks array and task object with new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");

  formE1.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  //save tasks to local storage
  saveTasks();
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

  //update task's in tasks array
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  //save tasks to local storage
  saveTasks();
};

let saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
/* Gets task items from localStorage.

Converts tasks from the string format back into an array of objects.

Iterates through a tasks array and creates task elements on the page from it. */
let loadTasks = () => {
  tasks = localStorage.getItem("tasks");

  //stops the function if tasks returns null after local storage is retrieved (nothing in storage), !tasks also works
  if (tasks === null) {
    //resets tasks to an empty array instead of null
    tasks = [];
    //stops the function from continuing
    return false;
  }

  //turns the tasks variable back into an object from a string
  tasks = JSON.parse(tasks);

  //recreates the tasks html based upon the data stored in the object, similar to the original creation process
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = taskIdCounter;
    let listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.setAttribute("data-task-id", tasks[i].id);

    let taskInfoE1 = document.createElement("div");
    taskInfoE1.className = "task-info";
    taskInfoE1.innerHTML =
      "<h3 class='task-name'>" +
      tasks[i].name +
      "</h3><span class='task-type'>" +
      tasks[i].type +
      "</span>";

    listItemE1.appendChild(taskInfoE1);

    let taskActionsE1 = createTaskActions(tasks[i].id);

    listItemE1.appendChild(taskActionsE1);

    if (tasks[i].status === "to do") {
      listItemE1.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 0;
      tasksToDoE1.appendChild(listItemE1);
    } else if (tasks[i].status === "in progress") {
      listItemE1.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 1;
      tasksInProgressE1.appendChild(listItemE1);
    } else {
      listItemE1.querySelector(
        "select[name='status-change']"
      ).selectedIndex = 2;
      tasksCompletedE1.appendChild(listItemE1);
    }

    taskIdCounter++;
  }
};

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);
loadTasks();
