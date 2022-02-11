import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {authReducer} from "./auth-reducer";
import {passwordReducer} from "./password-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    password: passwordReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type StoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector


// @ts-ignore
window.store = store