import {
    REQUEST_PAY_SUCCESS, RECEIVE_PAY_SUCCESS
} from '../actions/paySuccess'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_PAY_SUCCESS':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_PAY_SUCCESS':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}

