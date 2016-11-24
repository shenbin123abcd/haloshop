export const REQUEST_USER_NMS='REQUEST_USER_NMS'
export const RECEIVE_USER_NMS='RECEIVE_USER_NMS'


var browserHistory=ReactRouter.browserHistory;

function requestUserPosts(data){
    return{
        type:REQUEST_USER_NMS,
        data,
    }
}

export function receiveUserPosts(data){
    return{
        type:RECEIVE_USER_NMS,
        data,
    }
}

function fetchUserItems(){
    return dispatch=>{
        dispatch(requestUserPosts('success'))
        return app.ajax(`/api/order/getNum?version=2`,'',"GET")
            .then(res=>{
                //let id = hb.location.url('?cate_id');
                return dispatch(receiveUserPosts(res.data));

            })
    }
}


function shouldFetching(state){
    const {userData}=state
    if(userData.isFetching){
        return false
    }else{
        return true
    }
}

export function fetchUserItemsIfNeeded(){
    return (dispatch,getState)=>{
        //console.log(getState())
        if(shouldFetching(getState())){
            dispatch(fetchUserItems())
        }
    }
}