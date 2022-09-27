//Själva kortet
import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteCard, setActiveCard } from "./cardSlice";

//ShowBtn sätts till true eller false i Cards och AddCard. Beroende på om det är true eller false så visas en delete-knapp. Jag använder även den för att göra icke-aktiva kort klickbara. Inte supertydligt, men fungerar.

const Card = ({ cardNumber, validThruMonth, validThruYear, vendor,  cvc, cardholder, showBtn }) => {
  const dispatch = useDispatch();

  const clickToActivate = (cardnumber) => {
    dispatch(setActiveCard(cardnumber))
  }

  const clickToDelete = (cardnumber)=> {
    dispatch(deleteCard(cardnumber))
  }

  return (
    <div className={styles.cardWrap}>
    <div onClick={showBtn ? () => clickToActivate(cardNumber) : undefined} className={`${styles.card} ${vendor}`}>

      <p className={styles.vendor}>{vendor}</p> 
      <p className={styles.number}>{cardNumber}</p>
      <span className={styles.midsection}>
      <div>
      <p className={styles.heading}>CARDHOLDER</p>
      <p className={styles.name}>{cardholder}</p> 
      </div>
      <div>
      <p className={styles.heading}>VALID THRU</p>
      <p>{validThruMonth}/{validThruYear}</p>
      </div>
      </span>
    </div>
    {showBtn && 
    <button className={styles.closeBtn} onClick={()=>clickToDelete(cardNumber)} aria-label="Delete card" type="button">
    <span aria-hidden="true">&times;</span>
    </button>}
    </div>
  )
}


export default Card;