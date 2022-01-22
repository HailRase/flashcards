import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {authReducer} from "./auth-reducer";
import {passwordReducer} from "./password-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    password: passwordReducer
})

const store = createStore(rootReducer)

export default store

export type StoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store