import { Router } from 'express';
import { stackController } from '../controllers/stackController.js';

const router = Router();

router.post('/', stackController.create);
router.get('/:stackId', stackController.getAll);
router.post('/:stackId/push', stackController.push);
router.post('/:stackId/pop', stackController.pop);
router.get('/:stackId/peek', stackController.peek);
router.get('/:stackId/size', stackController.getSize);
router.get('/:stackId/empty', stackController.isEmpty);
router.delete('/:stackId/clear', stackController.clear);
router.delete('/:stackId', stackController.deleteStack);
router.get('/:stackId/search', stackController.search);
router.get('/:stackId/array', stackController.toArray);

export default router;