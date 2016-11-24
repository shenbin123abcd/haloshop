import CommonHeader from './Common.header'
import {fetchAccountListIfNeeded} from '../actions/account'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var Account=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchAccountListIfNeeded());
    },
    handleOut(){
        hb.Cookies.remove('hb_shop_user');
        hb.Cookies.remove('hb_shop_token');
        browserHistory.push('/h5/login');
    },
    handleBack(){
        browserHistory.push('/h5/user');
    },
    render(){
        let {accountData}=this.props;
        let user=hb.Cookies.getJSON('hb_shop_user').user;
        let renderAccount=()=>{
            if(!accountData.data){
                var isNull=true
            }

            if (accountData.isFetching||isNull){
                return <Loading key={1}/>
            }else{
                return(
                    <div className="account-page">
                        <CommonHeader title="个人账号" back={this.handleBack}></CommonHeader>
                        <ContentItem data={user} address={accountData.data} handleOut={this.handleOut}></ContentItem>
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

var ContentItem=React.createClass({
    render(){
        let handleOut=this.props.handleOut
        let data=this.props.data;
        let address=this.props.address;
        let renderAddress=()=>{
            if(address.length==0 || !address){
                return(
                    <div>请完善地址</div>
                )
            }else{
                let obj=address[0];
                return(
                    <div>
                        <span className="address">{obj.address}</span>
                        <span className="province ml">{obj.province_title}</span>
                        <span className="city ml">{obj.city_title}</span>
                        <span className="country ml">{obj.county_title}</span>
                    </div>
                )
            }
        }
        return(
            <div className="account-content">
                <Link className='link' to={`/h5/user/changePassword`}>
                    <div className="item-block">
                        <div className="info">
                            <div>账号</div>
                            <div>{data.phone}</div>
                        </div>
                        <div className="icon">
                            <span>密码修改</span>
                            <span className="haloIcon haloIcon-more"></span>
                        </div>
                    </div>
                </Link>
                <div className="item-block">
                    <div className="info">
                        <div>昵称</div>
                        <div>{data.username}</div>
                    </div>
                </div>
                <div className="gap">我的收货地址</div>
                <Link className='link' to={`/h5/user/manageAddress`}>
                    <div className="item-block">
                        <div className="info">
                            <div><span className="name">{data.username}</span><span>{data.phone}</span></div>
                            {renderAddress()}
                        </div>
                        <div className="icon">
                            <span className="haloIcon haloIcon-more"></span>
                        </div>
                    </div>
                </Link>
                <div className="item-block out" onClick={handleOut}>退出</div>
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

export default ReactRedux.connect(mapStateToProps)(Account)