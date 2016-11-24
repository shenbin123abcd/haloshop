export const REQUEST_SHOP_LIST='REQUEST_SHOP_LIST'
export const RECEIVE_SHOP_LIST='RECEIVE_SHOP_LIST'

function requestListPosts(data){
    return {
        type:REQUEST_SHOP_LIST,
        data
    }
}

function receiveListPosts(data){
    return{
        type:RECEIVE_SHOP_LIST,
        data
    }
}

function fetchShopList(news,page,method) {
    return dispatch => {
        dispatch(requestListPosts(page))
        return app.ajax(`/api/goods/getCaseList?version=2`,{
            new:news,
            page:page,
        },method).then(res=>{
            dispatch(receiveListPosts(res))
        });
    }
}

function shouldFetchList(state) {
    const { indexData } = state
    if (indexData.isFetching){
        return false
    }
    return true
}

export function fetchShopListIfNeeded(news=1,page=1,method='GET') {
    return (dispatch, getState ) => {
        if (shouldFetchList(getState())) {
            dispatch(fetchShopList(news,page,method));
        }
    }
}


//prev
export const REQUEST_SHOP_PREV_LIST='REQUEST_SHOP_PREV_LIST'
export const RECEIVE_SHOP_PREV_LIST='RECEIVE_SHOP_PREV_LIST'

function requestListPrevPosts(data){
    return{
        type:REQUEST_SHOP_PREV_LIST,
        data
    }
}

function receiveListPrevPosts(data){
    return{
        type:RECEIVE_SHOP_PREV_LIST,
        data
    }
}


function fetchShopPrevList(news,page,method){
    return dispatch => {
        dispatch(requestListPrevPosts(page))
        return app.ajax(`/api/goods/getCaseList?version=2`,{
            new:news,
            page:page,
        },method).then(res=>{
            let time=parseInt(res.data.start_time)*1000;
            console.log(time);
            dispatch(receiveListPrevPosts(res))
        });
    }
}

function shouldFetchPrevList(state) {
    const { indexPrevData } = state
    if (indexPrevData.isFetching){
        return false
    }
    return true
}

export function fetchPrevShopListIfNeeded(news=0,page=1,method='GET') {
    return (dispatch, getState ) => {
        if (shouldFetchPrevList(getState())) {
            dispatch(fetchShopPrevList(news,page,method));
        }
    }
}


//倒计时
export const RECEIVE_DATE_TIME='RECEIVE_DATE_TIME'

export function count(time){
    return{
        type:RECEIVE_DATE_TIME,
        time,
    }
}
