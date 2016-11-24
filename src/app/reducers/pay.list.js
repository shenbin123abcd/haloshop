import {
    REQUEST_PAY_LIST, RECEIVE_PAY_LIST,TIME_OUT_START,TIME_OUT_OVER
} from '../actions/pay'

export default (state = {
    isFetching: false,
    data: null,

    h:0,
    m:0,
    s:0,
    start_time:0,
}, action) => {
    switch(action.type) {
        case 'REQUEST_PAY_LIST':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_PAY_LIST':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            });
        case 'TIME_OUT_START':
            let start_time=action.time;
            const ts = (start_time*1000-new Date().getTime())/1000;
            if(ts>0) {
                var d = parseInt(ts / 86400, 10);
                var h = parseInt(ts / 3600 % 24, 10);
                var m = parseInt(ts / 60 % 60, 10);
                var s = parseInt(ts % 60, 10);
                return _.assign({}, state, {
                    d,
                    h,
                    m,
                    s,
                    start_time:action.time
                })
            }else{
                return _.assign({}, state, {
                    d:'no',
                    h:'no',
                    m:'no',
                    s:'no',
                })
            }
        case 'TIME_OUT_OVER':
            return _.assign({}, state,{
                isFetching: false,
                data: null,

                h:0,
                m:0,
                s:0,
                start_time:0,
            })
        default:
            return state
    }
}

