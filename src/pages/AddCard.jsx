
import { useDispatch, useSelector } from "react-redux";
import { addNewCard, setActiveCard } from "../components/cardSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import styles from "./AddCard.module.css";

//använd komponenten Card för att rendera förhandsvisning av kortet?
//Vad ska hända efter att användaren klickat på Add card? Alert med success och sen tillbaka till start? Nu händer ingenting. 


const AddCard = () => {
  const dispatch = useDispatch();
  const { cards, user } = useSelector((state)=> state.cardList);
  const fullName = `${user.results[0].name.first} ${user.results[0].name.last}`;
 
  //Hantera formuläret
  const [formdata, setFormdata] = useState({
    cardholder: fullName,
    cardNumber: "", 
    validThruMonth: "",
    validThruYear: "",
    cvc: "", 
    vendor: ""
  });

  //Lyssna efter change i formuläret
  const handleChange = (event) => {
    setFormdata({...formdata, [event.target.name]: event.target.value});
  }

  //Hantera submit
  const handleSubmit= (event) => {
    event.preventDefault();

    //dispatcha action och lägg till objektet formdata som ett nytt card
    dispatch(addNewCard(formdata))
    //här läggs nya kortet som aktivt även om det inte läggs till pga för många kort. LÖS DETTA
    dispatch(setActiveCard(formdata.cardNumber))

    //töm formuläret igen
    setFormdata({    
    cardholder: "",
    cardNumber: "", 
    validThruMonth: "",
    validThruYear: "",
    cvc: "", 
    vendor: ""})
  }

  return (
    <main className={styles.addPageMain}>
      <h1>ADD A NEW BANK CARD</h1>
      <p>NEW CARD</p>
      <Card  vendor={formdata.vendor} validThruMonth={formdata.validThruMonth} validThruYear={formdata.validThruYear} cardNumber={formdata.cardNumber} cardholder={fullName}/> 

      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="cardNumber">CARD NUMBER</label>
        <input className={styles.inputfield} type="text" name="cardNumber" id="cardNumber" value={formdata.cardNumber} required pattern="[0-9]{16}" maxLength="16" size="16" onChange={handleChange}/>
        <br />
        <label className={styles.label} htmlFor="cardholder">CARDHOLDER</label>
        <input className={styles.inputfield} type="text" name="cardholder" id="cardholder" value={fullName} placeholder={fullName} disabled onChange={handleChange}/> 
        
        <br />
        <fieldset>
        <legend className={styles.label}>VALID THRU</legend>
        <label className={styles.label} htmlFor="validThruMonth">MONTH</label>
        <input className={styles.inputfield} type="number" name="validThruMonth" id="validThruMonth" value={formdata.validThruMonth}min="1" max="12" required onChange={handleChange}/>
        <label className={styles.label} htmlFor="validThruYear">YEAR</label>
        <input className={styles.inputfield} type="number" name="validThruYear" id="validThruYear" value={formdata.validThruYear} min="22" max="27" required onChange={handleChange}/>
        </fieldset>

        <br />
        <label className={styles.label} htmlFor="cvc">CVC</label>
        <input className={styles.inputfield} type="text" name="cvc" id="cvc" value={formdata.cvc}pattern="[0-9]{3}" required onChange={handleChange}/>
        <br />
        <div className={styles.customSelect}>
        <label className={styles.label} htmlFor="vendor">VENDOR</label>
        <select name="vendor" id="vendor" value={formdata.vendor} required onChange={handleChange}>
          <option value="" disabled>Choose vendor...</option>
          <option name="Visa" >Visa</option>
          <option name="MasterCard">MasterCard</option>
          <option name="American Express" >American Express</option>
        </select>
        </div>
        <br />
        <button>ADD CARD</button>
      </form>     
    </main>
  )
}

export default AddCard;