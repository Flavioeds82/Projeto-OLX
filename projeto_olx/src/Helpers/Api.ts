import Cookies from "js-cookie";
// import axios from 'axios';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

// 'http://localhost:5001'

//-----------------------------MÉTODO POST ------------------------------//

async function apiFetchPost(
   endpoint: string, 
   body: {
      name ?:string, 
      email:string, 
      state?:string,  
      password:string, 
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
   }catch{
      return -1;
   }
   
   
};

//-----------------------------MÉTODO GET ------------------------------//

async function apiFetchGet(
   endpoint: string, 
   body ?: {
      id ?: string, 
      q ?: string, 
      cat ?:string, 
      state ?: string, 
      offset ?:number, 
      email ?:string, 
      password ?:string, 
      token ?: string|undefined, 
      other ?: boolean
   }) 
   {

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
   // if(json.notallowed){window.location.href = '/signin'};
   return json;
};

//-----------------------------MÉTODO FILE ------------------------------//
async function apiFetchFile(endpoint: string, body:any) {
   try{

      if(!body.token){
         let token = Cookies.get('token');
         if(token){
            body.append('token', token);
         }
      }
      
      const res = await fetch(BASEAPI+endpoint, {method: 'POST', body });
      const json = await res.json();
      if(json.notallowed){
         window.location.href = '/signin';
      }
      return json;
   }catch{
      return -1;
   }
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
   register: async function ( name:string, email:string, password:string, state:string) {
     const json = await apiFetchPost(
        '/user/signup',
        {email, password, name, state}
     );
     return json;
   },
   getCategory: async function(){
      const json = await apiFetchGet('/categories');
      return json.categories;
   },
   getStates: async function(){
      const json = await apiFetchGet('/states');
      return json.states;
   },
   getAds: async function(data: any){
      const json = await apiFetchGet('/ad/list', data);
      return json;
   },
   getAd: async function(id:string, other=true){
      const json = await apiFetchGet(
         '/ad/item',
         {id, other});
      return json;
   },
   getOthers: async function(id:string){
      const json = await apiFetchGet('/ad/listOthers',{id});
      return json;
   },
   addAd: async function(data:any){
      const json = await apiFetchFile('/ad/add', data);
      return json;
   },
   getUser: async function(token: string) {
      const json = await apiFetchGet('/user/me', {token});
      return json;
   }

};