import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BasketItem.css'
import "bootstrap/dist/css/bootstrap.css";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

function BasketItem({ basketItem, getPriceDisplay, updateTotal}){
    
    // State
    const [itemNumber, setItemNumber] = useState(0);

    const reduceNumber = () => {
        if (itemNumber > 0){
            let newItemNumber = itemNumber - 1;
            setItemNumber(newItemNumber);
            updateTotal(-1 * basketItem.usdPrice);
        }
    }

    const increaseNumber = () => {
        // Limit number to 99 as a starting assumption
        if (itemNumber < 99){
          let newItemNumber = itemNumber + 1;
          setItemNumber(newItemNumber);
          updateTotal(1 * basketItem.usdPrice);
        }
    }

    return (
       <Row>
           <Col className="margin-sm">{basketItem.itemName}</Col>
           <Col className="basket-item-control">
               <button onClick={reduceNumber}><FontAwesomeIcon icon="minus"/></button>
               <div className="margin-sm">{itemNumber}</div>
               <button onClick={increaseNumber}><FontAwesomeIcon icon="plus"/></button>
           </Col>           
           <Col className="margin-sm">{getPriceDisplay(basketItem.usdPrice*itemNumber)}</Col>
       </Row>
    )

}

export default BasketItem;