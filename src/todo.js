export default class Todo {
  constructor(name, dueDate = "No Due Date"){
    this.name = name;
    this.dueDate = dueDate;
    this.completed = false;
  }

  setDueDate(date) {
    this.dueDate = date;
  }
  getDueDate() {
    return this.dueDate;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
  getCompleted() {
    return this.completed;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }
  getTitle() {
    return this.title;
  }
  
}