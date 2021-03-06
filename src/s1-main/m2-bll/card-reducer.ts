import {cardAPI, GetCardsParams, ICard, UpdateCardParams} from "../m3-dal/card";
import {ThunkAction} from "redux-thunk";
import {StoreType} from "./store";
import {fileAPI} from "../m3-dal/file";
import {getAuthUserData} from "./auth-reducer";

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

export const setCardGrade = (grade: number, card_id: string) => {
    return {
        type: "CARD/SET_GRADE",
        grade,
        card_id
    } as const;
}
type SetCardGrade = ReturnType<typeof setCardGrade>

export const setCardQuestionPhoto = (photoFile: {myFile: string}) => {
    return {
        type: "CARD/SET_PHOTO",
        photoFile
    } as const;
}
type SetCardQuestionPhoto = ReturnType<typeof setCardQuestionPhoto>

export type CardAction =
    | SetCards
    | SetCardStatus
    | SetCardError
    | SetCardFilter
    | SetCardsTotalCount
    | SetCardQuestionPhoto

// Thunks
export const fetchCards = (
    filter: CardFilter
): CardThunkAction => {
    return async (dispatch) => {
        dispatch(setCardStatus("loading"));
        dispatch(setCardFilter(filter));
        try {
            const {cards, cardsTotalCount} = (
                await cardAPI.getCards(filter)
            ).data;
            dispatch(setCardsTotalCount(cardsTotalCount));
            dispatch(setCards(cards));
            dispatch(setCardStatus("loaded"));
        } catch (error){
            console.log(error)
            dispatch(setCardError("Couldn't Fetch Cards"));
        }
    };
};
export const createCard = (cardsPack_id: string, question:string, answer: string): CardThunkAction => {
    return async (dispatch, getState) => {
        dispatch(setCardStatus("loading"));
        try {
            await cardAPI.createCard({cardsPack_id, question, answer});
            const {cards, cardsTotalCount} = (
                await cardAPI.getCards(getState().card.filter)
            ).data;
            dispatch(setCardsTotalCount(cardsTotalCount));
            dispatch(setCards(cards));
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Could not Create Card"));
        }
    }
}
export const deleteCard = (id: string): CardThunkAction => {
    return async (dispatch, getState) => {
        dispatch(setCardStatus("loading"));
        try {
            await cardAPI.deleteCard(id);
            const {cards, cardsTotalCount} = (
                await cardAPI.getCards(getState().card.filter)
            ).data;
            dispatch(setCardsTotalCount(cardsTotalCount));
            dispatch(setCards(cards));
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Couldn't delete card"));
        }
    }
}
export const updateCard = (params: UpdateCardParams): CardThunkAction => {
    return async (dispatch, getState) => {
        dispatch(setCardStatus("loading"));
        try {
            await cardAPI.updateCard(params);
            const {cards, cardsTotalCount} = (
                await cardAPI.getCards(getState().card.filter)
            ).data;
            dispatch(setCardsTotalCount(cardsTotalCount));
            dispatch(setCards(cards));
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Couldn't update card"));
        }
    }
}

export const gradeCard = (grade: number, card_id: string): CardThunkAction => {
    return async (dispatch) => {
        dispatch(setCardStatus("loading"));
        try {
            await cardAPI.updateGrade(grade, card_id);
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Couldn't grade card"));
        }
    }
}
export const savePhoto = (photoFile: {myFile: File}): CardThunkAction => {
    return async (dispatch) => {
        dispatch(setCardStatus("loading"));
        try {
            await fileAPI.postFile(photoFile);
            dispatch(setCardStatus("loaded"));
        } catch {
            dispatch(setCardError("Couldn't save photo"));
            console.log("error")
        }
    }
}
type CardThunkAction = ThunkAction<Promise<void>,
    StoreType,
    void,
    CardAction>;

// Reducer State Type
export interface CardState {
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
        min: 0,
        max: 5,
        page: 1,
        pageCount: 6,
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
        case "CARD/SET_PHOTO": {
            return {
                ...state,
                questionImg: action.photoFile,
            };
        }
        default:
            return state;
    }
}

// Types
export type SortCards = "0updated" | "1updated" | "0grade" | "1grade";

export interface CardFilter
    extends Required<Omit<GetCardsParams, "sortCards">> {
    sortCards: SortCards;
}

export type CardStatus =
    | "init"
    | "loading"
    | "loaded"
    | "error";
