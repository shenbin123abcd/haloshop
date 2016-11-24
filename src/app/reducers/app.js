import indexData from './index.list'
import verifyCodeData from './verifyCode'
import detailData from './detail.list'
import shopCartData from './shopCart.data'
import commonCartData from './common.headerCart'
import shopChooseGoods from './shopCart.choose'
import payListData from './pay.list'
import payChooseWay from './pay.chooseWay'
import orderData from './order.list'
import userData from './user.num'
import collectData from './collect.list'
import accountData from './account.list'
import paySuccess from './pay.success'
import caseData from './myCase.list'


var reduxFormReducer=ReduxForm.reducer

export default Redux.combineReducers({
    indexData,
 	form: reduxFormReducer,
    verifyCodeData,
    detailData,
    shopCartData,
    commonCartData,
    shopChooseGoods,
    payListData,
    payChooseWay,
    orderData,
    userData,
    collectData,
    accountData,
    paySuccess,
    caseData
})