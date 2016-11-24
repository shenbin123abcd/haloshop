import {
    CHOOSE_PAY_WAY
} from '../actions/pay'

export default (state = {
    way: null
}, action) => {
    switch(action.type) {
        case 'CHOOSE_PAY_WAY':
            return _.assign({}, state, {
                way: action.way,
            })
        default:
            return state
    }
}
