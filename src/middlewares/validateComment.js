export const validateComment = (req, res, next) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  next();
};
