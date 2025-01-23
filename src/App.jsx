import 'bootstrap/dist/css/bootstrap.min.css';
import { Inicio } from './navegacion/Inicio';
import { Chats } from './views/Chats';
import { Login } from "./views/login";
import { Register } from "./views/register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/AppContext'
import { Profile } from './views/profile';
import PostSingleView from "./views/Posts/PostSingleView";
import { NavBar } from "./components/navbar/NavBar"
import { Favorites } from './views/Favorites';
import { Footer } from './components/Footer';
import CreatePostView from './views/Posts/CreatePostView';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import EditPostForm from './components/posts/EditPostForm';




function App() {


  return (

    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts-list/:id" element={<PostSingleView />} />
        <Route path="/create-post" element={<CreatePostView />} />
        <Route path="/edit-post/:id" element={<EditPostForm />} />
        <Route path='/favorites' element = {<Favorites/>} />
        <Route path='/chats/:chatSelected?' element = {<Chats/>} />
        
      </Routes>
      <Footer />

    </BrowserRouter>

  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;