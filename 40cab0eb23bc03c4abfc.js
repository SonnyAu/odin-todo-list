import "./styles.css";
import createTodoItem from "./modules/createTodoItem";
import AddProject from "./modules/addProject";
import Render from "./modules/render";
import {
  loadProjectsFromLocalStorage,
  saveProjectsToLocalStorage,
} from "./modules/projectList";
import { updateProjectDropdowns } from "./modules/addProject";

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  loadProjectsFromLocalStorage();
  updateProjectDropdowns(); // Ensure dropdowns populate after DOM is loaded
  Render();
});

// Event Listeners
const formButton = document.querySelector(".todo-create-button");
const addProjectButton = document.querySelector(".add-project-button");

// Create Todo Item
formButton.addEventListener("click", (e) => {
  e.preventDefault();
  createTodoItem();
  Render();
});

// Add Project
addProjectButton.addEventListener("click", (e) => {
  e.preventDefault();
  AddProject();
  updateProjectDropdowns(); // Ensure dropdown updates after adding project
});

// Project Filter Change
const selectedProject = document.querySelector(".show-projects");
selectedProject.addEventListener("change", () => {
  Render();
});
