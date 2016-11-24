import {fetchPayListIfNeeded,choosePayWay,timeOutStart,timeOutOver} from '../actions/pay'
import zhifubao from '../images/zhifubao.png'
import weixin from '../images/weixin.png'
import CommonHeader from './Common.header'
import Loading from '../components/common.loading'

var Link=ReactRouter.Link;
var browserHistory=ReactRouter.browserHistory;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
/*var pingpp = require('pingpp-js');*/

var Pay = React.createClass({
    componentDidMount(){
        const{dispatch,routeParams}=this.props;
        dispatch(fetchPayListIfNeeded(routeParams.id));
    },
    handleChoose(e){
        const{dispatch}=this.props;
        dispatch(choosePayWay(e));
    },
    handleBack(){
        const {payListData}=this.props;
        app.modal.confirm({
            title:'温馨提示',
            content:'只差这一步，就能成为您的专属品了，确定要放弃支付吗？',
            leftBtn:'去意已决',
            rightBtn:'容我想想'
        }).then((res)=>{
            browserHistory.push(`/h5/shopCart`);
        })
    },
    handleStart(time){
        let {dispatch}=this.props;
        this.timer=setTimeout(()=>dispatch(timeOutStart(time)),1000);
    },
    componentWillUnmount(){
        let {dispatch}=this.props;
        dispatch(timeOutOver());
        this.timer && clearTimeout(this.timer);
    },
    handleAlert(){
        app.modal.alert({
            content:'点击右上角，使用浏览器打开',
            btn:'知道了'
        })
    },
    handlePay(e){
        let openId=hb.Cookies.getJSON("hb_shop_openId");
        _.assign(e,{
            openid:openId
        })
        //console.log(e);
        app.ajax(`/api/order/pay?version=3`,e,'POST').then((res)=>{
            if(res.iRet==1){
                //pingpp.setAPURL('/alipay')
                pingpp.createPayment(res.data.sign, function(result, err){
                    if (result=="success") {
                        browserHistory.push(`/h5/paySuccess?order_id=${e.order_id}`)
                    } else {
                        app.modal.alert({
                            content:`支付失败 ${err.msg}`,
                            btn:'知道了'
                        })
                    }
                });
            }else{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                })
            }
        },(res)=>{
            app.modal.alert({
                content:'网络繁忙稍后再试',
                btn:'知道了'
            })
        })
    },
    render(){
        const {payListData,payChooseWay}=this.props;
        let renderPage=()=>{
            if(payListData.data==0){
                var isEmpty =true
            }else if(!payListData.data || !payChooseWay.way){
                var isNull=true
            }

            if (payListData.isFetching||isNull) {
                return <Loading key={1}/>
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                let data=payListData.data;
                this.handleStart(payListData.start_time);

                //微信中隐藏支付宝
                if(Modernizr.weixin){
                    data.is_weixin=true;

                }else{
                    data.is_weixin=false;
                }

                return(
                    <div className="pay-page-inner">
                        <CommonHeader
                            title="支付中心"
                            back={this.handleBack}
                        >
                        </CommonHeader>
                        <TimeOut
                            start_time={data.exp_time}
                            type="pay"
                            h={payListData.h}
                            m={payListData.m}
                            s={payListData.s}
                        >
                        </TimeOut>
                        <AddressBlock
                            data={data}
                        >
                        </AddressBlock>
                        <GoodsContentBlock
                            data={payListData.data.goods}
                        >
                        </GoodsContentBlock>
                        <PayBlock
                            data={data}
                            payWay={payChooseWay}
                            handleChoose={this.handleChoose}
                        >
                        </PayBlock>
                        <div className="price-show">
                            <div className="text">商品金额</div>
                            <div className="price">￥ {data.total_price}</div>
                        </div>
                        <PayButtonGroup
                            price={data.total_price}
                            data={payListData}
                            h={payListData.h}
                            m={payListData.m}
                            s={payListData.s}
                            payWay={payChooseWay}
                            handlePay={this.handlePay}
                            handleAlert={this.handleAlert}
                        >
                        </PayButtonGroup>
                    </div>
                )
            }
        }
        return(
            <div className="pay-center-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderPage()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var TimeOut=React.createClass({
    render(){
        let h=this.props.h;
        let m=this.props.m;
        let s=this.props.s;
        h=h<10?'0'+h:h;
        m=m<10?'0'+m:m;
        s=s<10?'0'+s:s;
        let timeIsShow=()=>{
            if(h!='no' && m!='no' && s!='no') {
                return (
                    <span className="time">
                        <span className="h">{h}</span>:
                        <span className="m">{m}</span>:
                        <span className="s">{s}</span>
                    </span>
                )
            }else{
                return(
                    <span className="time">
                        已过期
                    </span>
                )
            }
        }

        return(
            <div className="timeout-block">
                <span className="text">
                    <span className="haloIcon haloIcon-timeout"></span>
                    支付剩余时间：
                    {timeIsShow()}
                </span>
            </div>
        )

    }
});

var AddressBlock=React.createClass({
    render(){
        let data=this.props.data.address;
        let order_id=this.props.data.order_id;
        for(let key in data){
            if(key=='mobile' || key=='name'){
                if(!data[key]){
                    data[key]='尚未填写'
                }
            }
        }
        let renderAdd=()=>{
            if(!data || !data.address){
                return(
                    <span>新增收货地址</span>
                )
            }else{
                return(
                    <div className="info">
                        <div>
                            <span className="name">{data.name}</span>
                            <span className="mobile">{data.mobile}</span>
                        </div>
                        <div className="address">
                            <span>{data.province_title}</span>
                            <span className="sp">{data.city_title}</span>
                            <span className="sp">{data.county_title}</span>
                            <span className="sp">{data.address}</span>
                        </div>
                    </div>
                )
            }
        }
        return(
            <Link style={{display:'block'}} to={`/h5/pay/chooseAddress?order_id=${order_id}`}>
                <div className="address-block clearfix">
                    <div className="text">
                        {renderAdd()}
                    </div>
                    <div className="haloIcon haloIcon-more"></div>
                </div>
            </Link>
        )
    }
});

var GoodsContentBlock=React.createClass({
    render(){
        let data=this.props.data;
        return(
            <div className="goods-block">
                {
                    data.map((n,i)=>{
                        n.sell_total=String(n.sell_total);
                        return(
                            <div className="goods-item" key={i}>
                                <div className="pic-block">
                                    <div className="wrapper">
                                        <img src={n.cover} alt=""/>
                                    </div>
                                </div>
                                <div className="line-block"></div>
                                <div className="info-block">
                                    <div className="title">{n.name}</div>
                                    <Item data={n.spec}/>
                                    <div className="info clearfix">
                                        <div className="price">￥ <span className="sell_num">{n.sell_price.split('.')[0]}</span>.{n.sell_price.split('.')[1]}</div>
                                        <div className="num"><span className="icon">X</span> {n.num}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

var Item=React.createClass({
    render(){
        let data=this.props.data;
        return(
            <div className="spec">
                {
                    data.map((n,i)=>{
                        return(
                            <div className="text" key={i}>
                                {n.value}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

var PayBlock=React.createClass({
    render(){
        let data=this.props.data;
        let payWay=this.props.payWay.way;
        let handleChoose=this.props.handleChoose;

        let activeStatus=()=>{
            if(payWay.weixin){
                return{
                    zhifubaoStyle:'choose-btn ',
                    weixinStyle:'choose-btn choosed',
                }
            }else{
                return{
                    zhifubaoStyle:'choose-btn choosed',
                    weixinStyle:'choose-btn ',
                }
            }
        }
        let renderPayWay=()=>{
            if(data.is_weixin==false){
                return(
                    <div className="pay-item" onClick={e=>handleChoose(3)}>
                        <div className="line"></div>
                        <div className="inner clearfix">
                            <div className="icon">
                                <span className="pic"><img src={zhifubao} alt=""/></span>
                                <span className="text">支付宝</span>
                            </div>
                            <div className={activeStatus().zhifubaoStyle}><span className="haloIcon haloIcon-ok"></span></div>
                        </div>
                    </div>
                );
            }else{
                return(
                    <div className="pay-item" onClick={e=>handleChoose(4)}>
                        <div className="inner clearfix">
                            <div className="icon">
                                <span className="pic"><img src={weixin} alt=""/></span>
                                <span className="text">微信支付</span>
                            </div>
                            <div className={activeStatus().weixinStyle}><span className="haloIcon haloIcon-ok"></span></div>
                        </div>
                    </div>
                )
            }
        }
        return(
            <div className="pay-block">
                <div className="pay-title">支付方式</div>
                <div className="pay-content">
                    {renderPayWay()}
                </div>
            </div>
        )
    }
});

var PayButtonGroup=React.createClass({
    render(){
        let order_id=this.props.data.data.order_id;
        let payWay=this.props.payWay.way.type;
        let price=this.props.price;
        let handlePay=this.props.handlePay;
        let handleAlert=this.props.handleAlert;
        let h=this.props.h;
        let m=this.props.m;
        let s=this.props.s;


        h=h<10?'0'+h:h;
        m=m<10?'0'+m:m;
        s=s<10?'0'+s:s;



        let renderBtn=()=>{
            if(h!='no' && m!='no' && s!='no'){
                return(
                    <div className="pay-btn" onClick={e=>handlePay({type:payWay,order_id:order_id})}>
                        去支付
                    </div>
                )
            }else{
                return(
                    <div className="pay-btn" style={{background:'#999999'}}>
                        已过期
                    </div>
                )
            }
        }

        return(
            <div className="pay-btn-group">
                <div className="wrapper">
                    <div className="line"></div>
                    {renderBtn()}
                    <div className="pay-info">
                        <span className="text">实际付款：</span>
                        <span className="price">￥ <span className="num">{price.split('.')[0]}</span>.{price.split('.')[1]}</span>
                    </div>
                </div>
            </div>
        )
    }
})



function mapStateToProps(state) {
    const{payListData,payChooseWay}=state;
    return {
        payListData,
        payChooseWay
    }
}

export default ReactRedux.connect(mapStateToProps)(Pay)
