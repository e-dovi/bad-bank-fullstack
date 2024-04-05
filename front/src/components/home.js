//import { useNavigate, NavLink} from 'react-router-dom';
import { /*UserContext,*/ Card } from './context.js';
//import {useContext} from 'react';
import Navbar from './navbar.js';
import bank from '../img/bank.png';


function Home(){
  //const ctx = useContext(UserContext)
    return (
      <>
      <Navbar />

      <Card
        txtcolor="white"
        bgcolor='secondary'
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src={bank} className="img-fluid" alt="Responsive"/>)} /> 
      </>   
    );  
  }

  export default Home;

