export const REQUEST_SHOP_CART='REQUEST_SHOP_CART'
export const RECEIVE_SHOP_CART='RECEIVE_SHOP_CART'

function requestShopPosts(data){
    return {
        type:REQUEST_SHOP_CART,
        data
    }
}

function receiveShopPosts(data){
    return{
        type:RECEIVE_SHOP_CART,
        data
    }
}

var goodsData='';
function fetchShopCart(method) {
    return dispatch => {
        dispatch(requestShopPosts('success'));

        return app.ajax(`/api/cart/getList?version=2`,'',method).then(res=>{
            if(res.iRet==1){
                //console.log(res.data);
                goodsData=res.data;
                dispatch(receiveShopPosts(res.data));
                dispatch(chooseGoods());
            }
        });
    }
}

function shouldFetchShop(state) {
    const { shopCartData } = state
    if (shopCartData.isFetching){
        return false
    }
    return true
}

export function fetchShopCartifNeeded(method) {
    return (dispatch, getState ) => {
        if (shouldFetchShop(getState())) {
            return dispatch(fetchShopCart());
        }
    }
}

//choose goods
export const ALL_GOODS_DATA='ALL_GOODS_DATA'

export function chooseGoods(product_id='',allChoose=3,num=''){
    //全选状态chooseStatus 3:初始化，2：未全选，1：全选
    let returnData={};
    let chooseStatus='';
    let chooseGoods=[];

    let param=hb.location.url('?');
    if(allChoose==3 && !product_id){
        //初始化
        for(let key in goodsData){
            if(goodsData[key].goods.length>0){
                goodsData[key].goods.forEach((n,i)=>{
                    if(param && n.product_id==param.product_id){
                        n.choose=true;
                        n.num=parseInt(param.num);
                        if(goodsData[key].goods.length>1){
                            chooseStatus=2;
                        }else{
                            chooseStatus=1;
                        }
                    }else{
                        n.choose=false;
                        n.num=parseInt(n.num);
                        chooseStatus=2;
                    }
                });
            }
        }

    }else if(product_id && allChoose==3){
        //选单个，如果都选了状态变1，有一个不选状态变2
        let arr=[];
        for(let key in goodsData){
            if(goodsData[key].goods.length>0){
                goodsData[key].goods.forEach((n,i)=>{
                    if(n.product_id==product_id){
                        if(!num){
                            //选择
                            n.choose=!n.choose;
                        }else{
                            //选择+选数量
                            n.store_nums=parseInt(n.store_nums);

                            n.choose=true;
                            n.num=parseInt(num);

                            n.sell_total=parseInt(n.num)*(n.sell_price);
                            if(num>n.num){
                                n.store_nums=n.store_nums+1;
                            }else{
                                n.store_nums=n.store_nums-1;
                            }
                        }
                    }
                    if(n.choose==false){
                        arr.push(n);
                    }else{
                        chooseGoods.push(n.product_id);
                    }
                })
            }
        }
        if(arr.length>0){
            chooseStatus=2;
        }else{
            chooseStatus=1;
        }
    }else if(!product_id && allChoose){
        //全不选
        if(allChoose==2){
            for(let key in goodsData){
                if(goodsData[key].goods.length>0){
                    goodsData[key].goods.forEach((n,i)=>{
                        n.choose=true;
                        chooseGoods.push(n.product_id);
                    })
                }
            }
            chooseStatus=1;
        }else if(allChoose==1){
            //全选
            for(let key in goodsData){
                if(goodsData[key].goods.length>0){
                    goodsData[key].goods.forEach((n,i)=>{
                        n.choose=false;
                        chooseGoods.length=0;
                    })
                }
            }
            chooseStatus=2;
        }
    }
    returnData=goodsData;

    return{
        type:ALL_GOODS_DATA,
        product_id,
        data:returnData,
        allChoose:chooseStatus,
        chooseGoodsArray:chooseGoods,
    }
}

//delete
export const DELETE_GOODS_DATA='DELETE_GOODS_DATA'
export function deleteGoods(product_id){
    return{
        type:DELETE_GOODS_DATA,
        product_id
    }
}

