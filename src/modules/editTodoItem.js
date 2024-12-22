export default function EditTodoItem(item) {
  let editField = prompt("What field would you like to edit?").toLowerCase();
  let newValue = prompt(`Enter a new value for ${editField}`);
  if (newValue === null || newValue.trim() === "") {
    alert("Invalid input. Please enter a non-empty value.");
    return;
  }
}
