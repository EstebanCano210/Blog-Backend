import Post    from './post.model.js';
import Comment from '../comment/comment.model.js';

const now = () => new Date().toISOString();

export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const post = await Post.create({ title, description, category });

    return res.status(201).json({
      status:    'success',
      code:      201,
      message:   `🎉 ¡Post '${post.title}' creado con éxito!`,
      timestamp: now(),
      data: {
        id:         post._id,
        title:      post.title,
        description:post.description,
        category:   post.category,
        isActive:   post.isActive,
        createdAt:  post.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ No se pudo crear el Post',
      error:     err.message,
      timestamp: now()
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;

    const list = await Post.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return res.json({
      status:    'success',
      code:      200,
      message:   `📋 Obtenidos ${list.length} posts activos`,
      timestamp: now(),
      data:      list.map(p => ({
        id:          p._id,
        title:       p.title,
        description: p.description,
        category:    p.category,
        createdAt:   p.createdAt
      }))
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al listar los Posts',
      error:     err.message,
      timestamp: now()
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, isActive: true })
      .populate('category', 'name');
    if (!post) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No se encontró un post activo con ID '${id}'`,
        timestamp: now()
      });
    }

    const comments = await Comment.find({ post: id })
      .sort({ createdAt: -1 });

    return res.json({
      status:    'success',
      code:      200,
      message:   `✅ Post '${post.title}' y ${comments.length} comentarios`,
      timestamp: now(),
      data: {
        post,
        comments
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al obtener el Post',
      error:     err.message,
      timestamp: now()
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: id, isActive: true },
      { title, description, category },
      { new: true }
    ).populate('category', 'name');

    if (!post) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No se pudo actualizar. Post '${id}' no existe o está desactivado`,
        timestamp: now()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   `✏️ Post '${post.title}' actualizado correctamente`,
      timestamp: now(),
      data:      post
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al actualizar el Post',
      error:     err.message,
      timestamp: now()
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    // Soft-delete: marcamos isActive = false
    const post = await Post.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No existe post con ID '${id}'`,
        timestamp: now()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   `🚫 Post '${post.title}' desactivado correctamente`,
      timestamp: now(),
      data: {
        id:       post._id,
        title:    post.title,
        isActive: post.isActive
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al desactivar el Post',
      error:     err.message,
      timestamp: now()
    });
  }
};
