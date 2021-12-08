import type {ElementOf, TuplifyUnion} from 'utils/types';
import {arrayAsReadonly} from 'utils/type-modifiers';
import { EmptyString, GetAliases, MultiWord, typeCheckFn, UrlEntry } from './types';
import { EntryType } from './types';

export type InvalidRedirectAlias = MultiWord|EmptyString;

export enum RedirectGroup {
  QuickLinks = 'QuickLinks',
}
export const RedirectGroups = [RedirectGroup.QuickLinks];


export type Redirect = UrlEntry<{
  target: URL;
  entryType: EntryType.Redirect;
  group: RedirectGroup;
}>;

export const REDIRECTS = [
  ({
    aliases: ['mungus', 'mungus-irl','among-us','amongus'],
    title: "Mungus-IRL",
    target: new URL('http://mungus.mudit.tech'),
    showOnNavBar: true,
    group: RedirectGroup.QuickLinks,
    entryType: EntryType.Redirect,
  }),
  ({
    aliases: ['games', 'game-lounge'],
    title: "Game Lounge",
    target: new URL('https://muditgupta.appspot.com/game-lounge'),
    showOnNavBar: true,
    group: RedirectGroup.QuickLinks,
    entryType: EntryType.Redirect,
  }),
] as const;
typeCheckFn<typeof REDIRECTS, Redirect, InvalidRedirectAlias>(REDIRECTS);

export type ConstRedirects = typeof REDIRECTS;
export type RedirectConst = ElementOf<ConstRedirects>;
export function excluding<F extends keyof RedirectConst, V extends RedirectConst[F]|undefined>(flagName: F, value: V) {
  type FilteredRedirect = Exclude<RedirectConst, {[K in F]: V}>;
  function filterFunc(redir: RedirectConst): redir is FilteredRedirect {
    return redir[flagName] !== value;
  }
  const filteredRedirects = REDIRECTS.filter(filterFunc);
  return arrayAsReadonly(filteredRedirects as TuplifyUnion<ElementOf<typeof filteredRedirects>>);
}
export function where<F extends keyof RedirectConst, V extends RedirectConst[F]>(flagName: F, value: V) {
  type FilteredRedirect = Extract<RedirectConst, {[K in F]: V}>;
  function filterFunc(redir: RedirectConst): redir is FilteredRedirect {
    return redir[flagName] === value;
  }
  return REDIRECTS.find(filterFunc)!;
}

export type AllSources = GetAliases<typeof REDIRECTS>;
