// Importar Express
const express = require('express');

// Crear aplicación
const app = express();

// Middleware para leer datos en formato JSON
app.use(express.json());

// Simulación de base de datos en memoria
let usuarios = [];

/**
 * Ruta para registrar un usuario
 * Recibe: usuario y password
 */
app.post('/registro', (req, res) => {
  const { usuario, password } = req.body;

  // Validar que lleguen los dos datos
  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  // Guardar usuario en el arreglo
  usuarios.push({ usuario, password });

  // Respuesta exitosa
  res.json({ mensaje: 'Usuario registrado correctamente' });
});

/**
 * Ruta para iniciar sesión
 * Valida si el usuario y la contraseña existen
 */
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Buscar coincidencia en el arreglo de usuarios
  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );

  // Validar autenticación
  if (usuarioEncontrado) {
    res.json({ mensaje: 'Autenticación satisfactoria' });
  } else {
    res.status(401).json({ mensaje: 'Error en la autenticación' });
  }
});

// Puerto del servidor
const PORT = 3001;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});