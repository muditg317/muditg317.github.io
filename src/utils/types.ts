/** Type of the elements in an array */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer E)[] ? E : T extends ArrayLike<infer E> ? E : never;

/** Used internally for `Tail`. */
type AsFunctionWithArgsOf<T extends unknown[] | readonly unknown[]> = (...args: T) => any;

/** Used internally for `Tail` */
type TailArgs<T> = T extends (x: any, ...args: infer T) => any ? T : never;

/** Elements of an array after the first. */
export type Tail<T extends unknown[] | readonly unknown[]> = TailArgs<AsFunctionWithArgsOf<T>>;

/** Used internally for `IndicesOf`; probably useless outside of that. */
type AsDescendingLengths<T extends unknown[] | readonly unknown[]> =
    [] extends T ? [0] :
    [ElementOf<ElementOf<AsDescendingLengths<Tail<T>>[]>>, T['length']];

/** Union of numerical literals corresponding to a tuple's possible indices */
export type IndicesOf<T extends ArrayLike<unknown>> =
    number extends T['length'] ? number :
    [] extends T ? never :
    0 extends T['length'] ? never :
    T extends unknown[] | readonly unknown[] ? ElementOf<AsDescendingLengths<Tail<T>>> :
    keyof T extends 'length' ? never : keyof T;

/** Used internally by AsReadonlyArr - get keys excluding indices and length */
type ReadonlyArrayMethods = Omit<readonly any[], number|'length'>;

/** Convert a record of number to item to a readonly array of those items */
export type AsReadonlyArr<Items extends Record<number, unknown>, Length> = Items & ReadonlyArrayMethods & {length: Length};
    
/** Extract keys from each option in a union type */
export type AllUnionMemberKeys<T> = T extends any ? keyof T : never;

/** Convert union to intersection type */
export type UnionToIntersection<T> = 
    (T extends any ? (x: T) => void : never) extends 
    (x: infer R) => void ? R : never;

/** Used internally for TuplifyUnion - gets last entry in union
 * works b/c inferring from overloaded function will infer from last signature
 */
type LastOf<T> =
    UnionToIntersection<
        T extends any ? () => T : never
    > extends
    () => infer R ? R : never;

/** Used internally for TuplifyUnion - adds type V to list of types T */
type Push<T extends any[], V> = [V, ...T];

/** Used internally for TuplifyUnion - adds necessary generic params */
type TuplifyUnionHelper<
    T, // the union type
    L = LastOf<T>, // the last option of the union
    N = [T] extends [never] ? true : false // true if the union type is never
> =
    true extends N 
    ? [] // the union is empty, return empty tuple
    : Push< // build the tuple type
        TuplifyUnionHelper<Exclude<T, L>>, // tuplify all options but the last from the union
        L // add the last option to the tuple type
    >;

/** Convert union type to tuple by repeatedly extracting last item */
export type TuplifyUnion<T> = TuplifyUnionHelper<T>;

/** Get all value types from object type - (key,value) pairs */
export type ValueOf<T extends Record<any, unknown>> = T extends Record<infer K, unknown> ? T[K] : never;