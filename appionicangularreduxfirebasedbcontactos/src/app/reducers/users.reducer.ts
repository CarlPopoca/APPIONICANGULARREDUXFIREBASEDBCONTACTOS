import { UsersActions } from '../actions/users.actions';

const INITIAL_STATE = {
  error: null
};

export const UsersReducer = (state = INITIAL_STATE, action : any) : any => {
  switch(action.type){
    case UsersActions.SIGNIN:
        return {
            ...state,
            error: null 
        };
    case UsersActions.SIGNOUT:
        return state;
    case UsersActions.ERROR_SIGNIN:
        return {
            ...state,
            error: action.error
        }
    case UsersActions.ERROR_SIGNOUT:
        return {
            ...state,
            error: action.error
        };          
    case UsersActions.SIGNUP:
        return {
            ...state,
            error: null
        };
    case UsersActions.ERROR_SIGNUP:
        return {
            ...state,
            error: action.error
        };
    default: return state;
  }
}
