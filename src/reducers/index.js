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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myReducer = combineReducers({
    LightningTableList,
    LightningTableState,
    User,
    RegisterForm,
    Token,
    isAdmin
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['isAdmin', 'Token', 'User']
}

const persistedReducer = persistReducer(persistConfig, myReducer)

// export default () => {
//     let store = createStore(
//         persistedReducer,
//         composeEnhancers(
//         applyMiddleware(thunk)))
//     let persistor = persistStore(store)
//     return { store, persistor }
// }
let store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(thunk)))
let persistor = persistStore(store)
export default {
    store, persistor
}