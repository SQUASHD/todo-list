import { Project } from "./project";
import { Todo } from "./todo";

const TodoList = () => {
  let projects = [];
  projects.push(new Project("Personal"));
  projects.push(new Project("Work"));
  projects.push(new Project("Studies"));

  const setProjects = (projectsList) => projects = projectsList;

  const getProjects = () => projects;

  const addProject = (newProject) => {
      projects.push(newProject);
    }

  const getProject = (projectName) => {
      return projects.find((project) => project.getName() === projectName);
    }

  const removeProject = (project) => {
      projects = projects.filter((item) => item !== project);
    }

  return { setProjects, getProjects, addProject, removeProject, getProject };
  
};

export { TodoList };