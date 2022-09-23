//DETTA ÄR STARTSIDAN
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useRef } from "react";

//ATT GÖRA
//Gör komponenten Card klickbar & gör kortet till activeCard vid klick. Flytta också kortet så det som är active ligger högst på sidan.
//Det finns 1 hårdkodat kort som ska ligga där från början. Vill ha den hämtade usern som cardholder. Behöver jag ens ha key:n cardholder? jag kan väl ba ha user? 
//Ta bort-knapp - Var, hur? 
//ta tag i css och snygga till skiten

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

  //const userCardholder = `${user.results[0].name.first} ${user.results[0].name.last}` //detta får allt att krascha

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