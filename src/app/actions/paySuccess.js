export const REQUEST_PAY_SUCCESS='REQUEST_PAY_SUCCESS'
export const RECEIVE_PAY_SUCCESS='RECEIVE_PAY_SUCCESS'

function requestPaySuccessPosts(data){
    return {
        type:REQUEST_PAY_SUCCESS,
        data
    }
}

function receivePaySuccessPosts(data){
    return{
        type:RECEIVE_PAY_SUCCESS,
        data
    }
}

function fetchPayList(e) {
    return dispatch => {
        dispatch(requestPaySuccessPosts('success'));
        return app.ajax(`/api/order/paySuccess?version=2`,e,"GET").then(res=>{
            if(res.iRet==1){
                dispatch(receivePaySuccessPosts(res.data));
            }
        });
    }
}

function shouldFetchPay(state) {
    const { paySuccess } = state
    if (paySuccess.isFetching){
        return false
    }
    return true
}

export function fetchPaySuccessIfNeeded(e) {
    return (dispatch, getState ) => {
        if (shouldFetchPay(getState())) {
            return dispatch(fetchPayList(e));
        }
    }
}




