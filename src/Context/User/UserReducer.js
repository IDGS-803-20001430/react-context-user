import {GET_USERS,GET_PROFILE,POST_USER,PUT_USER,DELETE_USER} from "../types"

export default (state,action) => {
    const {payload,type} = action;

    switch(type){
        case GET_USERS:
            return {
                ...state, users: payload
            }
        case GET_PROFILE:
            return {
                ...state,
                selectedUser: payload
            }
        case POST_USER:
            return {
                ...state,
                addUser: payload
            }
        case PUT_USER:
            return {
                ...state,
                addUser: payload
            }
        case DELETE_USER:
            return {
                ...state,
                addUser: payload
            }
        default:
            return state;
    }
}