// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list first

  if (tasks.length === 0) {
    document.getElementById("no-tasks-msg").style.display = "block"; // Show "No tasks" message
  } else {
    document.getElementById("no-tasks-msg").style.display = "none"; // Hide "No tasks" message
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);
    li.innerHTML = `
      <span onclick="toggleCompletion(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return; // Prevent adding empty tasks
  }

  const task = {
    text: taskText,
    completed: false
  };
  
  tasks.push(task);
  taskInput.value = ""; // Clear input field
  saveTasks();
  renderTasks();
}

// Function to toggle the completion status of a task
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks when the page is loaded
function loadTasks() {
  renderTasks();
}
