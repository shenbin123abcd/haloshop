import {fetchCollectListIfNeeded} from '../actions/collect'
import CommonHeader from './Common.header'
import Loading from '../components/common.loading'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Collect=React.createClass({

    componentDidMount(){
        let {dispatch}=this.props;
        dispatch(fetchCollectListIfNeeded());
    },
    handleBack(){
        browserHistory.push(`/h5/user`);
    },
    render(){
        let {collectData}=this.props;

        let renderCollect=()=>{

            if(!collectData.data){
                var isNull=true
            }else if(collectData.data.length==0){
                var isEmpty =true
            }
            if (collectData.isFetching||isNull){
                return <Loading key={1}/>
            }else if(isEmpty){
                $('body').removeClass('collect');
                return (
                    <div className="collect-no-data">
                        <CommonHeader title="我的收藏" back={this.handleBack}></CommonHeader>
                        <div className="content">
                            <div className="pic"><span className="haloIcon haloIcon-wushoucang"></span></div>
                            <div className="text">美好的事物应该被善于发现收藏<br/>赶紧去收藏吧</div>
                        </div>
                    </div>
                )
            }else{
                $('body').addClass('collect');
                return(
                    <div className="collect-wrapper">
                        <CommonHeader title="我的收藏" back={this.handleBack}></CommonHeader>
                        <CollectBlock data={collectData.data}></CollectBlock>
                    </div>
                )

            }
        }
        return(
            <div className="collect-page">
                <CSSTransitionGroup  transitionName="myTransition" component="div" transitionEnterTimeout={300} transitionLeaveTimeout={10}>
                    {renderCollect()}
                </CSSTransitionGroup>
            </div>
        )
    }
});


var CollectBlock=React.createClass({
    render(){
        let data=this.props.data;
        //console.log(data);
        return(
            <div className="collect-list">
                {
                    data.map((n,i)=>{
                        return(
                            <Link to={`/h5/detail_${n.id}`}className="link" key={i}>
                                <div className="item">
                                    <div className="line"></div>
                                    <div className="pic">
                                        <div className="wrapper">
                                            <img src={n.cover} alt=""/>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="title">{n.name}</div>
                                        <div className="subtitle">{n.subtitle}</div>
                                        <div className="price">
                                            <div className="text">价格：</div>
                                            <div className="num">{n.sell_price}元</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
})


function mapStateToProps(state) {
    const {collectData}=state;
    return {
        collectData,
    }
}

export default ReactRedux.connect(mapStateToProps)(Collect)

