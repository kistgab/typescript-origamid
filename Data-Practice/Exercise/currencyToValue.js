/**
 * Receive 1.200.500,00 returns 1200500.00
 */
export function currencyToValue(currencyValue) {
    const formattedValue = Number(currencyValue.replaceAll(".", "").replaceAll(",", "."));
    return isNaN(formattedValue) ? null : formattedValue;
}
