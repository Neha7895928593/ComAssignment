const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/taskdatabase');

const TaskSchema = new mongoose.Schema({
//   taskText: String,
title:String,
description:String,

});

const Task = mongoose.model('Task', TaskSchema);

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks from the database' });
  }
});

app.post('/addtasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }
  
    const newTask = new Task({
      title: title,
      description: description
    });
  
    try {
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error adding the task to the database' });
    }
  });
  

app.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the task from the database' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
