//DETTA ÄR STARTSIDAN
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useRef } from "react";


//Högst upp ska aktivt kort visas. Om användaren har flera kort, ska dessa finnas listade under det aktiva kortet. Det ska också finnas en knapp som leder till addCard
//Om status är active, lägg kortet högst upp. Spärr så att enbart 1 kort kan vara active åt gången. ActiveCard?
//Gör komponenten klickbar och gör kortet till activeCard vid klick

const Cards = () => {
  const dispatch = useDispatch();
  //const { user, status } = useSelector((state)=> state.user);
  const { cards, user, status } = useSelector((state)=> state.cardList);

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
    {/* <h2>User: {user[0].name.first} {user[0].name.last}</h2> */}
    <h3>Status: {status}</h3>


    {/* {cards.map((card) => {
      const { cardholder, vendor, cardNumber, validThruMonth, validThruYear, id } = card;
      return(
        <Card key={id} vendor={vendor} validThruMonth={validThruMonth} validThruYear={validThruYear} cardNumber={cardNumber} user={user}/>
      )
    })} */}

      <Link to="/addcard"><button>Add card</button></Link>
    </div>
  )
}

export default Cards;