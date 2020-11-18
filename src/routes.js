import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Cart from "./pages/Cart/Card"
import Payment from "./components/Payment/Payment"
import Confirmation from "./components/Confirmation/Confirmation"

function Routes(){
  return(
    <BrowserRouter>
    <Route path="/" exact component={Cart} />
    <Route path="/payment" exact component={Payment} />
    <Route path="/confirmation" component={Confirmation} />
    </BrowserRouter>
  )
}
export default Routes;