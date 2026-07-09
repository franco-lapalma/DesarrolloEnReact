import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import TaskItem from './TaskItem';

function TodoApp() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTask = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setInputValue('');
  }, [inputValue, setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, [setTasks]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') addTask();
  }, [addTask]);

  const filteredTasks = useMemo(() => {
    if (!searchValue.trim()) return tasks;
    const search = searchValue.toLowerCase();
    return tasks.filter((task) => task.text.toLowerCase().includes(search));
  }, [tasks, searchValue]);

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="todo-app">
      <h1>Lista de Tareas</h1>

      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Agregar una nueva tarea..."
        />
        <button onClick={addTask} disabled={!inputValue.trim()}>
          Agregar
        </button>
      </div>

      <div className="search-group">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar tareas por título..."
        />
      </div>

      <div className="counters">
        <span>Pendientes: {pendingCount}</span>
        <span>Completadas: {completedCount}</span>
      </div>

      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      {tasks.some((t) => t.completed) && (
        <button onClick={clearCompleted} className="clear-btn">
          Limpiar completadas
        </button>
      )}

      {filteredTasks.length === 0 && tasks.length > 0 && (
        <p className="empty-message">
          {searchValue
            ? 'No se encontraron tareas con ese término'
            : 'No hay tareas. ¡Agrega una nueva!'}
        </p>
      )}

      {tasks.length === 0 && (
        <p className="empty-message">No hay tareas. ¡Agrega una nueva!</p>
      )}
    </div>
  );
}

export default TodoApp;