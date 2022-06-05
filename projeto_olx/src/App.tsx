import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouteList } from './Routes'

function App() {
  const [count, setCount] = useState(0)

  return (

    
        <div className="App">
          Olá, Mundo!!!
          <RouteList/>
        </div>

   
    
  )
}

export default App
