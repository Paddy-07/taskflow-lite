import {
  saveTasks,
  loadTasks
} from './modules/storage.js';

import {
  renderTaskList
} from './modules/render.js';

import {
  validateTaskInput
} from './modules/validation.js';


// DOM

const taskForm =
  document.getElementById('task-form');

const taskInput =
  document.getElementById('task-input');

const taskList =
  document.getElementById('task-list');

const errorMessage =
  document.getElementById('error-message');

const taskCounter =
  document.getElementById('task-counter');

const filterButtons =
  document.querySelectorAll('.filter-btn');


// Data

let tasks = loadTasks();

let currentFilter = 'all';


// Create Task

function createTask(text) {

  return {

    id: Date.now(),

    text: text.trim(),

    completed: false,

    createdAt:
      new Date().toISOString()

  };

}


// Counter

function updateTaskCounter() {

  const remainingTasks =
    tasks.filter(
      task => !task.completed
    ).length;

  taskCounter.textContent =
    `${remainingTasks} Tasks Remaining`;

}


// Filters

function getFilteredTasks() {

  if (currentFilter === 'active') {

    return tasks.filter(
      task => !task.completed
    );

  }

  if (currentFilter === 'completed') {

    return tasks.filter(
      task => task.completed
    );

  }

  return tasks;

}


// Render App

function renderApp() {

  renderTaskList(
    taskList,
    getFilteredTasks()
  );

  updateTaskCounter();

}


// Add Task

taskForm.addEventListener(
  'submit',
  event => {

    event.preventDefault();

    const validation =
      validateTaskInput(
        taskInput.value
      );

    if (!validation.valid) {

      errorMessage.textContent =
        validation.message;

      return;

    }

    errorMessage.textContent = '';

    const newTask =
      createTask(taskInput.value);

    tasks.push(newTask);

    saveTasks(tasks);

    renderApp();

    taskInput.value = '';

  }
);


// Delete + Complete

taskList.addEventListener(
  'click',
  event => {

    const taskElement =
      event.target.closest('.task');

    if (!taskElement) return;

    const taskId = Number(
      taskElement.dataset.id
    );

    const taskIndex =
      tasks.findIndex(
        task => task.id === taskId
      );

    // Delete

    if (
      event.target.classList.contains(
        'delete-btn'
      )
    ) {

      const confirmDelete =
        confirm(
          'Delete this task?'
        );

      if (!confirmDelete) return;

      tasks.splice(taskIndex, 1);

      saveTasks(tasks);

      renderApp();

    }

  }
);


// Checkbox Toggle

taskList.addEventListener(
  'change',
  event => {

    if (
      event.target.type === 'checkbox'
    ) {

      const taskElement =
        event.target.closest('.task');

      const taskId = Number(
        taskElement.dataset.id
      );

      const task =
        tasks.find(
          task => task.id === taskId
        );

      task.completed =
        event.target.checked;

      saveTasks(tasks);

      renderApp();

    }

  }
);


// Filters

filterButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      filterButtons.forEach(btn => {

        btn.classList.remove(
          'active'
        );

      });

      button.classList.add(
        'active'
      );

      currentFilter =
        button.dataset.filter;

      renderApp();

    }
  );

});


// Initial Render

renderApp();