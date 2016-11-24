export const REQUEST_ORDER_ITEMS='REQUEST_ORDER_ITEMS'
export const RECEIVE_ORDER_ITEMS='RECEIVE_ORDER_ITEMS'


var browserHistory=ReactRouter.browserHistory;

function requestOrderPosts(data){
    return{
        type:REQUEST_ORDER_ITEMS,
        data,
    }
}

export function receiveOrderPosts(data){
    return{
        type:RECEIVE_ORDER_ITEMS,
        data,
    }
}

function fetchOrderItems(type){
    return dispatch=>{
        dispatch(requestOrderPosts(type));
        return app.ajax(`/api/order/getList?version=2`,{
                type,
            },"GET")
            .then(res=>{
                return dispatch(receiveOrderPosts(res.data));
            })
    }
}


function shouldFetching(state){
    const {orderData}=state
    if(orderData.isFetching){
        return false
    }else{
        return true
    }
}

export function fetchOrderItemsIfNeeded(type){
    return (dispatch,getState)=>{
        //console.log(getState())
        if(shouldFetching(getState())){
            dispatch(fetchOrderItems(type))
        }
    }
}

export const DELETE_ORDER_ITEM='DELETE_ORDER_ITEM'

export function deleteOrder(id){
    return{
        type:DELETE_ORDER_ITEM,
        id
    }
}