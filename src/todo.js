export default class Todo {
  constructor(titleInput, dateInput){
    this.title = titleInput;
    this.dueDate = dateInput;
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