
export const REQUEST_VERIFY_CODE = 'REQUEST_VERIFY_CODE';
export const RECEIVE_VERIFY_CODE = 'RECEIVE_VERIFY_CODE';

function requestPosts(data) {
    return {
        type: REQUEST_VERIFY_CODE,
        data
    }
}

function receivePosts(req, res) {
    // console.log(res)
    return {
        type: RECEIVE_VERIFY_CODE,
        req:req,
        data: res.data,
        receivedAt: new Date().getTime()
    }
}

function fetchCourse(req) {
    return dispatch => {
        dispatch(requestPosts(req));
        return $.ajax('/api/public/verify?version=2',{
            data:{
                phone: req.phone,
                type: req.type,
            }
        }).then(res=> {
            return dispatch(receivePosts(req, res))
        });
    }
}
function shouldFetch(state, req) {
    const { verifyCodeData } = state;
    const {
        isFetching,
    } = verifyCodeData;

    if (isFetching){
        return true
    }
    return true
}

export function fetchVerifyCodeIfNeeded(req) {
    return (dispatch, getState) => {
        // console.log(shouldFetchCourse(getState(), req))
        if (shouldFetch(getState(), req)) {
            return dispatch(fetchCourse(req))
        }
    }
}

export function resetVerifyCode(data) {
    return {
        type: 'RESET_VERIFY_CODE',
        data
    }
}
export function setVerifyCodeCounting(data) {
    return {
        type: 'SET_VERIFY_CODE_COUNTING',
        data
    }
}
export function setResendVerifyCode(data) {
    return {
        type: 'SET_RESEND_VERIFY_CODE',
        data
    }
}