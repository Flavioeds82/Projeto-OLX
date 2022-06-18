import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouteList } from './Routes'
import {Header} from '../src/Components/Header'
import {Footer} from '../src/Components/Footer'


function App() {
  
  const [count, setCount] = useState(0)

  return (
        <div className="App">
          <Header/>
          <RouteList/>
          <Footer/>
        </div>
  )
}

export default App
