import './App.css'
import React from "react";
import { Login } from "./views/login";
import { Register } from "./views/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext'
import { Profile } from './views/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostsView from './views/postsview';


function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts-list" element={<PostsView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;
