import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]); // Ensure tasks state is initialized as an empty array

  const [newTask, setNewTask] = useState({
    title: 'new task',
    description: 'new task craeted'
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {

    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      if (response.data && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks); // Accessing the 'tasks' array from the received object
      } else {
        console.error('Tasks data is not in the expected format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const createTask = async () => {
    try {
      await axios.post(`${API_BASE_URL}/tasks`, newTask);
      fetchTasks(); // Refresh task list after creating a new task
      setNewTask({ title: '', description: '' }); // Clear input fields
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedTask);
      fetchTasks(); // Refresh task list after updating a task
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      fetchTasks(); // Refresh task list after deleting a task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager App</h1>

      <h2>Create New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={createTask}>Create Task</button>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => updateTask(task.id, { title: 'Updated Title', description: 'Updated Description' })}>
              Update
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
