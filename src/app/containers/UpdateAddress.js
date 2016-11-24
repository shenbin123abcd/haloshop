import CommonHeader from './Common.header'
import {fetchAccountListIfNeeded} from '../actions/account'
import RegionSelect from './Common.RegionSelect'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var UpdateAddress=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchAccountListIfNeeded());
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
                    content:'请填写详细地址',
                    btn:'知道了'
                });
            }
        }else{
            let val=_.assign({},e,{
                province:array[0] ||'',
                city:array[1] ||'',
                county:array[2] ||'',
            });
            let obj=hb.location.url('?');
            this.formService(val).then((res)=>{
                if(obj && obj.from=='pay'){
                    hb.lib.weui.toast('修改成功');
                    setTimeout(()=>{
                        browserHistory.push(`/h5/pay/chooseAddress?order_id=${obj.order_id}`);
                    },200);

                }else{
                    hb.lib.weui.toast('修改成功');
                    setTimeout(()=>{
                        browserHistory.push('/h5/user/manageAddress');
                    },200);
                }
            },(res)=>{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                })
            });
        }
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
                url: "/api/address/update",
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
                    deferred.reject('网络繁忙请稍候再试');
                }
            });
        }
        return deferred.promise();
    },
    handleDelete(e){
        app.modal.confirm({
            title:'温馨提示',
            content:'确定删除该收货地址？',
            leftBtn:'确定',
            rightBtn:'取消'
        }).then(()=>{
            app.ajax(`/api/address/delete`,e,'POST').then((res)=>{
                if(res.iRet==1){
                    let obj=hb.location.url('?');
                    if(obj && obj.from=='pay'){
                        setTimeout(()=>{
                            browserHistory.push(`/h5/pay/chooseAddress?order_id=${obj.order_id}`);
                        },300)
                    }else{
                        setTimeout(()=>{
                            browserHistory.push('/h5/user/manageAddress');
                        },300);
                    }
                }else{
                    setTimeout(()=>{
                        app.modal.alert({
                            content:res.info,
                            btn:'知道了'
                        });
                    },300);
                }
            },(res)=>{
                setTimeout(()=>{
                    app.modal.alert({
                        content:'网络繁忙稍后再试',
                        btn:'知道了'
                    });
                },300);
            })
        })

    },

    render(){
        let {accountData,routeParams}=this.props;
        let renderPage=()=>{
            if(!accountData.data){
                var isNull=true
            }else if(accountData.data.length===0){
                var isEmpty =true
            }

            if (accountData.isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                let data=accountData.data;
                let obj={};
                data.forEach((n,i)=>{
                    if(n.id==routeParams.id){
                        obj=n;
                    }
                });
                return(
                    <div className="updateAddress-page">
                        <CommonHeader title="修改收货地址"></CommonHeader>
                        <div className="createAddress-block">
                            <div className="person-info">
                                <div className="title">个人信息</div>
                                <div className="form-list">
                                    <div className="input-wrapper">
                                        <div className="label-text">收件人名：</div>
                                        <input
                                            type="text"
                                            className="form-control input-style"
                                            ref="name"
                                            defaultValue={obj.name}
                                        />
                                        <div className="line"></div>
                                    </div>
                                    <div className="input-wrapper">
                                        <div className="label-text">手机号码：</div>
                                        <input
                                            type="text"
                                            className="form-control input-style"
                                            ref="mobile"
                                            defaultValue={obj.mobile}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="address-info">
                                <div className="title">收货地址</div>
                                <div className="form-list">
                                    <div className="input-wrapper">
                                        <div className="label-text">请选择所属地区：</div>
                                        <RegionSelect name="areaCode" value={{
                                        ids:[obj.province,obj.city,obj.county],
                                        names:[obj.province_title,obj.city_title,obj.county_title],
                                        }} ref="region"  className="region-control"  />
                                        <div className="line"></div>
                                    </div>
                                    <div className="input-wrapper">
                                        <div className="label-text">街道地址：</div>
                                        <input
                                            type="text"
                                            className="form-control input-style"
                                            ref='address'
                                            placeholder="街道编号、名称，楼宇地址"
                                            defaultValue={obj.address}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-center-btn" onClick={e=>this.handleSubmit({
                            name:$(this.refs.name).val(),
                            mobile:$(this.refs.mobile).val(),
                            address:$(this.refs.address).val(),
                            id:obj.id,
                        })}>
                            <div className="center-btn">确认</div>
                        </div>

                        <div className="delete-btn" onClick={e=>this.handleDelete({id:obj.id})}>
                            <span className="haloIcon haloIcon-clear"></span>
                            <span className="p">删除</span>
                        </div>
                    </div>
                )
            }
        }

        return(
            <div>
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderPage()}
                </CSSTransitionGroup>
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

export default ReactRedux.connect(mapStateToProps)(UpdateAddress)
