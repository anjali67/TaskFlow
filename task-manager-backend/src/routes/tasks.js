const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();

//Create a new task
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//Get a specific task
router.get('/:id',auth , async (req,res) => {
   try {
      const task = await Task.findOne({_id: req.params.id , user: req.user.id})
      if(!task) {
         res.status(400).json({msg:"Task not found"})
      }
      res.json(task)    
   } catch (error) {
     if(error.kind === 'ObjectId') {
      res.status(400).json({msg:"Invalid task id"})   
     }

     res.status(500).json({msg:"Server error"})
   }
})


//Update a task
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;