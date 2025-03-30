// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Async wrapper function
export async function tryCatchAsync<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// Sync wrapper function
export function tryCatchSync<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    const data = fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

// Shorthand for async version
export const tryCatch = tryCatchAsync;
