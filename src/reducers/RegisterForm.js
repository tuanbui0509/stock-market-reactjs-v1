import * as types from '../constants/Admin/ActionType';
const initialState = [];

let RegisterForm = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_REGISTER_FORM:
            console.log(action)
            return action.listFormRegister;
        case types.CONFIRM_REGISTER_FORM:
            return null
        case types.DELETE_REGISTER_FORM:
            return action.registerForm;
        case types.ADMIN_LOGOUT:
            console.log(action);
            return null;
        default:
            return state;
    }

}

export default RegisterForm;