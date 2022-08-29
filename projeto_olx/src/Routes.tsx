import React from "react";
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import {Home} from './Pages/Home';
import {About} from './Pages/About';
import { NotFound } from "./Pages/NotFound";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { AdPage } from "./Pages/AdPage";
import { CreateAds } from "./Pages/CreateAds";
import { Ads } from "./Pages/Ads";
import { User } from "./Pages/User";
// import {RequireAuth} from "./Components/RequireAuth";


export function RouteList(){
   return useRoutes([
      {path: '/', element: <Home/>},
      {path: '/about', element: <About/>},
      {path: '*', element: <NotFound/>},
      {path: '/signin', element: <Signin/>},
      {path: '/signup', element: <Signup/>},
      {path: '/ads', element: <Ads/>},
      {path: '/ad/:id', element: <AdPage/>},
      {path: '/user', element: <User/>},
      {path: '/post-an-ad', element: <CreateAds/>},
   ])
}