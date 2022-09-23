import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewCard, setActiveCard } from "../components/cardSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

//använd komponenten Card för att rendera förhandsvisning av kortet?

//Vad ska hända efter att användaren klickat på Add card? Alert med success och sen tillbaka till start? 
//Just nu visas "Added card!" hela tiden om det finns kort i cards. inte optimalt. 

const AddCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location.state;
  const fullName = `${user.results[0].name.first} ${user.results[0].name.last}`;

  const { cards } = useSelector((state)=> state.cardList);

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
  const handleChange = (event)=> {
    setFormdata({...formdata, [event.target.name]: event.target.value});
  }

  //Hantera submit
  const handleSubmit= (event)=>{
    event.preventDefault();

    //dispatcha action och lägg till objektet formdata som ett nytt card
    dispatch(addNewCard(formdata))
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
    <div>
      <h1>ADD A NEW BANK CARD</h1>
      <p>NEW CARD</p>
   
      <div style={{border: "solid 1px black"}}>
      <h4>{formdata.cardNumber}</h4>
      <h5>CARDHOLDER NAME</h5>
      <h5>{fullName}</h5> 
      {/* <h5>{formdata.cardholder}</h5> */}
      <h5>VALID THRU</h5>
      <h5>{formdata.validThruMonth}/{formdata.validThruYear}</h5>
      <h5>{formdata.vendor}</h5> 
      <h5>{formdata.cvc}</h5>
        
        </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">CARD NUMBER</label>
        <input type="text" name="cardNumber" id="cardNumber" value={formdata.cardNumber} required pattern="[0-9]{16}" maxLength="16" size="16" onChange={handleChange}/>
        <br />
        <label htmlFor="cardholder">CARDHOLDER NAME</label>
        <input type="text" name="cardholder" id="cardholder" value={fullName} placeholder={fullName} disabled onChange={handleChange}/>
        <br />
        <label htmlFor="validThruMonth">VALID THRU MONTH</label>
        <input type="number" name="validThruMonth" id="validThruMonth" value={formdata.validThruMonth}min="1" max="12" required onChange={handleChange}/>
        <label htmlFor="validThruYear">VALID THRU YEAR</label>
        <input type="number" name="validThruYear" id="validThruYear" value={formdata.validThruYear} min="22" max="27" required onChange={handleChange}/>
        <br />
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

      {/* {cards && <h2>Added card!</h2>} */}
      
    </div>
  )
}

export default AddCard;