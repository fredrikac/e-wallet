//DETTA ÄR STARTSIDAN

import Card from '../components/Card';
import CardList from "../components/CardList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/userSlice";
import { useEffect, useRef } from "react";

//Vid start ska en user hämtas från API. Nu hämtar den flera ggr. Jag vill att den ska hämta 1 gång, och sedan spara den usern. Detta fungerar inte. Tills vidare har jag Jane Doe som placeholder (status är placeholder och inte idle, därför körs inte useEffecten med fetchen.)
//Förnamn + efternamn ska fyllas i på alla kort. 

//Högst upp ska aktivt kort visas. Om användaren har flera kort, ska dessa finnas listade under det aktiva kortet. Det ska också finnas en knapp som leder till addCard
//Loopa igenom arrayen Cards, och för varje Card, skapa upp komponenten Card. Om status är active, lägg kortet högst upp. Spärr så att enbart 1 kort kan vara active åt gången. 
//Gör komponenten klickbar och sätt en eventlistener på den så att vid klick så ändras status till active.



const Cards = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state)=> state.user);
  const { cards } = useSelector((state)=> state.cardList);

  //För att bli av med problemet att fetchen körs 2ggr: 
  const shouldFetch = useRef(true);

  useEffect(() => {
    if(shouldFetch.current && status === "idle"){
      shouldFetch.current=false;
      dispatch(getUser());
    }
  }, []);

  return (
    <div><h1>E-WALLET</h1>
    <h2>User: {user[0].name.first} {user[0].name.last}</h2>
    <h3>Status: {status}</h3>
    <p>ACTIVE CARD</p>

    {cards.map((card) => {
      const { cardholder, cardNumber, valid, id, active } = card;
      return(
        <Card key={id} valid={valid} cardNumber={cardNumber} active={active} user={user}/>
      )
    })}



      <Link to="/addcard" state={user}><button>Add card</button></Link>
    </div>
  )
}

export default Cards