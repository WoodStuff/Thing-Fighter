/**
 * Returns a random number.
 * @param min The minimum, inclusive.
 * @param max The maximum, inclusive.
 */
export function random(min: number, max: number) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}