import CommonHeader from './Common.header'

var browserHistory=ReactRouter.browserHistory;
var ChangePassword=React.createClass({
    componentDidMount(){

    },
    formService(data){
        //console.log(data);
        var deferred=$.Deferred();
        let token=hb.Cookies.getJSON('hb_shop_token');
        switch(true){
            case !data.password:
                deferred.reject('请输入当前密码');
                break;
            case !data.new_password:
                deferred.reject('请输入新密码');
                break;
            case !data.again_new_password:
                deferred.reject('请确认密码');
                break;
            case data.again_new_password!=data.new_password:
                deferred.reject('两次密码输入不一致');
                break;
            case data.new_password==data.password:
                deferred.reject('新密码和旧密码一致');
                break;
            default:
                sendXHR();
        }
        function sendXHR(){
            $.ajax({
                url: "/api/user/editPassword?version=2",
                data: {
                    password:data.password,
                    new_password:data.new_password,
                },
                headers:{Authorization:`Bearer ${token}`},
                method:"POST",
                success:function(res){
                    //app.modal.loading.hide();
                    if(res.iRet==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error:function(error){
                    //app.modal.loading.hide();
                    deferred.reject('网络繁忙请稍候再试');
                }
            });
        }
        return deferred.promise();
    },
    handleSubmit(e){
        this.formService(e).then((res)=>{
            hb.lib.weui.toast('新增成功');
            setTimeout(()=>{
                browserHistory.push('/h5/user/account');
            },200);
        },(res)=>{
            app.modal.alert({
                content:res,
                btn:'知道了'
            })
        });
    },
    handleBack(){
        browserHistory.push('/user/account');
    },
    render(){
        return(
            <div className="psd-page">
                <CommonHeader title="修改密码" back={this.handleBack}></CommonHeader>
                <ContentBlock handleSubmit={this.handleSubmit}></ContentBlock>
            </div>
        )
    }
});

var ContentBlock=React.createClass({
    render(){
        let handleSubmit=this.props.handleSubmit;
        return(
            <div>
                <div className="content-form">
                    <div className="wrapper">
                        <div className="line"></div>
                        <input type="password" className="input-style" ref='password' placeholder="请输入当前密码"/>
                    </div>
                    <div className="wrapper">
                        <div className="line"></div>
                        <input type="password" className="input-style" ref='new_password' placeholder="请输入新密码"/>
                    </div>
                    <div className="wrapper">
                        <input type="password" className="input-style" ref='again_new_password' placeholder="请确认新密码"/>
                    </div>
                </div>
                <div className="complete-btn" onClick={e=>handleSubmit({
                    password:$(this.refs.password).val(),
                    new_password:$(this.refs.new_password).val(),
                    again_new_password:$(this.refs.again_new_password).val(),
                })}>完成</div>
            </div>
        )
    }
})

function mapStateToProps(state) {
    const {}=state;
    return {

    }
}

export default ReactRedux.connect(mapStateToProps)(ChangePassword)