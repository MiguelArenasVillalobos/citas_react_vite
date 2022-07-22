import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombreMascota, setNombreMascota] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      const { nombreMascota, nombrePropietario, email, fecha, sintomas } = paciente;
      setNombreMascota(nombreMascota)
      setNombrePropietario(nombrePropietario)
      setEmail(email)
      setFecha(fecha)
      setSintomas(sintomas)
    }
  }, [paciente])

  const generarId = () => { 
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del Formulario
    if([nombreMascota, nombrePropietario, email, fecha, sintomas].includes('')) {
      // console.log('Hay al menos un campo vacio')

      setError(true)
      return
    }

    setError(false)
    
    
    // Objeto de Paciente
    const objetoPaciente = {
      nombreMascota,
      nombrePropietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPaciente({})
    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }
    
    // console.log(objetoPaciente);
    

    // Reiniciar el form
    setNombreMascota('')
    setNombrePropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  return (
    <div className="md:w-1/2 lg:w2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="nombre_mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input id="mascota" type="text" className="border-2 w-full p-2 mt-2 +-placeholder-gray-400 rounded-md" placeholder="Nombre de la Mascota"
                  value={nombreMascota} onChange={ (e) => setNombreMascota(e.target.value) } />
        </div>

        <div className="mb-5">
          <label htmlFor="nombre_propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="nombre_propietario" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario"
                  value={nombrePropietario} onChange={ (e) => setNombrePropietario(e.target.value) } />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Ejemplo: juan@gmail.com"
                  value={email} onChange={ (e) => setEmail(e.target.value) } />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={fecha} onChange={ (e) => setFecha(e.target.value) } />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea placeholder="Describe los Sintomas" id="sintomas" cols="30" rows="10" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas} onChange={ (e) => setSintomas(e.target.value) } />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  )
}

export default Formulario