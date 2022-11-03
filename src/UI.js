import Storage from './storage';
import Project from './project';
import Todo from './todo';

export default class UI {
  static loadInitial = () => {
    UI.loadProjects();
    UI.initProjectButtons();
    UI.openProject('Inbox', document.getElementById('inbox-btn'));
  };

  static loadProjects() {
    const todoList = Storage.getTodoList();
    const projectList = todoList.getProjects();
    projectList.forEach(project => {
      if (project.name !== 'Due' && project.name !== 'Inbox') {
        UI.createProject(project.name);
      }
    });
    UI.initAddProjectBtns();
  }

  static loadTodos(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTodos()
      .forEach(todo => UI.createTodo(todo.name, todo.dueDate, todo.completed));

    if (projectName !== 'Due') {
      UI.initAddTodoButtons();
    }
  }

  static loadProjectContent(projectName) {
    const projectView = document.getElementById('project-view');

    projectView.innerHTML = `
      <h1 class="project-name" id="project-name">${projectName}</h1>
      <div class="todo-list" id=todo-list></div>`;

    if (projectName !== 'Due') {
      projectView.innerHTML += `
        <div class="add-todo-button-container">
          <button class="add-todo-button" id="add-todo-button">
            <div class="button-left">
              <div class="todo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z" fill="currentColor" /></svg>
              </div>
              <div class="todo-text">Add New Task</div>
            </div>
            <div class="button-right"></div>
          </button>
        </div>
        <div class="create-todo-form hidden" id="create-todo-container">
          <input type="text" placeholder="New Todo" id="create-todo-input" required>
          <div class="todo-button-group">
            <button class="create-todo-button" id="create-todo-button">Create</button>
            <button class="cancel-todo-button" id="cancel-todo-button">Cancel</button>
          </div>
        </div>`;
    }

    UI.loadTodos(projectName);
  }

  static initAddProjectBtns() {
    const addProjectBtn = document.getElementById('add-project-button');
    const createProjectBtn = document.getElementById('create-project-button');
    const cancelProjectBtn = document.getElementById('cancel-project-button');
    const projectNameInput = document.getElementById('project-form-input-name');

    addProjectBtn.addEventListener('click', UI.toggleCreateProjectForm);
    cancelProjectBtn.addEventListener('click', UI.closeCreateProjectForm);
    createProjectBtn.addEventListener('click', UI.addProject);
    projectNameInput.addEventListener('keyup', e => {
      if (e.key === 'Enter' && projectNameInput.value !== '') {
        UI.addProject();
      }
    });
    projectNameInput.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        UI.toggleCreateProjectForm();
      }
    });
  }

  static toggleCreateProjectForm() {
    const projectNameInput = document.getElementById('project-form-input-name');
    const createProjectForm = document.getElementById('create-project-form');

    projectNameInput.blur();

    createProjectForm.classList.toggle('hidden');

    if (projectNameInput.style.display !== 'none') {
      projectNameInput.focus();
    }
  }

  static closeCreateProjectForm() {
    const projectNameInput = document.getElementById('project-form-input-name');
    const createProjectForm = document.getElementById('create-project-form');

    projectNameInput.blur();

    createProjectForm.classList.add('hidden');

    if (projectNameInput.style.display !== 'none') {
      projectNameInput.focus();
    }
  }

  static addProject() {
    const projectNameInput = document.getElementById('project-form-input-name');
    const projectName = projectNameInput.value;

    if (projectName === '') {
      alert('Please enter a project name');
      return;
    }
    if (Storage.getTodoList().getProject(projectName)) {
      projectNameInput.value = '';
      alert('Project already exists');
      return;
    }

    Storage.addProject(new Project(projectName));
    UI.createProject(projectName);
    UI.closeCreateProjectForm();
    projectNameInput.value = '';
  }

  static initProjectButtons() {
    const inboxBtn = document.getElementById('inbox-btn');
    const dueBtn = document.getElementById('due-btn');
    const customProjectsBtns = document.querySelectorAll('.custom-projects-button');

    inboxBtn.addEventListener('click', UI.openInbox);
    dueBtn.addEventListener('click', UI.openDue);
    customProjectsBtns.forEach(btn => {
      btn.addEventListener('click', UI.handleProjectClick);
    });
  }

  static initAddTodoButtons() {
    const addTodoBtn = document.getElementById('add-todo-button');
    const createTodoInput = document.getElementById('create-todo-input');
    const createTodoBtn = document.getElementById('create-todo-button');
    const cancelTodoBtn = document.getElementById('cancel-todo-button');

    addTodoBtn.addEventListener('click', UI.toggleCreateTodoForm);
    createTodoInput.addEventListener('keyup', e => {
      if (e.key === 'Enter' && createTodoInput.value !== '') {
        UI.addTodo();
      }
    });
    createTodoInput.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        UI.toggleCreateTodoForm();
      }
    });
    createTodoBtn.addEventListener('click', UI.addTodo);
    cancelTodoBtn.addEventListener('click', UI.toggleCreateTodoForm);
  }

  static toggleCreateTodoForm() {
    const addTodoBtn = document.getElementById('add-todo-button');
    const createTodoContainer = document.getElementById('create-todo-container');
    const createTodoInput = document.getElementById('create-todo-input');

    createTodoInput.blur();
    addTodoBtn.classList.toggle('hidden');
    createTodoContainer.classList.toggle('hidden');

    if (createTodoContainer.style.display !== 'none') {
      createTodoInput.focus();
    }
  }

  static addTodo() {
    const createTodoInput = document.getElementById('create-todo-input');
    const todoName = createTodoInput.value;
    const projectName = document.getElementById('project-name').textContent;

    if (
      Storage.getTodoList()
        .getProject(projectName)
        .getTodo(todoName)
    ) {
      alert('Todo already exists');
      return;
    }
    createTodoInput.value = '';
    Storage.addTodo(projectName, new Todo(todoName));
    UI.createTodo(todoName, 'No Due Date');
    UI.toggleCreateTodoForm();
  }

  static openInbox() {
    UI.openProject('Inbox', this);
  }

  static openDue() {
    UI.openProject('Due', this);
  }

  static openProject(projectName, projectButton) {
    const defaultProjectBtns = document.querySelectorAll('.default-projects-button');
    const customProjectBtns = document.querySelectorAll('.custom-projects-button');
    const buttons = [...defaultProjectBtns, ...customProjectBtns];

    buttons.forEach(button => button.classList.remove('active'));
    projectButton.classList.add('active');
    UI.loadProjectContent(projectName);
  }

  static handleProjectClick(e) {
    const projectName = this.children[0].children[1].textContent;

    if (e.target.classList.contains('delete-item')) {
      UI.deleteProject(projectName, this);
      return;
    }

    UI.openProject(projectName, this);
  }

  static createProject(projectName) {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML += `
      <button class="custom-projects-button">
        <div class="project-button-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 4H4C3.44771 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44771 20.5523 4 20 4ZM4 2C2.34315 2 1 3.34315 1 5V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34315 21.6569 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.4477 10.4477 11 11 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H11C10.4477 13 10 12.5523 10 12ZM8 15H6V17H8V15ZM10 16C10 15.4477 10.4477 15 11 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H11C10.4477 17 10 16.5523 10 16Z" fill="currentColor" /></svg>
          <span class="button-text">${projectName}</span>
        </div>
        <div class="project-button-right delete-item">
          <svg class="delete-item" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>
        </div>
      </button>`;

    UI.initProjectButtons();
  }

  static deleteProject(projectName, projectButton) {
    if (projectButton.classList.contains('active')) {
      UI.clearProjectView();
      UI.openProject('Inbox', document.getElementById('inbox-btn'));
    }
    Storage.deleteProject(projectName);
    UI.clearProjects();
    UI.loadProjects();
  }

  static clearProjectView() {
    const projectView = document.getElementById('project-view');
    projectView.textContent = '';
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
  }

  static createTodo(taskName, dueDate, completed) {
    const todoList = document.getElementById('todo-list');
    let markCompleteString;
    let classListAddString = '';

    if (completed) {
      classListAddString = ' completed';
      markCompleteString =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>';
    } else {
      markCompleteString =
        '<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>';
    }

    todoList.innerHTML += `
      <button class="button-todo${classListAddString}">
        <div class="button-left">
          <div class="toggle-complete-icon">
            ${markCompleteString}
          </div>
          <div class="todo-text">${taskName}</div>
        </div>
        <div class="button-right">
          <div class="due-text">${dueDate}</div>
          <div class="todo-icon delete-item">
            <svg class="delete-item" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>
          </div>
        </div>
      </button>`;

    UI.initTodoButtons();
  }

  static initTodoButtons() {
    const todoButtons = document.querySelectorAll('.button-todo');
    todoButtons.forEach(todoButton => {
      todoButton.addEventListener('click', UI.handleTodoClick);
    });
  }

  static handleTodoClick(e) {
    const todoName = this.children[0].children[1].textContent;
    const projectName = document.getElementById('project-name').textContent;

    if (e.target.classList.contains('delete-item')) {
      UI.deleteTodo(projectName, todoName);
    } else {
      UI.toggleTodoComplete(todoName, projectName, this);
    }
  }

  static toggleTodoComplete(todoName, projectName, todoButton) {
    Storage.toggleTodoCompleted(projectName, todoName);
    const todoIcon = todoButton.children[0].children[0];
    if (Storage.getTodo(projectName, todoName).getCompleted()) {
      todoButton.classList.add('completed');
      todoIcon.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>';
    } else {
      todoButton.classList.remove('completed');
      todoIcon.innerHTML =
        '<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>';
    }
  }

  static deleteTodo(projectName, todoName) {
    Storage.deleteTodo(projectName, todoName);
    UI.clearTodos();
    UI.loadTodos(projectName);
  }

  static clearTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  }
}
