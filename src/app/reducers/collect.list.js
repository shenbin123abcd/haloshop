import {
    REQUEST_COLLECT_LIST, RECEIVE_COLLECT_LIST
} from '../actions/collect'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_COLLECT_LIST':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_COLLECT_LIST':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}