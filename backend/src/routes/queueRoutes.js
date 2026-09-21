import { Router } from 'express';
import { queueController } from '../controllers/queueController.js';

const router = Router();

router.post('/', queueController.create);
router.get('/:queueId', queueController.getAll);
router.post('/:queueId/enqueue', queueController.enqueue);
router.post('/:queueId/dequeue', queueController.dequeue);
router.get('/:queueId/peek', queueController.peek);
router.get('/:queueId/size', queueController.getSize);
router.get('/:queueId/empty', queueController.isEmpty);
router.delete('/:queueId/clear', queueController.clear);
router.delete('/:queueId', queueController.deleteQueue);
router.get('/:queueId/search', queueController.search);
router.get('/:queueId/array', queueController.toArray);

export default router;