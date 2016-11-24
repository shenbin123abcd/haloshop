import CommonHeader from './Common.header'
import RegionSelect from './Common.RegionSelect'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;

var CreateAddress=React.createClass({
    componentDidMount(){

    },
    formService(data){
        //console.log(data);
        var deferred=$.Deferred();
        let token=hb.Cookies.getJSON('hb_shop_token');
        switch(true){
            case !data.name:
                deferred.reject('请输入姓名');
                break;
            case !data.mobile:
                deferred.reject('手机号');
                break;
            case !hb.validation.checkPhone(data.mobile):
                deferred.reject('请输入正确的手机号');
                break;
            case !data.province:
                deferred.reject('请选择省份');
                break;
            case !data.city:
                deferred.reject('请选择城市');
                break;
            case !data.county:
                deferred.reject('请选择区/县');
                break;
            case !data.address:
                deferred.reject('请填写详细地址');
                break;
            default:
                sendXHR();
        }
        function sendXHR(){
            $.ajax({
                url: "/api/address/create",
                data: data,
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
        let array=this.refs.region.val();
        if(array==undefined){
            if(e.name && e.mobile && e.address){
                app.modal.alert({
                    content:'请选择省市区',
                    btn:'知道了'
                });
            }else if(!e.name){
                app.modal.alert({
                    content:'请填写姓名',
                    btn:'知道了'
                });
            }else if(!e.mobile){
                app.modal.alert({
                    content:'请填写手机号码',
                    btn:'知道了'
                });
            }else if(!hb.validation.checkPhone(e.mobile)){
                app.modal.alert({
                    content:'请填写正确的手机号码',
                    btn:'知道了'
                });
            }else if(!e.address){
                app.modal.alert({
                    content:'请填写收货地址',
                    btn:'知道了'
                });
            }
        }else{
            let val=_.assign({},e,{
                province:array[0] ||'',
                city:array[1] ||'',
                county:array[2] ||'',
            });
            this.formService(val).then((res)=>{
                let param=hb.location.url("?");
                if(param){
                    hb.lib.weui.toast('新增成功');
                    setTimeout(()=>{
                        browserHistory.push(`/h5/pay/chooseAddress?order_id=${param.order_id}`);
                    },200);
                }else{
                    hb.lib.weui.toast('新增成功');
                    setTimeout(()=>{
                        browserHistory.push('/h5/user/manageAddress');
                    },200)
                }
            },(res)=>{
                app.modal.alert({
                    content:res,
                    btn:'知道了'
                })
            });
        }

    },
    render(){
        return(
            <div className="createAddress-page">
                <CommonHeader title="新增收货地址"></CommonHeader>
                <div className="createAddress-block">
                    <div className="person-info">
                        <div className="title">个人信息</div>
                        <div className="form-list">
                            <div className="input-wrapper">
                                <div className="label-text">收件人名：</div>
                                <input type="text" className="form-control input-style" ref="name"/>
                                <div className="line"></div>
                            </div>
                            <div className="input-wrapper">
                                <div className="label-text">手机号码：</div>
                                <input type="text" className="form-control input-style" ref="mobile"/>
                            </div>
                        </div>
                    </div>
                    <div className="address-info">
                        <div className="title">收货地址</div>
                        <div className="form-list">
                            <div className="input-wrapper">
                                <div className="label-text">请选择所属地区：</div>
                                <RegionSelect name="areaCode" ref="region" className="region-control" />
                                <div className="line"></div>
                            </div>
                            <div className="input-wrapper">
                                <div className="label-text">街道地址：</div>
                                <input type="text" className="form-control input-style" ref='address' placeholder="街道编号、名称，楼宇地址"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-center-btn" onClick={e=>this.handleSubmit({
                    name:$(this.refs.name).val(),
                    mobile:$(this.refs.mobile).val(),
                    address:$(this.refs.address).val(),
                })}>
                    <div className="center-btn">确认</div>
                </div>
            </div>
        )
    }
});


function mapStateToProps(state) {
    const {}=state;
    return {
    }
}

export default ReactRedux.connect(mapStateToProps)(CreateAddress)
