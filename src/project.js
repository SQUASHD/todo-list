export default class Project {
  constructor(name) {
    this.name = name
    this.todos = [];
  }

  setName = (newName) => name = newName;
  getName = () => name;

  addTodo = (todo) => {
    todos.push(todo);
  }
  removeTodo = (todo) => {
    todos = todos.filter((item) => item !== todo);
  }
  getTodos = () => todos;

  setDescription = (newDescription) => description = newDescription;
  getDescription = () => description;
}

export { Project };