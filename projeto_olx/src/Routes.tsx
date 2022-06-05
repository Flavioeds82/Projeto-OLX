import React from "react";
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import {Home} from './Pages/Home/Home';
import {About} from './Pages/About/About';

export function RouteList(){
   return useRoutes([
      {path: '/', element: <Home/>},
      {path: '/about', element: <About/>}
   ])
}