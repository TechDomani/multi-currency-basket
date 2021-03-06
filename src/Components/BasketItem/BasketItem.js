import React, { useState } from "react";
import './BasketItem.css'

function BasketItem({ basketItem, getPriceDisplay, updateTotal}){
    
    // State
    const [itemNumber, setItemNumber] = useState(0);

    return (
       <div className="basket-item-container">
           <div className="margin-sm">{basketItem.itemName}</div>
           <div className="margin-sm">{itemNumber}</div>
           <div className="margin-sm">{getPriceDisplay(basketItem.usdPrice)}</div>
       </div>
    )

}

export default BasketItem;