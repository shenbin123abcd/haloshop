import {fetchIndexIfNeeded} from '../actions/index'
var hashHistory=ReactRouter.hashHistory;
var browserHistory=ReactRouter.browserHistory;
let Link=ReactRouter.Link;



class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isFetching: false,
        };
    }
    componentWillMount(){
        const { dispatch,location } = this.props;
        this.setState({
            isFetching: true,
        });
        $.ajax(`/api/public/couponUser?version=3&sn=${hb.location.url('?sn')}`).then(res=>{
            // this.state.isFetching=true;
            this.setState({
                isFetching: false,
                data:res.data,
            });
        })
    }
    componentDidMount(){
        // const { dispatch,location } = this.props;
        // dispatch(fetchIndexIfNeeded({
        //     id:location.query.id
        // }));
    }
    componentDidUpdate(){
        const { dispatch,location } = this.props;
        // console.log('componentDidUpdate')
    }
    renderList(){
        var dom=null;
        if(this.state.isFetching){
            dom= (
                <div className="loading-box">
                    <i className="haloIcon haloIcon-spinner haloIcon-spin"></i>
                </div>
            )
        }else{
            dom= (
                <div className="list-box">
                    {this.state.data.map((n,i)=>{
                        return (
                            <div  className="item" key={i}>
                                <img className="avatar" src={n.avatar} alt=""/>
                                <div className="main">
                                    <div>
                                        <span className="username">{n.username}</span>
                                        <span className="create_time">{moment(n.create_time*1000).format('MM.DD HH:mm')}</span>
                                    </div>
                                    <div className="note">
                                        {n.note}
                                    </div>
                                </div>
                                <div className="price">
                                    {n.price}元
                                </div>

                            </div>
                        )
                    })}
                </div>
            )
        }

        return dom
    }
    render() {
        const { dispatch,location,indexData } = this.props;
        // console.log(indexData)

        return (
            <div className="bottom-box">
                <div style={{'display':this.state.data.length?'block':'none'}} >
                    <div className="line-box" >
                        <div className="line"></div>
                        <div className="text">看看大家手气</div>
                        <div className="line"></div>
                    </div>
                </div>


                {this.renderList()}

                <div className="line-box">
                    <div className="line second"></div>
                    <div className="text">活动细则</div>
                    <div className="line second"></div>
                </div>

                <div className="ul">
                    <div  className="li">1. 代金券新老用户同享。</div>
                    <div  className="li">2. 使用代金券时的下单手机号需为抢代金券时使用的手机号。</div>
                    <div  className="li">3. 发放至手机号的代金券需在App用手机号注册后才可使用。</div>
                    <div  className="li">4. 发放至幻熊商城账户的代金券登录后即可使用。</div>
                    <div  className="li">5. 代金券仅限在支付时使用，每张订单仅限使用一张代金券。</div>
                    <div  className="li">6. 幻熊商城保留法律范围内允许的对活动的解释权。</div>
                </div>



            </div>

        )
    }
}


function mapStateToProps(state) {
    const {}=state;
    return {
        // indexData,
    }
}

export default ReactRedux.connect(mapStateToProps)(Footer)


