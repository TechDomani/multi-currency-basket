import React, { useState } from "react";
import Currency from "../Currency/Currency";

function Basket() {

    const [currentCurrency, setCurrentCurrency] = useState("USD");

    const currencies = [
         { currency: "CAD", exchange: 1.26349 },
         { currency: "CHF", exchange: 0.915 },
         { currency: "EUR", exchange: 0.85 },
         { currency: "GBP", exchange: 0.716 },
         { currency: "USD", exchange: 1 }
     ]; 

    return (
       <div>
            Hello
            <Currency currencies={currencies.map(c => c.currency)}
              currentCurrency={currentCurrency}
              setCurrentCurrency={setCurrentCurrency}
            >
            </Currency> 
        </div>
    );
}

export default Basket;