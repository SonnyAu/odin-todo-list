import { updateLocalStorage } from "./localStorageHelper";
import { projectList } from "./projectList";
import { updateProjectDropdowns } from "./addProject";

// Renders all todos to the DOM
export default function Render() {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const selectedProject =
    document.querySelector(".show-projects")?.value || "All";

  // Ensure dropdown repopulates without losing the selected option
  updateProjectDropdowns(selectedProject);

  todos.forEach((todo) => {
    if (selectedProject === "All" || todo.project === selectedProject) {
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("todo-item");
      todoItemDiv.setAttribute("data-project", todo.project);
      todoItemDiv.setAttribute("data-id", todo.id);

      // Title
      const itemTitle = document.createElement("h2");
      itemTitle.textContent = todo.title;
      const itemTitleInput = document.createElement("input");
      itemTitleInput.type = "text";
      itemTitleInput.value = todo.title;
      itemTitleInput.classList.add("hidden");

      // Description
      const itemDesc = document.createElement("p");
      itemDesc.textContent = todo.desc;
      const itemDescInput = document.createElement("textarea");
      itemDescInput.value = todo.desc;
      itemDescInput.classList.add("hidden");

      // Due Date
      const itemDueDate = document.createElement("p");
      itemDueDate.textContent = `Due: ${todo.dueDate}`;
      const itemDueDateInput = document.createElement("input");
      itemDueDateInput.type = "date";
      itemDueDateInput.value = todo.dueDate;
      itemDueDateInput.classList.add("hidden");

      // Priority
      const itemPriority = document.createElement("p");
      itemPriority.textContent = `Priority: ${todo.priority}`;
      const itemPriorityInput = document.createElement("select");
      ["low", "medium", "high"].forEach((level) => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        itemPriorityInput.appendChild(option);
      });
      itemPriorityInput.value = todo.priority;
      itemPriorityInput.classList.add("hidden");

      // Project (Dropdown)
      const itemProject = document.createElement("p");
      itemProject.textContent = `Project: ${todo.project}`;
      const itemProjectSelect = document.createElement("select");
      itemProjectSelect.classList.add("hidden");

      // Populate Project Dropdown
      const allOption = document.createElement("option");
      allOption.value = "All";
      allOption.textContent = "All";
      allOption.disabled = true; // Prevent 'All' from being selected in edits
      itemProjectSelect.appendChild(allOption);

      projectList.forEach((project) => {
        const option = document.createElement("option");
        option.value = project;
        option.textContent = project;
        itemProjectSelect.appendChild(option);
      });

      itemProjectSelect.value = todo.project;

      // Button Container
      const buttonDiv = document.createElement("div");

      // Edit Button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-button");

      editButton.addEventListener("click", () => {
        const isEditing = itemTitleInput.classList.contains("hidden");

        if (isEditing) {
          // Enter Edit Mode
          [itemTitle, itemDesc, itemDueDate, itemPriority, itemProject].forEach(
            (el) => el.classList.add("hidden")
          );

          [
            itemTitleInput,
            itemDescInput,
            itemDueDateInput,
            itemPriorityInput,
            itemProjectSelect,
          ].forEach((el) => el.classList.remove("hidden"));

          editButton.textContent = "Save";
        } else {
          // Save Changes - Update Todo
          todo.title = itemTitleInput.value;
          todo.desc = itemDescInput.value;
          todo.dueDate = itemDueDateInput.value;
          todo.priority = itemPriorityInput.value;
          todo.project = itemProjectSelect.value;

          // Update DOM with new values
          itemTitle.textContent = itemTitleInput.value;
          itemDesc.textContent = itemDescInput.value;
          itemDueDate.textContent = `Due: ${itemDueDateInput.value}`;
          itemPriority.textContent = `Priority: ${itemPriorityInput.value}`;
          itemProject.textContent = `Project: ${itemProjectSelect.value}`;

          // Update localStorage
          updateLocalStorage(todos);
          todoItemDiv.setAttribute("data-project", todo.project);

          // Reset View
          [itemTitle, itemDesc, itemDueDate, itemPriority, itemProject].forEach(
            (el) => el.classList.remove("hidden")
          );

          [
            itemTitleInput,
            itemDescInput,
            itemDueDateInput,
            itemPriorityInput,
            itemProjectSelect,
          ].forEach((el) => el.classList.add("hidden"));

          editButton.textContent = "Edit";
        }
      });

      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      deleteButton.addEventListener("click", () => {
        const updatedTodos = todos.filter((item) => item.id !== todo.id);
        updateLocalStorage(updatedTodos);
        Render();
      });

      // Append Buttons
      buttonDiv.appendChild(editButton);
      buttonDiv.appendChild(deleteButton);

      // Append Elements to Todo Item
      todoItemDiv.appendChild(itemTitle);
      todoItemDiv.appendChild(itemTitleInput);
      todoItemDiv.appendChild(itemDesc);
      todoItemDiv.appendChild(itemDescInput);
      todoItemDiv.appendChild(itemDueDate);
      todoItemDiv.appendChild(itemDueDateInput);
      todoItemDiv.appendChild(itemPriority);
      todoItemDiv.appendChild(itemPriorityInput);
      todoItemDiv.appendChild(itemProject);
      todoItemDiv.appendChild(itemProjectSelect);
      todoItemDiv.appendChild(buttonDiv);

      content.appendChild(todoItemDiv);
    }
  });
}
