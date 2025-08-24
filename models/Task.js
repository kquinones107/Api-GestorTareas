const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema(
  {
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    category: {
      type: String,
      enum: ['Todo', 'Personal', 'Trabajar', 'Compartido'],
      default: 'Todo'
    },
    done: { 
        type: Boolean, 
        default: false 
    },
    dueDate: { 
        type: Date 
    },
    user: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
