import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es obligatoria']
  },
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true 
});

export default model('Post', postSchema);
