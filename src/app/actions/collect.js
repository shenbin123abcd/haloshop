export const REQUEST_COLLECT_LIST='REQUEST_COLLECT_LIST'
export const RECEIVE_COLLECT_LIST='RECEIVE_COLLECT_LIST'


var browserHistory=ReactRouter.browserHistory;

function requestCollectPosts(data){
    return{
        type:REQUEST_COLLECT_LIST,
        data,
    }
}

export function receiveCollectPosts(data){
    return{
        type:RECEIVE_COLLECT_LIST,
        data,
    }
}

function fetchCollectList(){
    return dispatch=>{
        dispatch(requestCollectPosts('success'))
        return app.ajax(`/api/user/favorite`,'',"GET")
            .then(res=>{
                if(res.iRet==1){
                    //res.data.length=0;
                    return dispatch(receiveCollectPosts(res.data));
                }
            })
    }
}


function shouldFetching(state){
    const {collectData}=state
    if(collectData.isFetching){
        return false
    }else{
        return true
    }
}

export function fetchCollectListIfNeeded(){
    return (dispatch,getState)=>{
        //console.log(getState())
        if(shouldFetching(getState())){
            dispatch(fetchCollectList())
        }
    }
}
