import React from 'react'

export const dynamic="force-dynamic"

async function   loadTasks() {
  const url=process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(`${url}/api/tasks/`)
  const tasks = await response.json()
  return tasks
}

async function ListTasks() {

  const tasks = await loadTasks()
  console.log(tasks)

  return (
    <div className="bg-slate-700 p-4 w-full">
      <h1>ListTasks</h1>

   
      {tasks.map((task) => {
        return (
          <div key={task.id} className="bg-slate-500 p-4 rounded-md mb-2 flex justify-between">
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
      )}

    </div>
  )
}
export default ListTasks