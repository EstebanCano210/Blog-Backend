import Comment from './comment.model.js';
import Post    from '../post/post.model.js';

const now = () => new Date().toISOString();

// — Crear comentario — //
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { name, content } = req.body;

    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No se encontró post activo con ID '${postId}'`,
        timestamp: now()
      });
    }

    const comment = await Comment.create({ post: postId, name, content });

    return res.status(201).json({
      status:    'success',
      code:      201,
      message:   `💬 Comentario agregado por '${comment.name}'`,
      timestamp: now(),
      data: {
        id:        comment._id,
        post:      comment.post,
        name:      comment.name,
        content:   comment.content,
        createdAt: comment.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al crear el comentario',
      error:     err.message,
      timestamp: now()
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id, postId } = req.params;
    const { name, content } = req.body;

    const comment = await Comment.findOneAndUpdate(
      { _id: id, post: postId },
      { 
        name:    name?.trim() || 'Anónimo', 
        content: content.trim() 
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No se encontró el comentario con ID '${id}'`,
        timestamp: new Date().toISOString()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   '✏️ Comentario actualizado correctamente',
      comment,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error interno al actualizar el comentario',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, postId } = req.params;

    const comment = await Comment.findOneAndDelete({ _id: id, post: postId });

    if (!comment) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No existe comentario con ID '${id}' en el post '${postId}'`,
        timestamp: new Date().toISOString()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   '🗑️ Comentario eliminado correctamente',
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error interno al eliminar el comentario',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};