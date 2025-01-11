"use client";
import React from "react";
import TaskCard from "./TaskCard";

function ListTasks({ tasks, deleteTask }) {
  return (
    <div className="bg-slate-200 p-10 m-2 rounded-md w-full">
      <h2 className="text-black font-bold">Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (

           <TaskCard task={task} key={task.id}  deleteTask={deleteTask}/>
            
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTasks;
