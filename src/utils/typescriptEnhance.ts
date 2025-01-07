/**
 * A type-safe wrapper around `Object.keys` that returns an array of keys from the given object.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys of the object, constrained to string keys.
 * @param {T} obj - The object from which to extract keys.
 * @returns {K[]} - An array of keys from the object.
 *
 * @example
 * const keys = objectKeys({ a: 1, b: 2 }); // ['a', 'b']
 */
export const objectKeys = Object.keys as <T extends Record<string, any>, K extends keyof T = Extract<keyof T, string>>(
  obj: T,
) => K[];

/**
 * A type-safe wrapper around `Object.values` that returns an array of values from the given object.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys of the object, constrained to string keys.
 * @param {T} obj - The object from which to extract values.
 * @returns {T[K][]} - An array of values from the object.
 *
 * @example
 * const values = objectValues({ a: 1, b: 2 }); // [1, 2]
 */
export const objectValues = Object.values as <
  T extends Record<string, any>,
  K extends keyof T = Extract<keyof T, string>,
>(
  obj: T,
) => T[K][];

/**
 * A type-safe wrapper around `Object.entries` that returns an array of key-value pairs from the given object.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys of the object, constrained to string keys.
 * @template V - The type of the values of the object.
 * @param {T} obj - The object from which to extract entries.
 * @returns {[K, V][]} - An array of key-value pairs from the object.
 *
 * @example
 * const entries = objectEntries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
 */
export const objectEntries = Object.entries as <
  T extends Record<string, any>,
  K extends keyof T = Extract<keyof T, string>,
  V = T[K],
>(
  obj: T,
) => [K, V][];
