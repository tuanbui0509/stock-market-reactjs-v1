import * as types from '../../constants/Report/ActionType';
const initialState = [];
let findIndex = (list, id) => {
    let result = -1;
    list.forEach((e, index) => {
        if (e.id === id) result = index;
    });
    return result;
}
let RegisterForm = (state = initialState, action) => {
    let index = -1
    let { id, payload, type } = action;
    switch (type) {
        case types.CANCEL_STOCK_TODAY:
            console.log(state);
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        default:
            return state;
    }

}

export default RegisterForm;