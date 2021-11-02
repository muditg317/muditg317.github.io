import {AllUnionMemberKeys, ElementOf, IndicesOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';
import { MultiWord, UrlEntry } from './types';

type InvalidPagesFrom<T extends string> = T extends Exclude<T, MultiWord> ? never : T;

type Page = UrlEntry<{
  isMainPage: boolean;
}>;

export const PAGES = [
  ({
    aliases: ['', 'main', 'home', 'landing'],
    title: "Mudit Gupta",
    showOnNavBar: true,
    isMainPage: true,
  }),
] as const;


//********Exclude duplicates from alias lists********/
type ConstPages = typeof PAGES;
type PageIndex = IndicesOf<ConstPages>;
type OtherPageIndices = { [T in PageIndex]: Exclude<PageIndex, T> };

type PageSources = { [T in PageIndex]: ElementOf<ConstPages[T]['aliases']> };
type OtherPageSources = { [T in PageIndex]: PageSources[OtherPageIndices[T]] };
type AllSources = PageSources[PageIndex];

type ReusedSourcesFrom = { [T in PageIndex]: Extract<OtherPageSources[T], PageSources[T]> };
type AllReused = ReusedSourcesFrom[PageIndex];

type NoneReused = AllReused extends never ? true : never;
const duplicatesAssertion: NoneReused = true;
//***************************************************/

//****Ensure that all page sources are valid*****/
type InvalidSources = InvalidPagesFrom<AllSources>;
type NoInvalidSources = InvalidSources extends never ? true : never;
const invalidSourceAssertion: NoInvalidSources = true;
//***************************************************/

//****Ensure that Page interface is followed*****/
type PageConst = ElementOf<ConstPages>;
type PageConstKeys = AllUnionMemberKeys<PageConst>;

type AllPageKeys = Exclude<PageConstKeys | keyof Page, 'aliases'>;
type ConstTypeMatches<T extends AllPageKeys> = PageConst[T] extends Page[T] ? never : PageConst[T];

type AnyBadValues = { [K in AllPageKeys]: ConstTypeMatches<K> }[AllPageKeys];
type NoBadValues = AnyBadValues extends never ? true : never;
const badValuesAssertion: NoBadValues = true;
//***************************************************/

export function filtered<F extends keyof PageConst, V extends PageConst[F]>(flagName: F, value: V) {
  type FilteredPage = Extract<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] === value;
  }
  const filteredPages = PAGES.filter(filterFunc);
  return arrayAsReadonly(filteredPages as TuplifyUnion<ElementOf<typeof filteredPages>>);
}

export type {AllSources};
