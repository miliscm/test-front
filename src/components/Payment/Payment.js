import React, {useState, useEffect}  from 'react'
import { Title, Section } from "../styles"
import {ButtonConfirmation, FormPay, InputForm, LabelForm, DivForm, FormBack, Span} from "./styles"
import Total from"../Total/Total"
import { useHistory } from "react-router-dom";



const Payment = () => {  
 
const history = useHistory();
const messageButton = 'Finalizar o pedido';

// const cardNumberFromLocalStorage = JSON.parse(localStorage.getItem('cardNumber') || "")

const [cardNumber, setCardNumber]=useState('');
const [nameCard, setNameCard]= useState('');
const [expiry, setExpiry]=useState('');
const [cvvNumber, setCvvNumber]=useState('');

const[cardNumberInValid, setcardNumberInValid]=useState("");
const[nameCardInValid, setnameCardInValid]=useState("");
const[expiryInValid, setexpiryInValid]=useState("");
const[cvvNumberInValid, setcvvNumberInValid]=useState("");

const arrayInfoUser = {cardNumber,nameCard,expiry}


function validatorCardNumber(e){  
    setCardNumber(e.target.value)
    const cardNumberToValidate=(e.target.value); 
       
     let matchCardNumber = cardNumberToValidate.match(/4\d{3}[ -]*\d{4}[ -]*\d{4}[ -]*\d(?:\d{3})?/)        
   
    if(matchCardNumber !== null && cardNumberToValidate.length === 19){
      console.log("")
      if(cardNumberToValidate.includes(matchCardNumber[0])){
        setcardNumberInValid('');

      }
      else{
        setcardNumberInValid("campo inválido")            
      } 
    }
    else{
      setcardNumberInValid("campo inválido")
               
         }  
         
}

function validatorExpiryDate(e){ 

    setExpiry(e.target.value);
    const today = new Date();  
    const currentDate = e.target.value;  
    const month = currentDate.slice(0,2)
    const year = currentDate.slice(3,7) 
    
    if(currentDate.length == 7 && currentDate.match(/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)) {              

        if(  
          (year>=today.getFullYear() && month >= today.getMonth()+1)
         || (month<=today.getMonth()+1 && year >today.getFullYear()) || (month>=today.getMonth()+1 && year>today.getFullYear())){   
          
          setexpiryInValid('');
        }                 
          
         else if(month<=today.getMonth()+1 && year<=today.getFullYear()){
          setexpiryInValid("campo inválido")
        }
        else {
          setexpiryInValid("campo inválido")
        }
   
      }
      else {
        setexpiryInValid("campo inválido")
      }
}

function handleConfirmation(e){    
  e.preventDefault();
  
   history.push({pathname:"/confirmation",state:arrayInfoUser});
 
}
  return (
    <Section>
      
      <Title>
        Cartão de Crédito
      </Title>
   
      <FormPay onSubmit={handleConfirmation}>  
      
      <FormBack>
        <LabelForm htmlFor="number">Número do cartão:</LabelForm>
        <InputForm         
        required                        
        name="cardnumber"
        type="text" 
        minLength="19" 
        maxLength="19"
             
        placeholder="____.____.____.____" onChange={(e)=>{
          
          validatorCardNumber(e)
        }       
          // (e) => {
          // setCardNumber(e.target.value)          
          // if((cardNumber === "" || cardNumber.length <15)){
          //   setcardNumberInValid("campo inválido")}
          //   else{
          //     setcardNumberInValid('');
          //   }                                 
          //   }
          }

            />
            <Span>{cardNumberInValid}</Span>
            
           
        <LabelForm htmlFor="number">Nome do Titular:</LabelForm>     
        <InputForm       
         required 
        minLength="3" 
        type="text"         
        placeholder="Como no cartão" 
        value={nameCard} onChange={(e) => {
                        setNameCard(e.target.value)
                        if(nameCard === "" || nameCard.length <3){                          
                          setnameCardInValid("campo inválido")}
                          else{
                            setnameCardInValid('');
                          }                 
            }}
            />
             <Span>{nameCardInValid}</Span>
        <DivForm>
        <LabelForm htmlFor="number">Validade (mês/ano):</LabelForm>
        <LabelForm htmlFor="number">CVV:</LabelForm>
         
        </DivForm>
        <DivForm>
        
        <InputForm 
        minLength="7" 
        required 
        maxLength="7" 
        type="text" 
        placeholder="__/____" onChange={(e)=> validatorExpiryDate(e)
          // (e) => {
          //     setExpiry(e.target.value)
          //     if(expiry === "" || expiry.length <5){
          //       setexpiryInValid("campo inválido")}
          //       else{
          //         setexpiryInValid('');
          //       }             
         
          //   }
            }/>
             
        <InputForm 
        required 
        minLength="3" 
        maxLength="3" 
        pattern="[0-9]+$" 
        placeholder="___" value={cvvNumber} onChange={(e) => {        
              setCvvNumber(e.target.value)
              if(cvvNumber === "" || cvvNumber.length < 2){
                setcvvNumberInValid("campo inválido")}
                else{
                  setcvvNumberInValid('');
                }                 
          }}/>         
           <Span>{expiryInValid}</Span>
           <Span>{cvvNumberInValid}</Span>
        </DivForm>    
        </FormBack>
        
      <Section>  
            <Total />          
            <ButtonConfirmation path={"/confirmation"} type="submit" on>
              <p>{messageButton}</p>
            </ButtonConfirmation>
            
      </Section>
      
      </FormPay>
     
 
    
    </Section>
  )
}

  

export default Payment
