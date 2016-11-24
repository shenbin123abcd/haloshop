import CommonHeader from './Common.header'
import ResetPwdForm from './ResetPassword.Form'
var browserHistory=ReactRouter.browserHistory;
var reset = ReduxForm.reset;

var ResetPwd = React.createClass({
    componentDidMount() {

    },
    handleSubmit(values) {
        const {dispatch} = this.props
        var data=values;
        // console.log(data);
        switch(true){
            case !data.phone:
                hb.lib.weui.alert('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                hb.lib.weui.alert('请输入正确的手机号');
                break;
            case !data.code:
                hb.lib.weui.alert('请输入短信验证码');
                break;
            case !data.password:
                hb.lib.weui.alert('请输入密码');
                break;
            case data.rePassword!=data.password:
                hb.lib.weui.alert('您两次输入的密码不一致');
                break;
            default:
                data=_.omit(data, ['rePassword']);
                $.ajax({
                    url: "/api/public/forget?version=2",
                    data: data,
                    method:"POST",
                    success:function(res){
                        //app.modal.loading.hide();
                        if(res.iRet==1){
                            hb.lib.weui.alert({
                                content:res.info,
                                btn:'确定'
                            }).then((res)=>{
                                browserHistory.push('/h5/login')
                            });
                        }else{
                            hb.lib.weui.alert(res.info);
                        }
                    },
                    error:function(error){
                        //app.modal.loading.hide();
                        hb.lib.weui.alert('网络繁忙请稍候再试');
                    }
                })
        }
    },
    render: function() {
        // console.log(this.props)
        return (
            <div className="register-wrapper">
                <CommonHeader title='忘记密码'></CommonHeader>
                <ResetPwdForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
});



// export default Index
function mapStateToProps(state) {
    return {

    }
}


export default ReactRedux.connect(mapStateToProps)(ResetPwd)