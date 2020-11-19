import React, {useEffect, useState} from 'react';
import {Container, ButtonPay} from "./styles"
import Total from"../../components/Total/Total"
import { Title, Section } from "../../components/styles"
import CartList from "../../components/CartList/CardList"
import api from "../../services/api"
function Cart() {
  
  const messageButton='Seguir para o pagamento';
  
  const itemsTolocalStorage =JSON.parse(localStorage.getItem('cardItens') || "[]"); 
  const totalValuesFromStorage = JSON.parse(localStorage.getItem('totalValues') ||"[]") 
   
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(itemsTolocalStorage);
  
  const [discount, setDiscount] = useState(totalValuesFromStorage.discount);
  const [shipping, setShipping] = useState(totalValuesFromStorage.shipping);
  const [subTotal, setSubTotal] = useState(totalValuesFromStorage.subTotal);
  const [total, setTotal] = useState(totalValuesFromStorage.total);
  const cardItentity="5b15c4923100004a006f3c07";


  useEffect(()=>{
    localStorage.setItem('cardItens', JSON.stringify(items))
    localStorage.setItem('totalValues',JSON.stringify({discount,shipping,subTotal,total}))
  },[items,discount, shipping, subTotal, total])  

    useEffect(() => {
      api.get(cardItentity).then(res => {
          setIsLoaded(true);
          setItems(res.data.items); 
          setDiscount(res.data.discount);
          setShipping(res.data.shippingTotal);
          setSubTotal(res.data.subTotal);  
          setTotal(res.data.total)         
          
        },        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;

  } else {
    
 
     
    return (

      <Section>
        <Title>Produtos</Title>
     <Container>             
         <CartList/>
     </Container>    
     <Total />  
     <ButtonPay type="button" href={"/payment"}>
        <p>{messageButton}</p>       
       </ButtonPay>      
     </Section>
    );
  }}

export default Cart 