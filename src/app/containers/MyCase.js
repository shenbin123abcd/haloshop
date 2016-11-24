import {fetchMyCaseListIfNeeded} from '../actions/myCase'
import CommonHeader from './Common.header'
import Loading from '../components/common.loading'
import LazyLoad from 'react-lazyload';

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var MyCase=React.createClass({
    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchMyCaseListIfNeeded());
    },
    handleBack(){
        browserHistory.push(`/h5/user`);
    },
    handleMaking(e,val){
        e.preventDefault();
        app.modal.alert({
            content:`《${val}》正在制作中，请耐心等待！`,
            btn:'知道了'
        })
    },
    payService(data){
        app.ajax(`/api/upgrade/pay?version=2`,data,'POST').then((res)=>{
            if(res.iRet==1){
                pingpp.createPayment(res.data.sign, function(result, err){
                    $('body').css({
                        'overflow':'visible',
                    });
                    if (result=="success") {
                        browserHistory.push(`/h5/user/myCase?type=d3`);
                    }else{
                        app.modal.alert({
                            content:`支付失败 ${err.msg}`,
                            btn:'知道了'
                        });
                    }
                });
            }else{
                $('body').css({
                    'overflow':'visible',
                });
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                })
            }
        },(res)=>{
            $('body').css({
                'overflow':'visible',
            });
            app.modal.alert({
                content:'网络繁忙稍后再试',
                btn:'知道了'
            })
        })
    },
    handleUpdate(e,name,id){
        e.preventDefault();
        app.modal.confirm({
            title:'百元享受3D体验',
            content:`确认要把《${name}》案例升级成高级款吗？`,
            leftBtn:'稍等片刻',
            rightBtn:'支付100元'
        }).then(()=>{

        },()=>{
            let _this=this;
            $('body').css({
                'overflow':'hidden',
            })
                let buttons1=[];
                if(Modernizr.weixin){
                    buttons1 = [
                        {
                            text: '微信',
                            onClick:()=>{

                                let openid=hb.Cookies.getJSON("hb_shop_openId");
                                _this.payService({
                                    type:4,
                                    goods_id:id,
                                    openid,
                                });
                            }
                        },
                    ];
                }else{
                    buttons1 = [
                        {
                            text: '支付宝',
                            onClick:()=>{
                                _this.payService({
                                    type:3,
                                    goods_id:id,
                                });
                            }
                        },
                    ];
                }

                let buttons2 = [
                    {
                        text: '取消',
                        color: 'red',
                        onClick:()=>{
                            $('body').css({
                                'overflow':'visible',
                            });
                        }
                    }
                ];

                let groups = [buttons1, buttons2];
                myApp.actions(groups);
        })
    },
    render(){
        let {isFetching,data}=this.props;
        let renderOrder=()=>{
            if(!data){
                var isNull=true
            }else if(!data.d3 || !data.nd3){
                var isEmpty =true
            }

            if (isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                return(
                    <div>no data</div>
                )
            }else{
                //console.log(data);
                let val='';
                let type=''
                let param=hb.location.url('?type');
                if(!param || param=='nd3'){
                    val=data.nd3;
                    type='nd3';
                }else{
                    val=data.d3;
                    type='d3';
                }

                return(
                    <div className="myCase-wrapper">
                        <CommonHeader
                            title="我的案例"
                            back={this.handleBack}
                        >
                        </CommonHeader>
                        <MyCaseTab
                            type={type}
                        >
                        </MyCaseTab>
                        <MyCaseContent
                            data={val}
                            type={type}
                            handleMaking={this.handleMaking}
                            handleUpdate={this.handleUpdate}
                        >
                        </MyCaseContent>
                    </div>
                )
            }
        }
        return(
            <div className="myCase-page">
                {renderOrder()}
            </div>
        )
    }
});

var MyCaseTab=React.createClass({
    render(){
        let type=this.props.type;
        let nd3Style,d3Style='';
        if(type=='nd3'){
            nd3Style='nd3 active';
            d3Style='d3'
        }else{
            nd3Style='nd3';
            d3Style='d3 active'
        }
        return(
            <div className="tab-block">
                <Link className={nd3Style} to={`/h5/myCase?type=nd3`}>
                    <div>专业款</div>
                    <div className="line"></div>
                </Link>
                <Link className={d3Style} to={`/h5/myCase?type=d3`}>
                    <div>高级款</div>
                    <div className="line"></div>
                </Link>
                <div className="line"></div>
                <div className="line-top"></div>
            </div>
        )
    }
})

var MyCaseContent=React.createClass({
    render(){
        let data=this.props.data;
        let type=this.props.type;
        let handleMaking=this.props.handleMaking;
        let handleUpdate=this.props.handleUpdate;
        //console.log(data);
        if(data.length==0){
            return(
                <div className="no-data-wrapper">
                    <div className="haloIcon haloIcon-wuanli"></div>
                    <div className="text">
                        <div>还未购买案例哦</div>
                        <div>赶紧去挑选一款吧</div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="content-block">
                    {
                        data.map((n,i)=>{
                            let renderUpdate=()=>{
                                if(n.update==0){
                                    return(
                                        <div className="tag-block" onClick={(e,val)=>handleMaking(e,n.name)}>
                                            制作中
                                        </div>
                                    )
                                }else if(n.update==1){
                                    return(
                                        <div className="tag-block" onClick={(e,name,id)=>handleUpdate(e,n.name,n.id)}>
                                            升级
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div></div>
                                    )
                                }
                            }
                            return(
                                <Link style={{display:'block'}} to={`/h5/detail_${n.id}`} key={i}>
                                    <div className="case-item">
                                        <div className="line"></div>
                                        <div className="left-block">
                                            <div className="wrapper">
                                                <img src={n.cover} alt=""/>
                                            </div>
                                        </div>
                                        <div className="right-block">
                                            <div className="title">{n.name}</div>
                                            <div className="subtitle">{n.subtitle}</div>
                                            {renderUpdate()}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            )
        }

    }
})

function mapStateToProps(state) {
    const {caseData}=state;
    let {isFetching,data}=caseData;
    return {
        isFetching,
        data,
    }
}

export default ReactRedux.connect(mapStateToProps)(MyCase)



