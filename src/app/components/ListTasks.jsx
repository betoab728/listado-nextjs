"use client";
import React from "react";

function ListTasks({ tasks }) {
  return (
    <div className="bg-slate-200 p-10 m-2 rounded-md w-full">
      <h2 className="text-black font-bold">Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (

            <div key={task.id} className="bg-slate-500 p-4 rounded-md mb-2 flex justify-between" >
                  <div>
                    <h2 className=" font-bold">{task.title}</h2>
                    <p className="">{task.description}</p>
                  </div>
                  <div className="flex gap-x-2 justify-between">
                    <button className="bg-indigo-400 text-white rounded-md p-2">Editar</button>
                    <button className="bg-red-400 text-white rounded-md p-2">Eliminar</button>  
                  </div>
            </div>
            
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTasks;
