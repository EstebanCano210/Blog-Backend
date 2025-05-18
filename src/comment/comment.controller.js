import Comment from './comment.model.js';
import Post    from '../post/post.model.js';

const now = () => new Date().toISOString();

export const createComment = async (req, res) => {
  try {
    const { id: postId } = req.params;
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