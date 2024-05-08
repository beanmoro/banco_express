import { TransferenciasModel } from "../models/transferencia.model.js";


export const getAllTransactions = async(req, res)=>{
    try {
        const transactions = await TransferenciasModel.all();
        return res.json(transactions);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

export const getLastTenTransactions = async(req, res)=>{
    try {
        const transaction = await TransferenciasModel.getLastTen();
        console.log(transaction)
        return res.json(transaction);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}


export const createTransaction = async(req, res)=>{
    try {
        const {descripcion, fecha, monto, cuenta_origen, cuenta_destino} = req.body;
        const transaction = await TransferenciasModel.create({descripcion, fecha, monto, cuenta_origen, cuenta_destino});
        console.log(transaction);
        return res.json(transaction);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}