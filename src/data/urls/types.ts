import type { ElementOf, IndicesOf, ValueOf } from "utils/types";
import type { Page } from "./pages";
import type { Redirect } from "./redirects";

export type MultiWord = `${string} ${string}`;
export type EmptyString = ``;
type DefaultInvalid = MultiWord|EmptyString;
type ExtractWords<T extends string, Invalid=DefaultInvalid> = Exclude<T, Invalid>;
type Aliases<T extends string, Invalid=MultiWord|EmptyString> = ExtractWords<T, Invalid> extends never ? never : readonly ExtractWords<T, Invalid>[];

type CapitalLetter = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';
type CapitalizedString = `${CapitalLetter}${string}`;

export enum EntryType {
  Redirect = 'Redirect',
  Page = 'Page',
}
type EntryTypeMap = {
  [EntryType.Page]: Page;
  [EntryType.Redirect]: Redirect;
};
export type EntryTypeUnion = ValueOf<EntryTypeMap>;

export function isEntryType<EnumType extends EntryType, T extends EntryTypeMap[EnumType]>(entry: EntryTypeUnion, type: EnumType): entry is T {
  return entry.entryType === type;
}

type BaseUrlEntry = {
  aliases: readonly string[];
  title: CapitalizedString;
  showOnNavBar: boolean;
  entryType: EntryType;
};
export type UrlEntry<D extends Partial<BaseUrlEntry>={}> = Readonly<Required<
  BaseUrlEntry & D
>>;

export type GetAliases<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry = UrlEntry> = UrlEntries[IndicesOf<UrlEntries>]['aliases'][number];
export type GetTitles<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry = UrlEntry> = UrlEntries[IndicesOf<UrlEntries>]['title'];

type InterfaceFollowingList<AllAliases extends string, InvalidAliases, T extends UrlEntry> = [AllAliases] extends [ExtractWords<AllAliases, InvalidAliases>] ? Record<number, T> : Record<number, {aliases: Aliases<AllAliases>}>;
type AliasUnions<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry> = { [I in IndicesOf<UrlEntries>]: ElementOf<UrlEntries[I]['aliases']> };
type Reused<UrlEntries extends ReadonlyArray<T>, T extends UrlEntry, Unions extends Record<IndicesOf<UrlEntries>, string>> = { [I in keyof Unions]: Extract<Unions[Exclude<keyof Unions, I>], Unions[I]>}[keyof Unions];
// type NoneReused<Unions extends Record<number, string>> = Reused<Unions> extends never ? true : never;
type ValidatedList<UrlEntries extends ReadonlyArray<T>, T extends EntryTypeUnion, InvalidAliases extends string> =
    Reused<UrlEntries, T, AliasUnions<UrlEntries, T>> extends never
    ? InterfaceFollowingList<GetAliases<UrlEntries, T>, InvalidAliases, T>
    : Reused<UrlEntries, T, AliasUnions<UrlEntries, T>>;

export function typeCheckFn<
    EntriesToCheck extends ReadonlyArray<T>,
    T extends EntryTypeUnion,
    InvalidAliases extends string,
  >(entryList: ValidatedList<EntriesToCheck, T, InvalidAliases>): void {
};