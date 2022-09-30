import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../components/cardSlice";
import { useEffect, useRef } from "react";
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from "../components/Header";
import styles from "./AddCard.module.css";

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
  }, [dispatch, status]);

  return (
    <>
    <Header />
    <main>
      <h2>Welcome, {activeCard.cardholder}!</h2>
      <h3>ACTIVE CARD</h3>
      <Card vendor={activeCard.vendor} validThruMonth={activeCard.validThruMonth} validThruYear={activeCard.validThruYear} cardNumber={activeCard.cardNumber} cvc={activeCard.cvc} cardholder={activeCard.cardholder} active={activeCard.active} showBtn={false}/>

      {cards && cards.map((card, i) => {
        const { cardholder, vendor, cardNumber, validThruMonth, validThruYear, cvc } = card;

        return(
        <Card key={i} vendor={vendor} validThruMonth={validThruMonth} validThruYear={validThruYear} cardNumber={cardNumber} cvc={cvc} cardholder={cardholder} showBtn={true} />
      )})
      } 

    <Link to="/addcard">
      <button className={styles.button1} >ADD A NEW CARD</button>
    </Link>
  </main>
  <Footer />
  </>
  )
}

export default Cards;