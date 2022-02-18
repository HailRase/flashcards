import {instance} from "./instance";

export interface ICard {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg: string;
    answerVideo: string;
    questionImg: string;
    questionVideo: string;
}

const ENDPOINT = "/cards/card";

export const cardAPI = {
    getCards(params: GetCardsParams) {
        return instance.get<GetCardsResponse>(ENDPOINT, {
            params,
        });
    },

    createCard(params: CreateCardParams) {
        const body = {card: params};
        return instance.post<CreateCardResponse>(ENDPOINT, body);
    },

    updateCard(params: UpdateCardParams) {
        const body = {card: params};
        return instance.put<UpdateCardResponse>(ENDPOINT, body);
    },

    deleteCard(id: string) {
        const params = {id};
        return instance.delete<DeleteCardResponse>(ENDPOINT, {
            params,
        });
    },
};

// Common Response data
interface Response {
    token: string;
    tokenDeathTime: string;
}

// getCards Types
export interface GetCardsParams {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: number;
    max?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
}

interface GetCardsResponse extends Response {
    cards: ICard[];
    packUserId: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
}

// createCard Types
interface CreateCardParams {
    cardsPack_id: string;
    answer?: string;
    question?: string;
    grade?: number;
    shots?: number;
    type?: string;
    rating?: number;
    questionImg?: string;
    answerImg?: string;
    questionVideo?: string;
    answerVideo?: string;
}

interface CreateCardResponse extends Response {
    newCard: ICard;
}

// updateCard Types
interface UpdateCardParams extends Partial<Omit<ICard, "_id">> {
    _id: string;
}

interface UpdateCardResponse extends Response {
    updatedCard: ICard;
}

// deleteCard Types
interface DeleteCardResponse extends Response {
    deletedCard: ICard;
}
