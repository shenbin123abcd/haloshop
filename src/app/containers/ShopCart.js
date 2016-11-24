import CommonHeader from './Common.header'
import {fetchShopCartifNeeded,chooseGoods,deleteGoods} from '../actions/cart'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
let Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var shopCart=React.createClass({
    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(fetchShopCartifNeeded("GET"));
    },
    handleChoose(e){
        const {dispatch}=this.props;
        dispatch(chooseGoods(e,3));
    },
    handleDelete(e){
        const {dispatch}=this.props;
        app.modal.confirm({
            title:'温馨提示',
            content:'是否要从购物车中删除该商品？',
            leftBtn:'确定',
            rightBtn:'取消'
        }).then((res)=>{
            app.ajax(`/api/cart/update?version=2`,{
                product_id:e.product_id,
                num:0,
            },'POST').then((res)=>{
                if(res.iRet==1){
                    dispatch(deleteGoods(e.product_id));
                }else{
                    app.modal.alert({
                        content:res.info,
                        btn:'知道了'
                    });
                }
            },(res)=>{
                app.modal.alert({
                    content:'网络繁忙稍后再试',
                    btn:'知道了'
                });
            })
        },()=>{

        })
    },
    handleChooseNum(e){
        const {dispatch}=this.props;
        app.ajax(`/api/cart/update?version=2`,e,'POST').then((res)=>{
            if(res.iRet==1){
                //dispatch(fetchShopCartifNeeded("GET"));
                dispatch(chooseGoods(e.product_id,3,e.num));
            }else{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                });
            }
        },(res)=>{
            app.modal.alert({
                content:res.info,
                btn:'知道了'
            });
        });
    },
    handleAllChooseBtn(e){
        const {dispatch}=this.props;
        //console.log(e)
        dispatch(chooseGoods(e.product_id,e.allChoose));
    },
    service(val){
        app.ajax(`/api/order/create?version=3`,{
            product_ids:val
        },'POST').then((res)=>{
            if(res.iRet==1){
                //跳转
                browserHistory.push(`/h5/pay_${res.data.order_id}`);
            }else{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                });
            }
        },(res)=>{
            app.modal.alert({
                content:'网络繁忙稍后再试',
                btn:'知道了'
            });
        })
    },
    handlePay(e){
        let param=hb.location.url("?product_id");
        let val='';
        if(param && e.length==0){
            val= param;
            this.service(val);
        }else{
            let sendData='';
            if(e.length==0){
                app.modal.alert({
                    content:'请选择要购买的商品',
                    btn:'知道了'
                });
            }else if(e.length>0){
                if(e.length==1){
                    sendData=e[0];
                }else{
                    sendData=e.join('|');
                }
                this.service(sendData);
            }
        }
    },
    handleBack(){
        browserHistory.push(`/h5/index`);
    },
    render(){
        const{shopChooseGoods}=this.props;
        let renderShopCart=()=>{
            if(shopChooseGoods.data==null){
                var isNull=true
            }else if(shopChooseGoods.data.limit.goods.length===0 && shopChooseGoods.data.open.goods.length===0){
                var isEmpty =true
            }
            if (isNull) {
                return <Loading key={1}/>
            }else if(isEmpty){
                return (
                    <div className="shopCart-content" key={2}>
                        <CommonHeader title="购物车" back={this.handleBack}></CommonHeader>
                        <div className="no-data-content">
                            <div className="pic haloIcon haloIcon-shopcart"></div>
                            <br/>
                            <div className="text">购物车暂无商品</div>
                        </div>
                    </div>
                )
            }else{
                let data=shopChooseGoods.data;
                //console.log(shopChooseGoods);
                return(
                    <div className="shopCart-content">
                        <CommonHeader title="购物车" back={this.handleBack}></CommonHeader>
                        <div className="shopCart-list">
                            <CartItem
                                data={data.limit}
                                limit={true}
                                handleChoose={this.handleChoose}
                                handleDelete={this.handleDelete}
                                handleChooseNum={this.handleChooseNum}
                                >
                            </CartItem>
                            <CartItem
                                data={data.open}
                                limit={false}
                                handleChoose={this.handleChoose}
                                handleDelete={this.handleDelete}
                                handleChooseNum={this.handleChooseNum}
                                >
                            </CartItem>
                        </div>
                        <BottomBtnGroup
                            data={data}
                            allData={shopChooseGoods}
                            handleAllChooseBtn={this.handleAllChooseBtn}
                            handlePay={this.handlePay}
                        >

                        </BottomBtnGroup>
                    </div>
                )
            }
        }
        return(
            <div className="shopCart-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderShopCart()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var CartItem=React.createClass({
    render(){
        let data=this.props.data;
        let limit=this.props.limit;
        let handleChoose=this.props.handleChoose;
        let handleDelete=this.props.handleDelete;
        let handleChooseNum=this.props.handleChooseNum;

        //console.log(data);
        let renderBtn=(bool,is_virtual,data)=>{
            let num=parseInt(data.num);
            let store_nums=parseInt(data.store_nums);
            if(limit || is_virtual){
                return(
                    <div></div>
                )
            }else{
                if(bool==true){
                    if(num==1){
                        return(
                            <div className="choose-num-btn">
                                <div className="square">-</div>
                                <div className="square border">{data.num}</div>
                                <div className="square" onClick={e=>handleChooseNum({product_id:data.product_id,num:num+1,})}>+</div>
                            </div>
                        )
                    }else if(store_nums==0){
                        return(
                            <div className="choose-num-btn">
                                <div className="square" onClick={e=>handleChooseNum({product_id:data.product_id,num:num-1,})}>-</div>
                                <div className="square border">{data.num}</div>
                                <div className="square">+</div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="choose-num-btn">
                                <div className="square" onClick={e=>handleChooseNum({product_id:data.product_id,num:num-1,})}>-</div>
                                <div className="square border">{data.num}</div>
                                <div className="square" onClick={e=>handleChooseNum({product_id:data.product_id,num:num+1,})}>+</div>
                            </div>
                        )
                    }

                }else if(bool==false){
                    return(
                        <div className="choose-num-btn">
                            <div className="square">-</div>
                            <div className="square border">{data.num}</div>
                            <div className="square">+</div>
                        </div>
                    )
                }
               
            }
        }
        let chooseStatus=(bool)=>{
            if(bool==false){
                return(
                    <div className="chooseBtn">
                        <span className="haloIcon haloIcon-ok"></span>
                    </div>
                )
            }else if(bool==true){
                return(
                    <div className="chooseBtn choosed">
                        <span className="haloIcon haloIcon-ok"></span>
                    </div>
                 )
            }
        }
        //console.log(data);
        if(data.goods.length){
            return(
                <div className="shopCart-item">
                    {
                        data.goods.map((n,i)=>{
                            //n.sell_total=parseInt(n.sell_total).toFixed(2);
                            //console.log(n);
                            let renderContent=(bool)=>{
                                return(
                                <div className="item-inner" >
                                    <div className="choose-block" onClick={e=>handleChoose(n.product_id)}>
                                        {chooseStatus(bool)}
                                        <div className="pic-block">
                                            <img src={n.cover} alt=""/>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                    <div className="info-block">
                                        <div className="line"></div>
                                        <div className="text-block">
                                            <div className="title">{n.name}</div>
                                            <div className="type">
                                                <Item data={n.spec}/>
                                            </div>
                                            {renderBtn(bool,n.is_virtual,n)}
                                            <div className="price">￥<span className="sell">{n.sell_price.split('.')[0]}</span>.{n.sell_price.split('.')[1]}</div>
                                            <div className="delete-btn" onClick={e=>handleDelete({product_id:n.product_id})}><span className="haloIcon haloIcon-delete"></span></div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                            if(n.choose==false){
                                return(
                                    <div className='click-block' key={i}>
                                    {renderContent(false)}
                                    </div>
                                )
                            }else if(n.choose==true){
                                return(
                                    <div className='click-block' key={i}>
                                        {renderContent(true)}
                                    </div>
                                )
                            }
                            
                        })
                    }
                </div>
            )
        }else{
            return(
                <div className="shopCart-item"></div>
            )
        }
    }
});

var Item=React.createClass({
    render(){
        let data=this.props.data;
        return(
            <div>
                {
                    data.map((n,i)=>{
                        return(
                            <div key={i}>{n.value}</div>
                        )
                    })
                }
            </div>
        )
    }
});

var BottomBtnGroup=React.createClass({
    render(){
        let data=this.props.data;
        let allData=this.props.allData;
        let handleAllChooseBtn=this.props.handleAllChooseBtn;
        let handlePay=this.props.handlePay;
        let num1,num2='';
        let totalNum=0;

        for(let key in data){
            if(data[key].goods.length>0){
                data[key].goods.forEach((n,i)=>{
                    if(n.choose==true){
                        //console.log(n.sell_total);
                        totalNum+=(n.sell_total);
                    }
                })
            }
        }

        //console.log(totalNum);
        totalNum=String(totalNum.toFixed(2));
        num1=totalNum.split('.')[0];
        num2=totalNum.split('.')[1];


        let allChooseBtn=()=>{
            if(allData.allChoose==2){
                return(
                    <div className="all-choose" onClick={e=>handleAllChooseBtn({product_id:'',allChoose:2,})}>
                        <div className="choose-circle">
                            <span className="haloIcon haloIcon-ok"></span>
                        </div>
                        <span className="text">全选</span>
                    </div>
                )
            }else{
                return(
                    <div className="all-choose" onClick={e=>handleAllChooseBtn({product_id:'',allChoose:1,})}>
                        <div className="choose-circle choose">
                            <span className="haloIcon haloIcon-ok"></span>
                        </div>
                        <span className="text">全选</span>
                    </div>
                )
            }
        }

        let showTotalNum=()=>{
            if(num2){
                return(
                    <span className="price">￥<span className="number">{num1}</span>.{num2}</span>
                )
            }else{
                return(
                    <span className="price">￥<span className="number">{num1}</span>.00</span>
                )
            }
        }

        return(
            <div className="bottom-btn-block">
                <div className="wrapper">
                    {allChooseBtn()}
                    <div className="pay-block">
                        <div className="pay-info">
                            <span className="text">实际付款：</span>
                            {showTotalNum()}
                        </div>
                        <div className="pay-btn" onClick={e=>handlePay(allData.chooseGoodsArray)}>去支付</div>
                    </div>
                </div>
            </div>
        )
    }
})



function mapStateToProps(state) {
    const {shopChooseGoods}=state;
    return {
        shopChooseGoods
    }
}

export default ReactRedux.connect(mapStateToProps)(shopCart)
