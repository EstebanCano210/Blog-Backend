import { Router } from 'express';
import { check } from 'express-validator';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../category/category.controller.js';
import { validateCategory } from '../middlewares/validateCategory.js';

const router = Router();

router.post(
  '/',
  [
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    validateCategory
  ],
  createCategory
);

router.get('/', getCategories);

router.put(
  '/:id',
  [
    check('id',   'ID de categoría no válido').isMongoId(),
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    validateCategory
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    check('id', 'ID de categoría no válido').isMongoId()
  ],
  deleteCategory
);

export default router;
