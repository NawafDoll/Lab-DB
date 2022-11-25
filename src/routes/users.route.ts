import express from 'express';
import {
  addContractHandler,
  deleteContactHandler,
  getContractHandler,
  getOneContractHandler,
  updateContractHandler,
  getEmailHandler,
 getAgeHandler 
} from '../controller/users.controller';
import validate from '../middlewares/validate';
import {
  addUserSchema,
  deleteUserSchema,
  getOneUserSchema,
  updateUserSchema,
} from '../zod_schema/users.zodStchema';

const router = express.Router();

router.get('/', getContractHandler);
router.get('/one', validate(getOneUserSchema), getOneContractHandler);
router.post('/', validate(addUserSchema), addContractHandler);
router.put('/:id', validate(updateUserSchema), updateContractHandler);
router.delete('/:id', validate(deleteUserSchema), deleteContactHandler);
router.get('/:email', validate(getOneUserSchema), getEmailHandler);
router.get('/:age', validate(getOneUserSchema), getAgeHandler);


export default router;