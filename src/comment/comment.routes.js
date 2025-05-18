import { Router } from 'express';
import { check } from 'express-validator';
import { createComment } from '../comment/comment.controller.js';
import { validateComment } from '../middlewares/validateComment.js';

const router = Router({ mergeParams: true });

router.post(
  '/:id/comments',
  [
    check('id',      'ID de post no válido').isMongoId(),
    check('name',    'El nombre es obligatorio').not().isEmpty(),
    check('content', 'El contenido es obligatorio').not().isEmpty(),
    validateComment
  ],
  createComment
);

export default router;
