import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import isAdmin from './isAdmin';
import LightningTableList from './LightningTableList';
import LightningTableState from './LightningTableState';
import RegisterForm from './RegisterForm';
import Token from './Token';
import User from './User';
import Report from './Report';
import Status from './Status';
import BankAccount from './BankAccount';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myReducer = combineReducers({
    LightningTableList,
    LightningTableState,
    User,
    RegisterForm,
    Token,
    isAdmin,
    Report,
    BankAccount,
    Status,
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['isAdmin', 'Token']
}

const persistedReducer = persistReducer(persistConfig, myReducer)

let store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(thunk)))
let persistor = persistStore(store)
export default {
    store, persistor
}