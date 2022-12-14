import { useDispatch, useSelector } from "react-redux";
import { addNewCard } from "../components/cardSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./AddCard.module.css";

const AddCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state)=> state.cardList);
 
  //Hantera formuläret
  const [formdata, setFormdata] = useState({
    cardholder: user,
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

    //töm formuläret igen
    setFormdata({    
    cardholder: "",
    cardNumber: "", 
    validThruMonth: "",
    validThruYear: "",
    cvc: "", 
    vendor: ""})

  //tillbaka till start 
   navigate("/cards")
  }

  return (
    <>
    <Header />
    <main>
      <h2>ADD A NEW BANK CARD</h2>
      <h3>PREVIEW</h3>
      <Card  vendor={formdata.vendor} validThruMonth={formdata.validThruMonth} validThruYear={formdata.validThruYear} cardNumber={formdata.cardNumber} cardholder={user} showBtn={false}/> 

      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="cardNumber">CARD NUMBER</label>
        <input className={styles.inputfield} type="text" name="cardNumber" id="cardNumber" value={formdata.cardNumber} required pattern="[0-9]{16}" placeholder="0000 0000 0000 0000" maxLength="16" size="16" onChange={handleChange}/>
        <br />
        <label className={styles.label} htmlFor="cardholder">CARDHOLDER</label>
        <input className={styles.inputfield} type="text" name="cardholder" id="cardholder" value={user} placeholder={user} disabled onChange={handleChange}/> 
        
        <br />
        <fieldset>
        <legend className={styles.label}>VALID THRU</legend>
        <span className={styles.validthru}>
        <label className={styles.label} htmlFor="validThruMonth">MM</label>
        <input className={styles.inputfield} type="number" name="validThruMonth" id="validThruMonth" value={formdata.validThruMonth} placeholder="01" min="01" max="12" required onChange={handleChange}/>
        </span>
        <span className={styles.validthru}>
        <label className={styles.label} htmlFor="validThruYear">YY</label>
        <input className={styles.inputfield} type="number" name="validThruYear" id="validThruYear" value={formdata.validThruYear} placeholder="23" min="22" max="27" required onChange={handleChange}/>
        </span>
        <span className={styles.validthru}>
        <label className={styles.label} htmlFor="cvc">CVC</label>
        <input className={`${styles.inputfield} ${styles.cvc}`} type="text" name="cvc" id="cvc" value={formdata.cvc}pattern="[0-9]{3}" maxLength="3" placeholder="123" required onChange={handleChange}/>
        </span>
        </fieldset>

        <div className={styles.customSelect}>
        <label className={styles.label} htmlFor="vendor">VENDOR</label>
        <select name="vendor" id="vendor" value={formdata.vendor} required onChange={handleChange}>
          <option value="" disabled>Choose vendor...</option>
          <option name="Visa" >Visa</option>
          <option name="MasterCard">MasterCard</option>
          <option name="American Express">American Express</option>
        </select>
        </div>
        <br />
        <button className={styles.button1} >ADD CARD</button>
      </form>     
    </main>
    <Footer />
    </>
  )
}

export default AddCard;