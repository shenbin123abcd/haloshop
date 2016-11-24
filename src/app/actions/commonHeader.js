export const REQUEST_COMMON_CART='REQUEST_COMMON_CART'
export const RECEIVE_COMMON_CART='RECEIVE_COMMON_CART'

function requestCommonPosts(data){
    return {
        type:REQUEST_COMMON_CART,
        data
    }
}

function receiveCommonPosts(data){
    return{
        type:RECEIVE_COMMON_CART,
        data
    }
}

function fetchCommonCart(method) {
    return dispatch => {
        dispatch(requestCommonPosts('success'));

        return app.ajax(`/api/public/getConfig`,'',method).then(res=>{
            if(res.iRet==1){
                dispatch(receiveCommonPosts(res.data));
            }
        });
    }
}

function shouldFetchCommon(state) {
    const { commonCartData } = state
    if (commonCartData.isFetching){
        return false
    }
    return true
}

export function fetchCommonCartifNeeded(method) {
    return (dispatch, getState ) => {
        if (shouldFetchCommon(getState())) {
            return dispatch(fetchCommonCart());
        }
    }
}


