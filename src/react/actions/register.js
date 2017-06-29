export const register_request = () => {
    return {
        type: "REGISTER_REQUEST",
        isFetching: true
    }
};

export const register_success = (jwt) => {
    return {
        type: "REGISTER_SUCCESS",
        isFetching: false,
        jwt
    }
};

export const register_error = (error) => {
    return {
        type: "REGISTER_ERROR",
        isFetching: false,
        error
    }
};

export const register = (username, password) => {
    let config = {
        method: "POST",
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    };

    return dispatch => {
        dispatch(register_request());

        return fetch(`/register`, config)
            .then(response => response.json()
                .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                if (!response.ok) {
                    return dispatch(register_error(data.message));
                }

                localStorage.setItem("jwt", data.jwt);
                dispatch(register_success(data.jwt))
            })
            .catch(err => dispatch(register_error(err)));
    }
};
