import {
    REQUEST_USER_NMS,RECEIVE_USER_NMS
} from '../actions/order'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_USER_NMS':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_USER_NMS':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}
