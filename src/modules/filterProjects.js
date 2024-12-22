export default function FilterProjects() {
  const projectDropdown = document.querySelector(".show-projects");

  if (!projectDropdown) {
    console.warn("Project dropdown not found.");
    return;
  }

  const selectedProject = projectDropdown.value;
  const allTodoItems = document.querySelectorAll(".todo-item");

  allTodoItems.forEach((item) => {
    const projectValue = item.getAttribute("data-project");

    if (selectedProject === "Default" || projectValue === selectedProject) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
