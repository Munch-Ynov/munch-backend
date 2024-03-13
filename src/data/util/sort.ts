import type { Path } from './path';

/**
 * used to sort an entity E when fetching from the database
 * eg :  Sort<A> = { foo.bar : "asc" }
 */

export type Sort<E> = {
  [P in Path<E>]?: 'asc' | 'desc';
}
