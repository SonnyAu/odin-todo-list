export default function ToDoListItem(title, desc, dueDate, priority, project) {
  const todo = {
    id: Date.now(),
    title,
    desc,
    dueDate,
    priority,
    project,
  };

  saveToLocalStorage(todo);
  return todo;
}

// Save to localStorage
function saveToLocalStorage(todoItem) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todoItem);
  localStorage.setItem("todos", JSON.stringify(todos));
}
