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
  }

  static loadProjects() {
    const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList()
    const projectList = todoList.getProjects()
    projectList.forEach((project) => {
        if (
          project.name !== 'Inbox' &&
          project.name !== 'Due'
        ) {
          UI.createProject(project.name)
        }
      }) 
    UI.initAddProjectBtns()
  }

  static loadTodos(projectName) {
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList()
      .getProject(projectName)
      .getTodos()
      .forEach((todo) => UI.createTodo(todo.name, todo.dueDate, todo.completed))

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
        </div>`
    }

    UI.loadTodos(projectName);
  }

  static initAddProjectBtns() {
    const addProjectBtn = document.getElementById('add-project-button');
    const createProjectBtn = document.getElementById('create-project-button');
    const cancelProjectBtn = document.getElementById('cancel-project-button');
    const projectNameInput = document.getElementById('project-form-input-name');

    addProjectBtn.addEventListener('click', UI.toggleCreateProjectForm)
    cancelProjectBtn.addEventListener('click', UI.closeCreateProjectForm)
    createProjectBtn.addEventListener('click', UI.addProject)
    projectNameInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && projectNameInput.value !== '') {
        UI.addProject();
      }
    })
    projectNameInput.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        UI.toggleCreateProjectForm();
      }
    })

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
    UI.closeCreateProjectForm()
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
    })
    createTodoInput.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        UI.toggleCreateTodoForm();
      }
    })
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

    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(projectName, new _todo__WEBPACK_IMPORTED_MODULE_2__["default"](todoName));
    UI.createTodo(todoName, 'No Due Date');
    UI.toggleCreateTodoForm();
  }

  static openInbox() {
    UI.openProject('Inbox', this);
  }

  static openDue(){
    UI.openProject('Due', this);
  }

  static openProject(projectName, projectButton) {
    const defaultProjectBtns = document.querySelectorAll('.default-projects-button')
    const customProjectBtns = document.querySelectorAll('.custom-projects-button')
    const buttons = [...defaultProjectBtns, ...customProjectBtns]

    buttons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')
    UI.loadProjectContent(projectName)
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
      UI.openProject('Inbox', document.getElementById('inbox-btn'))
    }
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(projectName);
    UI.clearProjects()
    UI.loadProjects();
  }

  static clearProjectView() {
    const projectView = document.getElementById('project-view')
    projectView.textContent = ''
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
  }

  static createTodo(taskName, dueDate, completed) {
    const todoList = document.getElementById('todo-list');
    let markCompleteString;
    let classListAddString = ""

    if (completed) {
      classListAddString = ' completed'
      markCompleteString = `<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>`;
    }
    else {
      markCompleteString = `<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>`;
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
      </button>`
    
      UI.initTodoButtons();
  }

  static initTodoButtons() {
    const todoButtons = document.querySelectorAll('.button-todo');
    todoButtons.forEach(todoButton => {
      todoButton.addEventListener('click', UI.handleTodoClick);
   })
  }

  static handleTodoClick(e) {
    const todoName = this.children[0].children[1].textContent;
    const projectName = document.getElementById('project-name').textContent;

    if (e.target.classList.contains('delete-item')) {
      UI.deleteTodo(projectName, todoName);
      return
    }
    else {
      UI.toggleTodoComplete(todoName, projectName, this);
    }
  }

  static toggleTodoComplete(todoName, projectName, todoButton) {    
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].toggleTodoCompleted(projectName, todoName);
    const todoIcon = todoButton.children[0].children[0];
    console.log(_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(projectName, todoName))
    if (_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(projectName, todoName).getCompleted()) {
      todoButton.classList.add('complete');
      todoIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>`;
      console.log(_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(projectName, todoName))
    }
    else {
      console.log(_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo(projectName, todoName))
      todoButton.classList.remove('complete');
      todoIcon.innerHTML = `<svg class="mark-todo-complete" width="20" height="20" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>`;
    }
  }

  static deleteTodo(projectName, todoName) {
    _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTodo(projectName, todoName);
    UI.clearTodos();
    UI.loadTodos(projectName)
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
    if (this.todos.find((item) => item.getName() === newTodo.name)) return
    this.todos.push(newTodo);
  }
  deleteTodo(todo) {
    const index = this.todos.findIndex(object => {
      return object.name === todo
    });
    if (index > -1) {
      this.todos.splice(index, 1)
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
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoList */ "./src/todoList.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ "./src/todo.js");




class Storage {

  static saveTodoList(data) {
    localStorage.setItem('todolist', JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new _todoList__WEBPACK_IMPORTED_MODULE_0__["default"](),
      JSON.parse(localStorage.getItem('todolist'))
    )

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new _project__WEBPACK_IMPORTED_MODULE_1__["default"](), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTodos(
          project.getTodos().map((todo) => Object.assign(new _todo__WEBPACK_IMPORTED_MODULE_2__["default"](), todo))
        )
    );
    
    return todoList

  };

  static addProject(project) {
    const todoList = Storage.getTodoList()
    todoList.addProject(project)
    Storage.saveTodoList(todoList)
  }

  static deleteProject(projectName) {
    const todoList = Storage.getTodoList()
    todoList.deleteProject(projectName)
    Storage.saveTodoList(todoList)
  }

  static getTodo(projectName, TodoName) {
    const todoList = Storage.getTodoList()
    const project = todoList.getProject(projectName)
    return project.getTodo(TodoName)
  }

  static addTodo(projectName, todo) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).addTodo(todo)
    Storage.saveTodoList(todoList)
  }

  static deleteTodo(projectName, TodoName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).deleteTodo(TodoName)
    Storage.saveTodoList(todoList)
  }

  static renameTodo(projectName, TodoName, newTodoName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTodo(TodoName).setName(newTodoName)
    Storage.saveTodoList(todoList)
  }

  static setTodoDate(projectName, TodoName, newDueDate) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTodo(TodoName).setDueDate(newDueDate)
    Storage.saveTodoList(todoList)
  }

  static toggleTodoCompleted(projectName, TodoName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTodo(TodoName).toggleCompleted()
    Storage.saveTodoList(todoList)
  }

};

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
  constructor(name, dueDate = "No Due Date"){
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

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
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
    this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Inbox"));
    this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Due"));
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
    if (this.projects.find((project) => project.name === newProject.name))
      return
    this.projects.push(newProject)
  }
  
  deleteProject(project) {
    const index = this.projects.findIndex(object => {
      return object.name === project
    });
    if (index > -1) {
      this.projects.splice(index, 1)
    }
  }
  
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU87QUFDbEMsMkJBQTJCLGdEQUFPO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNwQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zQjs7QUFFdEIsOENBQThDLHVEQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCBUb2RvIGZyb20gJy4vdG9kbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcblxuICBzdGF0aWMgbG9hZEluaXRpYWwgPSAoKSA9PiB7XG4gICAgVUkubG9hZFByb2plY3RzKCk7XG4gICAgVUkuaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgVUkub3BlblByb2plY3QoJ0luYm94JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KClcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRvZG9MaXN0LmdldFByb2plY3RzKClcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9qZWN0Lm5hbWUgIT09ICdJbmJveCcgJiZcbiAgICAgICAgICBwcm9qZWN0Lm5hbWUgIT09ICdEdWUnXG4gICAgICAgICkge1xuICAgICAgICAgIFVJLmNyZWF0ZVByb2plY3QocHJvamVjdC5uYW1lKVxuICAgICAgICB9XG4gICAgICB9KSBcbiAgICBVSS5pbml0QWRkUHJvamVjdEJ0bnMoKVxuICB9XG5cbiAgc3RhdGljIGxvYWRUb2Rvcyhwcm9qZWN0TmFtZSkge1xuICAgIFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKVxuICAgICAgLmdldFByb2plY3QocHJvamVjdE5hbWUpXG4gICAgICAuZ2V0VG9kb3MoKVxuICAgICAgLmZvckVhY2goKHRvZG8pID0+IFVJLmNyZWF0ZVRvZG8odG9kby5uYW1lLCB0b2RvLmR1ZURhdGUsIHRvZG8uY29tcGxldGVkKSlcblxuICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gJ0R1ZScpIHtcbiAgICAgIFVJLmluaXRBZGRUb2RvQnV0dG9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBsb2FkUHJvamVjdENvbnRlbnQocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXZpZXcnKTtcblxuICAgIHByb2plY3RWaWV3LmlubmVySFRNTCA9IGBcbiAgICAgIDxoMSBjbGFzcz1cInByb2plY3QtbmFtZVwiIGlkPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0TmFtZX08L2gxPlxuICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbGlzdFwiIGlkPXRvZG8tbGlzdD48L2Rpdj5gO1xuXG4gICAgaWYgKHByb2plY3ROYW1lICE9PSAnRHVlJykge1xuICAgICAgcHJvamVjdFZpZXcuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZC10b2RvLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXRvZG8tYnV0dG9uXCIgaWQ9XCJhZGQtdG9kby1idXR0b25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tbGVmdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1pY29uXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cInRyYW5zcGFyZW50XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDEyQzIgNi40NzcxNSA2LjQ3NzE1IDIgMTIgMkMxNy41MjI4IDIgMjIgNi40NzcxNSAyMiAxMkMyMiAxNy41MjI4IDE3LjUyMjggMjIgMTIgMjJDNi40NzcxNSAyMiAyIDE3LjUyMjggMiAxMlpNMTIgNEM3LjU4MTcyIDQgNCA3LjU4MTcyIDQgMTJDNCAxNi40MTgzIDcuNTgxNzIgMjAgMTIgMjBDMTYuNDE4MyAyMCAyMCAxNi40MTgzIDIwIDEyQzIwIDcuNTgxNzIgMTYuNDE4MyA0IDEyIDRaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEzIDdDMTMgNi40NDc3MiAxMi41NTIzIDYgMTIgNkMxMS40NDc3IDYgMTEgNi40NDc3MiAxMSA3VjExSDdDNi40NDc3MiAxMSA2IDExLjQ0NzcgNiAxMkM2IDEyLjU1MjMgNi40NDc3MiAxMyA3IDEzSDExVjE3QzExIDE3LjU1MjMgMTEuNDQ3NyAxOCAxMiAxOEMxMi41NTIzIDE4IDEzIDE3LjU1MjMgMTMgMTdWMTNIMTdDMTcuNTUyMyAxMyAxOCAxMi41NTIzIDE4IDEyQzE4IDExLjQ0NzcgMTcuNTUyMyAxMSAxNyAxMUgxM1Y3WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tdGV4dFwiPkFkZCBOZXcgVGFzazwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLXJpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXRlLXRvZG8tZm9ybSBoaWRkZW5cIiBpZD1cImNyZWF0ZS10b2RvLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTmV3IFRvZG9cIiBpZD1cImNyZWF0ZS10b2RvLWlucHV0XCIgcmVxdWlyZWQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tYnV0dG9uLWdyb3VwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY3JlYXRlLXRvZG8tYnV0dG9uXCIgaWQ9XCJjcmVhdGUtdG9kby1idXR0b25cIj5DcmVhdGU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWwtdG9kby1idXR0b25cIiBpZD1cImNhbmNlbC10b2RvLWJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gXG4gICAgfVxuXG4gICAgVUkubG9hZFRvZG9zKHByb2plY3ROYW1lKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0QWRkUHJvamVjdEJ0bnMoKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0taW5wdXQtbmFtZScpO1xuXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLnRvZ2dsZUNyZWF0ZVByb2plY3RGb3JtKVxuICAgIGNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5jbG9zZUNyZWF0ZVByb2plY3RGb3JtKVxuICAgIGNyZWF0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5hZGRQcm9qZWN0KVxuICAgIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIHByb2plY3ROYW1lSW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIFVJLmFkZFByb2plY3QoKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIHByb2plY3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBVSS50b2dnbGVDcmVhdGVQcm9qZWN0Rm9ybSgpO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfVxuXG4gIHN0YXRpYyB0b2dnbGVDcmVhdGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS1pbnB1dC1uYW1lJyk7XG4gICAgY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QtZm9ybScpO1xuICAgIFxuICAgIHByb2plY3ROYW1lSW5wdXQuYmx1cigpO1xuICAgIFxuICAgIGNyZWF0ZVByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuXG4gICAgaWYgKHByb2plY3ROYW1lSW5wdXQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICBwcm9qZWN0TmFtZUlucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gIH1cblxuICBzdGF0aWMgY2xvc2VDcmVhdGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS1pbnB1dC1uYW1lJyk7XG4gICAgY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QtZm9ybScpO1xuICAgIFxuICAgIHByb2plY3ROYW1lSW5wdXQuYmx1cigpO1xuICAgIFxuICAgIGNyZWF0ZVByb2plY3RGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIFxuICAgIGlmIChwcm9qZWN0TmFtZUlucHV0LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykge1xuICAgICAgcHJvamVjdE5hbWVJbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLWlucHV0LW5hbWUnKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG4gICAgXG4gICAgaWYgKHByb2plY3ROYW1lID09PSAnJykge1xuICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIHByb2plY3QgbmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoU3RvcmFnZS5nZXRUb2RvTGlzdCgpLmdldFByb2plY3QocHJvamVjdE5hbWUpKSB7XG4gICAgICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICBhbGVydCgnUHJvamVjdCBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICAgIFVJLmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIFVJLmNsb3NlQ3JlYXRlUHJvamVjdEZvcm0oKVxuICAgIHByb2plY3ROYW1lSW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBpbml0UHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgaW5ib3hCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtYnRuJyk7XG4gICAgY29uc3QgZHVlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZS1idG4nKTtcbiAgICBjb25zdCBjdXN0b21Qcm9qZWN0c0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLXByb2plY3RzLWJ1dHRvbicpO1xuXG4gICAgaW5ib3hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuSW5ib3gpO1xuICAgIGR1ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLm9wZW5EdWUpO1xuICAgIGN1c3RvbVByb2plY3RzQnRucy5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLmhhbmRsZVByb2plY3RDbGljayk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgaW5pdEFkZFRvZG9CdXR0b25zKCkge1xuICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG8tYnV0dG9uJyk7XG4gICAgY29uc3QgY3JlYXRlVG9kb0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10b2RvLWlucHV0Jyk7XG4gICAgY29uc3QgY3JlYXRlVG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdG9kby1idXR0b24nKTtcbiAgICBjb25zdCBjYW5jZWxUb2RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC10b2RvLWJ1dHRvbicpO1xuXG4gICAgYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLnRvZ2dsZUNyZWF0ZVRvZG9Gb3JtKTtcbiAgICBjcmVhdGVUb2RvSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIGNyZWF0ZVRvZG9JbnB1dC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgVUkuYWRkVG9kbygpO1xuICAgICAgfVxuICAgIH0pXG4gICAgY3JlYXRlVG9kb0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgVUkudG9nZ2xlQ3JlYXRlVG9kb0Zvcm0oKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIGNyZWF0ZVRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5hZGRUb2RvKTtcbiAgICBjYW5jZWxUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkudG9nZ2xlQ3JlYXRlVG9kb0Zvcm0pO1xuXG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQ3JlYXRlVG9kb0Zvcm0oKSB7XG4gICAgY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kby1idXR0b24nKTtcbiAgICBjb25zdCBjcmVhdGVUb2RvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10b2RvLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNyZWF0ZVRvZG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdG9kby1pbnB1dCcpO1xuXG4gICAgY3JlYXRlVG9kb0lucHV0LmJsdXIoKTtcbiAgICBhZGRUb2RvQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIGNyZWF0ZVRvZG9Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG5cbiAgICBpZiAoY3JlYXRlVG9kb0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgIGNyZWF0ZVRvZG9JbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhZGRUb2RvKCkge1xuICAgIGNvbnN0IGNyZWF0ZVRvZG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdG9kby1pbnB1dCcpO1xuICAgIGNvbnN0IHRvZG9OYW1lID0gY3JlYXRlVG9kb0lucHV0LnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnRleHRDb250ZW50O1xuXG4gICAgaWYgKFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKS5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb2RvKHRvZG9OYW1lKSkge1xuICAgICAgYWxlcnQoJ1RvZG8gYWxyZWFkeSBleGlzdHMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBTdG9yYWdlLmFkZFRvZG8ocHJvamVjdE5hbWUsIG5ldyBUb2RvKHRvZG9OYW1lKSk7XG4gICAgVUkuY3JlYXRlVG9kbyh0b2RvTmFtZSwgJ05vIER1ZSBEYXRlJyk7XG4gICAgVUkudG9nZ2xlQ3JlYXRlVG9kb0Zvcm0oKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuSW5ib3goKSB7XG4gICAgVUkub3BlblByb2plY3QoJ0luYm94JywgdGhpcyk7XG4gIH1cblxuICBzdGF0aWMgb3BlbkR1ZSgpe1xuICAgIFVJLm9wZW5Qcm9qZWN0KCdEdWUnLCB0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuUHJvamVjdChwcm9qZWN0TmFtZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWZhdWx0LXByb2plY3RzLWJ1dHRvbicpXG4gICAgY29uc3QgY3VzdG9tUHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLXByb2plY3RzLWJ1dHRvbicpXG4gICAgY29uc3QgYnV0dG9ucyA9IFsuLi5kZWZhdWx0UHJvamVjdEJ0bnMsIC4uLmN1c3RvbVByb2plY3RCdG5zXVxuXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgVUkubG9hZFByb2plY3RDb250ZW50KHByb2plY3ROYW1lKVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZVByb2plY3RDbGljayhlKSB7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLnRleHRDb250ZW50O1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWl0ZW0nKSkge1xuICAgICAgVUkuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUkub3BlblByb2plY3QocHJvamVjdE5hbWUsIHRoaXMpO1xuXG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdHNMaXN0LmlubmVySFRNTCArPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY3VzdG9tLXByb2plY3RzLWJ1dHRvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1idXR0b24tbGVmdFwiPlxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjAgNEg0QzMuNDQ3NzEgNCAzIDQuNDQ3NzIgMyA1VjE5QzMgMTkuNTUyMyAzLjQ0NzcyIDIwIDQgMjBIMjBDMjAuNTUyMyAyMCAyMSAxOS41NTIzIDIxIDE5VjVDMjEgNC40NDc3MSAyMC41NTIzIDQgMjAgNFpNNCAyQzIuMzQzMTUgMiAxIDMuMzQzMTUgMSA1VjE5QzEgMjAuNjU2OSAyLjM0MzE1IDIyIDQgMjJIMjBDMjEuNjU2OSAyMiAyMyAyMC42NTY5IDIzIDE5VjVDMjMgMy4zNDMxNSAyMS42NTY5IDIgMjAgMkg0Wk02IDdIOFY5SDZWN1pNMTEgN0MxMC40NDc3IDcgMTAgNy40NDc3MiAxMCA4QzEwIDguNTUyMjggMTAuNDQ3NyA5IDExIDlIMTdDMTcuNTUyMyA5IDE4IDguNTUyMjggMTggOEMxOCA3LjQ0NzcyIDE3LjU1MjMgNyAxNyA3SDExWk04IDExSDZWMTNIOFYxMVpNMTAgMTJDMTAgMTEuNDQ3NyAxMC40NDc3IDExIDExIDExSDE3QzE3LjU1MjMgMTEgMTggMTEuNDQ3NyAxOCAxMkMxOCAxMi41NTIzIDE3LjU1MjMgMTMgMTcgMTNIMTFDMTAuNDQ3NyAxMyAxMCAxMi41NTIzIDEwIDEyWk04IDE1SDZWMTdIOFYxNVpNMTAgMTZDMTAgMTUuNDQ3NyAxMC40NDc3IDE1IDExIDE1SDE3QzE3LjU1MjMgMTUgMTggMTUuNDQ3NyAxOCAxNkMxOCAxNi41NTIzIDE3LjU1MjMgMTcgMTcgMTdIMTFDMTAuNDQ3NyAxNyAxMCAxNi41NTIzIDEwIDE2WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uLXRleHRcIj4ke3Byb2plY3ROYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LWJ1dHRvbi1yaWdodCBkZWxldGUtaXRlbVwiPlxuICAgICAgICAgIDxzdmcgY2xhc3M9XCJkZWxldGUtaXRlbVwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xNi4zMzk0IDkuMzIyNDVDMTYuNzQzNCA4Ljk0NTg5IDE2Ljc2NTcgOC4zMTMxMiAxNi4zODkxIDcuOTA5MTFDMTYuMDEyNiA3LjUwNTA5IDE1LjM3OTggNy40ODI4MyAxNC45NzU4IDcuODU5MzhMMTIuMDQ5NyAxMC41ODY2TDkuMzIyNDUgNy42NjA0OEM4Ljk0NTg5IDcuMjU2NDcgOC4zMTMxMiA3LjIzNDIxIDcuOTA5MTEgNy42MTA3NkM3LjUwNTA5IDcuOTg3MzEgNy40ODI4MyA4LjYyMDA4IDcuODU5MzggOS4wMjQxTDEwLjU4NjYgMTEuOTUwMkw3LjY2MDQ4IDE0LjY3NzVDNy4yNTY0NyAxNS4wNTQgNy4yMzQyMSAxNS42ODY4IDcuNjEwNzYgMTYuMDkwOEM3Ljk4NzMxIDE2LjQ5NDggOC42MjAwOCAxNi41MTcxIDkuMDI0MSAxNi4xNDA1TDExLjk1MDIgMTMuNDEzM0wxNC42Nzc1IDE2LjMzOTRDMTUuMDU0IDE2Ljc0MzQgMTUuNjg2OCAxNi43NjU3IDE2LjA5MDggMTYuMzg5MUMxNi40OTQ4IDE2LjAxMjYgMTYuNTE3MSAxNS4zNzk4IDE2LjE0MDUgMTQuOTc1OEwxMy40MTMzIDEyLjA0OTdMMTYuMzM5NCA5LjMyMjQ1WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xIDEyQzEgNS45MjQ4NyA1LjkyNDg3IDEgMTIgMUMxOC4wNzUxIDEgMjMgNS45MjQ4NyAyMyAxMkMyMyAxOC4wNzUxIDE4LjA3NTEgMjMgMTIgMjNDNS45MjQ4NyAyMyAxIDE4LjA3NTEgMSAxMlpNMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYnV0dG9uPmA7XG5cbiAgICBVSS5pbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lLCBwcm9qZWN0QnV0dG9uKSB7XG4gICAgaWYgKHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgVUkuY2xlYXJQcm9qZWN0VmlldygpO1xuICAgICAgVUkub3BlblByb2plY3QoJ0luYm94JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpKVxuICAgIH1cbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgIFVJLmNsZWFyUHJvamVjdHMoKVxuICAgIFVJLmxvYWRQcm9qZWN0cygpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyUHJvamVjdFZpZXcoKSB7XG4gICAgY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC12aWV3JylcbiAgICBwcm9qZWN0Vmlldy50ZXh0Q29udGVudCA9ICcnXG4gIH1cblxuICBzdGF0aWMgY2xlYXJQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtbGlzdCcpO1xuICAgIHByb2plY3RzTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUb2RvKHRhc2tOYW1lLCBkdWVEYXRlLCBjb21wbGV0ZWQpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcbiAgICBsZXQgbWFya0NvbXBsZXRlU3RyaW5nO1xuICAgIGxldCBjbGFzc0xpc3RBZGRTdHJpbmcgPSBcIlwiXG5cbiAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICBjbGFzc0xpc3RBZGRTdHJpbmcgPSAnIGNvbXBsZXRlZCdcbiAgICAgIG1hcmtDb21wbGV0ZVN0cmluZyA9IGA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xMiAxNkMxNC4yMDkxIDE2IDE2IDE0LjIwOTEgMTYgMTJDMTYgOS43OTA4NiAxNC4yMDkxIDggMTIgOEM5Ljc5MDg2IDggOCA5Ljc5MDg2IDggMTJDOCAxNC4yMDkxIDkuNzkwODYgMTYgMTIgMTZaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjIgMTJDMjIgMTcuNTIyOCAxNy41MjI4IDIyIDEyIDIyQzYuNDc3MTUgMjIgMiAxNy41MjI4IDIgMTJDMiA2LjQ3NzE1IDYuNDc3MTUgMiAxMiAyQzE3LjUyMjggMiAyMiA2LjQ3NzE1IDIyIDEyWk0yMCAxMkMyMCAxNi40MTgzIDE2LjQxODMgMjAgMTIgMjBDNy41ODE3MiAyMCA0IDE2LjQxODMgNCAxMkM0IDcuNTgxNzIgNy41ODE3MiA0IDEyIDRDMTYuNDE4MyA0IDIwIDcuNTgxNzIgMjAgMTJaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD48L3N2Zz5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1hcmtDb21wbGV0ZVN0cmluZyA9IGA8c3ZnIGNsYXNzPVwibWFyay10b2RvLWNvbXBsZXRlXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMjBDMTYuNDE4MyAyMCAyMCAxNi40MTgzIDIwIDEyQzIwIDcuNTgxNzIgMTYuNDE4MyA0IDEyIDRDNy41ODE3MiA0IDQgNy41ODE3MiA0IDEyQzQgMTYuNDE4MyA3LjU4MTcyIDIwIDEyIDIwWk0xMiAyMkMxNy41MjI4IDIyIDIyIDE3LjUyMjggMjIgMTJDMjIgNi40NzcxNSAxNy41MjI4IDIgMTIgMkM2LjQ3NzE1IDIgMiA2LjQ3NzE1IDIgMTJDMiAxNy41MjI4IDYuNDc3MTUgMjIgMTIgMjJaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPjwvcGF0aD48L3N2Zz5gO1xuICAgIH1cbiAgICBcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi10b2RvJHtjbGFzc0xpc3RBZGRTdHJpbmd9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tbGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtY29tcGxldGUtaWNvblwiPlxuICAgICAgICAgICAgJHttYXJrQ29tcGxldGVTdHJpbmd9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tdGV4dFwiPiR7dGFza05hbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLXJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImR1ZS10ZXh0XCI+JHtkdWVEYXRlfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb24gZGVsZXRlLWl0ZW1cIj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJkZWxldGUtaXRlbVwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xNi4zMzk0IDkuMzIyNDVDMTYuNzQzNCA4Ljk0NTg5IDE2Ljc2NTcgOC4zMTMxMiAxNi4zODkxIDcuOTA5MTFDMTYuMDEyNiA3LjUwNTA5IDE1LjM3OTggNy40ODI4MyAxNC45NzU4IDcuODU5MzhMMTIuMDQ5NyAxMC41ODY2TDkuMzIyNDUgNy42NjA0OEM4Ljk0NTg5IDcuMjU2NDcgOC4zMTMxMiA3LjIzNDIxIDcuOTA5MTEgNy42MTA3NkM3LjUwNTA5IDcuOTg3MzEgNy40ODI4MyA4LjYyMDA4IDcuODU5MzggOS4wMjQxTDEwLjU4NjYgMTEuOTUwMkw3LjY2MDQ4IDE0LjY3NzVDNy4yNTY0NyAxNS4wNTQgNy4yMzQyMSAxNS42ODY4IDcuNjEwNzYgMTYuMDkwOEM3Ljk4NzMxIDE2LjQ5NDggOC42MjAwOCAxNi41MTcxIDkuMDI0MSAxNi4xNDA1TDExLjk1MDIgMTMuNDEzM0wxNC42Nzc1IDE2LjMzOTRDMTUuMDU0IDE2Ljc0MzQgMTUuNjg2OCAxNi43NjU3IDE2LjA5MDggMTYuMzg5MUMxNi40OTQ4IDE2LjAxMjYgMTYuNTE3MSAxNS4zNzk4IDE2LjE0MDUgMTQuOTc1OEwxMy40MTMzIDEyLjA0OTdMMTYuMzM5NCA5LjMyMjQ1WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xIDEyQzEgNS45MjQ4NyA1LjkyNDg3IDEgMTIgMUMxOC4wNzUxIDEgMjMgNS45MjQ4NyAyMyAxMkMyMyAxOC4wNzUxIDE4LjA3NTEgMjMgMTIgMjNDNS45MjQ4NyAyMyAxIDE4LjA3NTEgMSAxMlpNMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYnV0dG9uPmBcbiAgICBcbiAgICAgIFVJLmluaXRUb2RvQnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIGluaXRUb2RvQnV0dG9ucygpIHtcbiAgICBjb25zdCB0b2RvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24tdG9kbycpO1xuICAgIHRvZG9CdXR0b25zLmZvckVhY2godG9kb0J1dHRvbiA9PiB7XG4gICAgICB0b2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUkuaGFuZGxlVG9kb0NsaWNrKTtcbiAgIH0pXG4gIH1cblxuICBzdGF0aWMgaGFuZGxlVG9kb0NsaWNrKGUpIHtcbiAgICBjb25zdCB0b2RvTmFtZSA9IHRoaXMuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0udGV4dENvbnRlbnQ7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJykudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtaXRlbScpKSB7XG4gICAgICBVSS5kZWxldGVUb2RvKHByb2plY3ROYW1lLCB0b2RvTmFtZSk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBVSS50b2dnbGVUb2RvQ29tcGxldGUodG9kb05hbWUsIHByb2plY3ROYW1lLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlVG9kb0NvbXBsZXRlKHRvZG9OYW1lLCBwcm9qZWN0TmFtZSwgdG9kb0J1dHRvbikgeyAgICBcbiAgICBTdG9yYWdlLnRvZ2dsZVRvZG9Db21wbGV0ZWQocHJvamVjdE5hbWUsIHRvZG9OYW1lKTtcbiAgICBjb25zdCB0b2RvSWNvbiA9IHRvZG9CdXR0b24uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF07XG4gICAgY29uc29sZS5sb2coU3RvcmFnZS5nZXRUb2RvKHByb2plY3ROYW1lLCB0b2RvTmFtZSkpXG4gICAgaWYgKFN0b3JhZ2UuZ2V0VG9kbyhwcm9qZWN0TmFtZSwgdG9kb05hbWUpLmdldENvbXBsZXRlZCgpKSB7XG4gICAgICB0b2RvQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICB0b2RvSWNvbi5pbm5lckhUTUwgPSBgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cInRyYW5zcGFyZW50XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTIgMTZDMTQuMjA5MSAxNiAxNiAxNC4yMDkxIDE2IDEyQzE2IDkuNzkwODYgMTQuMjA5MSA4IDEyIDhDOS43OTA4NiA4IDggOS43OTA4NiA4IDEyQzggMTQuMjA5MSA5Ljc5MDg2IDE2IDEyIDE2WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIyIDEyQzIyIDE3LjUyMjggMTcuNTIyOCAyMiAxMiAyMkM2LjQ3NzE1IDIyIDIgMTcuNTIyOCAyIDEyQzIgNi40NzcxNSA2LjQ3NzE1IDIgMTIgMkMxNy41MjI4IDIgMjIgNi40NzcxNSAyMiAxMlpNMjAgMTJDMjAgMTYuNDE4MyAxNi40MTgzIDIwIDEyIDIwQzcuNTgxNzIgMjAgNCAxNi40MTgzIDQgMTJDNCA3LjU4MTcyIDcuNTgxNzIgNCAxMiA0QzE2LjQxODMgNCAyMCA3LjU4MTcyIDIwIDEyWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIj48L3BhdGg+PC9zdmc+YDtcbiAgICAgIGNvbnNvbGUubG9nKFN0b3JhZ2UuZ2V0VG9kbyhwcm9qZWN0TmFtZSwgdG9kb05hbWUpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFN0b3JhZ2UuZ2V0VG9kbyhwcm9qZWN0TmFtZSwgdG9kb05hbWUpKVxuICAgICAgdG9kb0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xuICAgICAgdG9kb0ljb24uaW5uZXJIVE1MID0gYDxzdmcgY2xhc3M9XCJtYXJrLXRvZG8tY29tcGxldGVcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cInRyYW5zcGFyZW50XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAyMEMxNi40MTgzIDIwIDIwIDE2LjQxODMgMjAgMTJDMjAgNy41ODE3MiAxNi40MTgzIDQgMTIgNEM3LjU4MTcyIDQgNCA3LjU4MTcyIDQgMTJDNCAxNi40MTgzIDcuNTgxNzIgMjAgMTIgMjBaTTEyIDIyQzE3LjUyMjggMjIgMjIgMTcuNTIyOCAyMiAxMkMyMiA2LjQ3NzE1IDE3LjUyMjggMiAxMiAyQzYuNDc3MTUgMiAyIDYuNDc3MTUgMiAxMkMyIDE3LjUyMjggNi40NzcxNSAyMiAxMiAyMlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPjwvc3ZnPmA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVRvZG8ocHJvamVjdE5hbWUsIHRvZG9OYW1lKSB7XG4gICAgU3RvcmFnZS5kZWxldGVUb2RvKHByb2plY3ROYW1lLCB0b2RvTmFtZSk7XG4gICAgVUkuY2xlYXJUb2RvcygpO1xuICAgIFVJLmxvYWRUb2Rvcyhwcm9qZWN0TmFtZSlcbiAgfVxuXG4gIHN0YXRpYyBjbGVhclRvZG9zKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICB9XG5cblxuXG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcihwcm9qZWN0TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IHByb2plY3ROYW1lO1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgfVxuXG4gIHNldE5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gIH1cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0VG9kb3MobmV3VG9kb3MpIHtcbiAgICB0aGlzLnRvZG9zID0gbmV3VG9kb3M7XG4gIH1cbiAgZ2V0VG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH1cblxuICBhZGRUb2RvKG5ld1RvZG8pIHsgXG4gICAgaWYgKHRoaXMudG9kb3MuZmluZCgoaXRlbSkgPT4gaXRlbS5nZXROYW1lKCkgPT09IG5ld1RvZG8ubmFtZSkpIHJldHVyblxuICAgIHRoaXMudG9kb3MucHVzaChuZXdUb2RvKTtcbiAgfVxuICBkZWxldGVUb2RvKHRvZG8pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuZmluZEluZGV4KG9iamVjdCA9PiB7XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT09IHRvZG9cbiAgICB9KTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuXG4gIH1cbiAgZ2V0VG9kbyh0b2RvTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8uZ2V0TmFtZSgpID09PSB0b2RvTmFtZSk7XG4gIH1cblxufSIsImltcG9ydCBUb2RvTGlzdCBmcm9tICcuL3RvZG9MaXN0JztcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG5cbiAgc3RhdGljIHNhdmVUb2RvTGlzdChkYXRhKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgc3RhdGljIGdldFRvZG9MaXN0KCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBUb2RvTGlzdCgpLFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3QnKSlcbiAgICApXG5cbiAgICB0b2RvTGlzdC5zZXRQcm9qZWN0cyhcbiAgICAgIHRvZG9MaXN0XG4gICAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpXG4gICAgKTtcblxuICAgIHRvZG9MaXN0XG4gICAgICAuZ2V0UHJvamVjdHMoKVxuICAgICAgLmZvckVhY2goKHByb2plY3QpID0+XG4gICAgICAgIHByb2plY3Quc2V0VG9kb3MoXG4gICAgICAgICAgcHJvamVjdC5nZXRUb2RvcygpLm1hcCgodG9kbykgPT4gT2JqZWN0LmFzc2lnbihuZXcgVG9kbygpLCB0b2RvKSlcbiAgICAgICAgKVxuICAgICk7XG4gICAgXG4gICAgcmV0dXJuIHRvZG9MaXN0XG5cbiAgfTtcblxuICBzdGF0aWMgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KClcbiAgICB0b2RvTGlzdC5hZGRQcm9qZWN0KHByb2plY3QpXG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpXG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpXG4gICAgdG9kb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICBTdG9yYWdlLnNhdmVUb2RvTGlzdCh0b2RvTGlzdClcbiAgfVxuXG4gIHN0YXRpYyBnZXRUb2RvKHByb2plY3ROYW1lLCBUb2RvTmFtZSkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpXG4gICAgY29uc3QgcHJvamVjdCA9IHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpXG4gICAgcmV0dXJuIHByb2plY3QuZ2V0VG9kbyhUb2RvTmFtZSlcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb2RvKHByb2plY3ROYW1lLCB0b2RvKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KClcbiAgICB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5hZGRUb2RvKHRvZG8pXG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpXG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVG9kbyhwcm9qZWN0TmFtZSwgVG9kb05hbWUpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9kb0xpc3QoKVxuICAgIHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmRlbGV0ZVRvZG8oVG9kb05hbWUpXG4gICAgU3RvcmFnZS5zYXZlVG9kb0xpc3QodG9kb0xpc3QpXG4gIH1cblxuICBzdGF0aWMgcmVuYW1lVG9kbyhwcm9qZWN0TmFtZSwgVG9kb05hbWUsIG5ld1RvZG9OYW1lKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KClcbiAgICB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb2RvKFRvZG9OYW1lKS5zZXROYW1lKG5ld1RvZG9OYW1lKVxuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KVxuICB9XG5cbiAgc3RhdGljIHNldFRvZG9EYXRlKHByb2plY3ROYW1lLCBUb2RvTmFtZSwgbmV3RHVlRGF0ZSkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gU3RvcmFnZS5nZXRUb2RvTGlzdCgpXG4gICAgdG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZ2V0VG9kbyhUb2RvTmFtZSkuc2V0RHVlRGF0ZShuZXdEdWVEYXRlKVxuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KVxuICB9XG5cbiAgc3RhdGljIHRvZ2dsZVRvZG9Db21wbGV0ZWQocHJvamVjdE5hbWUsIFRvZG9OYW1lKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBTdG9yYWdlLmdldFRvZG9MaXN0KClcbiAgICB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb2RvKFRvZG9OYW1lKS50b2dnbGVDb21wbGV0ZWQoKVxuICAgIFN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KHRvZG9MaXN0KVxuICB9XG5cbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUgPSBcIk5vIER1ZSBEYXRlXCIpe1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RHVlRGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcbiAgfVxuICBnZXREdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cblxuICB0b2dnbGVDb21wbGV0ZWQoKSB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWQ7XG4gIH1cbiAgZ2V0Q29tcGxldGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlZDtcbiAgfVxuXG4gIHNldE5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gIH1cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG4gIFxufSIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KFwiSW5ib3hcIikpO1xuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChcIkR1ZVwiKSk7XG4gIH1cblxuICBzZXRQcm9qZWN0cyhwcm9qZWN0c0xpc3QpIHtcbiAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHNMaXN0O1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgfVxuICBcbiAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgaWYgKHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSBuZXdQcm9qZWN0Lm5hbWUpKVxuICAgICAgcmV0dXJuXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gIH1cbiAgXG4gIGRlbGV0ZVByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9qZWN0cy5maW5kSW5kZXgob2JqZWN0ID0+IHtcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PT0gcHJvamVjdFxuICAgIH0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbiAgXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gJy4vVUknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkubG9hZEluaXRpYWwpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==