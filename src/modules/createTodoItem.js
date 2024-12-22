import ToDoListItem from "./todolistitem";
import Render from "./render";
import FilterProjects from "./filterProjects";

export default function createToDoListItem() {
  const title = document.querySelector(".todo-title-input").value;
  const desc = document.querySelector(".todo-desc-input").value;
  const dueDate = document.querySelector(".todo-date-input").value;
  const priority = document.querySelector(
    "input[name='priority']:checked"
  )?.value;
  const project = document.querySelector(".projects").value;

  if (!title || !desc || !dueDate || !priority || !project) {
    alert("Please fill in all fields.");
    return;
  }

  const newItem = ToDoListItem(title, desc, dueDate, priority, project);
  Render();
  FilterProjects(); // Filter to reflect the currently selected project
}
