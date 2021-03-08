import React from "react";

function Currency({ currencies, currentCurrency,
   setCurrentCurrency}){

   const updateCurrency = (event) => {
      setCurrentCurrency(event.target.value);
   }
    
    return (
        <div className="col-12 col-md-6 d-flex justify-content-end d-flex align-items-center margin-btm-sm">
            <div>Currency:</div> 
            <select id="currencies" defaultValue={currentCurrency} onChange={updateCurrency} className="margin-left-sm"> 
            {
               currencies.map((c) => 
                  <option key ={c} value={c}>{c}</option>)
            }
            </select>
       </div>
    )

}

export default Currency;