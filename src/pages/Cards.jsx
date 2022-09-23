//DETTA ÄR STARTSIDAN
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useRef } from "react";


//Högst upp ska aktivt kort visas. Om användaren har flera kort, ska dessa finnas listade under det aktiva kortet. Det ska också finnas en knapp som leder till addCard
//Gör komponenten klickbar & gör kortet till activeCard vid klick. Flytta också kortet så det som är active ligger högst på sidan.
//Ta bort-knapp? Var, hur? 

const Cards = () => {
  const dispatch = useDispatch();
  const { cards, user, status, activeCard } = useSelector((state)=> state.cardList);

  //För att bli av med problemet att fetchen körs 2ggr: 
  const shouldFetch = useRef(true);

  useEffect(() => {
    if(shouldFetch.current && status === "idle"){
      console.log("useEffect runs dispatch runs getUser")
      dispatch(getUser());
      shouldFetch.current=false;
    }
  }, []);

  return (
    <div><h1>E-WALLET</h1>
    {user && <h2>User: {user.results[0].name.first} {user.results[0].name.last}</h2> }

    <h3>Status: {status}</h3>
    <h3>Active card: {activeCard}</h3>


   {cards && cards.map((card) => {
      const { cardholder, vendor, cardNumber, validThruMonth, validThruYear, cvc, id } = card;
      return(
        <Card key={id} vendor={vendor} validThruMonth={validThruMonth} validThruYear={validThruYear} cardNumber={cardNumber} cvc={cvc} cardholder={cardholder}/>
      )
    })} 

      <Link to="/addcard" state={user}><button>Add card</button></Link>
    </div>
  )
}

export default Cards;