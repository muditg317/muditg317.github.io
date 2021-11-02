// type Letter = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z';
type CapitalLetter = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';

type MultiWord = `${string} ${string}`;
type Word<T extends string> = Exclude<T, MultiWord>;
type CapitalizedString = `${CapitalLetter}${string}`;


interface Page<T extends string> {
  aliases: Word<T>[];
  title: CapitalizedString;
  showOnNavBar?: true;
  isMainPage?: true;
}
type GetAliases<C extends Page<any>> = C extends Page<infer T> ? T : unknown;

const newPage: <T extends string>(page: Page<T>) => Page<T> = (page) => page;

type PageDict<T extends string = string> = Record<Word<T>, Page<string>>;

const PAGES = {
  '': newPage({
    aliases: ['main','home'],
    title: "Mudit Gupta",
    showOnNavBar: true,
    isMainPage: true,
  })
} as const;

type Key = keyof typeof PAGES;
type KeysExcept<T> = Exclude<Key, T>;

type Sources<T extends Key> = T | GetAliases<typeof PAGES[T]>;
type SourcesExcept<T extends Key> = Sources<KeysExcept<T>>;
type AllSources = Sources<Key>;

type ReusedSourcesFrom<T extends Key> = Extract<SourcesExcept<T>, Sources<T>>;

type AllReused = { [K in Key]: ReusedSourcesFrom<K> }[Key];
type ShouldNotBeNever = AllReused extends never ? any : never;
const assertion: ShouldNotBeNever = null;

function filtered(flagName: keyof Page<string>) {
  return Object.fromEntries(Object.entries(PAGES).filter(([,{[flagName]: flag}]) => flag));
}

export default PAGES;
export { PAGES, filtered };
export type { AllSources };