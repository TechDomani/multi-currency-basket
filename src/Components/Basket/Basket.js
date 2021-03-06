import React, { useState } from "react";
import { useEffect } from "react";
import BasketItem from "../BasketItem/BasketItem";
import Currency from "../Currency/Currency";

function Basket() {

    // State
    const [currentCurrency, setCurrentCurrency] = useState("USD");
    const [basketTotal, setBasketTotal] = useState(0);

    // Static Data
    const currencies = [
         { currency: "CAD", exchange: 1.26349, symbol: "$"},
         { currency: "CHF", exchange: 0.915, symbol: "Fr" },
         { currency: "EUR", exchange: 0.85, symbol: "€" },
         { currency: "GBP", exchange: 0.716, symbol: "£" },               
         { currency: "USD", exchange: 1, symbol: "$"}
     ]; 

     const basketItems = [
        { usdPrice: 1.00, itemName: "Apples", priceType: "per bag" },
        { usdPrice: 0.80, itemName: "Bread", priceType: "per loaf" },
        { usdPrice: 1.15, itemName: "Milk", priceType: "per bottle" },
        { usdPrice: 0.65, itemName: "Soup", priceType: "per tin" }
     ];  
     
     // Functions
     const getPriceDisplay = (price) => {
         console.log(currentCurrency);
         let currency = currencies.find((c) => c.currency === currentCurrency);
         console.log(currency);
         let convertedPrice = Math.round(price*currency.exchange*100)/100;
         return `${currency.symbol}${convertedPrice}`;
     }

     const updateTotal = (increment) => {
         let total = basketTotal + increment;
         setBasketTotal(total);
     }
     
     return (
       <div>
            <Currency currencies={currencies.map(c => c.currency)}
              currentCurrency={currentCurrency}
              setCurrentCurrency={setCurrentCurrency}>
            </Currency> 
            {
                basketItems.map((b) => <BasketItem key={b.itemName}
                                                   basketItem={b} 
                                                   getPriceDisplay={getPriceDisplay} 
                                                   updateTotal={updateTotal}>
                                       </BasketItem>)
            } 
        </div>
    );
}

export default Basket;