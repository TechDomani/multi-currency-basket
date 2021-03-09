import React, { useState } from "react";
import formatPrice from "../../Helper/formatPrice";
import BasketItem from "../BasketItem/BasketItem";
import Currency from "../Currency/Currency";
import ErrorDetail from "../Error/ErrorDetail";
import soup from './soup.png'
import milk from './milk.png'
import bread from './bread.png'
import apple from './apple.png'

function Basket() {

    // Static Data
    const usdCurrency = { currency: "USD", exchange: 1, symbol: "$" };
    const currencies = [
        { currency: "CAD", exchange: 1.26349, symbol: "$" },
        { currency: "CHF", exchange: 0.915, symbol: "Fr " },
        { currency: "EUR", exchange: 0.85, symbol: "€" },
        { currency: "GBP", exchange: 0.716, symbol: "£" },
        usdCurrency
    ];

    const basketItems = [
        { usdPrice: 1.00, itemName: "Apples", priceType: "per bag", imageName: apple },
        { usdPrice: 0.80, itemName: "Bread", priceType: "per loaf", imageName: bread },
        { usdPrice: 1.15, itemName: "Milk", priceType: "per bottle", imageName: milk },
        { usdPrice: 0.65, itemName: "Soup", priceType: "per tin", imageName: soup }
    ];

    // State
    const [currentCurrency, setCurrentCurrency] = useState(usdCurrency);
    const [basketTotal, setBasketTotal] = useState(0);
    const [displayTotal, setDisplayTotal] = useState("$0.00");
    const [error, setError] = useState(null);


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
                <Currency currencies={currencies}
                    currentCurrency={currentCurrency}
                    updateCurrency={updateCurrency}>
                </Currency>
            </div>
            {
                basketItems.map((b) => <BasketItem
                    key={b.itemName}
                    basketItem={b}
                    currency={currentCurrency}
                    updateTotal={updateTotal}>
                </BasketItem>)
            }
            <div className="row margin-top-sm margin-btm-sm">
                <div className="col d-flex justify-content-end align-items-center">
                    <div>Total:</div>
                    <div className="margin-left-sm">{displayTotal}</div>
                </div>
            </div>
        </div>)
}

export default Basket;