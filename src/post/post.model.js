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
  image: {
    type: String,
    default: '',
    validate: {
      validator: v => !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v),
      message: props => `'${props.value}' no es una URL de imagen válida`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // Añade createdAt y updatedAt automáticamente
});

export default model('Post', postSchema);