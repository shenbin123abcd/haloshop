
export default React.createClass({

    getInitialState(){
        return{
            d:this.getDate().d,
            h:this.getDate().h,
            m:this.getDate().m,
            s:this.getDate().s,
        }
    },

    handleStart(){
        this.timer=setTimeout(this.handleCountDown,1000);
    },

    getDate(){
        let up_time=this.props.upTime;
        let start_time=(this.props.start_time)*1000;
        let d,h,m,s,time='';

        if(up_time){
            time=up_time
        }else{
            time=start_time
        }

        const ts = (new Date(time).getTime()-new Date().getTime())/1000;
        if(ts>0){
            d = parseInt(ts / 86400, 10);
            h = parseInt(ts / 3600 %24, 10);
            m = parseInt(ts / 60 % 60, 10);
            s = parseInt(ts % 60, 10);
            h=h<10?'0'+h:h;
            m=m<10?'0'+m:m;
            s=s<10?'0'+s:s;
        }
        return{
            d,
            h,
            m,
            s,
        }

    },

    handleCountDown(callback){
        this.setState({
            d:this.getDate().d || '0',
            h:this.getDate().h || '00',
            m:this.getDate().m || '00',
            s:this.getDate().s || '00',
        });
    },
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    },
    componentWillReceiveProps(){

    },
    render(){
        this.handleStart();
        let type=this.props.type;
        let up_time=this.props.upTime;
        let start_time=this.props.start_time*1000
        if(type=='pay'){
            return(
                <div className="timeout-block">
                    <span className="text">
                        <span className="haloIcon haloIcon-timeout"></span>
                        支付剩余时间：
                        <span className="time">
                            <span className="h">{this.state.h}</span>:
                            <span className="m">{this.state.m}</span>:
                            <span className="s">{this.state.s}</span>
                        </span>
                    </span>
                </div>
            )
        }else if(type=='index'){
            let renderText=()=>{
                if(up_time){
                    return(
                        <span>
                            <span className="text">距离下次上新还剩</span>
                            <span className="date" id="day"> {this.state.d} </span>天
                        </span>
                    )
                }else if(start_time){
                    let hours=new Date(start_time).getHours();
                    return(
                        <span>
                            <span className="text">今日特卖 {hours} 点场</span>
                        </span>
                    )
                }
            }
            return(
                <div className="timeout-block">
                <span className="desc">
                    {renderText()}
                </span>
                <span className="time">
                    <span className="hour square" id="hour">{this.state.h}</span>
                    <span className="point">:</span>
                    <span className="minute square" id="minute">{this.state.m}</span>
                    <span className="point">:</span>
                    <span className="seconds square" id="seconds">{this.state.s}</span>
                </span>
                </div>
            )
        }

    }
})
