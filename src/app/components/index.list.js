import newIcon from '../images/icon-new.png'
import d3Icon from '../images/icon-3d.png'

let Link=ReactRouter.Link;
var browserHistory=ReactRouter.browserHistory;

export default React.createClass({
    componentDidMount(){
        let nameLength=parseInt($('.info-title').css('width'))-30-parseInt($('.Icon-new').css('width'));
        $('.name-length').css({
            'max-width':nameLength,
            'white-space': 'nowrap',
            'overflow': 'hidden',
            'text-overflow':'ellipsis',
        });
    },
    render: function() {
        let n=this.props.value;
        let is3d=()=>{
            if(n.is_3d){
                return(
                    <div className="icon-3d"><img className='' src={d3Icon} alt=""/></div>
                )
            }
        }
        let isNew=()=>{
            if(n.newIcon){
                return(
                    <span className="Icon-new"><img src={newIcon} alt=""/></span>
                )
            }
        }
        return (
            <div className="infinite-list-item shop-list-item">
                <div  className="item-wrapper">
                    <Link to={`/h5/detail_${n.id}`} className="link-wrapper">
                        <div className="item-cover">
                            <img className='cover' src={n.cover} alt=""/>
                            {is3d()}
                        </div>
                    </Link>
                    <Link to={`/h5/detail_${n.id}`} className="link-wrapper">
                        <div className="item-info">
                            <div className="info-title">
                                <div className="title">
                                    <span className="name name-length">{n.name}</span>
                                    {isNew()}
                                </div>
                                <div className="subtitle">{n.subtitle}</div>
                                <div className="line"></div>
                            </div>
                            <div className="info-price">
                                <div className="sell-price"><span className="icon">￥ </span>{n.sell_price}</div>
                                <div className="market-price">原价：￥{n.market_price}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
});