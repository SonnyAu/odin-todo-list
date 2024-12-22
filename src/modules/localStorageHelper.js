export function updateLocalStorage(updatedTodos) {
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
