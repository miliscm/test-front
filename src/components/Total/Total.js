import React from 'react'
import {Container, Lista} from './styles'


const Total = () => {
 
  const totalValuesFromStorage = JSON.parse(localStorage.getItem('totalValues') ||"[]") 
  const subtractionSignal = "-";  
  
  function currency(value){
    return  new Intl.NumberFormat('pt-BR', {
       style:"currency", currency:'BRL'}).format(value)
   }
  
  return (
   <Container>
     <Lista>
       <p>Produtos</p>
       <p>{currency(totalValuesFromStorage.subTotal)}</p>
       </Lista>
       <Lista>
       <p>Frete</p>
       <p>{currency(totalValuesFromStorage.shipping)}</p>
       </Lista>
       <Lista>
       <p>Desconto</p>
       <p>{totalValuesFromStorage.discount > 0 ? subtractionSignal+" ":""}{currency(totalValuesFromStorage.discount)} </p>
       </Lista>
       <Lista>
       <p>Total</p>
       <p>{currency(totalValuesFromStorage.total)}</p>
       </Lista>
   </Container>
     
  )
}
// }

export default Total
