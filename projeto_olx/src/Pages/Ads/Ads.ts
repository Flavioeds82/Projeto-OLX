import styled from 'styled-components';



export const PageArea = styled.div`
   display: flex;
   margin-top: 20px;
   text-align: left;
   
   .left-side{
     
      width: 20rem;
      margin-right: 10px;

      .input-filter{
         width: 100%;
         height: 2.5rem;
         margin-bottom: 20px;
         border: 2px solid #9bb83c;
      }
      .filterName{
         margin-top: 20px;
      }
      .cat, .state{
         width: 100%;
         height: 2.5rem;
         border: 2px solid #9bb83c;
      }
      
   }
   .right-side{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      text-align: center;
      color: #444;
      

      .headline{
        margin-top:0;
        font-size: 20px;
      }
      .right-side-list{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 20px;
      }
      .headline-error{
         margin-top: 20px;
         font-size: 15px;
         font-weight: normal;
      }
      .loader{
         animation: rotating 1s infinite;
         border: 6px solid #e5e5e5;
         border-top-color: #9bb83c;
         height: 50px;
         width: 50px;
         margin-top:50px;
         border-radius: 50%;
      }
      @keyframes rotating{
        to{transform: rotate(1turn);} 
      }
      .pagination{
         display: flex;
         align-items: center;
         justify-content: center;
         margin: 10px 0;

         .pagItem{
            width: 30px;
            height: 30px;
            border: 1px solid #999;
            margin-right: 5px;
            display:flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            :hover{
               border: 2px solid #444;
            }
            &.active{
               background-color: #ccc;
            }
         }
         
         

      }
      
      

      
      
      
   }
   
`;