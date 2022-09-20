import { useLocation } from "react-router-dom"
//  Ett nytt kort ska kunna läggas till med följande information: Vendor, card number, cardholder, expire month, expire year, CCV. (Se bild nedan).
//  För kortutgivare ska du hårdkoda in minst tre alternativ man kan välja mellan. Den användaren väljer ska stå på kortet uppe till höger (t.ex. Mastercard, Visa, American Express etc. Eller om ni vill hitta på något roligare!).
//  Högst upp ska en förhandsvisning av kortet finnas, som uppdateras automatiskt när användare fyller i informationen.

//Kolla på todo-projektet hur nytt kort ska läggas till. Behöver finnas spärr på max 4st!
//använd komponenten Card för att rendera förhandsvisning av kortet?

const AddCard = () => {
  const location = useLocation();
  const user = location.state;
  const fullName = `${user[0].name.first} ${user[0].name.last}`;


  return (
    <div>
      <h1>ADD A NEW BANK CARD</h1>
      <p>NEW CARD</p>
      <div style={{border: "solid 1px black", width: "200px", height: "100px"}}>Förhandsvisning av kortet</div>
      <form action="">
        <label htmlFor="cardNumber">CARD NUMBER</label>
        <input type="text" id="cardNumber" required pattern="[0-9]{16}" maxLength="16" size="16"/>
        <br />
        <label htmlFor="cardholderName">CARDHOLDER NAME</label>
        <input type="text" id="cardholderName" disabled placeholder={fullName}/>
        <br />
        <label htmlFor="validThru">VALID THRU</label>
        <input type="number" id="validThruMonth" min="1" max="12"/>
        <input type="number" id="validThruYear" min="22" max="27"/>
     


        <label htmlFor="cvc">CVC</label>
        <input type="text" id="cvc" pattern="[0-9]" maxLength="4"/>
        <br />
        <label htmlFor="vendor">VENDOR</label>
        <select name="vendor" id="vendor">
          <option value="" disabled>Choose vendor...</option>
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="amex">American Express</option>
        </select>
        <br />
    <button>ADD CARD</button>
      </form>



    </div>
  )
}

export default AddCard