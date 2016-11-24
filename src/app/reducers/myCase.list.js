import {
    REQUEST_CASE_LIST,RECEIVE_CASE_LIST
} from '../actions/myCase'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_CASE_LIST':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_CASE_LIST':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        default:
            return state
    }
}
