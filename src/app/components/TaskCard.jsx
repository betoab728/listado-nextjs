import React from 'react'


function TaskCard({ task,deleteTask,toggleCompleteTask  }) {

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`)) {
      deleteTask(task.id); // Solo elimina si el usuario confirma
    }
  };

  const handleComplete = async (id) => {
    console.log('completar tarea',id)

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res= await fetch(`${url}/api/tasks/${id}/done/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        toggleCompleteTask(task.id);
      }

    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }

  }


  return (
    <div className="bg-slate-500 p-4 rounded-md mb-2 flex justify-between  items-center" >
    <div>
      <h2 className=" font-bold">
        {task.title}
        {task.completed && <span>✅</span>}
      </h2>
      <p className="">{task.description}</p>
    </div>
    <div className="flex gap-x-2 justify-between">

      <button className= {" text-white rounded-md p-2 " + (task.completed ? "bg-gray-400" : "bg-green-400") }
      onClick={()=>handleComplete(task.id)}
      > {task.completed ? "Desmarcar" : "Marcar"  } </button>

      <button className="bg-indigo-400 text-white rounded-md p-2">Editar</button>
      <button className="bg-red-400 text-white rounded-md p-2"
      onClick={handleDelete}
      >Eliminar</button>  
    </div>
</div>
  )
}

export default TaskCard