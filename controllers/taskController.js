// controllers/taskController.js
const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort('createdAt');
        res.send(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const task = new Task({ userId: req.user._id, title, description });
        await task.save();
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.editTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.send({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { status: 'completed' },
            { new: true }
        );
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};
