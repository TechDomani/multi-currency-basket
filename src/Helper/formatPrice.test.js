import formatPrice from './formatPrice';
import currencyData from "../Data/CurrencyData.json"

describe("formatPrice", () => {

    const usd = currencyData.find(d => d.currency === "USD");
    const eur =  currencyData.find(d => d.currency === "GBP");

    test(`returns a price in the requested currency`, () => {
        expect(formatPrice(4, usd)).toBe("$4.00");
        expect(formatPrice(2.3, eur)).toBe("£1.65");
    })
})