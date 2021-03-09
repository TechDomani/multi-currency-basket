import React, { useState } from "react";
import ErrorDetail from "../Error/ErrorDetail";

function Currency({ currencies, currentCurrency, updateCurrency }) {

   const [error, setError] = useState(null);

   const changeCurrency = (event) => {
      try {
         let selectedCurrency = currencies.find(c => c.currency === event.target.value);
         updateCurrency(selectedCurrency);
      }
      catch (error) {
         console.error(error);
         setError(error);
      }
   }

   if (error !== null) {
      return <ErrorDetail errorMessage={error.message} componentName="the currency"></ErrorDetail>
   }
   return (
      <div className="col-12 col-md-6 d-flex justify-content-end d-flex align-items-center margin-btm-sm">
         <div>Currency:</div>
         <select id="currencies" defaultValue={currentCurrency.currency} onChange={changeCurrency} className="margin-left-sm">
            {
               currencies.map((c) =>
                  <option key={c.currency} value={c.currency}>{c.currency}</option>)
            }
         </select>
      </div>
   )

}

export default Currency;