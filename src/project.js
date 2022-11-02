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