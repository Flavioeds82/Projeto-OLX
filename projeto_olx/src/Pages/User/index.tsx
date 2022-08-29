import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PageContainer } from "../../Components/Template";
import { Api } from "../../Helpers/Api";
import { PageArea } from "./user";

export function User(){
   const [user, setUser] = useState<any>({})
   useEffect(()=>{
      async function getUser(){
         let token = Cookies.get('token');
         if(token){const user = await Api.getUser(token);}
         
         getUser();
      }
      getUser();
   }, []);


   return(
      <PageContainer>
         <PageArea>
            <div className="user-area">
               <form action="" method="post">
                  <div className="user-area-label"></div>
                  <div className="user-area-text"></div>
               </form>
            </div>
         </PageArea>
      </PageContainer>
   )
}