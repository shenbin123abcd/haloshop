import {fetchIndexIfNeeded} from '../actions/index'
import Footer from './HongBao.footer'
var hashHistory=ReactRouter.hashHistory;
var browserHistory=ReactRouter.browserHistory;
let Link=ReactRouter.Link;


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.openId=hb.Cookies.get('c_hongbao_openid');
        var c_phone=hb.store.get('c_hongbao_phone');
        this.state = {
            data: {},
            step: c_phone?2:1,
        };
    }
    componentWillMount(){
        const { dispatch,location } = this.props;
        // console.log(hb.location.url('?openid'))
        // hb.store.set('c_hongbao_phone',13123456789);
        app.wechat.init({
            title: '最高500元代金券，还不来抢？',
            content: '幻熊工程服务倾情奉上！极致搭建体验，立刻畅享！',
            link : window.location.href,
            logo:'http://7xkkfd.com1.z0.glb.clouddn.com/shop_share.png?imageView2/1/w/200/h/200',
        });
        
        if(hb.location.url('?openid')){
            hb.Cookies.set('c_hongbao_openid',hb.location.url('?openid'),{expires:365})
        }
        this.openId=hb.Cookies.get('c_hongbao_openid');
        if(!this.openId){
            window.location.href="http://wechat.halobear.com/shop/coupon";
            return
        }
        if(hb.location.url('?phone')){
            hb.store.set('c_hongbao_phone',hb.location.url('?phone'));
        }
        var c_phone=hb.store.get('c_hongbao_phone');
        if(c_phone){
            hb.lib.weui.loading.show();
            $.ajax(`/api/public/queryCoupon?version=3&sn=${hb.location.url('?sn')}&phone=${hb.store.get('c_hongbao_phone')}`).then(res=>{
                hb.lib.weui.loading.hide();
                if(res.iRet==1){

                    res.data.price=res.data.price.split('.')[0];

                    this.setState({
                        step:2,
                        data:res.data,
                    });
                }
            },res=>{
                hb.lib.weui.loading.hide();
                hb.lib.weui.alert('网络繁忙请稍候再试')
            })
        }

    }
    componentDidMount(){
        // console.log(this);
        // const { dispatch,location } = this.props;
        // dispatch(fetchIndexIfNeeded({
        //     id:location.query.id
        // }));
    }
    componentDidUpdate(){
        const { dispatch,location } = this.props;
        // console.log('componentDidUpdate')
    }
    componentWillUnmount(){
        // app.wechat.init();
    }
    getCoupon(event){
        event.preventDefault();
        // console.log(this);
        var phone=this.refs.phone.value;
        var data={
            sn:hb.location.url('?sn'),
            phone:phone,
            openid:hb.Cookies.get('c_hongbao_openid'),
        };
        // console.log(data)

        switch(true) {
            case !data.phone:
                hb.lib.weui.alert('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                hb.lib.weui.alert('请输入正确的手机号');
                break;
            default:
                hb.store.set('c_hongbao_phone',data.phone);
                hb.lib.weui.loading.show();
                $.ajax({
                    type:'POST',
                    url:'/api/public/getCoupon?version=3',
                    data:data,
                    dataType:'json',
                }).then(res=>{
                    hb.lib.weui.loading.hide();
                    if(res.iRet==1){
                        hb.lib.weui.loading.show();
                        return $.ajax(`/api/public/queryCoupon?version=3&sn=${hb.location.url('?sn')}&phone=${hb.store.get('c_hongbao_phone')}`);
                    }else{
                        hb.lib.weui.alert(res.info);
                    }
                },res=>{
                    hb.lib.weui.loading.hide();
                    hb.lib.weui.alert('网络繁忙请稍候再试')
                }).then(res=>{
                    hb.lib.weui.loading.hide();
                    if(res.iRet==1){
                        res.data.price=res.data.price.split('.')[0];
                        this.setState({
                            step:2,
                            data:res.data,
                        });
                    }else{
                        hb.lib.weui.alert(res.info);
                    }
                })
        }

    }
    edit() {
        hb.store.remove('c_hongbao_phone');
        this.setState({
            step:1,
        });

    }
    useCoupon(e) {
        if(Modernizr.weixin){
            e.preventDefault();

            let newUrl=`${window.location.href}`;

            if(!hb.location.url('?openid')){
                newUrl=`${newUrl}&openid=${hb.Cookies.get('c_hongbao_openid')}`
            }
            if(!hb.location.url('?phone')){
                newUrl=`${newUrl}&phone=${hb.store.get('c_hongbao_phone')}`
            }
            window.history.pushState({},'',`${newUrl}`)
            hb.lib.weui.guideDownload.show();
        }
    }
    renderMiddle(){
        const { dispatch,location } = this.props;
        var dom=null;
        if(this.state.step==1){
            dom= (
                <form className="middle-box step-1" onSubmit={e=>{this.getCoupon(e)}}>
                    <div className="step-1-title">输入手机号领取代金券</div>
                    <input ref="phone" type="number" className="input" placeholder="请输入手机号" />

                    <button type="submit" className="bt step-1-bt">马上领取</button>

                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.halobear.shop" className="step-1-link">
                        下载幻熊商城App
                    </a>


                </form>
            )
        }else if(this.state.step==2){
            var data=this.state.data;
            dom= (
                <div className="middle-box step-2">
                    <div className="coupon-box">
                        <div className="price">
                            <span className="rmb">¥</span><span className="num">{data.price}</span>
                        </div>
                        <div className="des">
                            <div className="title">{data.title}</div>
                            <div className="limit_price">·满{data.limit_price}元可用</div>
                            <div className="end_date">·{data.end_date}到期</div>
                        </div>
                    </div>


                    <div className="info">
                        代金券已放至
                        <span className="phone">{hb.store.get('c_hongbao_phone')}</span>
                        <span className="edit" onClick={e=>{this.edit(e)}}>修改&gt;</span>
                    </div>

                    <a href="haloshop://halobear.com" onClick={e=>{this.useCoupon(e)}} className="bt step-2-bt">
                        立即使用
                    </a>
                </div>
            )
        }

        return dom
    }
    render() {
        const { dispatch,location,indexData } = this.props;
        // console.log(indexData)

        return (
            <div className="hongbao-wrapper">
                <div className="top-box">
                    <img className="img" src={require('../images/hongbao/hongbao-top.png')} alt="" />
                </div>

                {this.renderMiddle()}

                <Footer />
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {}=state;
    return {
        // indexData,
    }
}

export default ReactRedux.connect(mapStateToProps)(Index)


