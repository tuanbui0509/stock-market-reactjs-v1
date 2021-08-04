import { combineReducers } from 'redux';
import LightningTableList from './LightningTableList';
import LightningTableState from './LightningTableState'
import User from './User'
import RegisterForm from './RegisterForm'
const myReducer = combineReducers({
    LightningTableList,
    LightningTableState,
    User,
    RegisterForm
});

export default myReducer;