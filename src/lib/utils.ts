/**
 * Formats a given number as Indonesian Rupiah (IDR) currency.
 *
 * @param value - The numeric value to be formatted as currency.
 * @returns A string representing the value in Indonesian Rupiah format.
 *
 * @example
 * ```typescript
 * const formattedValue = toRupiahFormat(100000);
 * console.log(formattedValue); // "Rp 100.000"
 * ```
 */
export function toRupiahFormat(value: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(value);
}
