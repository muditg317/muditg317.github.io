import {ElementOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';
import type { GetAliases, MultiWord, UrlEntry } from './types';
import {EntryType, typeCheckFn} from './types';
import { Landing } from 'components/landing';
import { AppFooter } from 'components/app/footer';

export type InvalidPageAlias = MultiWord;

// TODO: custom validator for pages
export type Page = UrlEntry<{
  isMainPage: boolean;
  mainAliasIndex: number;
  component: (() => JSX.Element) | undefined;
  entryType: EntryType.Page;
}>;

export const PAGES = [
  ({
    aliases: ['', 'main', 'home', 'landing'],
    mainAliasIndex: 0,
    title: "Mudit Gupta",
    showOnNavBar: false,
    isMainPage: true,
    component: Landing,
    entryType: EntryType.Page,
  }),
  ({
    aliases: ['about'],
    mainAliasIndex: 0,
    title: "About",
    showOnNavBar: true,
    isMainPage: false,
    component: AppFooter,
    entryType: EntryType.Page,
  }),
] as const;
typeCheckFn<typeof PAGES, Page, InvalidPageAlias>(PAGES);

export type ConstPages = typeof PAGES;
export type PageConst = ElementOf<ConstPages>;
export function filtered<F extends keyof PageConst, V extends PageConst[F]>(flagName: F, value: V) {
  type FilteredPage = Extract<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] === value;
  }
  const filteredPages = PAGES.filter(filterFunc);
  return arrayAsReadonly(filteredPages as TuplifyUnion<ElementOf<typeof filteredPages>>);
}
export function excluding<F extends keyof PageConst, V extends PageConst[F]|undefined>(flagName: F, value: V) {
  type FilteredPage = Exclude<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] !== value;
  }
  const filteredPages = PAGES.filter(filterFunc);
  return arrayAsReadonly(filteredPages as TuplifyUnion<ElementOf<typeof filteredPages>>);
}
export function findWhere<F extends keyof PageConst, V extends PageConst[F]>(flagName: F, value: V) {
  type FilteredPage = Extract<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] === value;
  }
  return PAGES.find(filterFunc)!;
}

export type AllSources = GetAliases<typeof PAGES>;
