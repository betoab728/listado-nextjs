"use client";
import React, { useState } from "react";

function FormTasks({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      await addTask({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="bg-slate-200 p-10 m-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold">Crear Tarea</h2>

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
          className="bg-green-600 p-4 rounded-md w-full mt-2 hover:bg-green-700 text-white"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default FormTasks;
