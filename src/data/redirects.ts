import {AllUnionMemberKeys, ElementOf, IndicesOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';

type CapitalLetter = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';

type MultiWord = `${string} ${string}`;
type EmptyString = ``;
type InvalidRedirectsFrom<T extends string> = T extends Exclude<T, MultiWord|EmptyString> ? never : T;
type CapitalizedString = `${CapitalLetter}${string}`;


type Redirect = Readonly<Required<{
  aliases: string[];
  longName: CapitalizedString;
  target: URL;
  showOnNavBar: boolean;
}>>;

export const REDIRECTS = [
  ({
    aliases: ['mungus', 'mungus-irl','among-us','amongus'],
    longName: "Mungus-IRL",
    target: new URL('http://mungus.mudit.tech'),
    showOnNavBar: false,
  }),
  ({
    aliases: ['games', 'game-lounge'],
    longName: "Games",
    target: new URL('https://muditgupta.appspot.com/game-lounge'),
    showOnNavBar: true,
  }),
] as const;


//********Exclude duplicates from alias lists********/
type REDIRECTS_type = typeof REDIRECTS;
type RedirectIndex = IndicesOf<REDIRECTS_type>;
type OtherRedirectIndices = { [T in RedirectIndex]: Exclude<RedirectIndex, T> };

type RedirectSources = { [T in RedirectIndex]: ElementOf<REDIRECTS_type[T]['aliases']> };
type OtherRedirectSources = { [T in RedirectIndex]: RedirectSources[OtherRedirectIndices[T]] };
type AllSources = RedirectSources[RedirectIndex];

type ReusedSourcesFrom = { [T in RedirectIndex]: Extract<OtherRedirectSources[T], RedirectSources[T]> };
type AllReused = ReusedSourcesFrom[RedirectIndex];

type NoneReused = AllReused extends never ? true : never;
const duplicatesAssertion: NoneReused = true;
//***************************************************/

//****Ensure that all redirect sources are valid*****/
type InvalidSources = InvalidRedirectsFrom<AllSources>;
type NoInvalidSources = InvalidSources extends never ? true : never;
const invalidSourceAssertion: NoInvalidSources = true;
//***************************************************/

//****Ensure that Redirect interface is followed*****/
type RedirectConst = ElementOf<REDIRECTS_type>;
type RedirectConstKeys = AllUnionMemberKeys<RedirectConst>;

type AllRedirectKeys = Exclude<RedirectConstKeys | keyof Redirect, 'aliases'>;
type ConstTypeMatches<T extends AllRedirectKeys> = RedirectConst[T] extends Redirect[T] ? never : RedirectConst[T];

type AnyBadValues = { [K in AllRedirectKeys]: ConstTypeMatches<K> }[AllRedirectKeys];
type NoBadValues = AnyBadValues extends never ? true : never;
const badValuesAssertion: NoBadValues = true;
//***************************************************/

export function filtered<F extends keyof RedirectConst, V extends RedirectConst[F]>(flagName: F, value: V) {
  type FilteredRedirect = Extract<RedirectConst, {[K in F]: V}>;
  function filterFunc(redir: RedirectConst): redir is FilteredRedirect {
    return redir[flagName] === value;
  }
  const filteredRedirects = REDIRECTS.filter(filterFunc);
  return arrayAsReadonly(filteredRedirects as TuplifyUnion<ElementOf<typeof filteredRedirects>>);
}

export type {AllSources};
