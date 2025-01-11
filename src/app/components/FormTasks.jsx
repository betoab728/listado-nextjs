"use client";
import React, { useState, useEffect } from "react";

function FormTasks({ addTask, updateTask, taskToEdit, clearTaskToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Efecto para rellenar los campos cuando se va a editar una tarea
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      if (taskToEdit) {
        // Si hay una tarea a editar, se llama a updateTask
        await updateTask(taskToEdit.id, { title, description });
        clearTaskToEdit(); // Limpiar el estado de edición
      } else {
        // Si no hay tarea a editar, se agrega una nueva tarea
        await addTask({ title, description });
      }

      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="bg-slate-200 p-10 m-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold">
          {taskToEdit ? "Editar Tarea" : "Crear Tarea"}
        </h2>

        <label htmlFor="title" className="text-xs text-black">
          Título
        </label>
        <input
          type="text"
          placeholder="Título"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-400 p-2 rounded-md block w-full text-slate-800"
        />

        <label htmlFor="description" className="text-xs text-black">
          Descripción
        </label>
        <textarea
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-400 p-2 mt-2 rounded-md block w-full text-slate-800"
        ></textarea>

        <button
          type="submit"
          className={`p-4 rounded-md w-full mt-2 text-white ${
            taskToEdit
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {taskToEdit ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default FormTasks;
