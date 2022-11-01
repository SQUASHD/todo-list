import { Project } from "./project";
import { Todo } from "./todo";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Personal"));
    this.projects.push(new Project("Work"));
    this.projects.push(new Project("Studies"));
  }

  addProject = (newProject) => {
    this.projects.push(newProject);
  }

  removeProject = (project) => {
    this.projects = this.projects.filter((item) => item !== project);
  }
}