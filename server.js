const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');

const app = express();
const PORT = 3000;

//Definiendo assets como publico
app.use(express.static(path.join(__dirname, 'assets')));

//Middleware para revisar la url
app.use(express.urlencoded({ extended: true }));

//Vista default hacia el formulario con el html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//funcion post con jimp para realizar los cambios en la imagen
app.post('/submit', async (req, res) => {    
  // definiendo la url recibida 
  const { url } = req.body;
  //agregando un uuid de 6 caracteres para almacenarlos como el nobmre la imagen
  const imagenId = uuidv4().slice(0, 6);
  //funcion jimp
  Jimp.read(url, (err, imagen) => {
    if (err) {
      console.error('Error al leer la imagen:', err);
      return res.status(500).send('Error al procesar la imagen');
    }
    //cambios esn la imagen 
    imagen.greyscale()
          .resize(350, 350)
          //directorio para guardar imagen
          .write(path.join(__dirname, 'assets', 'images',  `${imagenId}.jpg`), (err) => {
            if (err) {
              console.error('Error al escribir la imagen:', err);
              return res.status(500).send('Error al procesar la imagen');
            }
            console.log('Imagen procesada y guardada como:', `${imagenId}.jpg`);
            res.sendFile(path.join(__dirname, 'assets', 'images', `${imagenId}.jpg`));
          });
  });
  console.log('URL:', url);
  console.log('Imagen ID:', imagenId);
 
});

app.listen(PORT, () => {
  console.log(`Servidor andando en el puerto ${PORT}`);
});
