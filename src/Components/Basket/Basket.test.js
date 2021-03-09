import Basket from './Basket';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import registerIcons from '../../Helper/registerIcons';

describe('Basket component', () => {

    registerIcons();
 
    test(`When a basket items are added the total will increase`, () => {  
        render(<Basket />);
        const addBreadButton = screen.getByLabelText("AddBread");
        userEvent.click(addBreadButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$0.80");
        const addMilkButton = screen.getByLabelText("AddMilk");
        userEvent.click(addMilkButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$1.95");
    });

    test(`When a basket item is removed the total will decrease`, () => {  
        render(<Basket />)
        const addSoupButton = screen.getByLabelText("AddSoup");
        userEvent.click(addSoupButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$0.65");
        const addApplesButton = screen.getByLabelText("AddApples");
        userEvent.click(addApplesButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$1.65");
        const removeSoupButton = screen.getByLabelText("RemoveSoup");
        userEvent.click(removeSoupButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$1.00");
    });

    test(`When the currency is changed the total should change currency`, () => {  
        render(<Basket />);
        // Add Bread
        const addBreadButton = screen.getByLabelText("AddBread");
        userEvent.click(addBreadButton);
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("$0.80");
        // Change currency to CHF
        let combo = screen.getByRole("combobox");
        userEvent.selectOptions(combo, "CHF");
        expect(screen.getByLabelText("DisplayTotal")).toHaveTextContent("Fr 0.73");
    }); 
})