import React from "react";
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import {Home} from './Pages/Home';
import {About} from './Pages/About';
import { NotFound } from "./Pages/NotFound";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { AdPage } from "./Pages/AdPage";


export function RouteList(){
   return useRoutes([
      {path: '/', element: <Home/>},
      {path: '/about', element: <About/>},
      {path: '*', element: <NotFound/>},
      {path: '/signin', element: <Signin/>},
      {path: '/signup', element: <Signup/>},
      {path: '/ad/:id', element: <AdPage/>},
   ])
}