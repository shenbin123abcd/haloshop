;app.ajax=function( url , settings ,method ){
    //var ajax=( url , settings )=>{
    let token=hb.Cookies.getJSON('hb_shop_token');

    let param=hb.location.url('?openid');
    let openId=hb.Cookies.getJSON("hb_shop_openId");

    if(!openId && Modernizr.weixin){
        if(param){
            hb.Cookies.set('hb_shop_openId',param);
        }else{
            window.location.href='http://wechat.halobear.com/shop';
        }
    }
    if(token){
        return $.ajax({
            url:url,
            data:settings,
            headers:{Authorization:`Bearer ${token}`},
            method:method,
        }).then((res)=>{
            if(res.iRet==-1){
                window.location.href=res.data+encodeURIComponent(window.location.href)
                return res
            }else{
                return res
            }
        },(res)=>{
            return res
        });
    }else{
        var deferred = $.Deferred();
        window.location.href='/h5/login';
        return deferred.promise();
    }
};


