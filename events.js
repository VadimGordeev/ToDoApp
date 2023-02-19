const tasks = [
  {
    id: window.crypto.randomUUID(),
    done: false, 
    text: 'Learn JS'
}
];

document.addEventListener('DOMContentLoaded', (event) => {
  const storage = new TaskStorage();

  const view = new ToDo(storage.getTasks(), onAddTask, onRemoveTask, onTaskComplete, onUndoCompleteTaskElement);

  function onAddTask (task) {
    const newTask = storage.addTask(task)
    view.clearAddTaskInput();
    view.addTaskElement(newTask);
  }
  
  function onRemoveTask (taskId) {
    storage.removeTask(taskId)
    view.removeTaskElement(taskId);
  }

  function onTaskComplete (taskId) {
      storage.completeTask(taskId)
      view.completeTaskElement(taskId)
    };
  
  function onUndoCompleteTaskElement (taskId) {
    storage.undoCompleteTask(taskId)
      view.undoCompleteTaskElement(taskId)

  }
})
