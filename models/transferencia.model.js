import { pool } from '../database/connection.js';

const all = async()=>{
    const query = {
        text: `SELECT * FROM transferencias ORDER BY fecha ASC`,
        values: []
    }

    const {rows} = await pool.query(query);
    return rows;
}


const getLastTen = async()=>{
    const query = {
        text: `SELECT * FROM transferencias ORDER BY fecha DESC LIMIT 10;`,
        values: []
    }

    const {rows} = await pool.query(query);
    return rows;
}



const create = async({descripcion, fecha, monto, cuenta_origen, cuenta_destino})=>{
    const query = {
        text: `INSERT INTO transferencias(descripcion, fecha, monto, cuenta_origen, cuenta_destino)
                VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        values: [descripcion, fecha, monto, cuenta_origen, cuenta_destino]
    }

    const {rows} = await pool.query(query);
    return rows[0];
}


export const TransferenciasModel = {
    all,
    getLastTen,
    create
}