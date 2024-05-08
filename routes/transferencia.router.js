import { Router } from "express";
import { getLastTenTransactions, createTransaction } from "../controllers/transferencia.controller.js";

const router = Router();

router.get('/', getLastTenTransactions);
router.post('/', createTransaction);


export default router;