import { Project } from "./project";

const TodoList = () => {
  let projects = [];
  projects.push(Project("Inbox"));
  projects.push(Project("Due"))

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