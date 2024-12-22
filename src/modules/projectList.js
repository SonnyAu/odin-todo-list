export const projectList = new Set(
  JSON.parse(localStorage.getItem("projects")) || []
);

// Always ensure 'Default' and 'All' exist
projectList.add("Default");
projectList.add("All");

// Add new project to list
export function addProject(newProject) {
  if (newProject !== "All") {
    projectList.add(newProject);
    saveProjectsToLocalStorage();
  }
}

// Save projects to localStorage
export function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify([...projectList]));
}

// Load projects from localStorage on page load
export function loadProjectsFromLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  projectList.clear();
  savedProjects.forEach((project) => projectList.add(project));

  // Ensure 'Default' and 'All' always exist
  projectList.add("Default");
  projectList.add("All");
}
