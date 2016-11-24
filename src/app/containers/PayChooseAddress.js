import CommonHeader from './Common.header'
import {fetchAccountListIfNeeded,destroyData} from '../actions/account'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var payChooseAddress=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchAccountListIfNeeded());
    },
    componentWillUnmount(){
        let {dispatch}=this.props;
        dispatch(destroyData());
    },
    handleClick(e){
        let address_id=e;
        let order_id=hb.location.url('?order_id');
        app.ajax(`/api/order/setAddress?version=3`,{
            address_id,
            order_id,
        },"POST").then((res)=>{
            if(res.iRet==1){
                hb.lib.weui.toast('选择地址成功');
                setTimeout(()=>{
                    browserHistory.push(`/h5/pay_${order_id}`);
                },200);
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
    handleBack(){
        let order_id=hb.location.url('?order_id');
        app.modal.alert({
            content:'请选择收货地址',
            btn:'知道了'
        })
        //browserHistory.push(`/pay_${order_id}`)
    },
    handleAlert(){
        app.modal.alert({
            content:'请新增收货地址',
            btn:'知道了'
        });
    },
    render(){
        let {accountData}=this.props;
        let renderAccount=()=>{
            if(!accountData.data){
                var isNull=true
            }else if(accountData.data.length===0){
                var isEmpty =true
            }

            if (accountData.isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                let order_id=hb.location.url("?order_id");
                return (
                    <div className="manageAddress-page">
                        <CommonHeader title="确认收货地址" back={this.handleAlert}></CommonHeader>
                        <Link className='link' to={`/h5/user/createAddress?from=pay&order_id=${order_id}`}>
                            <div className="create-address" onClick={this.handleCreate}>
                                <div className="create-block">
                                    <span className="icon">
                                        <span className="haloIcon haloIcon-ascreate"></span>
                                    </span>
                                    <span>新增收货地址</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }else{
                let order_id=hb.location.url("?order_id");
                return(
                    <div className="manageAddress-page">
                        <CommonHeader title="确认收货地址" back={this.handleBack}></CommonHeader>
                        <ManageAddressContent
                            data={accountData.data}
                            handleClick={this.handleClick}
                        >
                        </ManageAddressContent>
                        <div className="create-address-btn">
                            <Link  className='link' to={`/h5/user/createAddress?from=pay&order_id=${order_id}`}>
                                新增收货地址
                            </Link>
                        </div>
                    </div>
                )
            }
        }
        return(
            <div>
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderAccount()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var ManageAddressContent=React.createClass({
    render(){
        let data=this.props.data;
        let handleClick=this.props.handleClick;
        let order_id=hb.location.url('?order_id');
        return(
            <div className="address-list">
                {
                    data.map((n,i)=>{
                        return(
                            <div className="item" key={i}>
                                <div className="address" onClick={e=>handleClick(n.id)}>
                                    <div className="info">
                                        <span>{n.name}</span>
                                        <span className="ml">{n.mobile}</span>
                                    </div>
                                    <div className="position">
                                        <span>{n.address}</span>
                                        <span className="ml">{n.province_title}</span>
                                        <span className="ml">{n.city_title}</span>
                                        <span className="ml">{n.county_title}</span>
                                    </div>
                                </div>
                                <div className="update-btn">
                                    <Link to={`/h5/updateAddress_${n.id}?from=pay&order_id=${order_id}`} style={{display:'block',color:'#999999'}}>
                                        <div className="line"></div>
                                        <div><span className="haloIcon haloIcon-editor"></span></div>
                                        <div style={{color:'#999999'}}>编辑</div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
})

function mapStateToProps(state) {
    const {accountData}=state;
    return {
        accountData
    }
}

export default ReactRedux.connect(mapStateToProps)(payChooseAddress)
