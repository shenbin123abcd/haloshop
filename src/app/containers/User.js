import CommonHeader from './Common.header'
import {fetchUserItemsIfNeeded} from '../actions/user'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var User=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        $('body').removeClass('collect');
        dispatch(fetchUserItemsIfNeeded());
    },
    handleBack(){
        browserHistory.push('/h5/index');
    },
    render(){
        let token=hb.Cookies.getJSON('hb_shop_token');
        let user=hb.Cookies.getJSON('hb_shop_user').user;
        if(!token){
            window.location.href='/h5/login';
        }
        let data1=[
            {
                icon:'haloIcon haloIcon-dingdan icon ',
                name:'我的订单',
                link:'/h5/user/order',
            },
            {
                icon:'haloIcon haloIcon-anli icon',
                name:'我的案例',
                link:'/h5/myCase',
            },
            {
                icon:'haloIcon haloIcon-collection icon',
                name:'我的收藏',
                link:'/h5/user/collect',
            },
        ];
        let data2=[
            {
                icon:'haloIcon haloIcon-puser icon ',
                name:'个人账号',
                link:'/h5/user/account',
            },
        ];
        let data3=[
            {
                icon:'haloIcon haloIcon-about icon ',
                name:'关于我们',
                link:'/h5/about',
            },
        ]

        let {userData}=this.props;

        let userPage=()=>{
            if(!userData.data){
                var isNull=true
            }else if(userData.data.length==0){
                var isEmpty =true
            }     

            if (userData.isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                return(
                    <div className="page-wrapper" style={{paddingBottom:'.3rem'}}>
                        <CommonHeader title="我的" back={this.handleBack}></CommonHeader>
                        <UserHeader data={user} num={userData.data}></UserHeader>
                        <UserContent data={data1}></UserContent>
                        <UserContent data={data2}></UserContent>
                        <UserContent data={data3}></UserContent>
                    </div>
                )
            }
        }    
        return(
            <div className="user-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {userPage()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var UserHeader=React.createClass({
    render(){
        let data=this.props.data;
        let num=this.props.num;
        let renderNum=(num)=>{
            if(!num || num==0){
                return(
                    <div></div>
                )
            }else{
                if(num<100){
                    return(
                        <div className="circle">{num}</div>
                    )
                }else{
                    return(
                        <div className="circle" style={{fontSize:'.14rem',lineHeight:'.3rem'}}>99+</div>
                    )
                }

            }
        }
        return(
            <div className="user-header">
                <div className="avatar-block">
                    <div className="avatar">
                        <img src={data.avatar} alt=""/>
                    </div>
                    <div className="name">{data.username}</div>
                    <div className="line"></div>
                </div>
                <div className="choose-block">
                    <Link to={'/h5/user/order?type=1'} className="item">
                        <div className="icon">
                            {renderNum(num.pay)}
                            <span className="haloIcon haloIcon-daifukuan"></span>
                        </div>
                        <div className="text">待付款</div>
                        <div className="line"></div>
                    </Link>
                    <Link to={'/h5/user/order?type=2'} className="item">
                        <div className="icon">
                            {renderNum(num.send)}
                            <span className="haloIcon haloIcon-daifahuo "></span>
                        </div>
                        <div className="text">待发货</div>
                        <div className="line"></div>
                    </Link>
                    <Link to={'/h5/user/order?type=3'} className="item">
                        <div className="icon">
                            {renderNum(num.receive)}
                            <span className="haloIcon haloIcon-daishouhuo "></span>
                        </div>
                        <div className="text">待收货</div>
                    </Link>
                </div>
            </div>
        )
    }
});

var UserContent=React.createClass({
    render(){
        let data=this.props.data;
        //console.log(data);
        return(
            <div className="user-order">
                {
                    data.map((n,i)=>{
                        return(
                            <Link to={n.link} className="link" key={i}>
                                <div className="item" key={i}>
                                    <span className={n.icon}></span>
                                    <div className="text">{n.name}</div>
                                    <div className="icon-rrow ">
                                        <span className="haloIcon haloIcon-more"></span>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
});




function mapStateToProps(state) {
    const {userData}=state;
    return {
        userData,
    }
}

export default ReactRedux.connect(mapStateToProps)(User)
