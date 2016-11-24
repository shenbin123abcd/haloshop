import Index from './containers/Index'
import Login from './containers/Login'
import Register from './containers/Register'
import ResetPwd from './containers/ResetPassword'
import Detail from './containers/Detail'
import User from './containers/User'
import ShopCart from './containers/ShopCart'
import Pay from './containers/Pay'
import PayChooseAddress from './containers/PayChooseAddress'
import Order from './containers/Order'
import Collect from './containers/Collect'
import Account from './containers/Account'
import ChangePassword from './containers/ChangePassword'
import ManageAddress from './containers/ManageAddress'
import CreateAddress from './containers/CreateAddress'
import PaySuccess from './containers/PaySuccess'
import UpdateAddress from './containers/UpdateAddress'
import About from './containers/About'
import Agreement from './containers/Agreement'
import Feedback from './containers/Feedback'
import MyCase from './containers/MyCase'
import HongBao from './containers/HongBao'


import store from './store'

var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Redirect=ReactRouter.Redirect;
var IndexRoute=ReactRouter.IndexRoute;
var browserHistory=ReactRouter.browserHistory;
var Provider=ReactRedux.Provider;




let reactElement = document.getElementById('root');


let bodyClass='';
let htmlClass='';


const onUpdateRoute = () => {
    let path=hb.location.url('path');
    switch (true){
        case path=='/h5':
        case path=='':
        case path=='/h5/index':
            htmlClass=`index-html`;
            bodyClass=`index-body`;
            app.wechat.init();
            break;
        case path=='/h5/login':
            htmlClass=`login-index`;
            bodyClass=`login-index`;
            app.wechat.init();
            break;
        case path=='/h5/register':
            htmlClass=`register-html`;
            bodyClass=`register-body header-bar-body`;
            app.wechat.init();
            break;
        case path=='/h5/resetpassword':
            htmlClass=`resetpassword-html`;
            bodyClass=`resetpassword-body header-bar-body`;
            app.wechat.init();
            break;
        case path=='/h5/shopCart':
            htmlClass=`shopCart-html`;
            bodyClass=`shopCart-body header-bar-body`;
            app.wechat.init();
            break;
        case path.indexOf('/h5/pay')>-1:
            htmlClass=`pay-html`;
            bodyClass=`pay-body header-bar-body`;
            app.wechat.init();
            break;
        case path=='/h5/user':
            htmlClass=`user-html`;
            bodyClass=`user-body header-bar-body`;
            app.wechat.init();
            break;
        case path.indexOf('/h5/user/order')>-1:
            htmlClass=`order-html`;
            bodyClass=`order-body header-bar-body`;
            app.wechat.init();
            break;
        case path.indexOf('/h5/detail_')>-1:
            htmlClass=`detail-html`;
            bodyClass=`detail-body`;

            break;
        case path=='/h5/about':
            htmlClass=`about-html`;
            bodyClass=`about-body header-bar-body`;
            app.wechat.init();
            break;
        case path=='/h5/about/feedback':
            htmlClass=`feedback-html`;
            bodyClass=`feedback-body header-bar-body`;
            app.wechat.init();
            break;
        case path=='/h5/about/agreement':
            htmlClass=`agreement-html`;
            bodyClass=`agreement-body header-bar-body`;
            app.wechat.init();
            break;
        case path.indexOf('/h5/myCase')>-1:
            htmlClass=`myCase-html`;
            bodyClass=`myCase-body header-bar-body`;
            app.wechat.init();
            break;
        case path.indexOf('/h5/hongbao')>-1:
            htmlClass=`hongbao-html`;
            bodyClass=`hongbao-body`;
          
            break;
        default:
            htmlClass=`user-html`;
            bodyClass=`user-body header-bar-body`;
            app.wechat.init();
            break;
    }
    $('html').addClass(htmlClass);
    $('body').addClass(bodyClass);
    
};
const onLeaveRoute = (prevState) => {
    $('html').removeClass(htmlClass);
    $('body').removeClass(bodyClass);
};


window.myApp = new Framework7({
    router: false,
});


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={onUpdateRoute}>
        <Redirect from="/" to="/rIndex" />
        <Redirect from="/h5/" to="/h5/index" />

        <Route path="/rIndex"  onEnter={e=>{window.location.href='/h5/index'}}  />
        <Route path="/h5/index" component={Index}   onLeave={onLeaveRoute}  />
        <Route path="/h5/detail_:id" component={Detail}   onLeave={onLeaveRoute}  />
        <Route path="/h5/login" component={Login}   onLeave={onLeaveRoute}  />
        <Route path="/h5/register" component={Register}   onLeave={onLeaveRoute}  />
        <Route path="/h5/resetpassword" component={ResetPwd}   onLeave={onLeaveRoute}  />
        <Route path="/h5/shopCart" component={ShopCart}   onLeave={onLeaveRoute}  />

        <Route path="/h5/pay_:id" component={Pay}   onLeave={onLeaveRoute}  />
        <Route path="/h5/pay/chooseAddress" component={PayChooseAddress}   onLeave={onLeaveRoute}  />

        <Route path="/h5/user" component={User}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/order" component={Order}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/collect" component={Collect}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/account" component={Account}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/changePassword" component={ChangePassword}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/manageAddress" component={ManageAddress}   onLeave={onLeaveRoute}  />
        <Route path="/h5/user/createAddress" component={CreateAddress}   onLeave={onLeaveRoute}  />

        <Route path="/h5/paySuccess" component={PaySuccess}   onLeave={onLeaveRoute}  />
        <Route path="/h5/updateAddress_:id" component={UpdateAddress}   onLeave={onLeaveRoute}  />

        <Route path="/h5/about" component={About}   onLeave={onLeaveRoute}  />
        <Route path="/h5/about/agreement" component={Agreement}   onLeave={onLeaveRoute}  />
        <Route path="/h5/about/feedback" component={Feedback}   onLeave={onLeaveRoute}  />

        <Route path="/h5/myCase" component={MyCase}   onLeave={onLeaveRoute}  />
        <Route path="/h5/hongbao" component={HongBao}   onLeave={onLeaveRoute}  />

        <Redirect from="*" to="/h5/index" />
    </Router>
  </Provider>,
    reactElement
);


