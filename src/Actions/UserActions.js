export const FETCH_USER_FAILED = 'FETCH_USER_FAILED'
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING'

export const LOAD_USER = 'LOAD_USER'
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN'

export const fetchUserFailed = error => ({
    type: FETCH_USER_FAILED,
    payload: error
})

export const fetchUserFulfilled = (userId, data) => ({
    type: FETCH_USER_FULFILLED,
    payload: {
        user: data
    }
})

export const fetchUserPending = userId => ({
    type: FETCH_USER_PENDING,
    payload: {
        userId
    }
})

export const loadUser = userId => ({
    type: LOAD_USER,
    payload: {
        userId: parseInt(userId, 10)
    }
})

export const saveAccessToken = token => ({
    type: SAVE_ACCESS_TOKEN,
        accessToken: token
})



export const userRequestActions = {
    failed: fetchUserFailed,
    fulfilled: fetchUserFulfilled,
    pending: fetchUserPending
};