import Cookies from "js-cookie";
import axios from 'axios';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501'

//----------------------------- POST ------------------------------//

async function apiFetchPost(
   endpoint: string, 
   body: {
      email:string, 
      password:string, 
      name ?:string, 
      state?:string,  
      token ?: string}
   ) {

   if(!body.token){
      let token = Cookies.get('token');
      if(token){
         body.token = token;
      }
   }

   try{
      const res = await fetch(BASEAPI+endpoint, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
   });
   const json = await res.json();
   if(json.notallowed){
      window.location.href = '/signin';
   }
   return json;
   }catch(e){
      return -1;
   }
   
   
};

//----------------------------- GET ------------------------------//

async function apiFetchGet(endpoint: string, body ?: {email ?:string, password ?:string, token ?: string}) {

   //---------VERIFICAÇÃO DO TOKEN ---------//
   if(body){
      if(!body.token){
         let token = Cookies.get('token');
         if(token){body.token = token;}
      }
   }
   

   //--------- REQUISIÇÃO GET  ---------//

   const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
   const json = await res.json();
   if(json.notallowed){window.location.href = '/signin'};
   return json;
};

//-------------- CONSULTA API -----------------------//

export const Api = {
   login: async function(email: string, password: string){
     const json = await apiFetchPost(
        '/user/signin',
        {email, password}
     );
     return json;
   },
   register: async function (email:string, password:string, name:string, state:string) {
     const json = await apiFetchPost(
        '/user/signup',
        {email, password, name, state}
     )
     return json;
   },
   getCategory: async function(){
      const json = await apiFetchGet('/categories');
      return json.categories;
   }
};