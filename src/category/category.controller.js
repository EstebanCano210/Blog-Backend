// src/category/category.controller.js
import Category from './category.model.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });

    return res.status(201).json({
      status:    'success',
      code:      201,
      message:   `🎉 ¡Categoría '${category.name}' creada exitosamente! 🎉`,
      timestamp: new Date().toISOString(),
      data: {
        id:        category._id,
        name:      category.name,
        isActive:  category.isActive,
        createdAt: category.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Ocurrió un problema al crear la categoría',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const list = await Category.find({ isActive: true }).sort('name');

    return res.json({
      status:    'success',
      code:      200,
      message:   `📋 Se encontraron ${list.length} categorías activas`,
      timestamp: new Date().toISOString(),
      data:      list.map(cat => ({
        id:        cat._id,
        name:      cat.name,
        createdAt: cat.createdAt
      }))
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al obtener categorías',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id }   = req.params;
    const { name } = req.body;

    const cat = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!cat) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No existe categoría con ID '${id}'`,
        timestamp: new Date().toISOString()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   `✏️ Categoría actualizada a '${cat.name}'`,
      timestamp: new Date().toISOString(),
      data: {
        id:        cat._id,
        name:      cat.name,
        isActive:  cat.isActive,
        createdAt: cat.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al actualizar la categoría',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const cat = await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!cat) {
      return res.status(404).json({
        status:    'error',
        code:      404,
        message:   `⚠️ No existe categoría con ID '${id}'`,
        timestamp: new Date().toISOString()
      });
    }

    return res.json({
      status:    'success',
      code:      200,
      message:   `🚫 Categoría '${cat.name}' desactivada correctamente`,
      timestamp: new Date().toISOString(),
      data: {
        id:        cat._id,
        name:      cat.name,
        isActive:  cat.isActive
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status:    'error',
      code:      500,
      message:   '❌ Error al desactivar la categoría',
      error:     err.message,
      timestamp: new Date().toISOString()
    });
  }
};
