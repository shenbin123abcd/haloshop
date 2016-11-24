import CommonHeader from './Common.header'
import {fetchAccountListIfNeeded,destroyData} from '../actions/account'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var ManageAddress=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchAccountListIfNeeded());
    },
    componentWillUnmount(){
        let {dispatch}=this.props;
        dispatch(destroyData());
    },
    handleBack(){
        browserHistory.push('/h5/user/account');
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
                return (
                    <div className="manageAddress-page">
                        <CommonHeader title="管理收货地址" back={this.handleBack}></CommonHeader>
                        <Link className='link' to={`/h5/user/createAddress`}>
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
                return(
                    <div className="manageAddress-page">
                        <CommonHeader title="管理收货地址" back={this.handleBack}></CommonHeader>
                        <ManageAddressContent data={accountData.data}></ManageAddressContent>
                        <div className="create-address-btn">
                            <Link  className='link' to={`/h5/user/createAddress`}>
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
        //console.log(data);
        return(
            <div className="address-list">
                {
                    data.map((n,i)=>{
                        return(
                            <div className="item" key={i}>
                                <div className="address">
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
                                    <Link to={`/h5/updateAddress_${n.id}`} style={{display:'block',color:'#999999'}}>
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

export default ReactRedux.connect(mapStateToProps)(ManageAddress)
