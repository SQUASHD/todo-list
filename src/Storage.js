import TodoList from './todoList';
import Project from "./project";
import Todo from "./todo";

export default class Storage {

  static saveTodoList(data) {
    localStorage.setItem('todolist', JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todolist'))
    )

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTodos(
          project.getTodos().map((todo) => Object.assign(new Todo(), todo))
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

};