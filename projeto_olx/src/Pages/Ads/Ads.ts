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
      background-color: blue;
    
   }
   
`;