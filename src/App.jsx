import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Inicio } from './navegacion/Inicio';
import { Favoritos } from './navegacion/Favoritos';
import { Buscador } from './navegacion/Buscador';
import { Chats } from './navegacion/Chats';
import { Perfil } from './navegacion/Perfil';

import './App.css'
import React from "react";
import { Login } from "./views/login";
import { Register } from "./views/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext'
import { Profile } from './views/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostsView from './views/PostsView';
import PostSingleView from "./views/PostSingleView";



import {NavBar} from "./components/navbar/NavBar"
function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts-list" element={<PostsView />} />
          <Route path="/posts-list/:id" element={<PostSingleView />} />
          <Route path='/' element = {<Inicio/>} />
          <Route path='/favoritos' element = {<Favoritos/>} />
          <Route path='/buscador' element = {<Buscador/>} />
          <Route path='/chats' element = {<Chats/>} />
          <Route path='/perfil' element = {<Perfil/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;
