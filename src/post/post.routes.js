import { Router } from 'express';
import { check } from 'express-validator';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from '../post/post.controller.js';
import { validatePost } from '../middlewares/validatePost.js';

const router = Router();

router.post(
  '/',
  [
    check('title',       'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('category',    'La categoría es obligatoria').not().isEmpty(),
    check('category',    'No es un ID de categoría válido').isMongoId(),
    validatePost
  ],
  createPost
);

router.get('/', getPosts);

router.get(
  '/:id',
  [
    check('id', 'ID de post no válido').isMongoId()
  ],
  getPostById
);

router.put(
  '/:id',
  [
    check('id',          'ID de post no válido').isMongoId(),
    check('title',       'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('category',    'La categoría es obligatoria').not().isEmpty(),
    check('category',    'No es un ID de categoría válido').isMongoId(),
    validatePost
  ],
  updatePost
);

router.delete(
  '/:id',
  [
    check('id', 'ID de post no válido').isMongoId()
  ],
  deletePost
);


export default router;
