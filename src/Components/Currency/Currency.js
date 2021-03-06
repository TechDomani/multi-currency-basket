import React from "react";

function Currency({ currencies, currentCurrency,
   setCurrentCurrency}){

   const updateCurrency = (event) => {
      console.log(event);
      setCurrentCurrency(event.target.value);
   }
    
    return (
        <div>
            <label htmlFor="currencies" className="margin-sm">Currency:</label> 
            <select id="currencies" defaultValue={currentCurrency} onChange={updateCurrency} className="margin-sm"> 
            {
               currencies.map((c) => 
                  <option key ={c} value={c}>{c}</option>)
            }
            </select>
       </div>
    )

}

export default Currency;