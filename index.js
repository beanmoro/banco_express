import express from 'express';
import cuentaRouter from './routes/cuenta.router.js';
import transferenciaRouter from './routes/transferencia.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/cuentas', cuentaRouter);
app.use('/transferencias', transferenciaRouter);

app.listen(PORT, ()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})