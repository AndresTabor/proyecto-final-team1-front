import 'bootstrap/dist/css/bootstrap.min.css';
import { Inicio } from './navegacion/Inicio';
import { Favoritos } from './navegacion/Favoritos';
import { Chats } from './navegacion/Chats';
import React from "react";
import { Login } from "./views/login";
import { Register } from "./views/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext'
import { Profile } from './views/profile';
import PostSingleView from "./views/PostSingleView";
import { NavBar } from "./components/navbar/NavBar"
import './App.css'




function App() {

  
  return (
    
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element = {<Inicio/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts-list/:id" element={<PostSingleView />} />
        <Route path='/favoritos' element = {<Favoritos/>} />
        <Route path='/chats' element = {<Chats/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;
