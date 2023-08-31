import { Router } from 'express';
import llmRoutes from './llm';

const router = Router();

router.use('/llm', llmRoutes);

export default router;
