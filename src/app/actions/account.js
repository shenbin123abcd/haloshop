export const REQUEST_ACCOUNT_DATA='REQUEST_ACCOUNT_DATA'
export const RECEIVE_ACCOUNT_DATA='RECEIVE_ACCOUNT_DATA'
export const DESTROY_ACCOUNT_DATA='DESTROY_ACCOUNT_DATA'


function requestAccountPosts(data){
    return{
        type:REQUEST_ACCOUNT_DATA,
        data,
    }
}

export function receiveAccountPosts(data){
    return{
        type:RECEIVE_ACCOUNT_DATA,
        data,
    }
}

function fetchAccountList(){
    return dispatch=>{
        dispatch(requestAccountPosts('success'))
        return app.ajax(`/api/address/getList`,'',"GET")
            .then(res=>{
                return dispatch(receiveAccountPosts(res.data));
            })
    }
}


function shouldFetching(state){
    const {accountData}=state
    if(accountData.isFetching){
        return false
    }else{
        return true
    }
}

export function fetchAccountListIfNeeded(){
    return (dispatch,getState)=>{
        //console.log(getState())
        if(shouldFetching(getState())){
            dispatch(fetchAccountList())
        }
    }
}

export function destroyData(){
    return{
        type:DESTROY_ACCOUNT_DATA
    }
}
