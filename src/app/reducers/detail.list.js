import {
    REQUEST_SHOP_DETAIL, 
    RECEIVE_SHOP_DETAIL,
    SEND_IF_FAVOR,
    RECEIVE_FAVOR,
    VIDEO_IS_PLAY,
    MODAL_IS_SHOW,
    MODAL_GOODS_CHOOSE,
    MODAL_CHOOSE_NUM,
    DETAIL_INITIAL,
} from '../actions/detail'

export default (state = {

    isFetching: false,
    data: null,
    if_favor:false,
    showType:'',
    modalId:'',
    modalIsOpen:false,
    modalCate:'',

    //goods choose
    finalId:'',

    //choose num
    id:null,
    num:1,
    store_nums:null,
    price:null,
    product_id:null,
}, action) => {
    switch(action.type) {
        case 'REQUEST_SHOP_DETAIL':
            return _.assign({}, state, {
                isFetching: true,
            })
        case 'RECEIVE_SHOP_DETAIL':
            return _.assign({}, state, {
                isFetching: false,
                data: action.data,
            })
        case 'RECEIVE_FAVOR':
            return _.assign({}, state, {
                if_favor: action.if_favor,
            })
        case 'SEND_IF_FAVOR':

            return _.assign({}, state, {
                if_favor: action.if_favor,
            })
        case 'VIDEO_IS_PLAY':
            return _.assign({},state,{
                showType:action.showType,
            });
        case 'MODAL_IS_SHOW':
            return _.assign({},state,{
                modalId:action.modalId,
                modalIsOpen:action.modalIsOpen,
                modalCate:action.modalCate,
            });  
        case 'MODAL_GOODS_CHOOSE':
            return  _.assign({},state,{
                data:action.data,
                finalId:action.finalId,
            }); 
        case 'MODAL_CHOOSE_NUM':
            return  _.assign({},state,{
                id:action.id,
                num:action.num,
                store_nums:action.store_nums,
                price:action.price,
                product_id:action.product_id,
            });
        case 'DETAIL_INITIAL':
            return _.assign({},state,{
                isFetching: false,
                data: null,
                if_favor:false,
                showType:'',
                modalId:'',
                modalIsOpen:false,
                modalCate:'',
                finalId:'',
                id:null,
                num:1,
                store_nums:null,
                price:null,
                product_id:null,
            })
        default:
            return state
    }
}
