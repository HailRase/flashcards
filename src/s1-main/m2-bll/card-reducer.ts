import {GetCardsParams, ICard} from "../m3-dal/card";

// Actions
export const setCards = (cards: ICard[]) => {
    return {
        type: "CARD/SET_CARDS",
        cards,
    } as const;
};

type SetCards = ReturnType<typeof setCards>;

export const setCardsTotalCount = (cardsTotal: number) => {
    return {
        type: "CARD/SET_CARDS_TOTAL",
        cardsTotal
    } as const;
}

type SetCardsTotalCount = ReturnType<typeof setCardsTotalCount>;

export const setCardStatus = (status: CardStatus) => {
    return {
        type: "CARD/SET_STATUS",
        status,
    } as const;
};

type SetCardStatus = ReturnType<typeof setCardStatus>;

export const setCardError = (errorMessage: string) => {
    return {
        type: "CARD/SET_ERROR",
        errorMessage,
    } as const;
};

type SetCardError = ReturnType<typeof setCardError>;

export const setCardFilter = (filter: CardFilter) => {
    return {
        type: "CARD/SET_FILTER",
        filter,
    } as const;
}

type SetCardFilter = ReturnType<typeof setCardFilter>;

export type CardAction =
    | SetCards
    | SetCardStatus
    | SetCardError
    | SetCardFilter
    | SetCardsTotalCount;


// Reducer State Type
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
