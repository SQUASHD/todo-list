const Project = (name) => {
  let todos = [];
  let description = null;

  const setName = (newName) => name = newName;
  const getName = () => name;

  const addTodo = (todo) => {
    todos.push(todo);
  }
  const removeTodo = (todo) => {
    todos = todos.filter((item) => item !== todo);
  }
  const getTodos = () => todos;

  const setDescription = (newDescription) => description = newDescription;
  const getDescription = () => description;

  return { setName, getName, addTodo, removeTodo, getTodos, setDescription, getDescription };
}

export { Project };