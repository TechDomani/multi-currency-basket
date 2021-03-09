import BasketItem from './BasketItem';
import apple from '../Basket/apple.png';
import { render, screen } from '@testing-library/react';
import registerIcons from '../../Helper/registerIcons';
import userEvent from '@testing-library/user-event';

describe('BasketItem component', () => {

    registerIcons();

    const mockUpdateTotalFunction = jest.fn();

    const requiredProps = {
        basketItem:  { usdPrice: 1.50, 
                       itemName: "Apples", 
                       priceType: "per bag", 
                       imageName: apple }, 
        currency: { currency: "GBP", exchange: 0.716, symbol: "£" }, 
        updateTotal: mockUpdateTotalFunction }

    test(`The item name should be shown`, () => {  
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByText("Apples")).toBeInTheDocument();
    });

    test(`The price in the correct currency should be shown`, () => {  
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByText("£1.07 per bag")).toBeInTheDocument();
    });

    test(`The item image should be shown`, () => {  
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByAltText("Apples")).toBeInTheDocument();
    });
 
    test(`The remove button should be shown`, () => {
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByLabelText("Remove")).toBeInTheDocument();
    })

    test(`The add button should be shown`, () => {
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByLabelText("Add")).toBeInTheDocument();
    })

    test(`The item count should initially be zero`, () => {
        render(<BasketItem { ...requiredProps }/>)
        expect(screen.getByLabelText("Count")).toHaveTextContent("0");
    })

    test(`The item count should increase when the add button is clicked,
             updateTotal should be called with the usdPrice
             the sub total should be shown correctly`, () => {
        render(<BasketItem { ...requiredProps }/>)
        const addButton = screen.getByLabelText("Add");
        // Add one item
        userEvent.click(addButton);
        expect(screen.getByLabelText("Count")).toHaveTextContent("1");
        expect(mockUpdateTotalFunction).toHaveBeenLastCalledWith(1.50);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("£1.07");
        // Add another item
        userEvent.click(addButton);
        expect(screen.getByLabelText("Count")).toHaveTextContent("2");
        expect(mockUpdateTotalFunction).toHaveBeenLastCalledWith(1.50);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("£2.15");
    })

    test(`The item count should decrease when the remove button is clicked,
             updateTotal should be called with a negative usdPrice
             the sub total should be shown correctly`, () => {
        render(<BasketItem { ...requiredProps }/>)
        // Add two items
        const addButton = screen.getByLabelText("Add");
        userEvent.click(addButton);
        userEvent.click(addButton);
        expect(screen.getByLabelText("Count")).toHaveTextContent("2");
        // Remove item
        const removeButton = screen.getByLabelText("Remove");
        userEvent.click(removeButton);
        expect(screen.getByLabelText("Count")).toHaveTextContent("1");
        expect(mockUpdateTotalFunction).toHaveBeenLastCalledWith(-1.50);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("£1.07");
    })

    test(`The item count should not decrease when the remove button is clicked 
          but it is already zero`, () => {
        render(<BasketItem { ...requiredProps }/>)
        const removeButton = screen.getByLabelText("Remove");
        userEvent.click(removeButton);
        expect(screen.getByLabelText("Count")).toHaveTextContent("0");
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("£0.00");
    })
})