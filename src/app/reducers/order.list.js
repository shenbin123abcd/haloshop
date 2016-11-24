import {
    REQUEST_ORDER_ITEMS,RECEIVE_ORDER_ITEMS,DELETE_ORDER_ITEM
} from '../actions/order'

export default (state = {
    isFetching: false,
    data: null
}, action) => {
    switch(action.type) {
        case 'REQUEST_ORDER_ITEMS':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_ORDER_ITEMS':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        case 'DELETE_ORDER_ITEM':
            let arr=[];
            state.data.forEach((n,i)=>{
                if(n.id!=action.id){
                    arr.push(n);
                }
            })
            return  _.assign({}, state, {
                data:arr
            })   
        default:
            return state
    }
}
