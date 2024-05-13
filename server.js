const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });       

app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}`);
});