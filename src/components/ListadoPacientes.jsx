import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {

  return (
    <div className="md:w-1/2 lg:3/5">

      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl text-center mt-5 mb-10">Administra tus <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>

          <div id="pacientes" className="md:overflow-y-scroll md:h-screen">
            {pacientes.map(paciente => (
              <Paciente
                key={paciente.id}
                paciente={paciente}
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl text-center mt-5 mb-10">Comienza agregando pacientes <span className="text-indigo-600 font-bold">y pareceran en este lugar</span></p>
        </>
      )}


    </div>
  )
}

export default ListadoPacientes