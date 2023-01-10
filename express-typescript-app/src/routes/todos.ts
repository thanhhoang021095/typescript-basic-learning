import { Router } from 'express';

import { createTodo, getTodoList, deleteTodo, updateTodo } from '../controllers/todo';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodoList);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;