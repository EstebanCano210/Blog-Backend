export const validateComment = (req, res, next) => {
  const { name, content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      status:  'error',
      code:    400,
      message: '❌ El contenido es obligatorio',
    });
  }

  if (!name || !name.trim()) {
    req.body.name = 'Anónimo';
  } else {
    req.body.name = name.trim();
  }

  next();
};
