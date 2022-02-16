import { GetPacksParams, IPack } from "../m3-dal/pack";

// Reducer State Type
interface PackState {
  status: PackStatus;
  filter: PackFilter;
  packs: IPack[];
  packsTotal: number;
  errorMessage?: string;
}

export const packReducer = (state: any, action: any): any => {
  return state;
};

// TYPES
export type SortPacks =
  | "0updated"
  | "1updated"
  | "0name"
  | "1name"
  | "0cardsCount"
  | "1cardsCount";

export interface PackFilter
  extends Required<Omit<GetPacksParams, "sortPacks">> {
  sortPacks: SortPacks;
}
export type PackStatus =
  | "init"
  | "loading"
  | "loaded"
  | "error";
