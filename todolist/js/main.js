// main.js
document.addEventListener('DOMContentLoaded', function () {
    const liveToastBtn = document.getElementById('liveToastBtn');
    const taskInput = document.getElementById('task');
    const list = document.getElementById('list');

    // Load tasks from localStorage on page load
    loadTasksFromLocalStorage();
  
    liveToastBtn.addEventListener('click', function () {
      const taskText = taskInput.value.trim();
  
      if (taskText !== '') {
        // Add new task to the list
        addTaskToList(taskText);

        // Save tasks to localStorage
        saveTasksToLocalStorage();
  
        // Show success toast
        showToast('success', 'Listeye eklendi.');
      } else {
        // Show error toast for empty task
        showToast('error', 'Listeye boş ekleme yapamazsınız!');
      }
  
      // Clear input field
      taskInput.value = '';
    });
  
    function addTaskToList(taskText) {
      const newTask = document.createElement('li');
      newTask.textContent = taskText;
      newTask.addEventListener('click', function () {
        // Toggle completed status on click
        this.classList.toggle('completed');

        // Save tasks to localStorage when a task is marked as completed
        saveTasksToLocalStorage();
      });
  
      // Add close button to remove task
      const closeButton = document.createElement('span');
      closeButton.classList.add('close-btn');
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', function (event) {
        // Prevent li click event when close button is clicked
        event.stopPropagation();
        removeTaskFromList(newTask);

        // Save tasks to localStorage after removing a task
        saveTasksToLocalStorage();
      });
  
      newTask.appendChild(closeButton);
  
      list.appendChild(newTask);
    }
    
    function removeTaskFromList(taskElement) {
      list.removeChild(taskElement);
    }
  
    function showToast(type, message) {
      const toast = document.querySelector(`.toast.${type}`);
      const toastBody = toast.querySelector('.toast-body');
  
      // Update toast message
      toastBody.textContent = message;
  
      // Show toast
      toast.classList.remove('hide');
      toast.classList.add('show');
  
      // Hide toast after 4 seconds (4000 milliseconds)
      setTimeout(function () {
        toast.classList.remove('show');
        toast.classList.add('hide');
      }, 4000);

      // Save tasks to localStorage after showing a toast
      saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
      const tasks = Array.from(list.children).map(function (task) {
        return {
          text: task.textContent,
          completed: task.classList.contains('completed'),
        };
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const savedTasks = localStorage.getItem('tasks');
  
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
  
        tasks.forEach(function (task) {
          addTaskToList(task.text);
          if (task.completed) {
            list.lastChild.classList.add('completed');
          }
        });
      }
    }
  
});
  