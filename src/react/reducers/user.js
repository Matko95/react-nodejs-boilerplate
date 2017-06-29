export const user = (state = {
    isFetching: false,
    jwt: null,
    isAuthenticated: false,
    loginError: ""
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
                loginError: '',
                registerError: ''
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                loginError: action.error
            };
        case 'REGISTER_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                registerError: action.registerError
            };
        default:
            return state;
    }
};