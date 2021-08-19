import * as types from '../constants/Common/ActionType';
const initialState = false;

let isChangePageUser = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_PAGE:
            return true;
        case types.CURRENT_CHANGE_PAGE:
            return false;
        default:
            return state;
    }
}

export default isChangePageUser;