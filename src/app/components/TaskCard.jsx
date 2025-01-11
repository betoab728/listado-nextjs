import React from 'react'


function TaskCard({ task }) {
  return (
    <div className="bg-slate-500 p-4 rounded-md mb-2 flex justify-between" >
    <div>
      <h2 className=" font-bold">{task.title}</h2>
      <p className="">{task.description}</p>
    </div>
    <div className="flex gap-x-2 justify-between">
      <button className="bg-indigo-400 text-white rounded-md p-2">Editar</button>
      <button className="bg-red-400 text-white rounded-md p-2">Eliminar</button>  
    </div>
</div>
  )
}

export default TaskCard