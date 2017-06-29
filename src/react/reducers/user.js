export const user = (state = {
    isFetching: false,
    jwt: null,
    isAuthenticated: false,
    error: ""
}, action) => {
    switch(action.type){
        case 'REGISTER_REQUEST':
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isFetching: action.isFetching,
                jwt: action.jwt,
                isAuthenticated: true,
                error: ''
            };
        case 'REGISTER_ERROR':
        case 'LOGIN_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                error: action.error
            };
        default:
            return state;
    }
};