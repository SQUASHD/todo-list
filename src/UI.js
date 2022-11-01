import { Storage } from './storage';
import { TodoList } from './todoList';
import { Project } from './project';
import { Todo } from './todo';

const UI = (() => {

  const loadInitial = () => {
    loadProjects();
    initProjectButtons();
    openProject('Inbox', document.getElementById('inbox-btn'));
  }

  const loadProjects = () => {
    Storage.getTodoList()
      .getProjects()
      .foreach((project) => {
        if (
          project.getName() !== 'Inbox' &&
          project.getName() !== 'Due'
        ) {
          createProject(project.getName())
        }
      }
    )
  }

  const loadTodos = (projectName) => {
    Storage.getTodoList()
      .getProject(projectName)
      .getTodos()
      .forEach((todo) => createTodo(todo.getName(), todo.getDueDate()))
    
    if (projectName !== 'Due') {
      initAddTodoButton();
    }
  }

  const loadProjectContent = (projectName) => {
    const projectView = document.getElementById('project-view');
    projectView.innerHTML = `
      <h1 class="project-name">${projectName}</h1>
      <div class="todo-list" id=todo-list></div>`;
    if (projectName !== 'Inbox' && projectName !== 'Due') {
      projectView.innerHTML += `
      <button class="button-add-task" id="button-add-task">
        <i class="fas fa-plus"></i>
        Add Task
      </button>
      <div class="add-task-popup" id="add-task-popup">
        <input
          class="input-add-task-popup"
          id="input-add-task-popup"
          type="text"
        />
        <div class="add-task-popup-buttons">
          <button class="button-add-task-popup" id="button-add-task-popup">
            Add
          </button>
          <button
            class="button-cancel-task-popup"
            id="button-cancel-task-popup"
          >
            Cancel
          </button>
        </div>
      </div>`
    }

    loadTodos(projectName);
  }

  const initProjectButtons = () => {
    const inboxBtn = document.getElementById('inbox-btn');
    const dueBtn = document.getElementById('due-btn');
    const customProjectsBtn = document.querySelectorAll('.custom-projects-btn');

    inboxBtn.addEventListener('click', openInbox());
    dueBtn.addEventListener('click', openDue());
    customProjectsBtn.forEach((btn) => {
      btn.addEventListener('click', handleProjectClick);
    });
  }

  const initAddTodoButtons = () => {
  }

  const openInbox = () => {
    openProject('Inbox', this);
  }

  const openDue = () => {
    openProject('Due', this);
  }

  const openProject = (projectName, projectButton) => {
    const defaultProjectBtns = document.querySelectorAll(',default-projects-button')
    const customProjectBtns = document.querySelectorAll('custom-projects-button')
    const buttons = [...defaultProjectBtns, ...customProjectBtns]

    buttons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')
    loadProjectContent(projectName)
  }

  const handleProjectClick = (e) => {
    const projectName = this.childdren[0].children[1].textContent;
    if (e.target.classList.contains('delete-item')) {
      deleteProject(projectName, this);
      return;
    }
    openProject(projectName);
  }

  const createProject = (projectName) => {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML += `
      <button class="custom-projects-button">
        <div class="project-button-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 4H4C3.44771 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44771 20.5523 4 20 4ZM4 2C2.34315 2 1 3.34315 1 5V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34315 21.6569 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.4477 10.4477 11 11 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H11C10.4477 13 10 12.5523 10 12ZM8 15H6V17H8V15ZM10 16C10 15.4477 10.4477 15 11 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H11C10.4477 17 10 16.5523 10 16Z" fill="currentColor" /></svg>
          <span class="button-text">${projectName}</span>
        </div>
        <div class="project-button-right">
          <svg class="delete-item" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>
        </div>
      </button>`;
  }

  const deleteProject = (projectName, deleteButton) => {
    if (deleteButton.classList.contains('active')) clearProjectPreview();
    Storage.deleteProject(projectName);
    clearProjects()
    loadProjects();
  }

  const clearProjects = () => {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
  }

  const createTodo = (taskName, dueDate) => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML += `
      <button class="button-todo">
        <div class="button-left">
          <div class="todo-icon">✓</div>
          <div class="todo-text">Test</div>
        </div>
        <div class="button-right">${dueDate}</div>
      </button>`
  }

  return { loadInitial };

})();