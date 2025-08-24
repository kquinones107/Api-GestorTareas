const Task = require('../models/Task');

exports.list = async (req, res, next) => {
  try {
    const { q, category } = req.query;
    const where = { user: req.userId };

    if (category && category !== 'Todo') where.category = category;
    if (q) where.title = { $regex: q, $options: 'i' };

    const tasks = await Task.find(where).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, category, dueDate } = req.body;
    const task = await Task.create({
      title,
      category: category || 'Todo',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      user: req.userId
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patch = req.body;

    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'No encontrada' });

    if (patch.title !== undefined) task.title = patch.title;
    if (patch.category !== undefined) task.category = patch.category;
    if (patch.done !== undefined) task.done = patch.done;
    if (patch.dueDate !== undefined) task.dueDate = patch.dueDate ? new Date(patch.dueDate) : null;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'No encontrada' });

    await task.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
