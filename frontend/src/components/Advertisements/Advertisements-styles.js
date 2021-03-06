import styled from 'styled-components'

export const ServicesContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  @media screen and (max-width: 768px){
      height: 1100px;
  }
 
  @media screen and (max-width: 480px){
      height: 1300px;
  }
`
export const ServicesWrapper = styled.div`
   max-width: 1000px;
   margin: 0 auto;
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   align-items: center;
   grid-gap: 16px;
   padding: 0 50px;
   @media screen and (max-width: 1000px){
       grid-template-columns: 1fr 1fr;
   }
   @media screen and (max-width: 768px){
       grid-template-columns: 1fr;
   }
`   
export const ServicesCard = styled.div`
   background: #fff;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   border-radius: 10px;
   height: 340px;
   padding: 30px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.2);
   transition: all 0.2s ease-in-out;
   &:hover{
       transform: scale(1.02);
       transition: all 0.2s ease-in-out;
       cursor: pointer;
   }` 

export const TableCard = styled.div`
   background: #fff;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   border-radius: 10px;
   
   padding: 30px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.2);
   transition: all 0.2s ease-in-out;
   &:hover{
       transform: scale(1.02);
       transition: all 0.2s ease-in-out;
       cursor: pointer;
   }` 
   

export const ServicesIcon = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 10px;
`

export const ServicesH1 = styled.h1`
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 64px;
    @media screen and (max-width: 480px){
        font-size: 2rem;
    }
  `
export const ServicesH2 = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 10px;
    font-style: bold;
    `
export const Servicesp = styled.p`
    font-size: 0.9rem;
    text-align: center;
    `