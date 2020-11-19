import React from 'react'
import {Border, ImgContainer, ProductDesc} from "../../pages/Cart/styles"


const CartList = () => {
  const itemsTolocalStorage =JSON.parse(localStorage.getItem('cardItens') || "[]");
    
  function currency(value){
   return  new Intl.NumberFormat('pt-BR', {
      style:"currency", currency:'BRL'}).format(value)
  }     
    
  return (
    <>
    {itemsTolocalStorage.map(item => (
      <Border key={item.product.sku}>
       <ImgContainer>
        <img src={item.product.imageObjects[0].small} alt={item.product.name}/>
       </ImgContainer>           
      <ProductDesc>
        <p>{item.product.name.substring(0,65)}</p>           
       <p>{currency(item.product.priceSpecification.price)}</p>
      </ProductDesc>          
      </Border>
    ))}
    </>
  )
}

export default CartList
