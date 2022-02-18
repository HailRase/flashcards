import {cardAPI, GetCardsParams, ICard} from "../m3-dal/card";
import {ThunkAction} from "redux-thunk";
import {StoreType} from "./store";

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

// Thunks
export const fetchCards = (
    filter: CardFilter
): CardThunkAction => {
    return async (dispatch) => {
        dispatch(setCardStatus("loading"));
        dispatch(setCardFilter(filter));

        if (!filter.cardsPack_id.length) return;

        try {
            const {cards, cardsTotalCount} = (
                await cardAPI.getCards(filter)
            ).data;
            dispatch(setCardsTotalCount(cardsTotalCount));
            dispatch(setCards(cards));
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Could not Fetch Packs"));
        }
    };
};

type CardThunkAction = ThunkAction<Promise<void>,
    StoreType,
    void,
    CardAction>;

// Reducer State Type
interface CardState {
    status: CardStatus;
    filter: CardFilter;
    cards: ICard[];
    cardsTotal: number;
    errorMessage?: string;
}

// Reducer
const initialState: CardState = {
    status: "init",
    filter: {
        cardsPack_id: "",
        cardQuestion: "",
        cardAnswer: "",
        min: 1,
        max: 5,
        page: 1,
        pageCount: 20,
        sortCards: "0updated",
    },
    cards: [],
    cardsTotal: 0,
};

export const cardReducer = (state = initialState, action: CardAction): any => {
    switch (action.type) {
        case "CARD/SET_CARDS": {
            return {...state, cards: action.cards};
        }

        case "CARD/SET_CARDS_TOTAL": {
            return {...state, cardsTotal: action.cardsTotal};
        }

        case "CARD/SET_STATUS": {
            return {...state, status: action.status};
        }

        case "CARD/SET_ERROR": {
            return {
                ...state,
                status: "error",
                errorMessage: action.errorMessage,
            };
        }

        case "CARD/SET_FILTER": {
            return {
                ...state,
                filter: action.filter,
            };
        }

        default:
            return state;
    }
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
