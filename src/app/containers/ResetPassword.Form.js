
import VerifyCode from './Common.verifyCode'
var Field=ReduxForm.Field;
var reduxForm=ReduxForm.reduxForm;

const MyVerifyCode = props => (
    <VerifyCode {...props} value={props.input.value} onChange={props.input.onChange}  />
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
                    <Field  className="control sp"  name="phone" component={MyVerifyCode} verifyType="forget" type="number" placeholder="请输入手机号" />
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control sp" name="code" component="input" type="text" placeholder="请输入验证码"/>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control sp" name="password" component="input" type="password" placeholder="请输入密码"/>
                    <div className="line"></div>
                </label>
                <label className="group">
                    <Field  className="control sp" name="rePassword" component="input" type="password" placeholder="请再次输入密码"/>
                    <div className="line"></div>
                </label>
                <div className="group-bt">
                    <button className="btn btn-block btn-color-main btn-size-main" type="submit" disabled={ submitting}>完成</button>
                </div>
            </form>
        );
    }
});




export default reduxForm({
    form: 'resetPwdForm'  // a unique identifier for this form
})(Reg)