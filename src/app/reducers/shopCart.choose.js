import {
    ALL_GOODS_DATA,DELETE_GOODS_DATA
} from '../actions/cart'

export default (state={
    product_id:'',
    data:null,
    allChoose:false,
    chooseGoodsArray:[],
},action)=>{
    switch(action.type){
        case 'ALL_GOODS_DATA':
            return _.assign({},state,{
                product_id:action.product_id,
                data:action.data,
                allChoose:action.allChoose,
                chooseGoodsArray:action.chooseGoodsArray
            });
        case 'DELETE_GOODS_DATA':
            let product_id=action.product_id;
            let data=state.data;
            for(let key in data){
                _.remove(data[key].goods,function(n){
                    return n.product_id==product_id;
                })
            }
            return _.assign({},state,{
                data:data
            });
        default:
            return state;
    }
}