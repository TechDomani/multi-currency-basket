import React, { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatPrice from "../../Helper/formatPrice";
import ErrorDetail from "../Error/ErrorDetail";

function BasketItem({ basketItem, currency, updateTotal }) {

    // State
    const [itemNumber, setItemNumber] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [displayTotal, setDisplayTotal] = useState(0);
    const [error, setError] = useState(null);  

    useEffect(() => {
        setDisplayPrice(formatPrice(basketItem.usdPrice, currency));
    }, [basketItem.usdPrice, currency])

    useEffect(() => {
        setDisplayTotal(formatPrice(basketItem.usdPrice * itemNumber, currency))
    }, [basketItem.usdPrice, currency, itemNumber])

    const reduceNumber = () => {
        try {
            if (itemNumber > 0) {
                let newItemNumber = itemNumber - 1;
                setItemNumber(newItemNumber);
                updateTotal(-1 * basketItem.usdPrice);
            }
        }
        catch (error) {
            console.error(error);
            setError(error);
        }
    }
  

    const increaseNumber = () => {
        try {
            // Limit number to 99 as a starting assumption
            if (itemNumber < 99) {     
                let newItemNumber = itemNumber + 1;
                setItemNumber(newItemNumber);
                updateTotal(1 * basketItem.usdPrice);
            }
        }
        catch (error) {
            console.error(error);
            setError(error);
        }
    }

    if (error !== null) {
        return <ErrorDetail errorMessage={error.message} componentName="the basket item"></ErrorDetail>
    }
    return (
        <div className="row border-grey-btm">
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center"><img src={basketItem.imageName} className="basket-item-image my-2" alt={basketItem.itemName}></img></div>
            <div className="col-6 col-md-2 d-flex flex-column justify-content-center align-items-center">
                <div>{basketItem.itemName}</div>
                <div className="small">{displayPrice} {basketItem.priceType}</div>
            </div>
            <div className="col-6 col-md-3 d-flex justify-content-center align-items-center">
                <button onClick={reduceNumber} aria-label={"Remove" + basketItem.itemName}><FontAwesomeIcon icon="minus" /></button>
                <div aria-label="Count" className="m-2">{itemNumber}</div>
                <button onClick={increaseNumber} aria-label={"Add" + basketItem.itemName}><FontAwesomeIcon icon="plus" /></button>
            </div>
            <div className="col-12 col-md-3 d-flex justify-content-end align-items-center my-2" aria-label="DisplaySubTotal">{displayTotal}</div>
        </div>
    )
}

export default BasketItem;