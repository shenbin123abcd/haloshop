import RegionSelect from './Common.RegionSelect'
import VerifyCode from './Common.verifyCode'
var Field=ReduxForm.Field;
var reduxForm=ReduxForm.reduxForm;

const MyVerifyCode = props => (
    <VerifyCode {...props} value={props.input.value} onChange={props.input.onChange}  />
);
const MyRegionSelect = props => (
    <RegionSelect {...props} value={props.input.value} onChange={props.input.onChange}  />
);
var Reg = React.createClass({
    componentDidMount() {

    },
    handlePhoneChange(e) {
        // console.log(e)
        
    },
    phone:null,
    render: function() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        // console.log(this.props)
        return (
            <form className="app-form-wrapper-1" onSubmit={handleSubmit}>
                <label className="group">
                    <Field  className="control"  name="phone" component={MyVerifyCode} verifyType="register" type="number" placeholder="请输入手机号" />
                    <i className="haloIcon haloIcon-phone control-i"></i>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control" name="code" component="input" type="text" placeholder="请输入验证码"/>
                    <i className="haloIcon haloIcon-yanzhma control-i"></i>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  name="areaCode"  className="control"  placeholder="请选择所属地址" component={MyRegionSelect}/>
                    <i className="haloIcon haloIcon-region control-i"></i>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control" name="company" component="input" type="text" placeholder="请输入公司名"/>
                    <i className="haloIcon haloIcon-company control-i"></i>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control" name="address" component="input" type="text" placeholder="请输入公司地址"/>
                    <i className="haloIcon haloIcon-address control-i"></i>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control" name="username" component="input" type="text" placeholder="请输入用户名"/>
                    <i className="haloIcon haloIcon-yonghuming control-i"></i>
                    <div className="line"></div>
                </label>
                <div className="group-bt">
                    <button className="btn btn-block btn-color-main btn-size-main" type="submit" disabled={ submitting}>注册</button>
                </div>
            </form>
        );
    }
});




export default reduxForm({
    form: 'regForm'  // a unique identifier for this form
})(Reg)