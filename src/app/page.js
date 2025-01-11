"use client";
import React, { useState, useEffect } from "react";
import FormTasks from "./components/FormTasks";
import ListTasks from "./components/ListTasks";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar las tareas desde el backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${url}/api/tasks/`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(); // Cargar tareas al montar el componente
  }, []);

  // Agregar una nueva tarea
  const addTask = async (task) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${url}/api/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]); // Actualizar el estado con la nueva tarea
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  //eliminar una tarea
  const deleteTask = async (id) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      await fetch(`${url}/api/tasks/${id}/`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Actualizar el estado eliminando la tarea
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const toggleCompleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Home Page</h1>
      <div className="flex gap-x-10">
        <FormTasks addTask={addTask} />
        {loading ? <p>Cargando tareas...</p> : <ListTasks tasks={tasks} deleteTask={deleteTask} toggleCompleteTask={toggleCompleteTask} />}
      </div>
    </div>
  );
}

export default HomePage;
