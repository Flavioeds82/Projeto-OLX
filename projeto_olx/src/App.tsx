import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouteList } from './Routes'
import {Header} from '../src/Components/Header'
import {Footer} from '../src/Components/Footer'


function App() {
  
  return (
        <div className="App">
          <Header/>
          <RouteList/>
          <Footer/>
        </div>
  )
}

export default App
