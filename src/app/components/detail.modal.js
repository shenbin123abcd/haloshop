
export default React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        let n=this.props.status;

        let id=this.props.id;
        let num=this.props.num;
        let store_nums=this.props.store_nums;
        let price=this.props.price;
        let product_id=this.props.product_id;

        if( nextProps.status!==n ||
            nextProps.num!==num ||
            nextProps.id!==id ||
            nextProps.store_nums!==store_nums ||
            nextProps.price!==price ||
            nextProps.product_id !== product_id
        ){
            return true
        }else{
            return false
        }

    },

    render(){
        let n=this.props.status;
        let modalClose=this.props.modalClose;
        let data=this.props.data;
        let chooseGoods=this.props.chooseGoods;
        let finalId=this.props.finalId;
        let handleNum=this.props.handleNum;
        let addToCart=this.props.addToCart;
        let centerToBuy=this.props.centerToBuy;
        //id:1打开，id:2关闭，!id初始化

        let id=this.props.id;
        let num=this.props.num;
        let store_nums=this.props.store_nums;
        let price=this.props.price;
        let product_id=this.props.product_id;




        //console.log(n);
        //console.log(id,num,store_nums,price,product_id);

        if(n.modalIsOpen==false){
            $('body').css('overflow-y','auto');
            if(!n.modalId){
                n.maskClass='modal-block-mask hidden';
                n.dialogClass='modal-block-dialog hidden';
            }else if(n.modalId==2){
                $('body').css('overflow-y','auto');
                n.maskClass='modal-block-mask hidden';
                n.dialogClass='modal-block-dialog animated fadeOutDown';
            }
        }else if(n.modalIsOpen==true && n.modalId==1){
            n.maskClass='modal-block-mask';
            n.dialogClass='modal-block-dialog animated fadeInUp';
            $('body').css('overflow-y','hidden');
            if(n.modalCate=='buy'){
                n.buyClass='modal-dialog-alert';
                n.cartClass='modal-dialog-alert hidden';
            }else if(n.modalCate=='cart'){
                n.buyClass='modal-dialog-alert hidden';
                n.cartClass='modal-dialog-alert';
            }
        }


        //加减
        let renderBtn=()=>{
            if(data.is_limit==1 || data.is_virtual==1){
                return(
                    <div className='choose-num-btn'>
                        <div className="square">-</div>
                         <div className="square border">1</div>
                        <div className="square">+</div> 
                    </div>
                )
            }else{
                if(num==1){
                    return(
                        <div className='choose-num-btn'>
                            <div className="square">-</div>
                             <div className="square border">{num}</div>
                            <div className="square" onClick={e=>handleNum({id:id,num:1})}>+</div>
                        </div>
                    )
                }else if(store_nums<=0){
                    return(
                        <div className='choose-num-btn'>
                            <div className="square" onClick={e=>handleNum({id:id,num:-1})}>-</div>
                             <div className="square border">{num}</div>
                            <div className="square">+</div>
                        </div>
                    )
                }else{
                    return(
                        <div className='choose-num-btn'>
                            <div className="square" onClick={e=>handleNum({id:id,num:-1})}>-</div>
                             <div className="square border">{num}</div>
                            <div className="square" onClick={e=>handleNum({id:id,num:1})}>+</div>
                        </div>
                    )
                }


            }
        }

        return(
            <div className='detail-modal modal-alert-block'>
                <div className={n.maskClass} onClick={modalClose}></div>
                <div className={n.dialogClass}>
                    <div className='modal-dialog-body'>
                        <div className="modal-dialog-header">
                            <div className="pic-block">
                                <div>
                                    <img src={data.cover} alt="" style={{height:'2rem'}}/>
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="text-block">
                                <div className="title">
                                    {data.name}
                                </div>
                                <div className="subtitle">
                                    {data.subtitle}
                                </div>
                                <div className="sell-price">
                                    ￥ <span className="price">{price.split('.')[0]}</span>.{price.split('.')[1]}
                                    <span className="store_nums">库存：<span className="num">{store_nums}</span>件</span>
                                </div>
                            </div>
                        </div>
                        <div className='modal-dialog-choose'>
                            <div className='choose-num'>
                                <div className='text'>数量</div>
                                {renderBtn()}
                            </div>
                            <div className="choose-type">
                                    {
                                        data.specs.map((n,i)=>{
                                            //console.log(n);
                                            //console.log(data.sku);
                                            return(
                                                <div key={i} className="flex">
                                                    <div className="text">{n.name}</div>
                                                    <Item
                                                        data={n.value}
                                                        chooseGoods={chooseGoods}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                        <div className='modal-dialog-footer'>
                            <div className={n.buyClass} onClick={e=>centerToBuy({product_id:product_id,num:num})}>确认购买</div>
                            <div className={n.cartClass} onClick={e=>addToCart({product_id:product_id,num:num})}>加入购物车</div>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
});

var Item=React.createClass({
    render(){
        let n=this.props.data;
        let chooseGoods=this.props.chooseGoods;
        return(
            <div className="type-list">
                {
                    n.map((n,i)=>{
                        let specs_key=`;${n.spec_id}:${n.id};`;
                        return(
                            <div
                                className={n.classActive}
                                key={i}
                                onClick={e=>chooseGoods({
                                    num:n.num,
                                    id:n.id,
                                    spec_id:n.spec_id,
                                    classActive:n.classActive
                                })}
                            >
                                {n.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});
