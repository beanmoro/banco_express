import { Router } from 'express';
import { getAccountById } from "../controllers/cuenta.controller.js";

const router = Router();

router.get('/:id', getAccountById);

export default router;