import {ElementOf, IndicesOf} from 'utils/types';

type CapitalLetter = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';

type MultiWord = `${string} ${string}`;
type EmptyString = ``;
type InvalidRedirectsFrom<T extends string> = T extends Exclude<T, MultiWord|EmptyString> ? never : T;
type CapitalizedString = `${CapitalLetter}${string}`;


interface Redirect<T extends string = string> {
  readonly aliases: T[];
  readonly longName: CapitalizedString;
  readonly target: URL;
  readonly showOnNavBar: boolean;
}

type NavRedir<T extends string> = Redirect<T> & {
  readonly showOnNavBar: true;
}

const REDIRECTS = [
  ({
    aliases: ['mungus', 'mungus-irl','among-us','amongus'],
    longName: "Mungus-IRL",
    target: new URL('http://mungus.mudit.tech'),
    showOnNavBar: false,
    hello: 5,
  }),
  ({
    aliases: ['games', 'game-lounge'],
    longName: "Games",
    target: new URL('https://muditgupta.appspot.com/game-lounge'),
    showOnNavBar: true,
  }),
] as const;


//********Exclude duplicates from alias lists********/
type RedirectIndex = IndicesOf<typeof REDIRECTS>;
type OtherRedirectIndices = { [T in RedirectIndex]: Exclude<RedirectIndex, T> };

type RedirectSources = { [T in RedirectIndex]: ElementOf<typeof REDIRECTS[T]['aliases']> };
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
type vals = typeof REDIRECTS[RedirectIndex];
type t1 = Pick<vals, keyof Redirect>;
type t2 = Pick<Redirect, keyof vals>;
type tkey = Exclude<keyof vals & keyof Redirect, 'aliases'>;

type textra<T extends tkey> = t1[T] extends t2[T] ? never : t1[T];

type AnyBadValues = { [K in tkey]: textra<K> }[tkey];
type NoBadValues = AnyBadValues extends never ? true : never;
const badValuesAssertion: NoBadValues = true;
//***************************************************/

function filtered(flagName: keyof Redirect) {
  return Object.fromEntries(Object.entries(REDIRECTS).filter(([,{[flagName]: flag}]) => flag));
}

export default REDIRECTS;
export { REDIRECTS, filtered };
export type { AllSources };