document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskTableBody = document.querySelector('#taskTable tbody');
    const emptyMessage = document.getElementById('emptyMessage');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskTableBody.innerHTML = '';

        if (tasks.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            tasks.forEach((task, index) => {
                const row = taskTableBody.insertRow();
                row.innerHTML = `
                    <td>${task.name}</td>
                    <td>${task.assignee}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    </td>
                `;
            });
        }
    }

    function addTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.deleteTask = function (index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const taskName = document.getElementById('taskName').value;
        const taskAssignee = document.getElementById('taskAssignee').value;
        const taskDeadline = document.getElementById('taskDeadline').value;

        const task = {
            name: taskName,
            assignee: taskAssignee,
            deadline: taskDeadline
        };

        addTask(task);
        loadTasks();
        taskForm.reset();
    });

    loadTasks();
});
