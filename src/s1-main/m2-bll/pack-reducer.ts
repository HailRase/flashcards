import {ThunkAction} from "redux-thunk";
import {GetPacksParams, IPack, packAPI} from "../m3-dal/pack";
import {StoreType} from "./store";

// Actions
export const setPacks = (packs: IPack[]) => {
    return {
        type: "PACK/SET_PACKS",
        packs,
    } as const;
};

type SetPacks = ReturnType<typeof setPacks>;

export const setPacksTotalCount = (packsTotal: number) => {
    return {
        type: "PACK/SET_PACKS_TOTAL",
        packsTotal
    } as const;
}

type SetPacksTotalCount = ReturnType<typeof setPacksTotalCount>;

export const setPackStatus = (status: PackStatus) => {
    return {
        type: "PACK/SET_STATUS",
        status,
    } as const;
};

type SetPackStatus = ReturnType<typeof setPackStatus>;

export const setPackError = (errorMessage: string) => {
    return {
        type: "PACK/SET_ERROR",
        errorMessage,
    } as const;
};

type SetPackError = ReturnType<typeof setPackError>;

export const setPackFilter = (filter: PackFilter) => {
    return {
        type: "PACK/SET_FILTER",
        filter,
    } as const;
}

type SetPackFilter = ReturnType<typeof setPackFilter>;

type PackAction =
    | SetPacks
    | SetPackStatus
    | SetPackError
    | SetPackFilter
    | SetPacksTotalCount;

// Thunks
export const fetchPacks = (filter: PackFilter): PackThunkAction => {
    return async (dispatch) => {
        dispatch(setPackStatus("loading"));
        dispatch(setPackFilter(filter));
        try {
            const {cardPacks, cardPacksTotalCount} = (
                await packAPI.getPacks(filter)
            ).data;
            dispatch(setPacksTotalCount(cardPacksTotalCount));
            dispatch(setPacks(cardPacks));
            dispatch(setPackStatus("loaded"));
        } catch {
            dispatch(setPackError("Could not Fetch Packs"));
        }
    };
};

export const createPack = (name: string): PackThunkAction => {
    return async (dispatch, getState) => {
        dispatch(setPackStatus("loading"));
        try {
            await packAPI.createPack({name});
            const {cardPacks, cardPacksTotalCount} = (
                await packAPI.getPacks(getState().pack.filter)
            ).data;
            dispatch(setPacksTotalCount(cardPacksTotalCount));
            dispatch(setPacks(cardPacks));
            dispatch(setPackStatus("loaded"));
        } catch {
            dispatch(setPackError("Could not Create Pack"));
        }
    }
}

export const deletePack = (id: string): PackThunkAction => {
    return async (dispatch, getState) => {
        dispatch(setPackStatus("loading"));
        try {
            await packAPI.deletePack({id});
            const {cardPacks, cardPacksTotalCount} = (
                await packAPI.getPacks(getState().pack.filter)
            ).data;
            dispatch(setPacksTotalCount(cardPacksTotalCount));
            dispatch(setPacks(cardPacks));
            dispatch(setPackStatus("loaded"));
        } catch {
            dispatch(setPackError("Could not Delete Pack"));
        }
    }
}

type PackThunkAction = ThunkAction<Promise<void>,
    StoreType,
    void,
    PackAction>;

// Reducer State Type
export interface PackState {
    status: PackStatus;
    filter: PackFilter;
    packs: IPack[];
    packsTotal: number;
    errorMessage?: string;
}

const initialState: PackState = {
    status: "init",
    filter: { // Фильтр для поиска
        pageCount: 10, // Кол-во паков на странице
        min: 0, // Мин. кол-во карт в паке
        max: 150, // Макс. кол-во карт в паке
        packName: "", // Название пака
        page: 1, // Текущая страница
        sortPacks: "0updated", // Сортировка паков
        user_id: "", // Айди автора
    },
    packs: [],
    packsTotal: 0,
};

// Reducer
export const packReducer = (state = initialState, action: PackAction): PackState => {
    switch (action.type) {
        case "PACK/SET_PACKS": {
            return {...state, packs: action.packs};
        }

        case "PACK/SET_PACKS_TOTAL": {
            return {...state, packsTotal: action.packsTotal};
        }

        case "PACK/SET_STATUS": {
            return {...state, status: action.status};
        }

        case "PACK/SET_ERROR": {
            return {
                ...state,
                status: "error",
                errorMessage: action.errorMessage,
            };
        }

        case "PACK/SET_FILTER": {
            return {
                ...state,
                filter: action.filter,
            };
        }

        default:
            return state;
    }
};

// TYPES
export type SortPacks =
    | "0user_name"
    | "1user_name"
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
