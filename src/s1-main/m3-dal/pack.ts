import {instance} from "./instance";

export interface IPack {
    cardsCount: number;
    created: string;
    deckCover: string;
    grade: number;
    more_id: string;
    name: string;
    path: string;
    private: boolean;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    user_id: string;
    user_name: string;
    __v: number;
    _id: string;
}

const ENDPOINT = "/cards/pack";

export const packAPI = {
    getPacks(params: GetPacksParams | null = null) {
        return instance.get<GetPacksResponse>(ENDPOINT, {
            params,
        });
    },

    createPack(params: CreatePackParams | null = null) {
        const body = {cardsPack: params || {}};
        return instance.post<CreatePackResponse>(ENDPOINT, body);
    },

    updatePack(params: IPack) {
        const body = {cardsPack: params};
        return instance.post<UpdatePackResponse>(ENDPOINT, body);
    },

    deletePack(params: DeletePackParams) {
        return instance.delete<DeletePackResponse>(ENDPOINT, {
            params,
        });
    },
};

// getPacks Types
export interface GetPacksParams {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    pageCount?: number;
    user_id?: string;
}

interface GetPacksResponse {
    cardPacks: IPack[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
}

// createPack Types
interface CreatePackParams {
    name?: string;
    path?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    deckCover?: string;
    private?: false;
    type?: string;
}

interface CreatePackResponse {
    newCardsPack: IPack;
    token: string;
    tokenDeathTime: number;
}

// updatePack Types
interface UpdatePackResponse {
    updatedCardsPack: IPack;
    token: string;
    tokenDeathTime: number;
}

// deletePack Types
interface DeletePackParams {
    id: string;
}

interface DeletePackResponse {
    deletedCardsPack: IPack;
    token: string;
    tokenDeathTime: number;
}
