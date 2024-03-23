import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tasklist.css'
import TaskInput from './TaskInput';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tasks/${taskId}`);
      if (response.status === 204) {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Delete request error:', error);
    }
  };

  return (
    <div className="container">
      <TaskInput getdata={getdata} />
      <div className='' >
      
      <br/>
      <ul   >
        {tasks.map(task => (
          <li className='border shadow-sm p-2 mb-2' key={task._id}>
            <div  className='row' >
              <div  className='col-md-11' >
            <span  className='d-flex justify-content-center fw-bold' >{task.title}</span>
            
            <span className='d-flex justify-content-center' >{task.description}</span>
            </div>
            <div className='col-md-1' >
            <button  className='cross border-0 ' onClick={() => handleDeleteTask(task._id)}>X</button>
            </div>
            </div>
          </li>
        
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TaskList;
