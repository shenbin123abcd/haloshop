var browserHistory=ReactRouter.browserHistory;
var withRouter=ReactRouter.withRouter
var GoBack=React.createClass({

    handlerClick(){
        if(history.length!=1){
            browserHistory.goBack()
        }else{
            browserHistory.push('/h5/index')
        }
    },
    render(){
        let {goBack}=this.props;
        if(goBack){
            return(
                <div className="go-back" onClick={this.handlerClick}><span className="haloIcon haloIcon-back"></span></div>
            )
        }else{
            return null
        }
    }

})
var CommonHeader = React.createClass({
    componentDidMount() {

    },

    render: function() {
        var {title,children,goBack=true}=this.props;
        let back=this.props.back;
        let none=this.props.none;
        let renderLeftBtn=()=>{
            if(back){
                return(
                    <div className="go-back" onClick={back}><span className="haloIcon haloIcon-back"></span></div>
                )
            }else if(none){
                return(
                    <span></span>
                )
            }else{
                return(
                    <GoBack goBack={goBack} />
                )
            }
        }
        return (
            <div className="common-header-wrapper">
                <div className="left-box">
                    {renderLeftBtn()}
                </div>
                <div className="title">{title}</div>
                <div className="right-box">
                    {children}
                </div>
            </div>
        );
    }
});



// export default Index
function mapStateToProps(state) {
    return {

    }
}


export default ReactRedux.connect(mapStateToProps)(CommonHeader)