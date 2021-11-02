import { AllSources as AllPageSources, filtered as filteredPages } from "./pages";
import { AllSources as AllRedirectSources, filtered as filteredRedirects } from "./redirects";

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

// const navPages = Object.entries(filteredPages<NavPage>("showOnNavBar"));
// const navRedirects = Object.entries(filteredRedirects("showOnNavBar"));

// const navEntries = [...navPages, ...navRedirects] as const;
// const navs = Object.fromEntries(navEntries);

// const navItems = Object.assign({}, filteredPages("showOnNavBar"), filteredRedirects("showOnNavBar"));
// type NavItem = typeof navItems[keyof typeof navItems];
// type key = keyof NavItem;
// navItems[]
// export {navItems};