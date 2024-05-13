import React from 'react'
import Registration from './components/Registration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Nav from './components/Nav'
import CreateRecipe from './components/CreateRecipe'
import SavedRecipe from './components/SavedRecipe'
import ReadRecipe from './components/ReadRecipe'
import MyRecipes from './components/MyRecipes'
import "./components/Home.css"
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth/register' element={<Registration />}></Route>
        <Route path='/auth/login' element={<Login />}></Route>
        <Route path='/recipe/create-recipe' element={<CreateRecipe />}></Route>
        <Route path='/recipe/saved-recipe' element={<SavedRecipe />}></Route>
        <Route path='/read-recipe/:id' element={<ReadRecipe />}></Route>
        <Route path='/myrecipes' element={<MyRecipes/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  )
}

export default App