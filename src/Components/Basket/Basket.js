import React, { useState } from "react";
import axios from 'axios'
import {useEffect} from "react";
import formatPrice from "../../Helper/formatPrice";
import BasketItem from "../BasketItem/BasketItem";
import Currency from "../Currency/Currency";
import currencyData from "../../Data/CurrencyData.json"
import basketItemData from "../../Data/BasketItemData"
import ErrorDetail from "../Error/ErrorDetail";

function Basket() {

    // Static Data
    const usdCurrency = currencyData.find(d => d.currency === "USD");

    // State
    const [currentCurrency, setCurrentCurrency] = useState(usdCurrency);
    const [basketTotal, setBasketTotal] = useState(0);
    const [displayTotal, setDisplayTotal] = useState("$0.00");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://api.currencylayer.com/live?access_key=ab63bc787ada96541ce94291de75e602`)
        .then((response) => {
             console.log(response);                         
             const currencyQuotes = response.data.quotes;
             currencyData.forEach((c) => {
                 const exchangeString = "USD" + c.currency;
                 c.exchange = currencyQuotes[exchangeString];
             })
        })
        .catch(error => console.log(error))
    })

    // Update Functions  
    const updateCurrency = (currency) => {
        try {
            setCurrentCurrency(currency);
            setDisplayTotal(formatPrice(basketTotal, currency));
        }
        catch (error) {
            console.error(error);
            setError(error);
        }
    }

    const updateTotal = (increment) => {
        try {
            let total = basketTotal + increment;
            setBasketTotal(total);
            setDisplayTotal(formatPrice(total, currentCurrency));
        }
        catch (error) {
            console.error(error);
            setError(error);
        }
    }

    if (error !== null) {
        return <ErrorDetail errorMessage={error.message} componentName="the basket"></ErrorDetail>
    }
    return (
        <div className="container py-2 mx-4">
            <div className="row border-grey-btm">
                <div className="col-12 col-md-6">
                    <h1>Basket</h1>
                </div>
                <Currency currencies={currencyData}
                    currentCurrency={currentCurrency}
                    updateCurrency={updateCurrency}>
                </Currency>
            </div>
            {
                basketItemData.map((b) => <BasketItem
                    key={b.itemName}
                    basketItem={b}
                    currency={currentCurrency}
                    updateTotal={updateTotal}>
                </BasketItem>)
            }
            <div className="row my-2">
                <div className="col d-flex justify-content-end align-items-center">
                    <div>Total:</div>
                    <div className="ml-2" aria-label="DisplayTotal">{displayTotal}</div>
                </div>
            </div>
        </div>)
}

export default Basket;