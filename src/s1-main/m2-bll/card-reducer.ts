
// Reducer State Type
import {GetCardsParams, ICard} from "../m3-dal/card";

interface CardState {
    status: CardStatus;
    filter: CardFilter;
    cards: ICard[];
    cardsTotal: number;
    errorMessage?: string;
}

export const cardReducer = (state: any, action: any): any => {
    return state;
}

// Types
type SortCards = "0updated" | "1updated" | "0grade" | "1grade";

export interface CardFilter
    extends Required<Omit<GetCardsParams, "sortCards">> {
    sortCards: SortCards;
}

export type CardStatus =
    | "init"
    | "loading"
    | "loaded"
    | "error";
