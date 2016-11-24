import CommonHeader from './Common.header'


var browserHistory=ReactRouter.browserHistory;
var Feedback=React.createClass({
    handleBack(){
        browserHistory.push('/h5/about');
    },
    handleClick(e){
        if(!e.content){
            app.modal.alert({
                content:'请输入您的反馈',
                btn:'知道了'
            });
        }else{
            app.ajax(`/api/user/feedback`,e,'POST').then((res)=>{
                if(res.iRet==1){
                    hb.lib.weui.toast('提交成功');
                    setTimeout(()=>{
                        browserHistory.push(`/h5/about`);
                    },500);
                }else{
                    app.modal.alert({
                        content:res.info,
                        btn:'知道了'
                    });
                }
            },()=>{
                app.modal.alert({
                    content:'网络繁忙稍后再试',
                    btn:'知道了'
                });
            })
        }
    },
    render(){
        return(
            <div className="feedback-page">
                <CommonHeader title="意见反馈" back={this.handleBack}></CommonHeader>
                <div className="feedback-content">
                    <textarea placeholder="您的反馈将帮助我们更快的成长" ref="feedback"></textarea>
                    <div className="center-ben" onClick={e=>this.handleClick({
                        content:$(this.refs.feedback).val()
                    })}>提交</div>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state) {
    const {}=state;
    return {

    }
}

export default ReactRedux.connect(mapStateToProps)(Feedback)
