const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    priority: {
      type: String,
      required: true,
      default: 'Medium',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;