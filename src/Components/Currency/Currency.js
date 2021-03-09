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
      <div className="col-12 col-md-6 d-flex justify-content-end d-flex align-items-center mb-2">
         <div>Currency:</div>
         <select defaultValue={currentCurrency.currency} onChange={changeCurrency} className="ml-2">
            {
               currencies.map((c) =>
                  <option key={c.currency} value={c.currency}>{c.currency}</option>)
            }
         </select>
      </div>
   )

}

export default Currency;