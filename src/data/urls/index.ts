
import type {InvalidPageAlias,     Page    } from "./pages";
import type {InvalidRedirectAlias, Redirect} from './redirects';
import {PAGES    , filtered as filteredPages,     excluding as pagesExcluding,     findWhere as pageWhere    } from "./pages";
import {REDIRECTS, filtered as filteredRedirects, excluding as redirectsExcluding, where as redirectWhere} from "./redirects";
import {EntryTypeUnion, GetTitles, } from "./types";
import {typeCheckFn} from "./types";
import { arrayAsReadonly } from "utils/type-modifiers";
import type { TuplifyUnion, ElementOf } from "utils/types";


export {isEntryType} from './types';

export {redirectsExcluding, pagesExcluding};
const allEntries = [...PAGES, ...REDIRECTS] as const;
typeCheckFn<typeof allEntries, EntryTypeUnion, InvalidRedirectAlias&InvalidPageAlias>(allEntries);
export {REDIRECTS, PAGES};

export type {Redirect, Page};
export function page<T extends GetTitles<typeof PAGES, Page>>(pageTitle: T) {
  // console.log(pageTitle);
  // console.log(pageWhere);
  return pageWhere('title', pageTitle);
}
export const defaultPage = pageWhere('isMainPage', true);
// console.log(defaultPage);

export function redirect<T extends GetTitles<typeof REDIRECTS, Redirect>>(redirectTitle: T) {
  return redirectWhere('title', redirectTitle);
}

export function filtered<Const extends EntryTypeUnion, L extends ReadonlyArray<Const>, F extends keyof Const, V extends Const[F]>(entries: readonly [...L], flagName: F, value: V) {
  type FilteredEntry = Extract<ElementOf<L>, {[K in F]: V}>;
  function filterFunc(entry: Const): entry is FilteredEntry {
    return entry[flagName] === value;
  }
  const filteredEntries = entries.filter(filterFunc);
  return arrayAsReadonly(filteredEntries as TuplifyUnion<ElementOf<typeof filteredEntries>>);
}

const navPages = filteredPages("showOnNavBar", true);
const navRedirects = filteredRedirects("showOnNavBar", true);
export const navEntries = [...navPages, ...navRedirects] as const;

// const nav = filtered(navEntries, 'showOnNavBar', true);