//DETTA ÄR STARTSIDAN
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useState, useRef } from "react";
import { setActiveCard } from '../components/cardSlice';
import styles from "./AddCard.module.css"


//ATT GÖRA
//Ta bort-knapp - Var, hur? OM kort ej är aktivt, lägg till en liten knapp i övre högra hörnet

//Bugg: när man lägger till ett femte kort så kraschar allt :)

//Jobba vidare på CSS:en - fixa till olika färg på olika kort-utgivare

//Extra
//skriv ut kortnumret med mellanrum efter var fjärde siffra. Regex?
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

  const clickToActivate = (cardnumber) => {
    dispatch(setActiveCard(cardnumber))
  }

  return (
    <main><h1>E-WALLET</h1>
    <h2>Welcome, {activeCard.cardholder}!</h2>
    <p>Active card {activeCard.cardNumber}</p>
    <Card vendor={activeCard.vendor} validThruMonth={activeCard.validThruMonth} validThruYear={activeCard.validThruYear} cardNumber={activeCard.cardNumber} cvc={activeCard.cvc} cardholder={activeCard.cardholder} />

    {cards && cards.map((card, i) => {
      const { cardholder, vendor, cardNumber, validThruMonth, validThruYear, cvc } = card;

      return(
        <Card key={i} vendor={vendor} validThruMonth={validThruMonth} validThruYear={validThruYear} cardNumber={cardNumber} cvc={cvc} cardholder={cardholder} clickToActivate={clickToActivate}/>
      )
    })} 

    <Link to="/addcard" ><button className={styles.button1}>Add card</button></Link>
    </main>
  )
}

export default Cards;