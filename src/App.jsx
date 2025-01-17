import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Inicio } from './navegacion/Inicio';
import { Favoritos } from './navegacion/Favoritos';
import { Buscador } from './navegacion/Buscador';
import { Chats } from './navegacion/Chats';
import { Perfil } from './navegacion/Perfil';

import './App.css'

import {NavBar} from "./components/navbar/NavBar"
function App() {
  

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element = {<Inicio/>} />
        <Route path='/favoritos' element = {<Favoritos/>} />
        <Route path='/buscador' element = {<Buscador/>} />
        <Route path='/chats' element = {<Chats/>} />
        <Route path='/perfil' element = {<Perfil/>} />
      </Routes>
    </Router>
  )
}

export default App
