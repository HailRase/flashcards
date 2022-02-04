import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {authReducer} from "./auth-reducer";
import {passwordReducer} from "./password-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    password: passwordReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type StoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store