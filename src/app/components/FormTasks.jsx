"use client"
import React, { use } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

function FormTasks() {

  const [title, setTitle ] = useState('')
  const [description, setDescription ] = useState('')
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title, description)
    const url=process.env.NEXT_PUBLIC_BACKEND_URL

    const response = await fetch(`${url}/api/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
    const data = await response.json()
    console.log(data)
   
   

  }

  return (
    <div className="bg-slate-200 p-10 m-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold">Crear Tarea</h2>

        <label htmlFor="title" className="text-xs text-black">Título</label>

        <input type="text" placeholder="Título" name="title"
        className="bg-slate-400 p-2 rounded-md block w-full text-slate-800"
        onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="text-xs text-black" >Descripcion</label>

        <textarea name="description" id="" cols="30" rows="5" placeholder="Descripción"
        className="bg-slate-400 p-2 mt-2 rounded-md block w-full text-slate-800"
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" 
        className="bg-green-600 p-4 rounded-md w-full mt-2 hover:bg-green-700 text-white"
        onChange={(e) => setDescription(e.target.value)}
        >Guardar</button>

 
       </form> 
    </div>
  )
}

export default FormTasks