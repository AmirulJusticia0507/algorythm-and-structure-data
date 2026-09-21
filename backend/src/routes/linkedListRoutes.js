import { Router } from 'express';
import { linkedListController } from '../controllers/linkedListController.js';

const router = Router();

router.post('/', linkedListController.create);
router.get('/:listId', linkedListController.getAll);
router.get('/:listId/head', linkedListController.getHead);
router.post('/:listId/head', linkedListController.insertAtHead);
router.post('/:listId/tail', linkedListController.insertAtTail);
router.post('/:listId/position', linkedListController.insertAtPosition);
router.delete('/:listId/position/:position', linkedListController.deleteAtPosition);
router.delete('/:listId/head', linkedListController.deleteHead);
router.delete('/:listId/tail', linkedListController.deleteTail);
router.get('/:listId/search', linkedListController.search);
router.get('/:listId/size', linkedListController.getSize);
router.delete('/:listId/clear', linkedListController.clear);
router.delete('/:listId', linkedListController.deleteList);
router.get('/:listId/array', linkedListController.toArray);

export default router;