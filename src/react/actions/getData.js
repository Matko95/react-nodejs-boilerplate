export const data_request = () => {
    return {
        type: "DATA_REQUEST",
        isFetching: true
    }
};

export const data_success = (data) => {
    return {
        type: "DATA_SUCCESS",
        isFetching: false,
        data
    }
};

export const data_error = (error) => {
    return {
        type: "DATA_ERROR",
        isFetching: false,
        error
    }
};

export const getData = () => {
    let config = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };

    return dispatch => {
        dispatch(data_request());

        return fetch(`/sampleGet`, config)
            .then(response => response.json()
            .then(data => ({ data, response })))
            .then(({ data, response }) =>  {
                if (!response.ok) {
                     return dispatch(data_error(data.message));
                }

                dispatch(data_success(data))
            })
            .catch(err => dispatch(data_error(err.toString())));
    }
};