
// import type {ElementOf} from '../utils/types';
import { AllSources as AllPageSources, filtered as filteredPages } from "./pages";
import type {AllSources as AllRedirectSources } from './redirects';
import {filtered as filteredRedirects} from "./redirects";

type SourceSources = {
  pages: AllPageSources;
  redirects: AllRedirectSources;
}

type Key = keyof SourceSources;
type KeysExcept<T> = Exclude<Key, T>;

type Sources<T extends Key> = SourceSources[T];
type SourcesExcept<T extends Key> = Sources<KeysExcept<T>>;
type AllSources = Sources<Key>;

type ReusedSourcesFrom<T extends Key> = Extract<SourcesExcept<T>, Sources<T>>;

type AllReused = { [K in Key]: ReusedSourcesFrom<K> }[Key];
type ShouldNotBeNever = AllReused extends never ? any : never;
const assertion: ShouldNotBeNever = null;

const navPages = filteredPages("showOnNavBar", true);
const navRedirects = filteredRedirects("showOnNavBar", true);

const navEntries = [...navPages, ...navRedirects] as const;
// const navs = Object.fromEntries(navEntries);

// const navItems = Object.assign({}, filteredPages("showOnNavBar"), filteredRedirects("showOnNavBar"));
// type NavItem = typeof navItems[keyof typeof navItems];
// type key = keyof NavItem;
// navItems[]
// export {navItems};