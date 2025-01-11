"use client";
import React, { useState, useEffect } from "react";
import FormTasks from "./components/FormTasks";
import ListTasks from "./components/ListTasks";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Estado para la tarea a editar

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

  // Eliminar una tarea
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

  // Actualizar una tarea
  const updateTask = async (id, updatedTask) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${url}/api/tasks/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const newTaskData = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? newTaskData : task))
        ); // Actualizar el estado con la tarea modificada
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const toggleCompleteTask = async (id) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      if (!taskToToggle) return;

      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      await updateTask(id, updatedTask);
    } catch (error) {
      console.error("Error al alternar el estado de la tarea:", error);
    }
  };

  // Función para seleccionar una tarea para editar
  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  // Función para limpiar el estado de tarea a editar
  const clearTaskToEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestor de Tareas</h1>
      <div className="flex gap-x-10">
        <FormTasks
          addTask={addTask}
          updateTask={updateTask}
          taskToEdit={taskToEdit}
          clearTaskToEdit={clearTaskToEdit}
        />
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <ListTasks
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleCompleteTask={toggleCompleteTask}
            handleEditTask={handleEditTask} // Pasa la función de edición a ListTasks
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
