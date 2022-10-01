import styled from "styled-components";

export const PageArea = styled.div`

   .user-area{
      padding: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
   .form-area{
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .title{
      color: #444;
      margin-bottom: 20px;
   }
   .user-area-label{
      display: flex;
      width: 80%; 
   }
   .form-input input::placeholder{
      color: #222;
   }
   .AdPage-container-area-others{
     display: flex;
     flex-direction: column;
     width: 100%;
     margin-top:50px;
     text-align: center;
   }   
   .AdPage-container-area-others-list{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
      text-align: center;
      border-radius: 5px;
      margin-top: 50px;
   }
   .AdPage-container-area-others-list-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      background-size: cover;
   }
   .AdPage-container-area-others-list-item img{
     
      
   }
   #bt-editar{
      width: 6rem;
      height: 1.5rem;
      font-weight: bold;
      color: #444;

   }
   

`;