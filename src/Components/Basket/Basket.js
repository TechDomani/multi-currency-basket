import React, { useState } from "react";
import BasketItem from "../BasketItem/BasketItem";
import Currency from "../Currency/Currency";
import soup from './soup.png'
import milk from './milk.png'
import bread from './bread.png'
import apple from './apple.png'

function Basket() {

    // State
    const [currentCurrency, setCurrentCurrency] = useState("USD");
    const [basketTotal, setBasketTotal] = useState(0);

    // Static Data
    const currencies = [
        { currency: "CAD", exchange: 1.26349, symbol: "$" },
        { currency: "CHF", exchange: 0.915, symbol: "Fr" },
        { currency: "EUR", exchange: 0.85, symbol: "€" },
        { currency: "GBP", exchange: 0.716, symbol: "£" },
        { currency: "USD", exchange: 1, symbol: "$" }
    ];

    const basketItems = [
        { usdPrice: 1.00, itemName: "Apples", priceType: "per bag", imageName: apple },
        { usdPrice: 0.80, itemName: "Bread", priceType: "per loaf", imageName: bread  },
        { usdPrice: 1.15, itemName: "Milk", priceType: "per bottle", imageName: milk  },
        { usdPrice: 0.65, itemName: "Soup", priceType: "per tin", imageName: soup  }
    ];

    // Functions
    const getPriceDisplay = (price) => {
        let currency = currencies.find((c) => c.currency === currentCurrency);
        let convertedPrice = Math.round(price * currency.exchange * 100) / 100;
        return `${currency.symbol}${convertedPrice.toFixed(2)}`;
    }

    const updateTotal = (increment) => {
        let total = basketTotal + increment;
        setBasketTotal(total);
    }

    return (
        <div className="container padding-md">
             <div className="row border-grey-btm">
                <div className="col-12 col-md-6">
                    <h1>Basket</h1>
                </div>
                <Currency currencies={currencies.map(c => c.currency)}
                    currentCurrency={currentCurrency}
                    setCurrentCurrency={setCurrentCurrency}>
                </Currency>
            </div>
            {
                basketItems.map((b) => <BasketItem
                    key={b.itemName}
                    basketItem={b}
                    getPriceDisplay={getPriceDisplay}
                    updateTotal={updateTotal}>
                </BasketItem>)
            }
            <div className="row margin-top-sm margin-btm-sm">
                <div className="col d-flex justify-content-end align-items-center">
                    <div>Total:</div>
                    <div className="margin-left-sm">{getPriceDisplay(basketTotal)}</div>
                </div>
            </div>
        </div>
    );
}

export default Basket;