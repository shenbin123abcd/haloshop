import InfiniteScroll from 'redux-infinite-scroll';
import CommonHeader from './Common.header'
import HeaderShopCart from '../components/commonHeader.shopCart'
import TimeOut from '../components/index.timeOut'
import ListItem from '../components/index.list'
import Loading from '../components/common.loading'


let Link=ReactRouter.Link;
let CSSTransitionGroup = React.addons.CSSTransitionGroup;
var browserHistory=ReactRouter.browserHistory;


var indexInit=true;
var MessageList =React.createClass({

    getInitialState(){
        return{
            messages: [],
            start_time:0,
            loadingMore: false,
            page:1,
            total:1,
            backTop:0,

            getUpTime:false,
        }
    },

    _createMessages(arr=[],start=0) {
        arr = _.cloneDeep(arr);
        for (var i=start;i<start;i++) {
          arr.push(i)
        }
        return arr;
    },

    _loadMore() {
        let total=this.state.total;
        this.setState({loadingMore: true});
        app.ajax(`/api/goods/getCaseList?version=2`,{
            page: 1,
            new:1
        },"GET").then((res)=>{
            if(res.iRet==1){
                res.data.list.forEach((n,i)=>{
                    n.newIcon=true;
                })
                let prevArray=res.data.list;
                app.ajax(`/api/goods/getCaseList?version=2`,{
                    page: this.state.page,
                    new:0
                },"GET").then((response)=>{
                    if(response.iRet==1){
                        response.data.list.forEach((n,i)=>{
                            n.newIcon=false;
                        })
                        let allElements=prevArray.concat(response.data.list);
                        const messages = this._createMessages(this.state.messages.concat(allElements), this.state.messages.length+1);
                        total=response.data.total;
                        this.setState({
                            messages: messages,
                            loadingMore: false,
                            total:total,
                            start_time:res.data.start_time,
                            //page:this.state.page
                            page:this.state.page+1,
                        });

                        if(indexInit && !hb.Cookies.getJSON('hb_shop_up_time')){
                            app.ajax(`/api/public/getConfig`,'','GET').then((res2)=>{
                                hb.Cookies.set('hb_shop_up_time',res2.data.up_time);
                                this.setState({
                                    getUpTime:true,
                                })
                            })
                            indexInit=false;
                        }

                    }else{
                        app.modal.alert({
                            content:res.info,
                            btn:'知道了'
                        })
                    }

                },()=>{
                    app.modal.alert({
                        content:'网络繁忙稍后再试',
                        btn:'知道了'
                    })
                })
            }else{
                app.modal.alert({
                    content:res.info,
                    btn:'知道了'
                })
            }
        },()=>{
            //app.modal.alert({
            //    content:'网络繁忙稍后再试',
            //    btn:'知道了'
            //})
        })
    },

    _renderMessages() {
        return this.state.messages.map((n,i) => {
            return(
            <ListItem key={n.id} value={n} />
            )
        })
    },

    componentWillUnmount() {
        this.setState({
            messages: [],
            start_time:0,
            loadingMore: false,
            page:1,
            total:1,
            backTop:0,
        });
        //$(window).scrollTop(0);
    },

    backTop(){
        $(window).scrollTop(0);
    },

    handleTouchEnd(){
        if($(window).scrollTop()>0){
            this.setState({
                backTop:1
            })
        }else{
            this.setState({
                backTop:0
            })
        }
    },

    handleTouchMove(){
        this.setState({
            backTop:0,
        })
    },

    componentDidMount(){

    },

    render() {
        let backTopShow=()=>{
            if(this.state.backTop==0){
                return(
                    <div></div>
                )
            }else if(this.state.backTop==1){
                return(
                    <div className="go-top bounceInRight animated" onClick={this.backTop}>
                        <div className="wrapper">
                            <span className="haloIcon haloIcon-top"></span>
                        </div>
                    </div>
                )
            }
        }
        let up_time=hb.Cookies.getJSON('hb_shop_up_time');
        if(up_time){
            up_time=up_time.replace(/-/g,'/');
            up_time=new Date(up_time).getTime();
        }
        let renderTimeout=()=>{
            if(up_time-new Date().getTime()>=0){
                return(
                    <TimeOut upTime={up_time} type="index"></TimeOut>
                )
            }else{
                return(
                    <TimeOut start_time={this.state.start_time} type="index"></TimeOut>
                )
            }
        }
        let ifRender=()=>{
            if(this.state.messages.length>0){
                return(
                    <div> 
                        <CommonHeader none>
                            <Link className="link-style" to={`/h5/user`}><span className="haloIcon haloIcon-my"></span></Link>
                            <HeaderShopCart></HeaderShopCart>
                        </CommonHeader>
                        {renderTimeout()}
                    </div> 
                )
            }else{
                return(
                    <Loading key={1}/>
                )
            }
        }
        return (
            <div onTouchEnd={this.handleTouchEnd}>
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {ifRender()}
                </CSSTransitionGroup>
                <InfiniteScroll
                    loadingMore={this.state.loadingMore}
                    loadMore={this._loadMore}
                    elementIsScrollable={false}
                    loader={''}
                    hasMore={this.state.messages.length<this.state.total?true:false}
                >
                    {this._renderMessages()}
                </InfiniteScroll>
                {backTopShow()}
            </div>
            )
        }
})






function mapStateToProps(state) {
    const {testList}=state;
    return {
        testList
    }
}

export default ReactRedux.connect(mapStateToProps)(MessageList);