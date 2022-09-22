import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewCard } from "../components/cardSlice";
import { useState } from "react";

//använd komponenten Card för att rendera förhandsvisning av kortet?

//Vad ska hända efter att användaren klickat på Add card? Alert med success och sen tillbaka till start? Hur behåller jag användaren så att den inte uppdateras om jag återvänder till start?
//lägga fetchen i App.js istället för i Cards?
//lägg till fetch om det inte finns någon user i location state? eller ba default-värde?

const AddCard = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const user = location.state;
  // const fullName = `${user[0].name.first} ${user[0].name.last}`;

  //Hantera formuläret
  const [formdata, setFormdata] = useState({
    cardholder: "",
    cardNumber: "", 
    validThruMonth: "",
    validThruYear: "",
    cvc: "", 
    vendor: ""
  });

  //Lyssna efter change i formuläret
  const handleChange = (event)=> {
    setFormdata({...formdata, [event.target.name]: event.target.value});
  }

  //Hantera submit
  const handleSubmit= (event)=>{
    event.preventDefault();
    //först ska jag ba consol.logga och se om det funkar
    console.log(formdata)

    //Här ska jag ha en funktion för att lägga till infon i state
    //FORTSÄTT HÄR SEN

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
    <div>
      <h1>ADD A NEW BANK CARD</h1>
      <p>NEW CARD</p>
   
      <div style={{border: "solid 1px black"}}>
        Förhandsvisning av kortet
      <h4>{formdata.cardNumber}</h4>
      <h5>CARDHOLDER NAME</h5>
      <h5>{formdata.cardholder}</h5>
      <h5>VALID THRU</h5>
      <h5>{formdata.validThruMonth}/{formdata.validThruYear}</h5>
      <h5>{formdata.vendor}</h5> 
      <h5>{formdata.cvc}</h5>
        
        </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">CARD NUMBER</label>
        <input type="text" name="cardNumber" id="cardNumber" value={formdata.cardNumber} required pattern="[0-9]{16}" maxLength="16" size="16" onChange={handleChange}/>
        <br />
        <label htmlFor="cardholderName">CARDHOLDER NAME</label>
        <input type="text" name="cardholder" id="cardholder" value={formdata.cardholder} placeholder={"Users name"} onChange={handleChange}/>
        <br />
        <label htmlFor="validThruMonth">VALID THRU MONTH</label>
        <input type="number" name="validThruMonth" id="validThruMonth" value={formdata.validThruMonth}min="1" max="12" required onChange={handleChange}/>
        <label htmlFor="validThruYear">VALID THRU YEAR</label>
        <input type="number" name="validThruYear" id="validThruYear" value={formdata.validThruYear} min="22" max="27" required onChange={handleChange}/>
     
        <label htmlFor="cvc">CVC</label>
        <input type="text" name="cvc" id="cvc" value={formdata.cvc}pattern="[0-9]{3}" required onChange={handleChange}/>
        <br />
        <label htmlFor="vendor">VENDOR</label>
        <select name="vendor" id="vendor" value={formdata.vendor} required onChange={handleChange}>
          <option value="" disabled>Choose vendor...</option>
          <option name="Visa" >Visa</option>
          <option name="MasterCard">MasterCard</option>
          <option name="American Express" >American Express</option>
        </select>
        <br />
      <button>ADD CARD</button>
      </form>
    </div>
  )
}

export default AddCard;