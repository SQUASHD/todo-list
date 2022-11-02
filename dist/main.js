/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ "./src/todo.js");




class UI {
  static loadInitial = () => {
    UI.loadProjects();
    UI.initProjectButtons();
    UI.openProject('Inbox', document.getElementById('inbox-btn'));
  };

  static loadProjects() {
    const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList();
    const projectList = todoList.getProjects();
    projectList.forEach((project) => {
      if (
        project.name !== 'Due'
        && project.name !== 'Inbox'
      ) {
        UI.createProject(project.name);
      }
    });
    UI.initAddProjectBtns();
  }

  static loadTodos(projectName) {
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList()
      .getProject(projectName)
      .getTodos()
      .forEach((todo) => UI.createTodo(todo.name, todo.dueDate, todo.completed));

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
    projectNameInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && projectNameInput.value !== '') {
        UI.addProject();
      }
    });
    projectNameInput.addEventListener('keyup', (e) => {
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
    if (_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(projectName)) {
      projectNameInput.value = '';
      alert('Project already exists');
      return;
    }

    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(new _project__WEBPACK_IMPORTED_MODULE_1__["default"](projectName));
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
    customProjectsBtns.forEach((btn) => {
      btn.addEventListener('click', UI.handleProjectClick);
    });
  }

  static initAddTodoButtons() {
    const addTodoBtn = document.getElementById('add-todo-button');
    const createTodoInput = document.getElementById('create-todo-input');
    const createTodoBtn = document.getElementById('create-todo-button');
    const cancelTodoBtn = document.getElementById('cancel-todo-button');

    addTodoBtn.addEventListener('click', UI.toggleCreateTodoForm);
    createTodoInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && createTodoInput.value !== '') {
        UI.addTodo();
      }
    });
    createTodoInput.addEventListener('keyup', (e) => {
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

    if (_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(projectName).getTodo(todoName)) {
      alert('Todo already exists');
      return;
    }
    createTodoInput.value = '';
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(projectName, new _todo__WEBPACK_IMPORTED_MODULE_2__["default"](todoName));
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

    buttons.forEach((button) => button.classList.remove('active'));
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
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(projectName);
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
      markCompleteString = '<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>';
    } else {
      markCompleteString = '<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>';
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
    todoButtons.forEach((todoButton) => {
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
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].toggleTodoCompleted(projectName, todoName);
    const todoIcon = todoButton.children[0].children[0];
    if (_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(projectName, todoName).getCompleted()) {
      todoButton.classList.add('completed');
      todoIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>';
    } else {
      todoButton.classList.remove('completed');
      todoIcon.innerHTML = '<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>';
    }
  }

  static deleteTodo(projectName, todoName) {
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTodo(projectName, todoName);
    UI.clearTodos();
    UI.loadTodos(projectName);
  }

  static clearTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  }
}


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  constructor(projectName) {
    this.name = projectName;
    this.todos = [];
  }

  setName(newName) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }

  setTodos(newTodos) {
    this.todos = newTodos;
  }

  getTodos() {
    return this.todos;
  }

  addTodo(newTodo) {
    if (this.todos.find((item) => item.getName() === newTodo.name)) return;
    this.todos.push(newTodo);
  }

  deleteTodo(todo) {
    const index = this.todos.findIndex((object) => object.name === todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  getTodo(todoName) {
    return this.todos.find((todo) => todo.getName() === todoName);
  }
}


/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolist */ "./src/todolist.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ "./src/todo.js");




class Storage {
  static saveTodoList(data) {
    localStorage.setItem('todolist', JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new _todolist__WEBPACK_IMPORTED_MODULE_0__["default"](),
      JSON.parse(localStorage.getItem('todolist')),
    );

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new _project__WEBPACK_IMPORTED_MODULE_1__["default"](), project)),
    );

    todoList
      .getProjects()
      .forEach((project) => project.setTodos(
        project.getTodos().map((todo) => Object.assign(new _todo__WEBPACK_IMPORTED_MODULE_2__["default"](), todo)),
      ));

    return todoList;
  }

  static addProject(project) {
    const todoList = Storage.getTodoList();
    todoList.addProject(project);
    Storage.saveTodoList(todoList);
  }

  static deleteProject(projectName) {
    const todoList = Storage.getTodoList();
    todoList.deleteProject(projectName);
    Storage.saveTodoList(todoList);
  }

  static getTodo(projectName, TodoName) {
    const todoList = Storage.getTodoList();
    const project = todoList.getProject(projectName);
    return project.getTodo(TodoName);
  }

  static addTodo(projectName, todo) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).addTodo(todo);
    Storage.saveTodoList(todoList);
  }

  static deleteTodo(projectName, TodoName) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).deleteTodo(TodoName);
    Storage.saveTodoList(todoList);
  }

  static renameTodo(projectName, TodoName, newTodoName) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).getTodo(TodoName).setName(newTodoName);
    Storage.saveTodoList(todoList);
  }

  static setTodoDate(projectName, TodoName, newDueDate) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).getTodo(TodoName).setDueDate(newDueDate);
    Storage.saveTodoList(todoList);
  }

  static toggleTodoCompleted(projectName, TodoName) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).getTodo(TodoName).toggleCompleted();
    Storage.saveTodoList(todoList);
  }
}


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
  constructor(name, dueDate = 'No Due Date') {
    this.name = name;
    this.dueDate = dueDate;
    this.completed = false;
  }

  setDueDate(date) {
    this.dueDate = date;
  }

  getDueDate() {
    return this.dueDate;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  getCompleted() {
    return this.completed;
  }

  setName(newName) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }
}


/***/ }),

/***/ "./src/todolist.js":
/*!*************************!*\
  !*** ./src/todolist.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");


class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]('Inbox'));
    this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]('Due'));
  }

  setProjects(projectsList) {
    this.projects = projectsList;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.name === newProject.name)) { return; }
    this.projects.push(newProject);
  }

  deleteProject(project) {
    const index = this.projects.findIndex((object) => object.name === project);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


document.addEventListener('DOMContentLoaded', _UI__WEBPACK_IMPORTED_MODULE_0__["default"].loadInitial);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOzs7Ozs7O1VDaENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0I7O0FBRXRCLDhDQUE4Qyx1REFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi90b2RvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBzdGF0aWMgbG9hZEluaXRpYWwgPSAoKSA9PiB7XG4gICAgVUkubG9hZFByb2plY3RzKCk7XG4gICAgVUkuaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgVUkub3BlblByb2plY3QoJ0luYm94JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpKTtcbiAgfTtcblxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb2plY3QubmFtZSAhPT0gJ0R1ZSdcbiAgICAgICAgJiYgcHJvamVjdC5uYW1lICE9PSAnSW5ib3gnXG4gICAgICApIHtcbiAgICAgICAgVUkuY3JlYXRlUHJvamVjdChwcm9qZWN0Lm5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFVJLmluaXRBZGRQcm9qZWN0QnRucygpO1xuICB9XG5cbiAgc3RhdGljIGxvYWRUb2Rvcyhwcm9qZWN0TmFtZSkge1xuICAgIFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKVxuICAgICAgLmdldFByb2plY3QocHJvamVjdE5hbWUpXG4gICAgICAuZ2V0VG9kb3MoKVxuICAgICAgLmZvckVhY2goKHRvZG8pID0+IFVJLmNyZWF0ZVRvZG8odG9kby5uYW1lLCB0b2RvLmR1ZURhdGUsIHRvZG8uY29tcGxldGVkKSk7XG5cbiAgICBpZiAocHJvamVjdE5hbWUgIT09ICdEdWUnKSB7XG4gICAgICBVSS5pbml0QWRkVG9kb0J1dHRvbnMoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbG9hZFByb2plY3RDb250ZW50KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC12aWV3Jyk7XG5cbiAgICBwcm9qZWN0Vmlldy5pbm5lckhUTUwgPSBgXG4gICAgICA8aDEgY2xhc3M9XCJwcm9qZWN0LW5hbWVcIiBpZD1cInByb2plY3QtbmFtZVwiPiR7cHJvamVjdE5hbWV9PC9oMT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWxpc3RcIiBpZD10b2RvLWxpc3Q+PC9kaXY+YDtcblxuICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gJ0R1ZScpIHtcbiAgICAgIHByb2plY3RWaWV3LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtdG9kby1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC10b2RvLWJ1dHRvblwiIGlkPVwiYWRkLXRvZG8tYnV0dG9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvblwiPlxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMiAxMkMyIDYuNDc3MTUgNi40NzcxNSAyIDEyIDJDMTcuNTIyOCAyIDIyIDYuNDc3MTUgMjIgMTJDMjIgMTcuNTIyOCAxNy41MjI4IDIyIDEyIDIyQzYuNDc3MTUgMjIgMiAxNy41MjI4IDIgMTJaTTEyIDRDNy41ODE3MiA0IDQgNy41ODE3MiA0IDEyQzQgMTYuNDE4MyA3LjU4MTcyIDIwIDEyIDIwQzE2LjQxODMgMjAgMjAgMTYuNDE4MyAyMCAxMkMyMCA3LjU4MTcyIDE2LjQxODMgNCAxMiA0WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMyA3QzEzIDYuNDQ3NzIgMTIuNTUyMyA2IDEyIDZDMTEuNDQ3NyA2IDExIDYuNDQ3NzIgMTEgN1YxMUg3QzYuNDQ3NzIgMTEgNiAxMS40NDc3IDYgMTJDNiAxMi41NTIzIDYuNDQ3NzIgMTMgNyAxM0gxMVYxN0MxMSAxNy41NTIzIDExLjQ0NzcgMTggMTIgMThDMTIuNTUyMyAxOCAxMyAxNy41NTIzIDEzIDE3VjEzSDE3QzE3LjU1MjMgMTMgMTggMTIuNTUyMyAxOCAxMkMxOCAxMS40NDc3IDE3LjU1MjMgMTEgMTcgMTFIMTNWN1pcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRleHRcIj5BZGQgTmV3IFRhc2s8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1yaWdodFwiPjwvZGl2PlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0ZS10b2RvLWZvcm0gaGlkZGVuXCIgaWQ9XCJjcmVhdGUtdG9kby1jb250YWluZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk5ldyBUb2RvXCIgaWQ9XCJjcmVhdGUtdG9kby1pbnB1dFwiIHJlcXVpcmVkPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWJ1dHRvbi1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNyZWF0ZS10b2RvLWJ1dHRvblwiIGlkPVwiY3JlYXRlLXRvZG8tYnV0dG9uXCI+Q3JlYXRlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLXRvZG8tYnV0dG9uXCIgaWQ9XCJjYW5jZWwtdG9kby1idXR0b25cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICBVSS5sb2FkVG9kb3MocHJvamVjdE5hbWUpO1xuICB9XG5cbiAgc3RhdGljIGluaXRBZGRQcm9qZWN0QnRucygpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS1pbnB1dC1uYW1lJyk7XG5cbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkudG9nZ2xlQ3JlYXRlUHJvamVjdEZvcm0pO1xuICAgIGNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5jbG9zZUNyZWF0ZVByb2plY3RGb3JtKTtcbiAgICBjcmVhdGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkuYWRkUHJvamVjdCk7XG4gICAgcHJvamVjdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgcHJvamVjdE5hbWVJbnB1dC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgVUkuYWRkUHJvamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBVSS50b2dnbGVDcmVhdGVQcm9qZWN0Rm9ybSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRvZ2dsZUNyZWF0ZVByb2plY3RGb3JtKCkge1xuICAgIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLWlucHV0LW5hbWUnKTtcbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtcHJvamVjdC1mb3JtJyk7XG5cbiAgICBwcm9qZWN0TmFtZUlucHV0LmJsdXIoKTtcblxuICAgIGNyZWF0ZVByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuXG4gICAgaWYgKHByb2plY3ROYW1lSW5wdXQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICBwcm9qZWN0TmFtZUlucHV0LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb3NlQ3JlYXRlUHJvamVjdEZvcm0oKSB7XG4gICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0taW5wdXQtbmFtZScpO1xuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0LWZvcm0nKTtcblxuICAgIHByb2plY3ROYW1lSW5wdXQuYmx1cigpO1xuXG4gICAgY3JlYXRlUHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICBpZiAocHJvamVjdE5hbWVJbnB1dC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgIHByb2plY3ROYW1lSW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS1pbnB1dC1uYW1lJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZUlucHV0LnZhbHVlO1xuXG4gICAgaWYgKHByb2plY3ROYW1lID09PSAnJykge1xuICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIHByb2plY3QgbmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoU3RvcmFnZS5nZXRUb2RvTGlzdCgpLmdldFByb2plY3QocHJvamVjdE5hbWUpKSB7XG4gICAgICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICBhbGVydCgnUHJvamVjdCBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICAgIFVJLmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIFVJLmNsb3NlQ3JlYXRlUHJvamVjdEZvcm0oKTtcbiAgICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gJyc7XG4gIH1cblxuICBzdGF0aWMgaW5pdFByb2plY3RCdXR0b25zKCkge1xuICAgIGNvbnN0IGluYm94QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpO1xuICAgIGNvbnN0IGR1ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWUtYnRuJyk7XG4gICAgY29uc3QgY3VzdG9tUHJvamVjdHNCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1wcm9qZWN0cy1idXR0b24nKTtcblxuICAgIGluYm94QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkub3BlbkluYm94KTtcbiAgICBkdWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuRHVlKTtcbiAgICBjdXN0b21Qcm9qZWN0c0J0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5oYW5kbGVQcm9qZWN0Q2xpY2spO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGluaXRBZGRUb2RvQnV0dG9ucygpIHtcbiAgICBjb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10b2RvLWJ1dHRvbicpO1xuICAgIGNvbnN0IGNyZWF0ZVRvZG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdG9kby1pbnB1dCcpO1xuICAgIGNvbnN0IGNyZWF0ZVRvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRvZG8tYnV0dG9uJyk7XG4gICAgY29uc3QgY2FuY2VsVG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtdG9kby1idXR0b24nKTtcblxuICAgIGFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS50b2dnbGVDcmVhdGVUb2RvRm9ybSk7XG4gICAgY3JlYXRlVG9kb0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiBjcmVhdGVUb2RvSW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIFVJLmFkZFRvZG8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjcmVhdGVUb2RvSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBVSS50b2dnbGVDcmVhdGVUb2RvRm9ybSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNyZWF0ZVRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5hZGRUb2RvKTtcbiAgICBjYW5jZWxUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkudG9nZ2xlQ3JlYXRlVG9kb0Zvcm0pO1xuICB9XG5cbiAgc3RhdGljIHRvZ2dsZUNyZWF0ZVRvZG9Gb3JtKCkge1xuICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG8tYnV0dG9uJyk7XG4gICAgY29uc3QgY3JlYXRlVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdG9kby1jb250YWluZXInKTtcbiAgICBjb25zdCBjcmVhdGVUb2RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRvZG8taW5wdXQnKTtcblxuICAgIGNyZWF0ZVRvZG9JbnB1dC5ibHVyKCk7XG4gICAgYWRkVG9kb0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICBjcmVhdGVUb2RvQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuXG4gICAgaWYgKGNyZWF0ZVRvZG9Db250YWluZXIuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICBjcmVhdGVUb2RvSW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYWRkVG9kbygpIHtcbiAgICBjb25zdCBjcmVhdGVUb2RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRvZG8taW5wdXQnKTtcbiAgICBjb25zdCB0b2RvTmFtZSA9IGNyZWF0ZVRvZG9JbnB1dC52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKS50ZXh0Q29udGVudDtcblxuICAgIGlmIChTdG9yYWdlLmdldFRvZG9MaXN0KCkuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZ2V0VG9kbyh0b2RvTmFtZSkpIHtcbiAgICAgIGFsZXJ0KCdUb2RvIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyZWF0ZVRvZG9JbnB1dC52YWx1ZSA9ICcnO1xuICAgIFN0b3JhZ2UuYWRkVG9kbyhwcm9qZWN0TmFtZSwgbmV3IFRvZG8odG9kb05hbWUpKTtcbiAgICBVSS5jcmVhdGVUb2RvKHRvZG9OYW1lLCAnTm8gRHVlIERhdGUnKTtcbiAgICBVSS50b2dnbGVDcmVhdGVUb2RvRm9ybSgpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5JbmJveCgpIHtcbiAgICBVSS5vcGVuUHJvamVjdCgnSW5ib3gnLCB0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuRHVlKCkge1xuICAgIFVJLm9wZW5Qcm9qZWN0KCdEdWUnLCB0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuUHJvamVjdChwcm9qZWN0TmFtZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWZhdWx0LXByb2plY3RzLWJ1dHRvbicpO1xuICAgIGNvbnN0IGN1c3RvbVByb2plY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1wcm9qZWN0cy1idXR0b24nKTtcbiAgICBjb25zdCBidXR0b25zID0gWy4uLmRlZmF1bHRQcm9qZWN0QnRucywgLi4uY3VzdG9tUHJvamVjdEJ0bnNdO1xuXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBVSS5sb2FkUHJvamVjdENvbnRlbnQocHJvamVjdE5hbWUpO1xuICB9XG5cbiAgc3RhdGljIGhhbmRsZVByb2plY3RDbGljayhlKSB7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLnRleHRDb250ZW50O1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWl0ZW0nKSkge1xuICAgICAgVUkuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUkub3BlblByb2plY3QocHJvamVjdE5hbWUsIHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtbGlzdCcpO1xuICAgIHByb2plY3RzTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImN1c3RvbS1wcm9qZWN0cy1idXR0b25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3QtYnV0dG9uLWxlZnRcIj5cbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIwIDRINEMzLjQ0NzcxIDQgMyA0LjQ0NzcyIDMgNVYxOUMzIDE5LjU1MjMgMy40NDc3MiAyMCA0IDIwSDIwQzIwLjU1MjMgMjAgMjEgMTkuNTUyMyAyMSAxOVY1QzIxIDQuNDQ3NzEgMjAuNTUyMyA0IDIwIDRaTTQgMkMyLjM0MzE1IDIgMSAzLjM0MzE1IDEgNVYxOUMxIDIwLjY1NjkgMi4zNDMxNSAyMiA0IDIySDIwQzIxLjY1NjkgMjIgMjMgMjAuNjU2OSAyMyAxOVY1QzIzIDMuMzQzMTUgMjEuNjU2OSAyIDIwIDJINFpNNiA3SDhWOUg2VjdaTTExIDdDMTAuNDQ3NyA3IDEwIDcuNDQ3NzIgMTAgOEMxMCA4LjU1MjI4IDEwLjQ0NzcgOSAxMSA5SDE3QzE3LjU1MjMgOSAxOCA4LjU1MjI4IDE4IDhDMTggNy40NDc3MiAxNy41NTIzIDcgMTcgN0gxMVpNOCAxMUg2VjEzSDhWMTFaTTEwIDEyQzEwIDExLjQ0NzcgMTAuNDQ3NyAxMSAxMSAxMUgxN0MxNy41NTIzIDExIDE4IDExLjQ0NzcgMTggMTJDMTggMTIuNTUyMyAxNy41NTIzIDEzIDE3IDEzSDExQzEwLjQ0NzcgMTMgMTAgMTIuNTUyMyAxMCAxMlpNOCAxNUg2VjE3SDhWMTVaTTEwIDE2QzEwIDE1LjQ0NzcgMTAuNDQ3NyAxNSAxMSAxNUgxN0MxNy41NTIzIDE1IDE4IDE1LjQ0NzcgMTggMTZDMTggMTYuNTUyMyAxNy41NTIzIDE3IDE3IDE3SDExQzEwLjQ0NzcgMTcgMTAgMTYuNTUyMyAxMCAxNlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbi10ZXh0XCI+JHtwcm9qZWN0TmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1idXR0b24tcmlnaHQgZGVsZXRlLWl0ZW1cIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiZGVsZXRlLWl0ZW1cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cInRyYW5zcGFyZW50XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTYuMzM5NCA5LjMyMjQ1QzE2Ljc0MzQgOC45NDU4OSAxNi43NjU3IDguMzEzMTIgMTYuMzg5MSA3LjkwOTExQzE2LjAxMjYgNy41MDUwOSAxNS4zNzk4IDcuNDgyODMgMTQuOTc1OCA3Ljg1OTM4TDEyLjA0OTcgMTAuNTg2Nkw5LjMyMjQ1IDcuNjYwNDhDOC45NDU4OSA3LjI1NjQ3IDguMzEzMTIgNy4yMzQyMSA3LjkwOTExIDcuNjEwNzZDNy41MDUwOSA3Ljk4NzMxIDcuNDgyODMgOC42MjAwOCA3Ljg1OTM4IDkuMDI0MUwxMC41ODY2IDExLjk1MDJMNy42NjA0OCAxNC42Nzc1QzcuMjU2NDcgMTUuMDU0IDcuMjM0MjEgMTUuNjg2OCA3LjYxMDc2IDE2LjA5MDhDNy45ODczMSAxNi40OTQ4IDguNjIwMDggMTYuNTE3MSA5LjAyNDEgMTYuMTQwNUwxMS45NTAyIDEzLjQxMzNMMTQuNjc3NSAxNi4zMzk0QzE1LjA1NCAxNi43NDM0IDE1LjY4NjggMTYuNzY1NyAxNi4wOTA4IDE2LjM4OTFDMTYuNDk0OCAxNi4wMTI2IDE2LjUxNzEgMTUuMzc5OCAxNi4xNDA1IDE0Ljk3NThMMTMuNDEzMyAxMi4wNDk3TDE2LjMzOTQgOS4zMjI0NVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMSAxMkMxIDUuOTI0ODcgNS45MjQ4NyAxIDEyIDFDMTguMDc1MSAxIDIzIDUuOTI0ODcgMjMgMTJDMjMgMTguMDc1MSAxOC4wNzUxIDIzIDEyIDIzQzUuOTI0ODcgMjMgMSAxOC4wNzUxIDEgMTJaTTEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyQzIxIDE2Ljk3MDYgMTYuOTcwNiAyMSAxMiAyMVpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz48L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2J1dHRvbj5gO1xuXG4gICAgVUkuaW5pdFByb2plY3RCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGlmIChwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIFVJLmNsZWFyUHJvamVjdFZpZXcoKTtcbiAgICAgIFVJLm9wZW5Qcm9qZWN0KCdJbmJveCcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC1idG4nKSk7XG4gICAgfVxuICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgVUkuY2xlYXJQcm9qZWN0cygpO1xuICAgIFVJLmxvYWRQcm9qZWN0cygpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyUHJvamVjdFZpZXcoKSB7XG4gICAgY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC12aWV3Jyk7XG4gICAgcHJvamVjdFZpZXcudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBjbGVhclByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdHNMaXN0LmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRvZG8odGFza05hbWUsIGR1ZURhdGUsIGNvbXBsZXRlZCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpO1xuICAgIGxldCBtYXJrQ29tcGxldGVTdHJpbmc7XG4gICAgbGV0IGNsYXNzTGlzdEFkZFN0cmluZyA9ICcnO1xuXG4gICAgaWYgKGNvbXBsZXRlZCkge1xuICAgICAgY2xhc3NMaXN0QWRkU3RyaW5nID0gJyBjb21wbGV0ZWQnO1xuICAgICAgbWFya0NvbXBsZXRlU3RyaW5nID0gJzxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTEyIDE2QzE0LjIwOTEgMTYgMTYgMTQuMjA5MSAxNiAxMkMxNiA5Ljc5MDg2IDE0LjIwOTEgOCAxMiA4QzkuNzkwODYgOCA4IDkuNzkwODYgOCAxMkM4IDE0LjIwOTEgOS43OTA4NiAxNiAxMiAxNlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yMiAxMkMyMiAxNy41MjI4IDE3LjUyMjggMjIgMTIgMjJDNi40NzcxNSAyMiAyIDE3LjUyMjggMiAxMkMyIDYuNDc3MTUgNi40NzcxNSAyIDEyIDJDMTcuNTIyOCAyIDIyIDYuNDc3MTUgMjIgMTJaTTIwIDEyQzIwIDE2LjQxODMgMTYuNDE4MyAyMCAxMiAyMEM3LjU4MTcyIDIwIDQgMTYuNDE4MyA0IDEyQzQgNy41ODE3MiA3LjU4MTcyIDQgMTIgNEMxNi40MTgzIDQgMjAgNy41ODE3MiAyMCAxMlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPjwvc3ZnPic7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmtDb21wbGV0ZVN0cmluZyA9ICc8c3ZnIGNsYXNzPVwibWFyay10b2RvLWNvbXBsZXRlXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMjBDMTYuNDE4MyAyMCAyMCAxNi40MTgzIDIwIDEyQzIwIDcuNTgxNzIgMTYuNDE4MyA0IDEyIDRDNy41ODE3MiA0IDQgNy41ODE3MiA0IDEyQzQgMTYuNDE4MyA3LjU4MTcyIDIwIDEyIDIwWk0xMiAyMkMxNy41MjI4IDIyIDIyIDE3LjUyMjggMjIgMTJDMjIgNi40NzcxNSAxNy41MjI4IDIgMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIH1cblxuICAgIHRvZG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uLXRvZG8ke2NsYXNzTGlzdEFkZFN0cmluZ31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1sZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1jb21wbGV0ZS1pY29uXCI+XG4gICAgICAgICAgICAke21hcmtDb21wbGV0ZVN0cmluZ31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby10ZXh0XCI+JHt0YXNrTmFtZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tcmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHVlLXRleHRcIj4ke2R1ZURhdGV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvbiBkZWxldGUtaXRlbVwiPlxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImRlbGV0ZS1pdGVtXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE2LjMzOTQgOS4zMjI0NUMxNi43NDM0IDguOTQ1ODkgMTYuNzY1NyA4LjMxMzEyIDE2LjM4OTEgNy45MDkxMUMxNi4wMTI2IDcuNTA1MDkgMTUuMzc5OCA3LjQ4MjgzIDE0Ljk3NTggNy44NTkzOEwxMi4wNDk3IDEwLjU4NjZMOS4zMjI0NSA3LjY2MDQ4QzguOTQ1ODkgNy4yNTY0NyA4LjMxMzEyIDcuMjM0MjEgNy45MDkxMSA3LjYxMDc2QzcuNTA1MDkgNy45ODczMSA3LjQ4MjgzIDguNjIwMDggNy44NTkzOCA5LjAyNDFMMTAuNTg2NiAxMS45NTAyTDcuNjYwNDggMTQuNjc3NUM3LjI1NjQ3IDE1LjA1NCA3LjIzNDIxIDE1LjY4NjggNy42MTA3NiAxNi4wOTA4QzcuOTg3MzEgMTYuNDk0OCA4LjYyMDA4IDE2LjUxNzEgOS4wMjQxIDE2LjE0MDVMMTEuOTUwMiAxMy40MTMzTDE0LjY3NzUgMTYuMzM5NEMxNS4wNTQgMTYuNzQzNCAxNS42ODY4IDE2Ljc2NTcgMTYuMDkwOCAxNi4zODkxQzE2LjQ5NDggMTYuMDEyNiAxNi41MTcxIDE1LjM3OTggMTYuMTQwNSAxNC45NzU4TDEzLjQxMzMgMTIuMDQ5N0wxNi4zMzk0IDkuMzIyNDVaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEgMTJDMSA1LjkyNDg3IDUuOTI0ODcgMSAxMiAxQzE4LjA3NTEgMSAyMyA1LjkyNDg3IDIzIDEyQzIzIDE4LjA3NTEgMTguMDc1MSAyMyAxMiAyM0M1LjkyNDg3IDIzIDEgMTguMDc1MSAxIDEyWk0xMiAyMUM3LjAyOTQ0IDIxIDMgMTYuOTcwNiAzIDEyQzMgNy4wMjk0NCA3LjAyOTQ0IDMgMTIgM0MxNi45NzA2IDMgMjEgNy4wMjk0NCAyMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9idXR0b24+YDtcblxuICAgIFVJLmluaXRUb2RvQnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIGluaXRUb2RvQnV0dG9ucygpIHtcbiAgICBjb25zdCB0b2RvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24tdG9kbycpO1xuICAgIHRvZG9CdXR0b25zLmZvckVhY2goKHRvZG9CdXR0b24pID0+IHtcbiAgICAgIHRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5oYW5kbGVUb2RvQ2xpY2spO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGhhbmRsZVRvZG9DbGljayhlKSB7XG4gICAgY29uc3QgdG9kb05hbWUgPSB0aGlzLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnRleHRDb250ZW50O1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWl0ZW0nKSkge1xuICAgICAgVUkuZGVsZXRlVG9kbyhwcm9qZWN0TmFtZSwgdG9kb05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBVSS50b2dnbGVUb2RvQ29tcGxldGUodG9kb05hbWUsIHByb2plY3ROYW1lLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlVG9kb0NvbXBsZXRlKHRvZG9OYW1lLCBwcm9qZWN0TmFtZSwgdG9kb0J1dHRvbikge1xuICAgIFN0b3JhZ2UudG9nZ2xlVG9kb0NvbXBsZXRlZChwcm9qZWN0TmFtZSwgdG9kb05hbWUpO1xuICAgIGNvbnN0IHRvZG9JY29uID0gdG9kb0J1dHRvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcbiAgICBpZiAoU3RvcmFnZS5nZXRUb2RvKHByb2plY3ROYW1lLCB0b2RvTmFtZSkuZ2V0Q29tcGxldGVkKCkpIHtcbiAgICAgIHRvZG9CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICB0b2RvSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cInRyYW5zcGFyZW50XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTIgMTZDMTQuMjA5MSAxNiAxNiAxNC4yMDkxIDE2IDEyQzE2IDkuNzkwODYgMTQuMjA5MSA4IDEyIDhDOS43OTA4NiA4IDggOS43OTA4NiA4IDEyQzggMTQuMjA5MSA5Ljc5MDg2IDE2IDEyIDE2WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIyIDEyQzIyIDE3LjUyMjggMTcuNTIyOCAyMiAxMiAyMkM2LjQ3NzE1IDIyIDIgMTcuNTIyOCAyIDEyQzIgNi40NzcxNSA2LjQ3NzE1IDIgMTIgMkMxNy41MjI4IDIgMjIgNi40NzcxNSAyMiAxMlpNMjAgMTJDMjAgMTYuNDE4MyAxNi40MTgzIDIwIDEyIDIwQzcuNTgxNzIgMjAgNCAxNi40MTgzIDQgMTJDNCA3LjU4MTcyIDcuNTgxNzIgNCAxMiA0QzE2LjQxODMgNCAyMCA3LjU4MTcyIDIwIDEyWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+PC9zdmc+JztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgIHRvZG9JY29uLmlubmVySFRNTCA9ICc8c3ZnIGNsYXNzPVwibWFyay10b2RvLWNvbXBsZXRlXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMjBDMTYuNDE4MyAyMCAyMCAxNi40MTgzIDIwIDEyQzIwIDcuNTgxNzIgMTYuNDE4MyA0IDEyIDRDNy41ODE3MiA0IDQgNy41ODE3MiA0IDEyQzQgMTYuNDE4MyA3LjU4MTcyIDIwIDEyIDIwWk0xMiAyMkMxNy41MjI4IDIyIDIyIDE3LjUyMjggMjIgMTJDMjIgNi40NzcxNSAxNy41MjI4IDIgMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVUb2RvKHByb2plY3ROYW1lLCB0b2RvTmFtZSkge1xuICAgIFN0b3JhZ2UuZGVsZXRlVG9kbyhwcm9qZWN0TmFtZSwgdG9kb05hbWUpO1xuICAgIFVJLmNsZWFyVG9kb3MoKTtcbiAgICBVSS5sb2FkVG9kb3MocHJvamVjdE5hbWUpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyVG9kb3MoKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcihwcm9qZWN0TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IHByb2plY3ROYW1lO1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgfVxuXG4gIHNldE5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzZXRUb2RvcyhuZXdUb2Rvcykge1xuICAgIHRoaXMudG9kb3MgPSBuZXdUb2RvcztcbiAgfVxuXG4gIGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9XG5cbiAgYWRkVG9kbyhuZXdUb2RvKSB7XG4gICAgaWYgKHRoaXMudG9kb3MuZmluZCgoaXRlbSkgPT4gaXRlbS5nZXROYW1lKCkgPT09IG5ld1RvZG8ubmFtZSkpIHJldHVybjtcbiAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XG4gIH1cblxuICBkZWxldGVUb2RvKHRvZG8pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuZmluZEluZGV4KChvYmplY3QpID0+IG9iamVjdC5uYW1lID09PSB0b2RvKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGdldFRvZG8odG9kb05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLmdldE5hbWUoKSA9PT0gdG9kb05hbWUpO1xuICB9XG59XG4iLCJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi90b2RvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlVG9kb0xpc3QoZGF0YSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUb2RvTGlzdCgpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgVG9kb0xpc3QoKSxcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0JykpLFxuICAgICk7XG5cbiAgICB0b2RvTGlzdC5zZXRQcm9qZWN0cyhcbiAgICAgIHRvZG9MaXN0XG4gICAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpLFxuICAgICk7XG5cbiAgICB0b2RvTGlzdFxuICAgICAgLmdldFByb2plY3RzKClcbiAgICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBwcm9qZWN0LnNldFRvZG9zKFxuICAgICAgICBwcm9qZWN0LmdldFRvZG9zKCkubWFwKCh0b2RvKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUb2RvKCksIHRvZG8pKSxcbiAgICAgICkpO1xuXG4gICAgcmV0dXJuIHRvZG9MaXN0O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xuICAgIHRvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcbiAgICB0b2RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICBTdG9yYWdlLnNhdmVUb2RvTGlzdCh0b2RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VG9kbyhwcm9qZWN0TmFtZSwgVG9kb05hbWUpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gdG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgcmV0dXJuIHByb2plY3QuZ2V0VG9kbyhUb2RvTmFtZSk7XG4gIH1cblxuICBzdGF0aWMgYWRkVG9kbyhwcm9qZWN0TmFtZSwgdG9kbykge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xuICAgIHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmFkZFRvZG8odG9kbyk7XG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVRvZG8ocHJvamVjdE5hbWUsIFRvZG9OYW1lKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KCk7XG4gICAgdG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZGVsZXRlVG9kbyhUb2RvTmFtZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHJlbmFtZVRvZG8ocHJvamVjdE5hbWUsIFRvZG9OYW1lLCBuZXdUb2RvTmFtZSkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xuICAgIHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRvZG8oVG9kb05hbWUpLnNldE5hbWUobmV3VG9kb05hbWUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRUb2RvRGF0ZShwcm9qZWN0TmFtZSwgVG9kb05hbWUsIG5ld0R1ZURhdGUpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcbiAgICB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb2RvKFRvZG9OYW1lKS5zZXREdWVEYXRlKG5ld0R1ZURhdGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB0b2dnbGVUb2RvQ29tcGxldGVkKHByb2plY3ROYW1lLCBUb2RvTmFtZSkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xuICAgIHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmdldFRvZG8oVG9kb05hbWUpLnRvZ2dsZUNvbXBsZXRlZCgpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSAnTm8gRHVlIERhdGUnKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICBzZXREdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgdG9nZ2xlQ29tcGxldGVkKCkge1xuICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xuICB9XG5cbiAgZ2V0Q29tcGxldGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlZDtcbiAgfVxuXG4gIHNldE5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnSW5ib3gnKSk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdEdWUnKSk7XG4gIH1cblxuICBzZXRQcm9qZWN0cyhwcm9qZWN0c0xpc3QpIHtcbiAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHNMaXN0O1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgfVxuXG4gIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICh0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gbmV3UHJvamVjdC5uYW1lKSkgeyByZXR1cm47IH1cbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gIH1cblxuICBkZWxldGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvamVjdHMuZmluZEluZGV4KChvYmplY3QpID0+IG9iamVjdC5uYW1lID09PSBwcm9qZWN0KTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9VSSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5sb2FkSW5pdGlhbCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=