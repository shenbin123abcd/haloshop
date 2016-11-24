import CommonHeader from './Common.header'
import RegForm from './Register.Form'
var browserHistory=ReactRouter.browserHistory;
var reset = ReduxForm.reset;

var Reg = React.createClass({
    componentDidMount() {

    },
    handleSubmit(values) {
        const {dispatch} = this.props
        var data=values;
        if(data.areaCode){
            let arr=data.areaCode.split(' ')
            data.province=arr[0]
            data.city=arr[1]
            data.country=arr[2]
        }
        data=_.omit(data, ['areaCode']);
        // console.log(data)
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
            case !data.province||!data.city||!data.country:
                hb.lib.weui.alert('请完整选择地区');
                break;
            case !data.company:
                hb.lib.weui.alert('请输入公司名');
                break;
            case !data.address:
                hb.lib.weui.alert('请输入公司地址');
                break;
            case !data.username:
                hb.lib.weui.alert('请输入用户名');
                break;
            default:
                $.ajax({
                    url: "/api/public/register?version=2",
                    data: data,
                    method:"POST",
                    success:function(res){
                        //app.modal.loading.hide();
                        if(res.iRet==1){
                            app.modal.alert({
                                content:res.info,
                                btn:'知道了'
                            }).then((res)=>{
                                dispatch(reset('regForm'))
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
                <CommonHeader title='注册'></CommonHeader>
                <RegForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
});



// export default Index
function mapStateToProps(state) {
    return {

    }
}


export default ReactRedux.connect(mapStateToProps)(Reg)