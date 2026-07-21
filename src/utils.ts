/**
 * Returns a random number.
 * @param min The minimum, inclusive.
 * @param max The maximum, inclusive.
 */
export function random(min: number, max: number) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

/**
 * Returns a random number, including decimals.
 * @param min The minimum.
 * @param max The maximum.
 */
export function randomDecimal(min: number, max: number) {
    return Math.random() * (max - min) + min;
} 