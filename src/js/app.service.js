/**
 * Created by i7z97pro_iyghuygu on 2016/10/4.
 */

;app.service=(function( url , settings ,method ){

    function findRegion(data){
        var deferred=$.Deferred();
        // console.log(data);

        data=data||{};
        if(data.region_id===''){
            return deferred.promise()
        }
        sendXhr();
        function sendXhr(){
            $.ajax({
                type:'GET',
                url:'/api/public/region?version=2',
                data:data,
                dataType:'json',
                success: function(res) {
                    if(res.iRet==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(error) {
                    deferred.reject('网络繁忙请稍候再试');
                }
            })
        }
        return deferred.promise();
    }
    return {
        findRegion:findRegion
    };
}());


