const nameAttr = {
  addTaskInput: 'add_task_input',
  addTaskButton: 'add_task_btn',
}

class ToDo {
  taskForm = null;
  taskBody = null;
  
  constructor (tasks, onAddTask, onRemoveTask, onTaskComplete, onUndoCompleteTaskElement) {
      this.taskForm = document.getElementById('todo');
      this.taskBody = this.createTaskBody();;

      for (const task of tasks) {
        this.taskBody.append(
          this.createTaskCard(task)
        )
      }
      const addTaskControlContainer = this.createAddTaskContorlContainer();
      const taskList = this.createTaskList();
      taskList.append(this.taskBody);
      this.taskForm.append(addTaskControlContainer, taskList);

      this.taskForm.elements[nameAttr.addTaskInput].addEventListener('input', this.onAddTaskChange.bind(this));

      this.taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const inputValue = this.taskForm.elements[nameAttr.addTaskInput].value.trim();
        if (inputValue) {
          onAddTask(inputValue);
        }
      })
    
      this.taskBody.addEventListener('click',
          ({ target }) => {
            if (target.id === 'delete') {
              onRemoveTask(target.dataset.taskId);
            }
            if (target.id === 'complete') {
              onTaskComplete(target.dataset.taskId);
            } else if (target.id === 'done') {
            onUndoCompleteTaskElement(target.dataset.taskId);
            }
          });
  }

  onAddTaskChange ({ target: { value } }) {
      if (value.trim()) {
        this.taskForm.elements[nameAttr.addTaskButton].disabled = false;
      } 
  }

  addTaskElement (task) {
      const card = this.createTaskCard(task);
      this.taskBody.append(card);
  }

  removeTaskElement (taskId) {
      const card = document.getElementById(taskId);
      if (card) {
          card.remove();
      }
  }

  completeTaskElement (taskId) {
    const card = document.getElementById(taskId);
    if (card) {
      const complTask = document.getElementById(`${taskId}`);
      complTask.classList.add('complete');
      const completeBtn = card.querySelector('.btn_compl');
      completeBtn.classList.add('complete_btn');
      completeBtn.id = 'done';
      completeBtn.textContent = 'Done';
    }
  }
  undoCompleteTaskElement (taskId) {
  const card = document.getElementById(taskId);
  if (card) {
    card.classList.remove('complete')

    const completeBtn = card.querySelector('.btn_compl');
    completeBtn.classList.remove('complete_btn');
    completeBtn.id = 'complete';
    completeBtn.textContent = 'Complete';

    const complTask = document.getElementById(`${taskId}`);
    complTask.classList.remove('complete');
    }
  }

  clearAddTaskInput () {
      this.taskForm.elements[nameAttr.addTaskInput].value = '';
      this.taskForm.elements[nameAttr.addTaskInput].dispatchEvent(new Event('change'));
      this.taskForm.elements[nameAttr.addTaskButton].disabled = true
    }

  createAddTaskContorlContainer () {
      const wrapper = document.createElement('div');
      wrapper.classList.add('card_header');

      const input = document.createElement('input');
      input.setAttribute('placeholder', 'Enter a task here');
      input.classList.add('card_header_input');
      input.setAttribute('name', nameAttr.addTaskInput);

      const addNewTaskButton = document.createElement('button');
      addNewTaskButton.textContent = 'Add';
      addNewTaskButton.classList.add('card_header_btn');
      addNewTaskButton.setAttribute('type', 'submit');
      addNewTaskButton.setAttribute('name', nameAttr.addTaskButton);
      addNewTaskButton.disabled = true;
      wrapper.append(input, addNewTaskButton);

      return wrapper;
  }

  createTaskBody () {
      const wrap = document.createElement('div');
      wrap.classList.add('card_body');
      
      return wrap;
  }

  createTaskList () {
    const wrap = document.createElement('div');
    wrap.classList.add('card_list');
    
    return wrap;
  }
  
  createTaskCard ({ id, text }) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = id;
      card.innerHTML = `                    
      <p class="task_name">${text}</p>
      <button id="complete" class="btn_compl" type="button"  data-task-id="${id}" type="submit">Complete</button>
      <button id="delete" class="btn_del" type="button"  data-task-id="${id}" type="submit">Delete</button>
      `;
      return card;
  }
}
