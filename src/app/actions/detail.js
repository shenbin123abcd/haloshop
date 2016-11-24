export const REQUEST_SHOP_DETAIL='REQUEST_SHOP_DETAIL'
export const RECEIVE_SHOP_DETAIL='RECEIVE_SHOP_DETAIL'

function requestDetailPosts(data){
    return {
        type:REQUEST_SHOP_DETAIL,
        data
    }
}

function receiveDetailPosts(data){
    return{
        type:RECEIVE_SHOP_DETAIL,
        data
    }
}

let sku=''
function fetchShopDetail(id,method) {
    return dispatch => {
        dispatch(requestDetailPosts(id));

        return app.ajax(`/api/goods/detail?version=2`,{
            id:id,
        },method).then(res=>{
            if(res.iRet==1){
                all=res;
                res.data.specs.forEach((n,i)=>{
                    n.value.forEach((n2,i2)=>{
                        n2.classActive='type-list-item';
                    })
                });

                //默认选择第一个商品
                sku=res.data.sku;
                let arr=[];
                res.data.specs.forEach((n,i)=>{
                    n.value.forEach((n2,i2)=>{
                        let specs_key=`;${n2.spec_id}:${n2.id};`;
                        res.data.sku.forEach((n3,i3)=>{
                            if(n3.specs_key==specs_key){
                               if(n3.store_nums>0){
                                    arr.push(n3.specs_key);
                               }
                            }
                        })
                    })
                })

                let arr2=arr[0].split(';').join('').split(':');
                let spec_id=arr2[0];
                let initialId=arr2[0]+':'+arr2[1];
                dispatch(chooseGoods(initialId,spec_id))

                //默认第一个商品的数量
                dispatch(chooseNum(initialId,1));

                dispatch(receiveDetailPosts(res));
                dispatch(receiveFavor(res.data.is_favorite));
            }
        });
    }
}

function shouldFetchDetail(state) {
    const { detailData } = state
    if (detailData.isFetching){
        return false
    }
    return true
}

export function fetchShopDetailIfNeeded(id,method) {
    return (dispatch, getState ) => {
        if (shouldFetchDetail(getState())) {
            return dispatch(fetchShopDetail(id));
        }
    }
}

//收藏
export const RECEIVE_FAVOR='RECEIVE_FAVOR'
export const SEND_IF_FAVOR='SEND_IF_FAVOR'

let render=(n)=>{
    if(n==0){
        return false
    }else if(n==1){
        return true
    }
}

function receiveFavor(if_favor){
    return{
        type:RECEIVE_FAVOR,
        if_favor:render(if_favor),
    }
}

export function sendFavorStatus(if_favor){
    return{
        type:SEND_IF_FAVOR,
        if_favor:if_favor,
    }
}

//视频播放
export const VIDEO_IS_PLAY='VIDEO_IS_PLAY'

export function videoPlay(showType){
    return{
        type:VIDEO_IS_PLAY,
        showType,
    }
}

//控制弹框
export const MODAL_IS_SHOW='MODAL_IS_SHOW';

export function detailModal(modalId,modalIsOpen,modalCate){
    return{
        type:MODAL_IS_SHOW,
        modalId,
        modalIsOpen,
        modalCate,
    }
}


//goods choose
export const MODAL_GOODS_CHOOSE='MODAL_GOODS_CHOOSE'

var all='';
var idObj={}
export function chooseGoods(totalId,specs_id){
    idObj[specs_id] = totalId;
    let index= 1;
    let retStr = "";
    let finalId='';
    let array=[];
    for(var key in idObj){
        if(index == 1){
           retStr+= idObj[key];
           index = 2;
        }    
        else{
           retStr+=";"+idObj[key];
        }
    }
    finalId=';'+retStr+';';
    array=(retStr.split(';'));

    all.data.specs.forEach((n,i)=>{
        if(n.id==array[i].split(':')[0]){
            n.value.forEach((n2,i2)=>{
                let specs_key=`;${n2.spec_id}:${n2.id};`;
                all.data.sku.forEach((n3,i3)=>{
                    if(n3.specs_key==specs_key){
                        if(n3.store_nums==0){
                            _.assign(n2,{
                                classActive: 'type-list-item grey'
                            });
                        }else{
                            if(n2.id==array[i].split(':')[1]){
                                _.assign(n2,{
                                    classActive: 'type-list-item active'
                                });
                            }else{
                                _.assign(n2,{
                                    classActive: 'type-list-item'
                                });
                            }
                        }
                    }
                })
            })
        }
     })
    return{
        type:MODAL_GOODS_CHOOSE,
        finalId:finalId,
        data:all
    }
}


//modal add-minus-btn
export const MODAL_CHOOSE_NUM='MODAL_CHOOSE_NUM';

let number=1;
export function chooseNum(id,num){
    let store_nums='';
    let s_price='';
    let product_id='';
    if(id){
        if(id.indexOf(';')==-1){
            id=';'+id+';';
            sku.forEach((n,i)=>{
                if(n.specs_key==id){
                    //console.log(n);
                    store_nums=n.store_nums;
                    s_price=n.sell_price;
                    product_id=n.product_id;
                }
            });
            number=1;
        }else{
            sku.forEach((n,i)=>{
                if(n.specs_key==id){
                    store_nums=n.store_nums;
                    s_price=n.sell_price;
                    product_id=n.product_id;
                }
            });
            number=number+num;
        }
        store_nums=store_nums-number+1;
        s_price=s_price*number;

    }
    
    return{
        type:MODAL_CHOOSE_NUM,
        id,
        num:number,
        store_nums:store_nums,
        price:s_price.toFixed(2),
        product_id:product_id,
    }
}

//detail initial
export const DETAIL_INITIAL='DETAIL_INITIAL';

export function detailInitial(){
    return{
        type:DETAIL_INITIAL,
    }
}




