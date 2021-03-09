import Currency from './Currency';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Currency component', () => {

    const mockUpdateCurrencyFunction = jest.fn();

    const usd = { currency: "USD", exchange: 1, symbol: "$" };
    const eur = { currency: "EUR", exchange: 0.85, symbol: "€" };


    const requiredProps = {
        currencies: [usd, eur],
        currentCurrency: usd,
        updateCurrency: mockUpdateCurrencyFunction}

    test(`Given usd as the prop currentCurrency there should be a combobox with USD as the value`, () => {  
        render(<Currency { ...requiredProps }/>)
        let combo = screen.getByRole("combobox");
        expect(combo).toBeInTheDocument();
        expect(combo).toHaveValue("USD");
    });

    test(`Given the currencies usd and eur as props there should be two options USD and EUR`, () => {  
        render(<Currency { ...requiredProps }/>)
        let options = screen.getAllByRole("option");
        expect(options.length).toBe(2);
        expect(options[0]).toHaveValue("USD");
        expect(options[1]).toHaveValue("EUR");;
    });

    test(`When EUR is selected then the combobox value should be EUR and updateCurrency should be called`, () => {  
        render(<Currency { ...requiredProps }/>)
        let combo = screen.getByRole("combobox");
        userEvent.selectOptions(combo, "EUR");
        expect(combo).toHaveValue("EUR");
        expect(mockUpdateCurrencyFunction).toHaveBeenLastCalledWith(eur);
    });
})