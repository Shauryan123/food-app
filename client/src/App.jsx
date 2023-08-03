import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import { Login, Main } from './containers';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, getAllProducts, getAllUsers, validateUserJWTToken } from './api';
import {setUserDetails} from './context/actions/userActions'
import {motion} from 'framer-motion';
import { fadeInOut } from './animations';
import { MainLoader, UsersOrder } from './components';
import {Alert} from './components'
import {Dashboard} from './containers';
import { getCartItems, setCartItems } from './context/actions/cartAction';
import {CheckOutSuccess} from './components';
import { setAllUserDetails } from './context/actions/AllUsersActions';
import { setAllProducts } from './context/actions/productActions';




function App() {

    const firebaseAuth = getAuth(app);
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector(state => state.products);

    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

  const allUsers = useSelector(state => state.allUsers);


  useEffect(() => {
    if (!allUsers) {

    getAllUsers().then((data) => {

      console.log("THE USES ARE>>> " + data);

      dispatch(setAllUserDetails(data));

    })



    }
  }, [])

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

    useEffect(() => {
        setIsLoading(true);
        firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {

                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                  if (data) {
                    getAllCartItems(data.user_id).then((items) => {
                      console.log(items);
                      dispatch(setCartItems(items));
                    });
                  }
                  dispatch(setUserDetails(data));
                })

              })



            }
            setInterval(() => {
              setIsLoading(false)
            }, 3000)
          })


    }, [])

    return (

        <div className="text-blue-500 w-screen min-h-screen h-auto flex flex-col justify-center items-center font-semibold">
          {isLoading && (<motion.div {...fadeInOut} className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"><MainLoader/></motion.div>)}
            <Routes>
                <Route path='/*' element={<Main/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard/*' element={<Dashboard/>}/>
                <Route path='/checkout-success' element={<CheckOutSuccess/>}/>
                <Route path='/user-orders' element={<UsersOrder/>}/>
            </Routes>

            {/* <Alert type="info" message="Hi There"/> */}
            {alert?.type && <Alert type={alert?.type} message={alert?.message}/>}
        </div>

    )
}

export default App;