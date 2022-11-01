const Project = (name) => {
  let name = name;
  let todos = [];

  const setName = (newName) => name = newName;
  const getName = () => name;

  const setTodos = (todos) => todos = todos;
  const getTodos = () => todos;

  const addTodo = (todo) => todos.push(todo);
  const removeTodo = (todo) => {
    todos = todos.filter((item) => item !== todo);
  }
  const getTodo = (todoName) => {
    return todos.find((todo) => todo.getName() === todoName);
  }
  
  return { setName, getName, setTodos, getTodos, addTodo, removeTodo, getTodo };
  
}

export { Project };