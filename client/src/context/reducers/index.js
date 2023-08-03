import { combineReducers } from "redux";
import userReducer from "./userReducers";
import alertReducer from "./alertReducer";
import productReducers from "./productReducers";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./ordersReducer";




const myReducers = combineReducers({

    user: userReducer,
    alert: alertReducer,
    products: productReducers,
    allUsers: allUserReducer,
    cart: cartReducer,
    isCart: displayCartReducer,
    orders: ordersReducer

})

export default myReducers;