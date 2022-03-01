export const PATH = {
    TEST: '/test',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register'
    },
    PROFILE: '/profile',
    EDITPROFILE: '/edit',
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