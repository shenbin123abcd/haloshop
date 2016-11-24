export const REQUEST_CASE_LIST='REQUEST_CASE_LIST'
export const RECEIVE_CASE_LIST='RECEIVE_CASE_LIST'


var browserHistory=ReactRouter.browserHistory;

function requestCasePosts(data){
    return{
        type:REQUEST_CASE_LIST,
        data,
    }
}

export function receiveCasePosts(data){
    return{
        type:RECEIVE_CASE_LIST,
        data,
    }
}

function fetchCaseList(type){
    return dispatch=>{
        dispatch(requestCasePosts(type));
        return app.ajax(`/api/upgrade/getList?version=2`,"GET")
            .then(res=>{
                return dispatch(receiveCasePosts(res.data));
            })
    }
}


function shouldFetching(state){
    const {caseData}=state
    if(caseData.isFetching){
        return false
    }else{
        return true
    }
}

export function fetchMyCaseListIfNeeded(){
    return (dispatch,getState)=>{
        //console.log(getState())
        if(shouldFetching(getState())){
            dispatch(fetchCaseList())
        }
    }
}
