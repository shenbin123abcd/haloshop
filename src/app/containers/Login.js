import shopLogo from '../images/shop_logo.png'

var browserHistory=ReactRouter.browserHistory;
let Link=ReactRouter.Link;

var Login = React.createClass({
    componentDidMount() {

    },
    loginInfo(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.phone:
                deferred.reject('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('请输入正确的手机号');
                break;
            case !data.password:
                deferred.reject('请输入密码');
                break;
        }
        app.modal.loading.show();
        sendXHR();
        function sendXHR(){
            $.ajax({
                url: "/api/public/login",
                data: data,
                method:"POST",
                success:function(res){
                    app.modal.loading.hide();
                    if(res.iRet==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error:function(error){
                    app.modal.loading.hide();
                    deferred.reject('网络繁忙请稍候再试');
                }
            })
        }
        return deferred.promise();
    },
    submitHandle(data){
        this.loginInfo(data).then((data)=>{
            hb.Cookies.set('hb_shop_token',data.token);
            hb.Cookies.set('hb_shop_user',data);
            browserHistory.push('/h5/index');
        },(data)=>{
            app.modal.alert({
                content:data,
                btn:'知道了'
            })
        });
    },
    render: function() {
        return (
            <div className="login-wrapper">
                <Header></Header>
                <FormBlock submitHandle={this.submitHandle}></FormBlock>
            </div>
        );
    }
});

var Header=React.createClass({
    render(){
        return(
            <div className="login-header">
                <img src={shopLogo} alt=""/>
            </div>
        )
    }
})
var FormBlock=React.createClass({
    render(){
        let submitHandle=this.props.submitHandle;
        return(
            <div className="login-form-block">
                <form>
                    <div className="input-wrapper">
                        <div className="bottom-line"></div>
                        <div className='icon-wrapper'>
                            <span className="haloIcon haloIcon-phone" style={{color:'#999999',fontSize:'18px'}}></span>
                            <span className="inner-line"></span>
                        </div>
                        <input type="text" placeholder="幻熊通行证（手机号）" className="form-control input-style" ref='phone'/>
                    </div>
                    <div className="input-wrapper">
                        <div className="bottom-line"></div>
                        <div className='icon-wrapper'>
                            <span className="haloIcon haloIcon-1111131" style={{color:'#999999',fontSize:'18px'}}></span>
                            <span className="inner-line"></span>
                        </div>
                        <input type="password" placeholder="密码" className="form-control input-style" ref='password'/>
                    </div>
                    <button type="button" className="submit-btn" onClick={e=>submitHandle({
                        phone:ReactDOM.findDOMNode(this.refs.phone).value,
                        password:ReactDOM.findDOMNode(this.refs.password).value,
                        from:'web',
                    })}>登 录</button>
                    <div className="bottom-btn-group">
                        <Link to={'/h5/register'}><span className="register">立即注册</span></Link>
                        <span className="padding-line">|</span>
                        <Link to={'/h5/resetpassword'}><span className="forget-pass">忘记密码</span></Link>
                    </div>
                </form>
            </div>
        )
    }
})

// export default Index
function mapStateToProps(state) {
    return {

    }
}

export default ReactRedux.connect(mapStateToProps)(Login)