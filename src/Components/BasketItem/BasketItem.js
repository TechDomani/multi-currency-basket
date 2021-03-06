import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BasketItem.css'

function BasketItem({ basketItem, getPriceDisplay, updateTotal}){
    
    // State
    const [itemNumber, setItemNumber] = useState(0);

    return (
       <div className="basket-item-container">
           <div className="margin-sm">{basketItem.itemName}</div>
           <div className="basket-item-control">
               <button><FontAwesomeIcon icon="minus" /></button>
               <div className="margin-sm">{itemNumber}</div>
               <button><FontAwesomeIcon icon="plus" /></button>
           </div>
           
           <div className="margin-sm">{getPriceDisplay(basketItem.usdPrice)}</div>
       </div>
    )

}

export default BasketItem;