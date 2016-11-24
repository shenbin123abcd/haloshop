import {fetchPaySuccessIfNeeded} from '../actions/paySuccess'
import CommonHeader from './Common.header'
import payError from '../images/pay-error.png'
import paySuccess from '../images/pay-success.png'
import Loading from '../components/common.loading'

var Link=ReactRouter.Link;
var browserHistory=ReactRouter.browserHistory;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var PaySuccess=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        let order_no=hb.location.url('?out_trade_no');
        let order_id=hb.location.url('?order_id');
        if(order_no){
            dispatch(fetchPaySuccessIfNeeded({order_no:order_no}));
        }else if(order_id){
            dispatch(fetchPaySuccessIfNeeded({order_id:order_id}));
        }else{
            browserHistory.push('/h5/index');
        }
        //let order_no='';
        //if(param){
        //    order_no=param.out_trade_no;
        //
        //}else{
        //
        //}
    },
    handleBack(){
        browserHistory.push('/h5/user/order');
    },
    render(){
        let {paySuccess}=this.props;
        let renderPage=()=>{
            if(!paySuccess.data){
                var isNull=true
            }else if(paySuccess.data.length===0){
                var isEmpty =true
            }

            if (paySuccess.isFetching||isNull) {
                return <Loading key={1}/>
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                let data=paySuccess.data;
                let status=data.status;
                let renderGoBtn=()=>{
                    if(status==1){
                        return(
                            <Link  className='link' to={`/h5/user/order?type=2`}>
                                前往“我的账户”查看
                            </Link>
                        )
                    }else{
                        return(
                            <Link  className='link' to={`/h5/user/order?type=1`}>
                                前往“我的账户”查看
                            </Link>
                        )
                    }
                }
                return(
                    <div className="pay-success-wrapper">
                        <CommonHeader title="订单支付" none></CommonHeader>
                        <ContentBlock
                            status={status}
                            data={data}
                        >
                        </ContentBlock>
                        <div className="go-account-btn">
                            {renderGoBtn()}
                        </div>
                    </div>
                )
            }
        }
        return(
            <div className="pay-success-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderPage()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var ContentBlock=React.createClass({
    render(){
        let status=this.props.status;
        let data=this.props.data.data;
        let content=data.content;
        //console.log(content);
        if(status==0){
            return(
                <div>
                    <div className="paySuccess-block">
                        <div className="pic"><img src={payError} alt=""/></div>
                        <div className="info">订单编号：{data.order_no}</div>
                    </div>
                    <div className="paySuccess-desc">
                        <div className="haloIcon haloIcon-alert"></div>
                        <div className="text">{data.remark}</div>
                    </div>
                </div>
            )
        }else if(status==1){
            return(
                <div>
                    <div className="paySuccess-block">
                        <div className="pic"><img src={paySuccess} alt=""/></div>
                        <div className="info">
                            <div>订单编号：{data.order_no}</div>
                            <div>预计发货：{data.send_date}</div>
                        </div>
                    </div>
                    <div className="paySuccess-text">
                        {
                            content.map((n,i)=>{
                                return(
                                    <div key={i} className="wrapper">
                                        <div className="title">{n.title}</div>
                                        <div className='text'>{n.text}</div>
                                        <div className="point"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
})


function mapStateToProps(state) {
    const{paySuccess}=state;
    return {
        paySuccess
    }
}

export default ReactRedux.connect(mapStateToProps)(PaySuccess)
