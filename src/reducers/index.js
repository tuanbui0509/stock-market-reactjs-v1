import {combineReducers} from 'redux';
import LightningTableList from './LightningTableList';
import LightningTableState from './LightningTableState'
import User from './User'
const myReducer = combineReducers({
    LightningTableList,
    LightningTableState,
    User
});

export default myReducer;