import express from 'express';
import {
  addContractHandler,
  deleteContactHandler,
  getContractHandler,
  getOneContractHandler,
  updateContractHandler,
} from '../controller/movie.controller';
import validate from '../middlewares/validate';
import {
  addMovieSchema,
  deleteMovieSchema,
  getOneMovieSchema,
  updateMovieSchema,
} from '../zod_schema/movie.zodSchema';

const router = express.Router();

router.get('/', getContractHandler);
router.get('/one', validate(getOneMovieSchema), getOneContractHandler);
router.post('/', validate(addMovieSchema), addContractHandler);
router.put('/:id', validate(updateMovieSchema), updateContractHandler);
router.delete('/:id', validate(deleteMovieSchema), deleteContactHandler);

export default router;