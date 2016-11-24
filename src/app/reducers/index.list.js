import {
    RECEIVE_DATE_TIME
} from '../actions/index'

function count(start_time){
    this.c = setTimeout(Time.bind(this),1000);
    function Time(){
        let start_time=start_time*1000;
        //let start_time='2016/12/20 23:59:59';
        const ts = (new Date(start_time).getTime()-new Date().getTime())/1000;
        if(ts>0){
            var d = parseInt(ts / 86400, 10);
            var h = parseInt(ts / 3600 %24, 10);
            var m = parseInt(ts / 60 % 60, 10);
            var s = parseInt(ts % 60, 10);
            h=h<10?'0'+h:h;
            m=m<10?'0'+m:m;
            s=s<10?'0'+s:s;
            this.setState({d:d,h:h,m:m,s:s,});
            return{
                d:d,
                h:h,
                m:m,
                s:s,
            }
        }else{
            clearInterval(this.c);
            if(callback){callback()}
        }
    }
}

export default (state = {
    d:0,
    h:0,
    m:0,
    s:0,
}, action) => {
    switch(action.type) {
        case 'RECEIVE_DATE_TIME':
            return _.assign({}, state, count(action.time));
        default:
            return state
    }
}

