const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// Vulnerabilidad SAST 1: Inyección de comandos / Ejecución insegura (CWE-78)
app.get('/ping', (req, res) => {
    const ip = req.query.ip;
    // Mal uso de exec concatenando entrada de usuario directamente
    exec(`ping -c 1 ${ip}`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error: ${stderr}`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

// Vulnerabilidad SAST 2: Hardcoded Secrets / Credencial expuesta (CWE-798)
const DB_PASSWORD = "SuperSecretPassword123!"; 

app.get('/config', (req, res) => {
    res.json({ status: "OK", password: DB_PASSWORD });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
