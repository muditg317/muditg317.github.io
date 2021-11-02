import { AsReadonlyArr, ElementOf, IndicesOf } from "utils/types";

export type MultiWord = `${string} ${string}`;
export type EmptyString = ``;
type DefaultInvalid = MultiWord|EmptyString;
export type ExtractWords<T extends string, Invalid=DefaultInvalid> = Exclude<T, Invalid>;
export type Aliases<T extends string, Invalid=MultiWord|EmptyString> = ExtractWords<T, Invalid> extends never ? never : readonly ExtractWords<T, Invalid>[];

type CapitalLetter = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';
type CapitalizedString = `${CapitalLetter}${string}`;

export enum EntryType {
  Redirect = 'Redirect',
  Page = 'Page',
}

type BaseUrlEntry = {
  aliases: readonly string[];
  title: CapitalizedString;
  showOnNavBar: boolean;
  entryType: EntryType;
};

export type UrlEntry<D={}> = Readonly<Required<
  BaseUrlEntry & D
>>;

export type GetAliases<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry = UrlEntry> = UrlEntries[IndicesOf<UrlEntries>]['aliases'][number];
type InterfaceFollowingList<AllAliases extends string, InvalidAliases, T extends UrlEntry = UrlEntry> = [AllAliases] extends [ExtractWords<AllAliases, InvalidAliases>] ? Record<number, T> : Record<number, {aliases: Aliases<AllAliases>}>;
type AliasUnions<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry = UrlEntry> = { [I in IndicesOf<UrlEntries>]: ElementOf<UrlEntries[I]['aliases']> };
type Reused<Unions extends Record<number, string>> = { [I in keyof Unions]: Extract<Unions[Exclude<keyof Unions, I>], Unions[I]>}[keyof Unions];
// type NoneReused<Unions extends Record<number, string>> = Reused<Unions> extends never ? true : never;
type ValidatedList<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry = UrlEntry, InvalidAliases extends string = DefaultInvalid> =
    Reused<AliasUnions<UrlEntries, T>> extends never
    ? InterfaceFollowingList<GetAliases<UrlEntries, T>, InvalidAliases, T>
    : Reused<AliasUnions<UrlEntries, T>>;

export function typeCheckGen<T extends UrlEntry = UrlEntry, InvalidAliases extends string = DefaultInvalid>() {
  return function<
      EntriesToCheck extends ReadonlyArray<T>,
    >(entryList: ValidatedList<EntriesToCheck, T, InvalidAliases>) {
  };
};


export function typeCheckFn<
    EntriesToCheck extends ReadonlyArray<T>,
    InvalidAliases extends string = DefaultInvalid,
    T extends UrlEntry = UrlEntry,
  >(entryList: ValidatedList<EntriesToCheck, T, InvalidAliases>): void;
export function typeCheckFn<
    EntriesToCheck extends ReadonlyArray<T>,
    T extends UrlEntry = UrlEntry,
    InvalidAliases extends string = DefaultInvalid,
  >(entryList: ValidatedList<EntriesToCheck, T, InvalidAliases>): void {
};