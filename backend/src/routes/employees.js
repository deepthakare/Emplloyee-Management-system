import { Router } from 'express';
import { list, read, create, update, remove } from '../controllers/employeesController.js';

const router = Router();

router.get('/', list);            // GET /employees
router.get('/:id', read);         // GET /employees/:id
router.post('/', create);         // POST /employees
router.put('/:id', update);       // PUT /employees/:id
router.delete('/:id', remove);    // DELETE /employees/:id

export default router;
