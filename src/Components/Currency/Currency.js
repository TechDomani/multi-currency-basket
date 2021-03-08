import React from "react";

function Currency({ currencies, currentCurrency, updateCurrency}){

   const changeCurrency = (event) => {
      let selectedCurrency = currencies.find(c => c.currency === event.target.value);
      updateCurrency(selectedCurrency);
   }
    
    return (
        <div className="col-12 col-md-6 d-flex justify-content-end d-flex align-items-center margin-btm-sm">
            <div>Currency:</div> 
            <select id="currencies" defaultValue={currentCurrency.currency} onChange={changeCurrency} className="margin-left-sm"> 
            {
               currencies.map((c) => 
                  <option key ={c.currency} value={c.currency}>{c.currency}</option>)
            }
            </select>
       </div>
    )

}

export default Currency;