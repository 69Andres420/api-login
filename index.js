
// Importar Express
const express = require('express');

// Crear aplicación
const app = express();

// Middleware para leer datos JSON
app.use(express.json());

// Arreglo para usuarios
let usuarios = [];

// Arreglo para pacientes
let pacientes = [];

// Contador simple para IDs
let contadorPacientes = 1;

/**
 * Endpoint para registrar usuario
 */
app.post('/registro', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const existeUsuario = usuarios.find((u) => u.usuario === usuario);

  if (existeUsuario) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  usuarios.push({ usuario, password });

  res.json({ mensaje: 'Usuario registrado correctamente' });
});

/**
 * Endpoint para iniciar sesión
 */
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );

  if (usuarioEncontrado) {
    res.json({ mensaje: 'Autenticación satisfactoria' });
  } else {
    res.status(401).json({ mensaje: 'Error en la autenticación' });
  }
});

/**
 * Endpoint para listar pacientes
 */
app.get('/pacientes', (req, res) => {
  res.json(pacientes);
});

/**
 * Endpoint para registrar un paciente
 */
app.post('/pacientes', (req, res) => {
  const { nombre, documento, correo, edad } = req.body;

  if (!nombre || !documento || !correo || !edad) {
    return res.status(400).json({ mensaje: 'Datos incompletos del paciente' });
  }

  const nuevoPaciente = {
    id: contadorPacientes++,
    nombre,
    documento,
    correo,
    edad
  };

  pacientes.push(nuevoPaciente);

  res.json({
    mensaje: 'Paciente registrado correctamente',
    paciente: nuevoPaciente
  });
});

/**
 * Endpoint para actualizar un paciente por ID
 */
app.put('/pacientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, documento, correo, edad } = req.body;

  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return res.status(404).json({ mensaje: 'Paciente no encontrado' });
  }

  paciente.nombre = nombre || paciente.nombre;
  paciente.documento = documento || paciente.documento;
  paciente.correo = correo || paciente.correo;
  paciente.edad = edad || paciente.edad;

  res.json({
    mensaje: 'Paciente actualizado correctamente',
    paciente
  });
});

/**
 * Endpoint para eliminar un paciente por ID
 */
app.delete('/pacientes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const indice = pacientes.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Paciente no encontrado' });
  }

  pacientes.splice(indice, 1);

  res.json({ mensaje: 'Paciente eliminado correctamente' });
});

// Puerto del servidor
const PORT = 3001;

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});