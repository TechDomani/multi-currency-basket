import Currency from './Currency';
import currencyData from "../../Data/CurrencyData.json"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Currency component', () => {

    const mockUpdateCurrencyFunction = jest.fn();

    const usd = currencyData.find(d => d.currency === "USD");
    const eur =  currencyData.find(d => d.currency === "EUR");

    const requiredProps = {
        currencies: currencyData,
        currentCurrency: usd,
        updateCurrency: mockUpdateCurrencyFunction}

    test(`Given usd as the prop currentCurrency there should be a combobox with USD as the value`, () => {  
        render(<Currency { ...requiredProps }/>)
        let combo = screen.getByRole("combobox");
        expect(combo).toBeInTheDocument();
        expect(combo).toHaveValue("USD");
    });

    test(`Given the currencies as props there should be associated options`, () => {  
        render(<Currency { ...requiredProps }/>)
        let options = screen.getAllByRole("option");
        expect(options.length).toBe(5);
        expect(options[0]).toHaveValue("CAD");
        expect(options[1]).toHaveValue("CHF");
        expect(options[0]).toHaveValue("CAD");
        expect(options[1]).toHaveValue("CHF");
        expect(options[0]).toHaveValue("CAD");
    });

    test(`When EUR is selected then the combobox value should be EUR and updateCurrency should be called`, () => {  
        render(<Currency { ...requiredProps }/>)
        let combo = screen.getByRole("combobox");
        userEvent.selectOptions(combo, "EUR");
        expect(combo).toHaveValue("EUR");
        expect(mockUpdateCurrencyFunction).toHaveBeenLastCalledWith(eur);
    });
})