import { addProject, projectList } from "./projectList";
import Render from "./render";

// Add New Project to List
export default function AddProject() {
  const newProjectInput = document.querySelector(".new-project-input");
  const newProject = newProjectInput.value.trim();

  if (!newProject) {
    alert("Please enter a project name.");
    return;
  }

  if (projectList.has(newProject)) {
    alert("Project already exists.");
    return;
  }

  addProject(newProject);
  updateProjectDropdowns();
  Render(); // Re-render to reflect new project
  newProjectInput.value = "";
}

// Update dropdowns when new projects are added
export function updateProjectDropdowns() {
  const assignDropdown = document.querySelector(".projects");
  const displayDropdown = document.querySelector(".show-projects");

  if (!assignDropdown || !displayDropdown) {
    console.warn("Dropdown not found, skipping update.");
    return;
  }

  const currentSelected = displayDropdown.value; // Preserve currently selected project
  assignDropdown.innerHTML = "";
  displayDropdown.innerHTML = "";

  // Always add the 'All' option at the top
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";
  displayDropdown.appendChild(allOption);

  projectList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    assignDropdown.appendChild(option);

    // Prevent adding 'All' again
    if (project !== "All") {
      const displayOption = option.cloneNode(true);
      displayDropdown.appendChild(displayOption);
    }
  });

  // Re-select the previously selected project after updating the list
  displayDropdown.value = currentSelected || "All";
}
