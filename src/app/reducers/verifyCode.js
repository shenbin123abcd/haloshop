
export default (state = {
    isFetching: false,
    isSent: false,
    isCounting: false,
    countingNumber: 60,
    data: null,
    receivedAt: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_VERIFY_CODE':
            return _.assign({}, state, {
                isFetching: true,
                isSent: false,
            })
        case 'RECEIVE_VERIFY_CODE':
            return _.assign({}, state, {
                isFetching: false,
                isCounting: true,
                receivedAt: action.receivedAt,
            })
        case 'SET_RESEND_VERIFY_CODE':
            return _.assign({}, state, {
                isFetching: false,
                isSent: true,
                isCounting: false,
                countingNumber: 60,
            })
        case 'SET_VERIFY_CODE_COUNTING':
            return _.assign({}, state, {
                countingNumber: action.data,
            })
        case 'RESET_VERIFY_CODE':
            return _.assign({}, state, {
                isFetching: false,
                isSent: false,
                isCounting: false,
                data: null,
                countingNumber: 60,
            })
        default:
            return state
    }
}

