export const validateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'El nombre de la categoría es obligatorio' });
  }

  next();
};