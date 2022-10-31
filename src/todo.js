const todoItem = (title, dueDate = null) => {
  let completed = false;
  let description = null;
  
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