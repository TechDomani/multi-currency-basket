
export default function getPriceDisplay(price, currency) {
    let convertedPrice = Math.round(price * currency.exchange * 100) / 100;
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
}