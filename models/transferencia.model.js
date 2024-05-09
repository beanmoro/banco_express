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

    try {
        await pool.query('BEGIN')


        const cuentaOrigenQuery = {
            text: 'SELECT * FROM cuentas WHERE id = $1;',
            values: [cuenta_origen]
        }

        const cuentaRows = await pool.query(cuentaOrigenQuery);
        const cuentaOrigen = cuentaRows.rows[0];

        if(parseInt(cuentaOrigen.saldo) < parseInt(monto)){
            throw Error('Saldo insuficiente!')
        }

        const updateCuentaOrigenQuery = {
            text: 'UPDATE cuentas SET saldo = saldo - $2 WHERE id = $1;',
            values: [cuenta_origen, monto]
        }

        const updateCuentaDestinoQuery = {
            text: 'UPDATE cuentas SET saldo = saldo + $2 WHERE id = $1;',
            values: [cuenta_destino, monto]
        }

        await pool.query(updateCuentaOrigenQuery);
        await pool.query(updateCuentaDestinoQuery);


        const query = {
            text: `INSERT INTO transferencias(descripcion, fecha, monto, cuenta_origen, cuenta_destino)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            values: [descripcion, fecha, monto, cuenta_origen, cuenta_destino]
        }
    
        const {rows} = await pool.query(query);
        await pool.query('COMMIT')
        return rows[0];
        
    } catch (error) {
        console.error(error);
        await pool.query('ROLLBACK')
        return { error};
    }


}


export const TransferenciasModel = {
    all,
    getLastTen,
    create
}