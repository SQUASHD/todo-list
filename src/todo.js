const Todo = (title, dueDate = null, description = null) => {
  let completed = false;
  
  const setDueDate = (date) => {
    dueDate = date;
  }
  const getDueDate = () => dueDate;

  const toggleCompleted = () => {
    completed = !completed;
  }
  const getCompleted = () => completed;

  const setTitle = (newTitle) => title = newTitle;
  const getTitle = () => title;

  const setDescription = (description) => {
    description = description;
  }
  const getDescription = () => description;

  return { setTitle, getTitle, setDueDate, getDueDate, toggleCompleted, getCompleted, setDescription, getDescription };
}

export { Todo };