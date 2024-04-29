const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.json());

let tasks = [
    { id: 1, title: 'Task 1', description: 'This is the first task', done: false },
    { id: 2, title: 'Task 2', description: 'This is the second task', done: false }
];

// Define route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || '',
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, description, done } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (done !== undefined) task.done = done;
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
