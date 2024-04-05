//import {Home allData, balance, deposit}
import Home from '../components/home.js';
import CreateAccount from '../components/createaccount.js';
import Login from '../components/login.js';
import Deposit from '../components/deposit.js';
import Withdraw from '../components/withdraw.js';
import Balance from '../components/balance.js';
import AllData from '../components/alldata.js';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements /*,useNavigate, NavLink*/} from 'react-router-dom';
import {UserContext} from '../components/context.js';
import './App.css';

const router = 
  createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Home/>} />
    <Route path='create-account' element={<CreateAccount/>} />
    <Route path='login' element={<Login/>} />
    <Route path='deposit' element={<Deposit />} />
    <Route path='withdraw' element={<Withdraw />} />
    <Route path="allData" element={<AllData />} />
    <Route path='balance' element={<Balance />} />
    </>
 ))

function App() {
 // const select = useSelector(selectCart)
  return (
      <UserContext.Provider value={{user:['none'], auth:[false]}}>
        <RouterProvider router={router} />
      </UserContext.Provider>
  );
}


export default App;
