export const PATH = {
    TEST: '/test',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register'
    },
    PROFILE: '/profile',
    EDIT: {
        PROFILE: '/edit/profile',
        PACK: '/edit/pack/:packId',
        CARD: '/edit/card/:cardId'
    },
    PASSWORD: {
        RECOVERY: '/recovery',
        CHANGE: '/change/:resetPasswordToken'
    },
    E404: '*',
    PACKS: {
        APP:'/packs',
        LEARN:'/packs/:learnPackId'
    },
    CARDS: '/cards/:packCardsId'
}