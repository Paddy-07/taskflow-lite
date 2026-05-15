function escapeHTML(str) {

  return str.replace(
    /[&<>"']/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[tag])
  );

}

export function renderTaskList(taskListElement, tasks) {

  taskListElement.innerHTML = '';

  if (tasks.length === 0) {

    taskListElement.innerHTML = `
      <li class="empty-state">
        <p>No tasks yet.</p>
        <span>Add your first task 🚀</span>
      </li>
    `;

    return;
  }

  tasks.forEach(task => {

    const taskElement =
      document.createElement('li');

    taskElement.className =
      `task ${task.completed ? 'completed' : ''}`;

    taskElement.dataset.id =
      task.id;

    taskElement.innerHTML = `

      <label>

        <input
          type="checkbox"
          ${task.completed ? 'checked' : ''}
        >

        <span>
          ${escapeHTML(task.text)}
        </span>

      </label>

      <div class="task-actions">

        <button
          class="delete-btn"
          aria-label="Delete Task"
        >
          🗑
        </button>

      </div>
    `;

    taskListElement.appendChild(
      taskElement
    );

  });

}