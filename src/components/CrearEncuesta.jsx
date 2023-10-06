import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = ({ agregarEncuesta }) => {
  const navigate = useNavigate();

  const [encuesta, setEncuesta] = useState({
    titulo: '',
    descripcion: '',
    preguntas: [],
    nuevaPregunta: '',
    nuevaOpcion: '',
  });

  const [botonAgregarPreguntaDeshabilitado, setBotonAgregarPreguntaDeshabilitado] = useState(true);


  const [mensajeExito, setMensajeExito] = useState('');
  const [tituloExcedeMax, setTituloExcedeMax] = useState(false); // Nuevo estado para la advertencia de título
  const [descripcionExcedeMax, setDescripcionExcedeMax] = useState(false); // Nuevo estado para la advertencia de descripción

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncuesta({ ...encuesta, [name]: value });

// Verificar si los campos de título y descripción están llenos para habilitar/deshabilitar el botón de "Agregar Pregunta"
const isTituloDescripcionNotEmpty = encuesta.titulo.trim() !== '' && encuesta.descripcion.trim() !== '' &&
encuesta.nuevaPregunta.trim() !== '' && encuesta.nuevaOpcion.trim() !== '';
setBotonAgregarPreguntaDeshabilitado(!isTituloDescripcionNotEmpty);

// Validar longitud máxima del título
    if (name === 'titulo' && value.length > 50) {
      setTituloExcedeMax(true);
    } else {
      setTituloExcedeMax(false);
    }

    // Validar longitud máxima de la descripción
    if (name === 'descripcion' && value.length > 200) {
      setDescripcionExcedeMax(true);
    } else {
      setDescripcionExcedeMax(false);
    }

    setEncuesta({ ...encuesta, [name]: value });
  };

  const agregarPregunta = () => {
    if (encuesta.nuevaPregunta.trim() === '') {
      return;
    }

    // Validar que haya al menos dos opciones ingresadas
    const opciones = encuesta.nuevaOpcion.split(',').map((opcion) => opcion.trim());
    if (opciones.length < 2) {
      alert('Debes ingresar al menos dos opciones.');
      return;
    }


    const nuevaPregunta = {
      pregunta: encuesta.nuevaPregunta,
      opciones: opciones.map((opcion) => ({
        texto: opcion,
      })),
    };

    setEncuesta({
      ...encuesta,
      preguntas: [...encuesta.preguntas, nuevaPregunta],
      nuevaPregunta: '',
      nuevaOpcion: '',
    });
  };

  const guardarEncuesta = () => {
    if (encuesta.titulo.trim() === '' || encuesta.descripcion.trim() === '') {
      alert('Por favor, completa el título y la descripción de la encuesta.');
      return;
    }

    

    if (encuesta.preguntas.length === 0) {
      alert('Por favor, ingresa una pregunta y al menos dos opciones antes de guardar la encuesta.');
      return;
    }

if (tituloExcedeMax) {
      alert('El título no puede exceder los 50 caracteres.');
      return;
    }

    if (descripcionExcedeMax) {
      alert('La descripción no puede exceder los 200 caracteres.');
      return;
    }

    agregarEncuesta({
      ...encuesta,
      preguntas: [...encuesta.preguntas],
    });

    setMensajeExito('Encuesta agregada con éxito. Redireccionando en 5 segundos...');

    // Limpia el estado después de guardar la encuesta
    setEncuesta({
      titulo: '',
      descripcion: '',
      preguntas: [],
      nuevaPregunta: '',
      nuevaOpcion: '',
    });

    // Redirección después de 5 segundos
    setTimeout(() => {
      setMensajeExito('');
      navigate('/'); // Redirige a la página de inicio
    }, 5000);
  };

  return (
    <div>
      <h1>Crear Nueva Encuesta</h1>
      {mensajeExito && <p>{mensajeExito}</p>}
      <form>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={encuesta.titulo}
          onChange={handleChange}
          required
        maxLength="51" // Agregar la restricción de longitud máxima
        />
        {tituloExcedeMax && <p>El título no puede exceder los 50 caracteres.</p>} {/* Mostrar advertencia si se excede el límite */}

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={encuesta.descripcion}
          onChange={handleChange}
          required
        maxLength="201" // Agregar la restricción de longitud máxima
          placeholder="Máximo 200 caracteres" // Placeholder actualizado
        />
        {descripcionExcedeMax && <p>La descripción no puede exceder los 200 caracteres.</p>} {/* Mostrar advertencia si se excede el límite */}

        <label>Nueva Pregunta:</label>
        <input
          type="text"
          name="nuevaPregunta"
          value={encuesta.nuevaPregunta}
          onChange={handleChange}
          disabled={!encuesta.titulo || !encuesta.descripcion}
        />

        <label>Opciones (separadas por coma):</label>
        <input
          type="text"
          name="nuevaOpcion"
          value={encuesta.nuevaOpcion}
          onChange={handleChange}
          disabled={!encuesta.titulo || !encuesta.descripcion}
          placeholder="Mínimo dos opciones. Ejemplo: perro, gato, etc."
        />

        {/* Mostrar las preguntas y opciones ingresadas */}
        {encuesta.preguntas.map((pregunta, index) => (
          <div key={index}>
            <p>Pregunta: {pregunta.pregunta}</p>
            <ul>
              {pregunta.opciones.map((opcion, opcionIndex) => (
                <li key={opcionIndex}>Opción: {opcion.texto}</li>
              ))}
            </ul>
          </div>
        ))}
        
        <button
        type="button"
        onClick={agregarPregunta}
        className={botonAgregarPreguntaDeshabilitado ? 'button-disabled' : ''}
        disabled={botonAgregarPreguntaDeshabilitado}
      >
        Agregar Pregunta
      </button>

        <button type="button" onClick={guardarEncuesta}>
          Guardar Encuesta
        </button>
      </form>
    </div>
  );
};

export default CrearEncuesta;

