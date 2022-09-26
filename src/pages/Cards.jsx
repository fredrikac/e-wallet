//DETTA ÄR STARTSIDAN
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useState, useRef } from "react";

//ATT GÖRA
//Gör komponenten Card klickbar & gör kortet till activeCard vid klick. 
//Ta bort-knapp - Var, hur? 
//Bugg: när man lägger till ett femte kort så kraschar allt :)
//Jobba vidare på CSS:en, lägg all gemensam styling i App.css (flexbox layout, font, buttons etc) & fixa till olika färg på olika kort-utgivare
//skriv ut kortnumret med mellanrum efter var fjärde siffra
//hitta lite logotyper/ikoner till korten (detta är inte högsta prio)


const Cards = () => {
  const dispatch = useDispatch();
  const { cards, status, activeCard } = useSelector((state)=> state.cardList);

  //För att bli av med problemet att fetchen körs 2ggr: 
  const shouldFetch = useRef(true);

  useEffect(() => {
    if(shouldFetch.current && status === "idle"){
      console.log("useEffect runs dispatch runs getUser")
      dispatch(getUser());
      shouldFetch.current = false;
    }
  }, []);

  return (
    <div><h1>E-WALLET</h1>
   <h2>User: {activeCard.cardholder}</h2>

    <h3>Status: {status}</h3>
    <h3>Active card: {activeCard.cardNumber}</h3>

  <Card vendor={activeCard.vendor} validThruMonth={activeCard.validThruMonth} validThruYear={activeCard.validThruYear} cardNumber={activeCard.cardNumber} cvc={activeCard.cvc} cardholder={activeCard.cardholder} />

     {cards && cards.map((card, i) => {
      const { cardholder, vendor, cardNumber, validThruMonth, validThruYear, cvc } = card;

      return(
        <Card key={i} vendor={vendor} validThruMonth={validThruMonth} validThruYear={validThruYear} cardNumber={cardNumber} cvc={cvc} cardholder={cardholder}/>
      )
    })} 

      <Link to="/addcard" ><button>Add card</button></Link>
    </div>
  )
}

export default Cards;