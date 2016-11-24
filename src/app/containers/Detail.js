import {
    fetchShopDetailIfNeeded,
    sendFavorStatus,
    videoPlay,
    detailModal,
    chooseGoods,
    chooseNum,
    detailInitial,
} from '../actions/detail'
import {fetchCommonCartifNeeded} from '../actions/commonHeader'
import is_favor from '../images/is_favor.png'
import no_favor from '../images/no_favor.png'
import quanan_Pic from '../images/quanan.png'
import dajian_Pic from '../images/dajian.png'
import vr from '../images/vr.png'
import vr_out from '../images/vr_out.png'
import DetailModal from '../components/detail.modal'
import CommonHeader from './Common.header'
import HeaderShopCart from '../components/commonHeader.shopCart'
import Loading from '../components/common.loading'
import quanan2 from '../images/quanan2.png'


var Link=ReactRouter.Link;
var browserHistory=ReactRouter.browserHistory;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Detail= React.createClass({
    componentDidMount(){
        const { dispatch,routeParams } = this.props
        dispatch(fetchShopDetailIfNeeded(routeParams.id,'GET'));
        dispatch(detailModal('',false,''));
    },
    favorClick(e){
        const {dispatch,routeParams}=this.props;
        let goods_id=routeParams.id;
        app.ajax(`/api/goods/favorite`,{
            goods_id:goods_id
        },"POST").then((res)=>{
            if(res.iRet==1){
                hb.lib.weui.toast(res.info);
                dispatch(sendFavorStatus(e));
            }else{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                })
            }

        },(res)=>{
            app.modal.alert({
                content:'网络繁忙稍后再试',
                btn:'知道了'
            })
        });
    },
    videoPlay(e){
        const { dispatch } = this.props;

        let another='';
        if(e==quanan){
            another='dajian'
        }else{
            another='quanan'
        }
        document.getElementById(another).pause();
        document.getElementById(e).play();
        setTimeout(function(){
            dispatch(videoPlay(e));
        },500);
    },
    handleBottomBtn(e){
        const { dispatch } = this.props;
        dispatch(detailModal(1,true,e));
    },
    modalClose(e){
        const { dispatch } = this.props;
        dispatch(detailModal(2,false,''));
    },
    chooseGoods(e){
        const{ dispatch}=this.props;
        let {id,spec_id,num,classActive}=e;
        if(classActive!=='type-list-item grey'){
            let totalId=spec_id+':'+id;
            dispatch(chooseGoods(totalId,spec_id));
            dispatch(chooseNum(totalId,num));
        }
    },
    handleNum(e){
        const { dispatch } = this.props;
        dispatch(chooseNum(e.id,e.num));
    },
    addToCart(e){
        const { dispatch, routeParams,data,store_nums} = this.props;
        data.data.sku.forEach((n,i)=>{
            if(n.product_id==e.product_id){
                if(store_nums>0){
                    app.ajax(`/api/cart/add?version=2`,e,'POST').then((res)=>{
                        dispatch(detailModal(2,false,''));
                        if(res.iRet==1){
                            hb.lib.weui.toast('成功添加购物车');
                            dispatch(fetchCommonCartifNeeded('GET'));
                        }else{
                            setTimeout(()=>{
                                app.modal.alert({
                                    content:res.info,
                                    btn:'知道了'
                                })
                            },200);
                        }
                    },(res)=>{
                        app.modal.alert({
                            content:'网络繁忙稍后再试',
                            btn:'知道了'
                        });
                    })
                }else{
                    dispatch(detailModal(2,false,''));
                    setTimeout(()=>{
                        app.modal.alert({
                            content:'您选择的商品已经卖完',
                            btn:'知道了'
                        });
                    },200)
                }
            }
        })
    },
    //componentWillUnmount(){
    //    $(window).scrollTop(0);
    //},
    centerToBuy(e){
        const { dispatch, routeParams,data,store_nums} = this.props;
        data.data.sku.forEach((n,i)=>{
            if(n.product_id==e.product_id){
                if(store_nums>0){
                    app.ajax(`/api/cart/add?version=2`,e,'POST').then((res)=>{
                        dispatch(detailModal(2,false,''));
                        if(res.iRet==1){
                            browserHistory.push(`/h5/shopCart?product_id=${e.product_id}&num=${e.num}`);
                        }else{
                            app.modal.alert({
                                content:res.info,
                                btn:'知道了'
                            })
                        }
                    },(res)=>{
                        app.modal.alert({
                            content:'网络繁忙稍后再试',
                            btn:'知道了'
                        })
                    })
                }else{
                    dispatch(detailModal(2,false,''));
                    setTimeout(()=>{
                        app.modal.alert({
                            content:'您选择的商品已经卖完',
                            btn:'知道了'
                        });
                    },200)

                }
            }
        })
    },
    isWechatInit:false,
    componentWillUnmount(){
        let {dispatch}=this.props;
        dispatch(detailInitial());
        app.wechat.init();
    },
    render(){
        let {data,
            isFetching,
            if_favor,
            showType,
            modalId,
            modalIsOpen,
            modalCate,

            finalId,

            id,
            num,
            store_nums,
            price,
            product_id,
        }=this.props;
        let _this=this;
        let renderDetailPage=()=>{
            if(!data){
                var isNull=true
            }else if(data.length===0){
                var isEmpty =true
            }
            if (isFetching||isNull) {
                return <Loading key={1}/>
            }else if(isEmpty){
                return <div>no data</div>
            }else{
                let val=data.data;
                let status={modalId,modalIsOpen,modalCate}

                //console.log(val.share_url);
                //console.log(val);
                if(!this.isWechatInit){
                    app.wechat.init({
                        title: val.name,
                        content: val.subtitle,
                        link : window.location.href,
                        logo:val.cover,
                    });
                    this.isWechatInit=true;
                }

                return(
                    <div className="detail-page">
                        <CommonHeader >
                            <HeaderShopCart></HeaderShopCart>
                        </CommonHeader>
                        <Header 
                            data={val} 
                            if_favor={if_favor}
                            favorClick={this.favorClick}
                        >
                        </Header>
                        <BodyContent data={val}></BodyContent>
                        <BodyVideo 
                            data={val}
                            videoStatus={showType}
                            videoPlay={this.videoPlay}
                        >
                        </BodyVideo>
                        <BodyDesc data={val}></BodyDesc>
                        <BodyAlert></BodyAlert>
                        <BottomBtnGroup 
                            data={val} 
                            handleBottomBtn={this.handleBottomBtn} 
                        >
                        </BottomBtnGroup>
                        <DetailModal
                            status={status}
                            modalClose={this.modalClose}
                            data={val}
                            chooseGoods={this.chooseGoods}
                            finalId={finalId}
                            handleNum={this.handleNum}
                            addToCart={this.addToCart}
                            centerToBuy={this.centerToBuy}

                            id={id}
                            num={num}
                            store_nums={store_nums}
                            price={price}
                            product_id={product_id}
                        >
                        </DetailModal>
                    </div>
                )
            }
        }
        return(
            <div>
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderDetailPage()}
                </CSSTransitionGroup>
            </div>
        )
    }
});

var Header=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        let if_favor=this.props.if_favor;
        //console.log(if_favor,nextProps.if_favor);
        if(if_favor!==nextProps.if_favor){
            return true
        }else{
            return false
        }

    },
    render(){
        let n=this.props.data; 
        let if_favor=this.props.if_favor;
        let favorClick=this.props.favorClick;

        let isFavorite=()=>{
            if(if_favor==false){
                return(
                    <img className='no-fav' src={no_favor} alt=""/>
                )
            }else{
                return(
                    <img className='is-fav' src={is_favor} alt=""/>
                )
            }
        }
        return(
            <div className="detail-wrapper">
                <div className="detail-cover">
                    <img className="img" src={n.cover} alt=""/>
                </div>
                <div className="detail-info">
                    <div className='detail-desc'>
                        <div className="title">{n.name}</div>
                        <div className="sub-title">{n.subtitle}</div>
                    </div>
                    <div className="detail-love" onClick={e=>favorClick(!if_favor)}>
                        {isFavorite()}
                    </div>
                </div>
            </div>
        )
    }
});

var BodyContent=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        return false
    },
    render(){
        let n=this.props.data;
        return(
            <div className="detail-content">
                <div className="content-list">
                    {
                        n.images.map((n,i)=>{
                            let renderText=()=>{
                                if(n.text){
                                    return(
                                        <div className="item-text">
                                            {n.text}
                                        </div>
                                    )
                                }
                            }
                            return(
                                <div className="info-item" key={i}>
                                    <div className="item-img">
                                        <img src={n.src} alt=""/>
                                    </div>
                                    {renderText()}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});

var BodyVideo=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        let status=this.props.videoStatus;
        if(status.video!==nextProps.data.video){
            return true
        }else{
            return false
        }

    },
    componentDidMount(){
        $('video').attr({
            'webkit-playsinline':true,
        });
    },
    playIng(id){
        let obj=document.getElementById(id);
        if(obj && !obj.paused){
            setTimeout(()=>{
                obj.setAttribute('controls',true);
            },1500);
        }
    },
    render(){
        let n=this.props.data;
        let status=this.props.videoStatus
        let videoArray=[];
        let vrVideoArray=[];

        n.video.forEach((n,i)=>{
            if(n.type!=="vr_out" && n.type!=='vr'){
                videoArray.push(n);
            }else{
                vrVideoArray.push(n);
            }
        });

        this.playIng(status);
        let videoPlay=()=>{
            return(
                videoArray.map((n,i)=>{
                    let picChoose=()=>{
                        if(n.type=="quanan"){
                            return <img className='text_img' src={quanan_Pic} alt=""/>
                        }else if(n.type=='dajian'){
                            return <img className='text_img' src={dajian_Pic} alt=""/>
                        }
                    }

                    //console.log(n);
                    if(!status){
                        n.wrapperStyle='item-wrapper'
                        n.videoStyle='video-wrapper hidden'
                    }else{
                        if(status && n.type==status){

                            n.wrapperStyle='item-wrapper hidden'
                            n.videoStyle='video-wrapper'
                        }else{
                            n.wrapperStyle='item-wrapper'
                            n.videoStyle='video-wrapper hidden'
                        }
                    }


                    return(
                        <div className="video-item" key={i} >
                            <div className={n.wrapperStyle} onClick={e=>this.props.videoPlay(n.type)}>
                                <img className='cover' src={n.cover} alt=""/>
                                <div className="cover-mask"></div>
                                {picChoose()}
                            </div>
                            <video className={n.videoStyle}
                               preload="none"
                               poster={n.cover}
                               src={n.src}
                               type='video/mp4'
                               id={n.type}
                               width="100%"
                               playsInline={true}
                            >
                            </video>
                        </div>
                    )

                })
            )
        }

        let id=n.id;
        let vrVideoPlay=()=>{
            return(
                vrVideoArray.map((n,i)=>{
                    let picChoose=()=>{
                        if(n.type=="vr_out"){
                            return <img className='text_img' src={vr_out} alt=""/>
                        }else if(n.type=='vr'){
                            return <img className='text_img' src={vr} alt=""/>
                        }
                    }

                    return(
                        <a href={`http://m.halobear.com/shop/pano?id=${id}&type=${n.type}`} className="video-item" key={i} >
                            <div className='item-wrapper'>
                                <img className='cover' src={n.cover} alt=""/>
                                <div className="cover-mask"></div>
                                {picChoose()}
                            </div>
                        </a>
                    )
                })
            )
        }
        return(
            <div className="detail-video">
                {videoPlay()}
                {vrVideoPlay()}
            </div>
        )
    }
});

var BodyDesc=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
      return false
    },
    render(){
        let data=this.props.data;
        return(
            <div className="detail-desc">
                <div className="desc-title f-16">
                    <span className="liner"></span><i className="pointer1 haloIcon haloIcon-diamond"></i>
                    <span>&nbsp;&nbsp;&nbsp;本价格包含&nbsp;&nbsp;&nbsp;</span>
                    <i className="pointer2 haloIcon haloIcon-diamond"></i><span className="liner"></span>
                </div>
                <div className="desc-pic">
                    {
                        data.content.map((n,i)=>{
                            return(
                                <div className="pic-item" key={i}>
                                    <img src={n.src} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});

var BodyAlert=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        return false
    },
    render(){
        return(
            <div className="detail-alert">
                <div className="alert-title">
                    <i className="haloIcon haloIcon-alert"></i><span className="text fw">买家须知</span>
                </div>
                <div className="alert-desc">
                    <div className="text">幻熊出品的策划方案中的所有内容，包括但不限于文字、照片、影像、插图、视频等素材，均受《中华人民共和国著作权法》、《中华人民共和国著作权法实施细则》及国际著作权公约的保护，其完整著作权属于幻熊科技有限公司所有或其他授权幻熊科技有限公司使用的内容提供者所有。</div>
                    <div className="text">购买者不得将策划方案用于任何商业用途，包括但不限于转卖、复印、再版、技术加盟、品牌加盟等方式。由于产品的特殊性，请您在下单时务必留下准确的联系方式，我们将在第一时间与您取得联系，安排快递及软件安装等事宜。本产品为限售产品，一经售出，恕不退货。</div>
                </div>
            </div>
        )
    }
});

var BottomBtnGroup=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        return false
    },
    render(){
        let data=this.props.data;
        return(
            <div className="detail-bottom-btn">
                <div className="wrapper">
                    <div className="shop-cart" onClick={e=>this.props.handleBottomBtn('cart')}>
                        <span className="haloIcon haloIcon-gouwuche"></span>
                        <div className="line"></div>
                    </div>
                    <div className="buy-btn" onClick={e=>this.props.handleBottomBtn('buy')}>
                        <div className="btn-wrapper">
                            <div  className="text">确认购买</div>
                            <div className="num">￥ <span className="price">{data.sell_price.split('.')[0]}</span>.{data.sell_price.split('.')[1]}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})




function mapStateToProps(state) {
    const {detailData}=state;
    let {data,
        isFetching,
        if_favor,
        showType,
        modalId,
        modalIsOpen,
        modalCate,
        detailGoodsChoose,
        //
        finalId,
        //
        id,
        num,
        store_nums,
        price,
        product_id,

    }=detailData
    return {
        data,
        isFetching,
        if_favor,
        showType,
        modalId,
        modalIsOpen,
        modalCate,
        detailGoodsChoose,
        //
        finalId,
        //
        id,
        num,
        store_nums,
        price,
        product_id,
    }

}

export default ReactRedux.connect(mapStateToProps)(Detail)

