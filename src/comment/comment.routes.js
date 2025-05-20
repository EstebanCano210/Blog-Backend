import { Router } from 'express';
import { check }  from 'express-validator';
import {
  createComment,
  updateComment,
  deleteComment
} from './comment.controller.js';
import { validateComment } from '../middlewares/validateComment.js';

const router = Router({ mergeParams: true });

router.post(
  '/:postId/comments/',
  [
    check('postId', 'ID de post no válido').isMongoId(),
    check('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    check('content', 'El contenido es obligatorio').notEmpty(),
    validateComment
  ],
  createComment
);

router.put(
  '/:postId/comments/:id',
  [
    check('postId', 'ID de post no válido').isMongoId(),
    check('id',     'ID de comentario no válido').isMongoId(),
    check('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    check('content', 'El contenido es obligatorio').notEmpty(),
    validateComment
  ],
  updateComment
);

router.delete(
  '/:postId/comments/:id',
  [
    check('postId', 'ID de post no válido').isMongoId(),
    check('id',     'ID de comentario no válido').isMongoId(),
  ],
  deleteComment
);

export default router;
