import 'bootstrap/dist/css/bootstrap.min.css';
import { Inicio } from './navegacion/Inicio';
import { Chats } from './views/Chats';
import { Login } from "./views/login";
import { Register } from "./views/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext'
import { Profile } from './views/profile';
import PostSingleView from "./views/PostSingleView";
import { NavBar } from "./components/navbar/NavBar"
import { Favorites } from './views/Favorites';
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
        <Route path='/favorites' element = {<Favorites/>} />
        <Route path='/chats/:chatSelected?' element = {<Chats/>} />
        
      </Routes>
    </BrowserRouter>
    
  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;
