import "./App.css";
import { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState({})
  const [errorResult,setErrorResult] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setResult(null)
    setErrorResult(null)

    try {
      let res = await fetch ('http://127.0.0.1:8080/api/v1/mortage?' + new  URLSearchParams(inputs))

      let values = await res.json()
      if (res.status === 200){
        setResult(values)
      }else{
        setErrorResult(values)
      }
    }catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <input
        placeholder="Price"
        type="text" 
        name="price" 
        value={inputs.price || ""} 
        onChange={handleChange}
      />

      <input 
        placeholder="Down payment"
        type="text" 
        name="down_payment" 
        value={inputs.down_payment || ""} 
        onChange={handleChange}
      />

      <input
        placeholder="Interest rate"
        type="text" 
        name="interest_rate" 
        value={inputs.interest_rate || ""} 
        onChange={handleChange}
      />

      <input
        placeholder="Period"
        type="text" 
        name="period" 
        value={inputs.period || ""} 
        onChange={handleChange}
      />


      <select name="payment_schedule" value={inputs.payment_schedule || ""} onChange={handleChange}>
        <option value="accelerated-bi-weekly">Accelerated Bi-Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
       
      <button type="submit">Calculate</button>

      {errorResult ? <div className="message"><p>Error: {errorResult.message}.</p></div> : null}

      {result ? <div className="response"><p>Payment value:  {result?.payment?.toFixed(2)}</p> </div> : null}
         
    </form>

    </div>
  )
}



export default App;
