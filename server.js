const express = require('express');
const { execFile } = require('child_process');
const net = require('net');
const rateLimit = require('express-rate-limit');

const app = express();

// Oculta la cabecera X-Powered-By (CWE-200)
app.disable('x-powered-by');
app.use(express.json());

// Límite de 10 peticiones por minuto en /ping (CWE-770)
const pingLimiter = rateLimit({ windowMs: 60 * 1000, limit: 10 });

// V1: sin shell y con validación de la entrada (CWE-78)
app.get('/ping', pingLimiter, (req, res) => {
    const ip = String(req.query.ip || '');
    if (net.isIP(ip) === 0) {
        return res.status(400).json({ error: 'IP inválida' });
    }
    const flag = process.platform === 'win32' ? '-n' : '-c';
    execFile('ping', [flag, '1', ip], { timeout: 5000 }, (err, stdout) => {
        if (err) return res.status(500).json({ error: 'ping falló' });
        res.type('text/plain').send(stdout);
    });
});

// V3: el secreto viene del entorno y nunca se devuelve (CWE-798)
const DB_PASSWORD = process.env.DB_PASSWORD;
if (!DB_PASSWORD) console.warn('Aviso: DB_PASSWORD no está definida');

app.get('/config', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});