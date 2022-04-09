import React from 'react';
import styled from 'styled-components'



const Main = ({  backgroundColor , ui , syntax }) => {


  const handleClick=()=>{
    console.log('clicked')
  }
    return (
      <>
        
        <H1>Browse for the Art</H1>
        <Div onClick={handleClick}>Blogs</Div>
        <Container>Make the Art or Find the Art you like </Container>
      </> 
      );

   
}
  const H1 = styled.div`
    margin-top:90px;
    margin-left:100px;
    width:770px;
    font-size: 95px;
    display:flex;
    color:rgb(112, 148, 204);
    &:hover{
      color:rgb(148, 172, 204);
      border-bottom : 1px solid black;
      cursor:pointer;
    }
 `
  const Div = styled.div`
    font-size:200px;
    color:rgb(141, 193, 255);
    margin-top:10px;
    margin-left:550px;
    width:500px;
    
    padding:0px;
   &:hover{
     color:rgb(148, 172, 204);
     border-bottom : 1px solid black;
     cursor:pointer;
   }
   
    
  `
 
  const Container=styled.div`
  display: flex;
  `






export default Main;


//color:rgb(110, 186, 240);