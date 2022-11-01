import { TodoList } from './todoList';
import { Project } from "./project";
import { Todo } from "./todo";

const Storage = (() => {

  const saveTodoList = (data) => {
    localStorage.setItem('todolist', JSON.stringify(data));
  }

  const getTodoList = () => {
    const todoList = Object.assign(
      TodoList(),
      JSON.parse(localStorage.getItem('todolist'))
    )

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(Project(), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTodos(
          project.getTodos().map((todo) => Object.assign(Todo(), todo))
        )
      );
      
    return todoList
  };

  const addProject = (project) => {
    const todoList = getTodoList()
    todoList.addProject(project)
    saveTodoList(todoList)
  }

  const deleteProject = (projectName) => {
    const todoList = getTodoList()
    todoList.deleteProject(projectName)
    saveTodoList(todoList)
  }

  const addTodo = (projectName, todo) => {
    const todoList = getTodoList()
    todoList.getProject(projectName).addTodo(todo)
    saveTodoList(todoList)
  }

  const deleteTodo = (projectName, TodoName) => {
    const todoList = getTodoList()
    todoList.getProject(projectName).deleteTodo(TodoName)
    saveTodoList(todoList)
  }

  const renameTodo = (projectName, TodoName, newTodoName) => {
    const todoList = getTodoList()
    todoList.getProject(projectName).getTodo(TodoName).setName(newTodoName)
    saveTodoList(todoList)
  }

  const setTodoDate = (projectName, TodoName, newDueDate) => {
    const todoList = getTodoList()
    todoList.getProject(projectName).getTodo(TodoName).setDate(newDueDate)
    saveTodoList(todoList)
  }
    
    
  return { saveTodoList, getTodoList, addProject, deleteProject, addTodo, deleteTodo, renameTodo, setTodoDate }

})();

export { Storage };