export const REQUEST_PAY_LIST='REQUEST_PAY_LIST'
export const RECEIVE_PAY_LIST='RECEIVE_PAY_LIST'

function requestPayPosts(data){
    return {
        type:REQUEST_PAY_LIST,
        data
    }
}

function receivePayPosts(data){
    return{
        type:RECEIVE_PAY_LIST,
        data
    }
}

var payData='';
function fetchPayList(id) {
    return dispatch => {
        dispatch(requestPayPosts('success'));
        return app.ajax(`/api/order/getInfo?version=3`,{
            order_id:id
        },"GET").then(res=>{
            if(res.iRet==1){
                payData=res.data;
                let exp_time=(res.data.exp_time);
                dispatch(timeOutStart(exp_time));
                dispatch(receivePayPosts(res.data));
                if(Modernizr.weixin){
                    dispatch(choosePayWay(4))
                }else{
                    dispatch(choosePayWay(3));
                }
            }
        });
    }
}

function shouldFetchPay(state) {
    const { payListData } = state
    if (payListData.isFetching){
        return false
    }
    return true
}

export function fetchPayListIfNeeded(id) {
    return (dispatch, getState ) => {
        if (shouldFetchPay(getState())) {
            return dispatch(fetchPayList(id));
        }
    }
}


//choose pay
export const CHOOSE_PAY_WAY='CHOOSE_PAY_WAY'

export function choosePayWay(way){
    let wayObj={}
    if(way==4){
        wayObj.weixin=true;
        wayObj.zhifubao=false;
        wayObj.type=4;
    }else if(way==3){
        wayObj.weixin=false;
        wayObj.zhifubao=true;
        wayObj.type=3;
    }
    return{
        type:CHOOSE_PAY_WAY,
        way:wayObj,
    }
}

//倒计时
export const TIME_OUT_START='TIME_OUT_START'
export const TIME_OUT_OVER='TIME_OUT_OVER'

export function timeOutStart(time){
    return{
        type:'TIME_OUT_START',
        time,
    }
}

export function timeOutOver(){
    return{
        type:'TIME_OUT_OVER',
    }
}


