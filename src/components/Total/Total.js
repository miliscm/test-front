import React, {useState, useEffect} from 'react'
import {Container, Lista} from './styles'
import api from "../../services/api"

const Total = () => {
  const totalValuesFromStorage = JSON.parse(localStorage.getItem('totalValues') || []) 
  
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(totalValuesFromStorage.total);
  const [discount, setDiscount] = useState(totalValuesFromStorage.discount);
  const [shipping, setShipping] = useState(totalValuesFromStorage.shipping);
  const [subTotal, setSubTotal] = useState(totalValuesFromStorage.subTotal);
  const sinalNegativo = "-";  
  
  function currency(value){
    return  new Intl.NumberFormat('pt-BR', {
       style:"currency", currency:'BRL'}).format(value)
   }
  useEffect(()=>{
     localStorage.setItem('totalValues',JSON.stringify({total,discount,shipping,subTotal}))
   },[total,discount,shipping,subTotal])
   
  
  useEffect(()=>{
    api.get('5b15c4923100004a006f3c07').then(res => {
      setTotal(res.data.total);
      setDiscount(res.data.discount);
      setShipping(res.data.shippingTotal);
      setSubTotal(res.data.subTotal);
    },
    (error) => {
      
      setError(error);
    }
    
    )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  }
   else {

  return (
   <Container>
     <Lista>
       <p>Produtos</p>
       <p>{currency(subTotal)}</p>
       </Lista>
       <Lista>
       <p>Frete</p>
       <p>{currency(shipping)}</p>
       </Lista>
       <Lista>
       <p>Desconto</p>
       <p>{discount > 0 ? sinalNegativo+" ":""}{currency(discount)} </p>
       </Lista>
       <Lista>
       <p>Total</p>
       <p>{currency(total)}</p>
       </Lista>
   </Container>
     
  )
}}

export default Total
