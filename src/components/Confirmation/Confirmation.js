import React from 'react'
import { Title, Section } from "../styles"
import {Container} from "../../pages/Cart/styles"
import CartList from "../CartList/CardList"
import Total from '../Total/Total'
import img from "../../assets/img/success.png"
import {DivConf, Img} from "./styles"

const Confirmation = (props) => {
  const {cardNumber, nameCard, expiry} = props.location.state;

  
  return (
   <Section>
      <Img src={img} alt="compra efetuada com sucesso"/>
     <Title>Pagamento</Title>
         <DivConf>
         <p>{`••••-••••-••••-${cardNumber.slice(-4)}`}</p> 
          <p>{nameCard}</p>
          <p>{expiry}</p>       
          
         </DivConf>
     <Title>Produtos</Title>
     <Container>
        <CartList/>
     </Container>
      <Total />
   </Section>
  )
}

export default Confirmation
