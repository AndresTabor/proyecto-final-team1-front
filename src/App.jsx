import './App.css'
import injectContext from './store/appContext'

function App() {
  

  return (
    <h1>
      h1
    </h1>
  )
}

const WrappedApp = injectContext(App);
export default WrappedApp;
