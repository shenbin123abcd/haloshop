import {fetchOrderItemsIfNeeded,deleteOrder} from '../actions/order'
import CommonHeader from './Common.header'
import Loading from '../components/common.loading'
import LazyLoad from 'react-lazyload';

var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;

var Order=React.createClass({
    componentDidMount(){
      const {dispatch,orderData}=this.props;
      let type = hb.location.url('?type');
        if(!type){
            dispatch(fetchOrderItemsIfNeeded(''));
        }else{
            dispatch(fetchOrderItemsIfNeeded(type));
        }

    },
    handleCancel(e){
        const {dispatch}=this.props;
        app.modal.weUiConfirm({
            title:'温馨提示',
            content:'是否取消此订单？',
            leftBtn:'取消',
            rightBtn:'确定'
        }).then(()=>{
            app.modal.loading.show();
            app.ajax(`/api/order/cancel?version=2`,{
                order_id:e,
            },'POST').then((res)=>{
                if(res.iRet==1){
                    dispatch(fetchOrderItemsIfNeeded(''));
                    app.modal.loading.hide();
                }else{
                    app.modal.loading.hide();
                    app.modal.alert({
                        content:res.info,
                        btn:'知道了'
                    });
                }
            },(res)=>{
                app.modal.loading.hide();
                app.modal.alert({
                    content:'网络繁忙稍后再试',
                    btn:'知道了'
                });
            })
        })
    },
    handleDelete(e){
        const {dispatch}=this.props;
        //dispatch(deleteOrder(e));
        app.modal.weUiConfirm({
            title:'温馨提示',
            content:'是否删除此订单？',
            leftBtn:'取消',
            rightBtn:'确定'
        }).then(()=>{
            app.modal.loading.show();
            app.ajax(`/api/order/delete?version=2`,{
                order_id:e,
            },'POST').then((res)=>{
                if(res.iRet==1){
                    dispatch(deleteOrder(e));
                    app.modal.loading.hide();
                }else{
                    app.modal.loading.hide();
                    app.modal.alert({
                        content:res.info,
                        btn:'知道了'
                    })
                }
            },()=>{
                app.modal.loading.hide();
                app.modal.alert({
                    content:'网络繁忙稍后再试',
                    btn:'知道了'
                });
            })
        })
    },
    handleBack(){
        browserHistory.push('/h5/user');
    },
    render(){
        let {orderData}=this.props;
        let type = hb.location.url('?type');

        let renderOrder=()=>{
            if(!orderData.data){
               var isNull=true
            }else if(orderData.data.length==0){
                var isEmpty =true
            }

            let renderCommonHeader=()=>{
                if(!type){
                    return(
                        <CommonHeader title="我的订单" back={this.handleBack}></CommonHeader>
                    )
                }else if(type==1){
                    return(
                        <CommonHeader title="待付款订单" back={this.handleBack}></CommonHeader>
                    )
                }else if(type==2){
                    return(
                        <CommonHeader title="待发货订单" back={this.handleBack}></CommonHeader>
                    )
                }else if(type==3){
                    return(
                        <CommonHeader title="待收货订单" back={this.handleBack}></CommonHeader>
                    )
                }
            }

            if (orderData.isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                let renderText=()=>{
                    if(!type){
                        return(
                            <span>暂无订单</span>
                        )
                    }else if(type==1){
                        return(
                            <span>暂无待付款订单</span>
                        )
                    }else if(type==2){
                        return(
                            <span>暂无待发货订单</span>
                        )
                    }else if(type==3){
                        return(
                            <span>暂无待收货订单</span>
                        )
                    }
                }
                return (
                    <div className="page-wrapper">
                        {renderCommonHeader()}
                        <div className="no-data-content">
                            <div className="no-data-icon"><span className="haloIcon haloIcon-wudingdan"></span></div>
                            <div className="no-data-text">{renderText()}</div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="page-wrapper">
                        {renderCommonHeader()}
                        <OrderContent
                            data={orderData.data}
                            handleCancel={this.handleCancel}
                            handleDelete={this.handleDelete}
                        >
                        </OrderContent>
                    </div>
                )

            }
        }
        return(
            <div className="order-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderOrder()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var OrderContent=React.createClass({
    render(){
        let data=this.props.data;
        let handleCancel=this.props.handleCancel;
        let handleDelete=this.props.handleDelete;
        return(
            <div className="order-list">
                {
                    data.map((n,i)=>{
                        let renderInfo=()=>{
                            if(n.status_title=='等待付款'){
                                return(
                                    <div className='bottom'>
                                        现在支付，预计{n.send_date}发货
                                    </div> 
                                )
                            }else if(n.status_title=='等待发货'){
                               return(
                                   <div className='bottom'>
                                       预计{n.send_date}发货
                                   </div>
                               )
                            }
                        }
                        let renderBtn=()=>{
                            if(n.status_title=='等待付款'){
                               return(
                                    <div className="btn-group">
                                        <Link className='pay' to={`/h5/pay_${n.id}`}>去支付</Link>
                                        <div className='cancel' onClick={e=>handleCancel(n.id)}>取消订单</div>
                                    </div> 
                               )  
                            }else if(n.status_title=='已过期' || n.status_title=='已取消'){
                                return(
                                    <div className="btn-group">
                                        <div className='cancel' onClick={e=>handleDelete(n.id)}>删除订单</div>
                                    </div> 
                                )
                            }
                        }
                        return(
                            <div className="item" key={i}>
                                <div className="order-status">
                                    <div className="line"></div>
                                    <div className="order-info">
                                        <div className="order_no">订单编号：{n.order_no}</div>
                                        <div className="time">下单时间：{n.create_time}</div>
                                    </div>
                                    <div className="status">
                                        {n.status_title}
                                    </div>
                                </div>
                                <div className="order-content">
                                    <div className="user-info">
                                        <div className="line"></div>
                                        <div className="info">
                                            <span className="name">{n.address.name}</span>
                                            <span className="mobile">{n.address.mobile}</span>
                                        </div>
                                        <div className="address">
                                            <span>{n.address.address}</span>
                                            <span className="ml">{n.address.county_title}</span>
                                            <span className="ml">{n.address.city_title}</span>
                                            <span className="ml">{n.address.province_title}</span>
                                        </div>
                                    </div>
                                    <GoodsInfo data={n.goods}/>
                                    <div className='total-price-block'>
                                        <div className='line'></div>
                                        <div className='top'>
                                            <span className="text">共{n.total}件</span>
                                            <span className="total">合计：
                                                <span className="price-f">￥ {n.order_amount.split('.')[0]}</span>
                                                <span className="price-t">.{n.order_amount.split('.')[1]}</span>
                                            </span>
                                        </div> 
                                        {renderInfo()}
                                    </div>  
                                    {renderBtn()}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

var GoodsInfo=React.createClass({
    render(){
        let data=this.props.data;
        return(
            <div>
                {
                    data.map((n,i)=>{
                        return(
                            <div className="goods-info" key={i}>
                                <div className="pic-block">
                                    <div className="wrapper">
                                        <LazyLoad height={102}>
                                            <img src={n.cover} alt=""/>
                                        </LazyLoad>
                                    </div>
                                </div>
                                <div className="text-block">
                                    <div>{n.name}</div>
                                    <Item data={n.spec}/>
                                    <div className='price'>￥ {n.sell_price}</div>
                                </div>
                                <div className='line'></div> 
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
        let data=this.props.data
        return(
            <div>
                {
                    data.map((n,i)=>{
                        return(
                            <div key={i}>
                                {n.value}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
})

function mapStateToProps(state) {
    const {orderData}=state;
    return {
        orderData,
    }
}

export default ReactRedux.connect(mapStateToProps)(Order)
