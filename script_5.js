const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskTime = new Date().toLocaleString();
  const li = createTaskElement(taskText, taskTime, false);

  pendingList.appendChild(li);
  taskInput.value = "";
}

function createTaskElement(text, time, isCompleted) {
  const li = document.createElement("li");

  const info = document.createElement("div");
  info.className = "task-info";
  info.innerHTML = `<strong>${text}</strong><br><small>Added: ${time}</small>`;

  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  if (!isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.onclick = () => completeTask(li, text);
    buttons.appendChild(completeBtn);
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(li, text);
  buttons.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => li.remove();
  buttons.appendChild(deleteBtn);

  li.appendChild(info);
  li.appendChild(buttons);

  return li;
}

function completeTask(li, text) {
  li.remove();
  const time = new Date().toLocaleString();
  const completedLi = createTaskElement(text, time, true);
  completedList.appendChild(completedLi);
}

function editTask(li, oldText) {
  const newText = prompt("Edit task:", oldText);
  if (newText && newText.trim() !== "") {
    const time = new Date().toLocaleString();
    const isCompleted = completedList.contains(li);
    const newLi = createTaskElement(newText.trim(), time, isCompleted);
    li.replaceWith(newLi);
  }
}
