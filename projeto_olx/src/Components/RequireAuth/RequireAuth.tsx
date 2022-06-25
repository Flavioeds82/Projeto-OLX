import { useNavigate } from "react-router-dom";
import { isLogged } from "../../Helpers/AuthHandler";

type Props = {
   children: JSX.Element
}

export function RequireAuth({children}: Props){
   const navigate = useNavigate();
   const approved = isLogged();
   if(approved){
      return children;
   }else{
      navigate("/signin");
   }
   
}