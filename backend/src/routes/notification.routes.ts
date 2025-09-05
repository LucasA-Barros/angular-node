import { Router } from 'express';
import { notify } from '../controllers/notification.controller.js';

const router = Router();

router.post('/notificar', notify);

export default router;