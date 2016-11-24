import {
    REQUEST_COMMON_CART, RECEIVE_COMMON_CART
} from '../actions/commonHeader'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_COMMON_CART':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_COMMON_CART':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}
