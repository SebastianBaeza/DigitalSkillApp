const express = require('express');
const { PythonShell } = require('python-shell');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run-python', (req, res) => {
    let { pythonCode } = req.body;
    console.log("codigo:\n",pythonCode);


    PythonShell.runString(pythonCode, null, (err, results) => {
        if (err) {return res.status(500).json({ error: err.message });}
        console.log("Error:",err);
        res.json({ results });
        console.log("Resultado:",results);
    });
});

const PORT = process.env.PORT || 3000;
console.log(`Port: ${PORT}`);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
