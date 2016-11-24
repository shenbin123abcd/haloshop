import {
    REQUEST_SHOP_CART, RECEIVE_SHOP_CART
} from '../actions/cart'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_SHOP_CART':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_SHOP_CART':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}
