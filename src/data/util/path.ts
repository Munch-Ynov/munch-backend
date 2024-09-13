/**
 * `type A = { foo: {bar : string} }` => Path<A> = 'foo' | 'foo.bar'
 */

export type Path<T> = T extends object
    ? {
          [K in keyof T]-?: K extends string ? K | `${K}.${Path<T[K]>}` : never
      }[keyof T]
    : never

/**
 * `type A = { foo: {bar : string} }` => PathValue<A, 'foo'> = {bar : string} / PathValue<A, 'foo.bar'> = string
 */
export type PathValue<
    T,
    P extends Path<T>,
> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? PathValue<T[K], Rest & Path<T[K]>>
        : never
    : P extends keyof T
      ? T[P]
      : never
