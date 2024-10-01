
import React, { useState } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('view');

  const addTask = () => {
    if (titleInput.trim() === '' || descriptionInput.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, title: titleInput, description: descriptionInput } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { title: titleInput, description: descriptionInput, completed: false }]);
    }
    setTitleInput('');
    setDescriptionInput('');
  };

  const editTask = (index) => {
    setTitleInput(tasks[index].title);
    setDescriptionInput(tasks[index].description);
    setEditIndex(index);
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, idx) => 
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  const toggleDescription = (index) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="task-manager">
      <h1>Gerenciador de Tarefas</h1>
      <div className="input-container">
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Título da tarefa"
        />
        <input
          type="text"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          placeholder="Descrição da tarefa"
        />
        <button className="add" onClick={addTask}>
          {editIndex !== null ? 'Editar' : 'Adicionar'}
        </button>
      </div>
      <div className="tabs">
        <button className={`tab ${activeTab === 'view' ? 'active' : ''}`} onClick={() => toggleTab('view')}>
          Ver Tarefas
        </button>
        
        <button className={`tab ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => toggleTab('manage')}>
          Gerenciar
        </button>
      </div>
      {activeTab === 'view' && (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} >
              <strong className={task.completed ? 'completed' : ''}>{task.title}</strong>
              <button className="toggle-description" onClick={() => toggleDescription(index)}>
                {visibleDescriptions[index] ? 'ver tarefas' : 'ver tarefas'}
              </button>
              {visibleDescriptions[index] && <p className={task.completed ? 'completed' : ''}>{task.description}</p>}
              <button className="complete" onClick={() => completeTask(index)}>Concluida</button>
            </li>
          ))}
        </ul>
      )}
      {activeTab === 'manage' && (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <strong>{task.title}</strong>: {task.description}
              <div>
                <button className="edit" onClick={() => editTask(index)}>Editar</button>
                <button className="remove" onClick={() => removeTask(index)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;