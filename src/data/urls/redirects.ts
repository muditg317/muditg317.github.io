import type {AllUnionMemberKeys, AsReadonlyArr, ElementOf, IndicesOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';
import { Aliases, EmptyString, EntryType, ExtractWords, MultiWord, typeCheckGen, UrlEntry } from './types';
import { EntryType as EntryTypeEnum } from './types';

type InvalidRedirectsFrom<T extends string> = T extends Exclude<T, MultiWord|EmptyString> ? never : T;

type Redirect = UrlEntry<{
  target: URL;
  entryType: EntryType.Redirect;
}>;

type RedirDict<T extends string> = [T] extends [ExtractWords<T>] ? Record<number, Redirect> : Record<number, {aliases: Aliases<T>}>;

// const strArrC = [['hello','hi'], ['hey']] as const;
// type strArr = typeof strArrC;
// type strAr = strArr[number];
// type items = strAr[number];
// type words = ExtractWords<items>;
// type check = items extends words ? true : false;
// type t = RedirDict<items>;
// // const tc: t = [];
// type tt = UrlEntry;
// type as = readonly (readonly string[])[];

const typeCheckFn = typeCheckGen<Redirect, MultiWord|EmptyString>();

// function typeCheckFn<
//     D extends ReadonlyArray<Redirect>, // an arbitrary list of potentially invalid redirects
//     T extends string = D[IndicesOf<D>]['aliases'][number] // all the aliases from that redirect list
//   >(redirList: RedirDict<T>) {
//   return redirList;
// }

export const REDIRECTS = [
  ({
    aliases: ['mungus', 'mungus-irl','among-us','amongus'],
    title: "Mungus-IRL",
    target: new URL('http://mungus.mudit.tech'),
    showOnNavBar: false,
    entryType: EntryTypeEnum.Redirect,
  }),
  ({
    aliases: ['games', 'game-lounge'],
    title: "Games",
    target: new URL('https://muditgupta.appspot.com/game-lounge'),
    showOnNavBar: true,
    entryType: EntryTypeEnum.Redirect,
  }),
] as const;
typeCheckFn<typeof REDIRECTS>(REDIRECTS);

type AliasUnions<UrlEntries extends ReadonlyArray<Redirect>> = { [I in IndicesOf<UrlEntries>]: ElementOf<UrlEntries[I]['aliases']> };

type Reused<Unions extends Record<number, string>> = { [I in keyof Unions]: Extract<Unions[Exclude<keyof Unions, I>], Unions[I]>}[keyof Unions];
type NoneUsed<Unions extends Record<number, string>> = Reused<Unions> extends never ? true : never;

type redAl = AliasUnions<typeof REDIRECTS>;
type reusedAl = Reused<redAl>;
type notUsedAl = NoneUsed<redAl>;

const strArrC = [['mungus', 'mungus-irl','among-us','amongus'], ['games', 'game-lounge']] as const;
type strArr = typeof strArrC;

type b = redAl extends strArr ? true : false;

type inferWords<T> = T extends RedirDict<infer R> ? R : never;
type i = inferWords<typeof REDIRECTS>;

//********Exclude duplicates from alias lists********/
type ConstRedirects = typeof REDIRECTS;
type RedirectIndex = IndicesOf<ConstRedirects>;
type OtherRedirectIndices = { [T in RedirectIndex]: Exclude<RedirectIndex, T> };

type RedirectSources = { [T in RedirectIndex]: ElementOf<ConstRedirects[T]['aliases']> };
type OtherRedirectSources = { [T in RedirectIndex]: RedirectSources[OtherRedirectIndices[T]] };
type AllSources = RedirectSources[RedirectIndex];

type ReusedSourcesFrom = { [T in RedirectIndex]: Extract<OtherRedirectSources[T], RedirectSources[T]> };
type AllReused = ReusedSourcesFrom[RedirectIndex];

type NoneReused = AllReused extends never ? true : never;
const duplicatesAssertion: NoneReused = true;
//***************************************************/

// //****Ensure that all redirect sources are valid*****/
// type InvalidSources = InvalidRedirectsFrom<AllSources>;
// type NoInvalidSources = InvalidSources extends never ? true : never;
// const invalidSourceAssertion: NoInvalidSources = true;
// //***************************************************/

// //****Ensure that Redirect interface is followed*****/
type RedirectConst = ElementOf<ConstRedirects>;
// type RedirectConstKeys = AllUnionMemberKeys<RedirectConst>;

// type AllRedirectKeys = Exclude<RedirectConstKeys | keyof Redirect, ''>;
// type ConstTypeMatches<T extends AllRedirectKeys> = RedirectConst[T] extends Redirect[T] ? never : RedirectConst[T];

// type AnyBadValues = { [K in AllRedirectKeys]: ConstTypeMatches<K> }[AllRedirectKeys];
// type NoBadValues = AnyBadValues extends never ? true : never;
// const badValuesAssertion: NoBadValues = true;
// //***************************************************/

export function filtered<F extends keyof RedirectConst, V extends RedirectConst[F]>(flagName: F, value: V) {
  type FilteredRedirect = Extract<RedirectConst, {[K in F]: V}>;
  function filterFunc(redir: RedirectConst): redir is FilteredRedirect {
    return redir[flagName] === value;
  }
  const filteredRedirects = REDIRECTS.filter(filterFunc);
  return arrayAsReadonly(filteredRedirects as TuplifyUnion<ElementOf<typeof filteredRedirects>>);
}

export type {AllSources};
