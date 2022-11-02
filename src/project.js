export default class Project {
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
    if (this.todos.find((item) => item.getTitle() === newTodo.name)) return
    this.todos.push(newTodo);
  }
  deleteTodo(todo) {
    this.todos = this.todos.filter((item) => item !== todo);
  }
  getTodo(todoName) {
    return this.todos.find((todo) => todo.getName() === todoName);
  }

}