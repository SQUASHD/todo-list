import Project from "./project";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Due"));
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
    if (this.projects.find((project) => project.name === newProject.name))
      return
    this.projects.push(newProject)
  }
  
  deleteProject(project) {
    const index = this.projects.findIndex(object => {
      return object.name === project
    });
    console.log(index)
    if (index > -1) {
      this.projects.splice(index, 1)
    }
  }
  
};