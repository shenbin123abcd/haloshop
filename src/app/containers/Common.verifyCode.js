import {fetchVerifyCodeIfNeeded,setResendVerifyCode,resetVerifyCode,setVerifyCodeCounting} from '../actions/verifyCode'
const Verify = React.createClass({
    pickerDependent:null,

    componentDidMount() {


    },
    componentWillUnmount(){
        const {dispatch} = this.props
        if(this.clearCount) {
            this.clearCount()
            this.clearCount=null
        }
        dispatch(resetVerifyCode());
    },
    componentWillReceiveProps : function(nextProps) {
        
    },
    componentDidUpdate  : function(prevState,prevProps){
        // console.log(11,this.props.isFetching)
        // console.log('componentDidUpdate',prevState,prevProps,this.props)
        const {dispatch,isCounting} = this.props
        // console.log(isCounting,this.clearCount);

        if(isCounting&&!this.clearCount){
            this.clearCount=hb.interval(()=> {
                // console.log(this.count);
                this.count--;
                // $(this.refs.count).text(`${this.count}s`)
                dispatch(setVerifyCodeCounting(this.count));
            },1000,60,()=>{
                this.count=60;
                // console.log(2,this.refs.count)
                if(this.clearCount) {
                    this.clearCount();
                    this.clearCount=null;
                }
                dispatch(setResendVerifyCode());
            });
        }
    },
    clearCount:null,
    count:60,
    getVerifyCode(){
        const {dispatch,value,verifyType} = this.props
        // console.log(value);
        var data={
            phone: value,
            type: verifyType,
        };
        switch(true){
            case !data.phone:
                hb.lib.weui.alert('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                hb.lib.weui.alert('请输入正确的手机号');
                break;
            default:
                dispatch(fetchVerifyCodeIfNeeded(data));
        }
    },
    renderBt(){
        const { isFetching,isSent,isCounting ,type,className,placeholder,countingNumber} = this.props;
        // console.log(this.props);
        if(isFetching){
            return (
                <i className="haloIcon haloIcon-spinner haloIcon-spin"></i>
            );
        }else if(isCounting){
            return (
                <div className="count">
                    <div ref="count"> {countingNumber}s</div>
                </div>
            );
        }else if(isSent){
            return (
                <div className="reget" onClick={this.getVerifyCode}>重新获取</div>
            );
        }else{
            return (
                <div className="get">
                    <div onClick={this.getVerifyCode}>获取验证码</div>
                </div>
            );
        }

    },

    render() {
        // const {props} = this.props
        // console.log(props);
        const { value,onChange,type,className,placeholder} = this.props;
        return (
            <div className="verify-box">
                <input value={value} onChange={onChange} type={type} placeholder={placeholder} className={className} />
                <div className="verify-inner">
                    {this.renderBt()}
                </div>
            </div>
        );
    }
});

// export default Index
function mapStateToProps(state) {
    const { verifyCodeData } = state;
    const { isFetching,isSent,isCounting,countingNumber } = verifyCodeData;
    return {
        isFetching,
        isSent,
        isCounting,
        countingNumber,
    }
}


export default ReactRedux.connect(mapStateToProps)(Verify)
