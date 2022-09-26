//Själva kortet
import styles from "./Card.module.css"

const Card = ({ cardNumber, validThruMonth, validThruYear, vendor,  cvc, cardholder }) => {

  //beroende på vilken vendor det är så vill jag ha olika färg på korten. Djupdyk i detta sedan.
  return (
    <div className={styles.card}>
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
  )
}


export default Card