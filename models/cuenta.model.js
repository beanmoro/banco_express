import { pool } from '../database/connection.js';


const one = async(id)=>{
    const query = {
        text: `SELECT * FROM cuentas WHERE id= $1;`,
        values: [id]
    }

    const {rows} = await pool.query(query);
    return rows[0];
}


export const CuentaModel = {
    one
}