import { CuentaModel } from "../models/cuenta.model.js";

export const getAccountById = async(req, res)=>{
    try {
        const { id } = req.params
        const account = await CuentaModel.one(id);
        console.log(account.saldo);
        res.json(account);
    } catch (error) {
        console.error(error);
        res.json(error);
    }


}