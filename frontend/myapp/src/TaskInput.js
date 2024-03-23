import React, { useState } from 'react';
import axios from 'axios';
import './taskinput.css';

function TaskInput(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:4000/addtasks', 
      { title: title, description: description });
      if (response.status === 201) {
       props.getdata();
        setTitle('');
        setDescription('');
        alert('Task added successfully.');
        
      } else {
        alert('Failed to add task. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-input">
      <h2>To Do List App</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />
      <button className='add-button' onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;
