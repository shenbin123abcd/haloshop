import {
    REQUEST_SHOP_PREV_LIST, RECEIVE_SHOP_PREV_LIST
} from '../actions/index'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_SHOP_PREV_LIST':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_SHOP_PREV_LIST':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}


