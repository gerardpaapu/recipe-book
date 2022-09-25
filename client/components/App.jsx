import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Recipe from './Recipe'
import Recipes from './Recipes'

function App() {
  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <Routes>
          <Route element={<Recipe />} path="/:id" />
          <Route element={<Recipes />} path="/" />
        </Routes>
      </div>
    </>
  )
}

export default App
