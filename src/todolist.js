import Project from "./project";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Due"))
  }

  setProjects(projectsList) {
    this.projects = projectsList;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }
  
  addProject(newProject) {
    this.projects.push(newProject);
  }
  
  removeProject(project) {
    this.projects = this.projects.filter((item) => item !== project);
  }
  
};