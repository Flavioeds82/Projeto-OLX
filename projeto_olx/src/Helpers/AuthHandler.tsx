import Cookies from 'js-cookie';

export function isLogged(){
   let token = Cookies.get('token');
   return (token !== undefined)? true: false;
}
export function Login(token:string, remPassword:boolean = false ){
   if(remPassword){
      Cookies.set('token', token, {expires:999});
   }else{
      Cookies.set('token', token);
   }
}
export function Logout(){
   Cookies.remove('token');
}