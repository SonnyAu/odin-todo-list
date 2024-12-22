// Save entire todo list to localStorage
export function saveTodosToLocalStorage() {
  const todos = [...document.querySelectorAll(".todo-item")].map((item) => {
    return {
      title: item.querySelector("h2").textContent,
      desc: item.querySelector("p").textContent,
      dueDate: item.getAttribute("data-due"),
      priority: item.getAttribute("data-priority"),
      project: item.getAttribute("data-project"),
    };
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Save individual todo item to localStorage
export function saveTodoToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load and render todos on page load
import Render from "./render";
import ToDoListItem from "./todolistitem";

export function loadTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) =>
    Render(
      ToDoListItem(
        todo.title,
        todo.desc,
        todo.dueDate,
        todo.priority,
        todo.project
      )
    )
  );
}
