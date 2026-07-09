import { useCallback } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <span>{task.text}</span>
      <div className="task-actions">
        <button
          onClick={() => onToggle(task.id)}
          className={task.completed ? 'toggle-btn completed' : 'toggle-btn'}
        >
          {task.completed ? 'Deshacer' : 'Completar'}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;