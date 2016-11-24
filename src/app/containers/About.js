import CommonHeader from './Common.header'
import shopLogo from '../images/shop_logo.png'

var browserHistory=ReactRouter.browserHistory;
var Link=ReactRouter.Link;
var About=React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        return false
    },
    handleBack(){
        browserHistory.push('/h5/user');
    },
    render(){
        return(
            <div className="about-page">
                <CommonHeader title="关于我们" back={this.handleBack}></CommonHeader>
                <div className="about-content">
                    <div className="pic-block">
                        <div className="pic"><img src={shopLogo} alt=""/></div>
                        <div className="title">幻熊商城</div>
                        <div className="sub">多挣钱，少操心</div>
                        <div className="num">—— &nbsp;&nbsp;&nbsp;版本号V1.0.0&nbsp;&nbsp;&nbsp; ——</div>
                    </div>
                    <div className="link-block">
                        <Link to={`/h5/about/feedback`} style={{display:'block'}}>
                            <div className="item">
                                <div className="line"></div>
                                <div className="left">
                                    <span className="haloIcon haloIcon-editor"></span>
                                    <span className="text">意见反馈</span>
                                </div>
                                <div className="right">
                                    <span className="haloIcon haloIcon-more" style={{color: '#9d9d9d'}}></span>
                                </div>
                            </div>
                        </Link>
                        <Link to={`/h5/about/agreement`} style={{display:'block'}}>
                            <div className="item">
                                <div className="left">
                                    <span className="haloIcon haloIcon-1111111"></span>
                                    <span className="text">用户协议</span>
                                </div>
                                <div className="right">
                                    <span className="haloIcon haloIcon-more" style={{color: '#9d9d9d'}}></span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="bottom-desc">
                        <span>Copyright © 2009   2016 </span>
                        <br/>
                        <span>杭州幻熊科技有限公司</span>
                    </div>
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

export default ReactRedux.connect(mapStateToProps)(About)
