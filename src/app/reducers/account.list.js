import {
    REQUEST_ACCOUNT_DATA,RECEIVE_ACCOUNT_DATA,DESTROY_ACCOUNT_DATA
} from '../actions/account'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_ACCOUNT_DATA':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_ACCOUNT_DATA':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        case 'DESTROY_ACCOUNT_DATA':
            return _.assign({}, state, {
                isFetching: false,
                data: null
            })
        default:
            return state
    }
}

