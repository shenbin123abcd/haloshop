let Link=ReactRouter.Link;
import {fetchCommonCartifNeeded} from '../actions/commonHeader'

var HeaderShopCart = React.createClass({
    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(fetchCommonCartifNeeded('GET'));
    },
    render(){
        const {commonCartData,isFetching}=this.props;
        let renderCommonCart=()=>{
            if(!commonCartData.data){
                var isNull=true
            }else if(commonCartData.length===0){
                var isEmpty =true
            }
            if (isFetching||isNull) {
                return <span className="haloIcon haloIcon-shopcart"></span>
            }else if(isEmpty){
                return <span className="haloIcon haloIcon-shopcart"></span>
            }else{
                hb.Cookies.set('hb_shop_up_time',commonCartData.data.up_time);
                return(
                    <span>
                        {shopCart()}
                    </span>
                )
            }
        }
        let shopCart=()=>{
            if(commonCartData.data.cart_num==0){
                return(
                    <span className="haloIcon haloIcon-shopcart"></span>
                )
            }else{
                return(
                    <span className="wrapper">
                    <span className="haloIcon haloIcon-shopcart"></span>
                    <span className="circle-block">
                        <span className="tada animated">{commonCartData.data.cart_num}</span>
                    </span>
                </span>
                );
            }
        }
        return(
            <Link to={`/h5/shopCart`} className="link-style">
                {renderCommonCart()}
            </Link>
        )
    }
});



function mapStateToProps(state) {
    const {commonCartData}=state;
    return {
        commonCartData:commonCartData
    }
}

export default ReactRedux.connect(mapStateToProps)(HeaderShopCart)
