/**
 * A utility function to wrap asynchronous route handlers and middleware.
 * This function catches any errors that occur in the asynchronous function
 * and passes them to the next middleware function.
 *
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A new function that wraps the original function and handles errors.
 */
export const asyncHandler = (fn: any) =>
  async function asyncUtilWrap(...args: any[]) {
    // Call the original function with the provided arguments
    const fnReturn = fn(...args);
    // Get the next middleware function from the arguments
    const next = args[args.length - 1];
    // Return a promise that resolves the function return or catches any errors
    return Promise.resolve(fnReturn).catch(next);
  };
