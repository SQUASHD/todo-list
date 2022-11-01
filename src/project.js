const Project = (name) => {
  let name = name;
  let todos = [];

  setName = (newName) => name = newName;
  getName = () => name;

  setTodos = (todos) => todos = todos;
  getTodos = () => todos;

  addTodo = (todo) => todos.push(todo);
  removeTodo = (todo) => {
    todos = todos.filter((item) => item !== todo);
  }
  getTodo = (todoName) => {
    return todos.find((todo) => todo.getName() === todoName);
  }
}

export { Project };