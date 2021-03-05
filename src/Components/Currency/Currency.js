import React from "react";

function Currency({ currencies, currentCurrency,
   setCurrentCurrency}){
    
    return (
        <div>
            <label htmlFor="currencies">Currency:</label> 
            <select id="currencies" defaultValue={currentCurrency} onChange={setCurrentCurrency}>
            {
               currencies.map((c) => 
                  <option key ={c} value={c}>{c}</option>)
            }
            </select>
       </div>
    )

}

export default Currency;