//denna ska bara rendera ut själva kortet

const Card = ({ cardNumber, valid, id, active, user }) => {
  
  const { first, last } = user[0].name;

  return (
    <div style={{border: "solid 1px black", width: "50vw", height: "45vh"}}>
      <h4>{cardNumber}</h4>
      <h5>CARDHOLDER NAME</h5>
      <h5>{first} {last}</h5>
      <h5>VALID THRU</h5>
      <h5>{valid}</h5>
    </div>
  )
}


// const Card = ({data}) => {
  
//   const { first, last } = data[0].name;

//   return (
//     <div style={{border: "solid 1px black", width: "50vw", height: "45vh"}}>
//       <h4></h4>
//       <h5>CARDHOLDER NAME</h5>
//       <h5>{first} {last}</h5>
//       <h5>VALID THRU</h5>
//       <h5></h5>
//     </div>
//   )
// }

export default Card