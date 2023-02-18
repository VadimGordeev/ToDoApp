const LocalStorageKey = {
    Tasks: 'tasks'
}

class TaskStorage {
    constructor () {
        const savedTasks = localStorage.getItem(LocalStorageKey.Tasks);

        const tasks = savedTasks ? JSON.parse(savedTasks) : [];

        this.addTask = (task) => {
            const newTask = {
              text: task,
              id: window.crypto.randomUUID()
            }

            tasks.push(newTask);

            localStorage.setItem(LocalStorageKey.Tasks, JSON.stringify(tasks));

            return newTask
        }

        this.getTasks = () => {
            return tasks.slice();
        }

        this.removeTask = (taskId) => {
            const index = tasks.findIndex((task) => task.id === taskId);

            if (index > -1) {
              tasks.splice(index, 1)
            }

            if (index.length === 0 ) {
                localStorage.removeItem(LocalStorageKey.Tasks)
            } else {
                localStorage.setItem(LocalStorageKey.Tasks, JSON.stringify(tasks));
            }
            
            return tasks.slice
        }
    } 
}