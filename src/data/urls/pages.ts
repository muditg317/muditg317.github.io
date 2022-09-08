import {ElementOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';
import type { GetAliases, MultiWord, UrlEntry } from './types';
import {EntryType, typeCheckFn} from './types';
import { Landing } from 'components/landing';
import { Projects } from 'components/projects';
import { Blog } from 'components/blog';
import { AboutPage } from 'components/about';

export type InvalidPageAlias = MultiWord;

// TODO: custom validator for pages
export type Page = UrlEntry<{
  isMainPage: boolean;
  component: ((...args: any[]) => JSX.Element) | undefined;
  entryType: EntryType.Page;
}>;

export const PAGES = [
  {
    aliases: ['', 'main', 'home', 'landing'],
    title: "Mudit Gupta",
    showOnNavBar: false,
    isMainPage: true,
    component: Landing,
    entryType: EntryType.Page,
  },
  {
    aliases: ['projects'],
    title: "Projects",
    showOnNavBar: true,
    isMainPage: false,
    component: Projects,
    entryType: EntryType.Page,
  },
  {
    aliases: ['blog'],
    title: "Blog?",
    showOnNavBar: true,
    isMainPage: false,
    component: Blog,
    entryType: EntryType.Page,
  },
  {
    aliases: ['about'],
    title: "About This Site",
    showOnNavBar: true,
    isMainPage: false,
    component: AboutPage,
    entryType: EntryType.Page,
  },
] as const;
typeCheckFn<typeof PAGES, Page, InvalidPageAlias>(PAGES);

export type ConstPages = typeof PAGES;
export type PageConst = ElementOf<ConstPages>;
export function excluding<F extends keyof PageConst, V extends PageConst[F]|undefined>(flagName: F, value: V) {
  type FilteredPage = Exclude<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] !== value;
  }
  const filteredPages = PAGES.filter(filterFunc);
  return arrayAsReadonly(filteredPages as TuplifyUnion<ElementOf<typeof filteredPages>>);
}
export function where<F extends keyof PageConst, V extends PageConst[F]>(flagName: F, value: V) {
  type FilteredPage = Extract<PageConst, {[K in F]: V}>;
  function filterFunc(page: PageConst): page is FilteredPage {
    return page[flagName] === value;
  }
  return PAGES.find(filterFunc)!;
}

export type AllSources = GetAliases<typeof PAGES>;
