import { UserContext, Card } from './context.js';
import {useContext, useState, useEffect} from 'react';
import Navbar from './navbar.js';

function Balance(){
  const ctx = useContext(UserContext)
  const [user, setUser] = useState('');
  const [chk, setChk] = useState(0);
  const [sv, setSv] = useState(0);
  //const [showBalance, setShowBalance] = useState(false);
  const [account, setAccount] = useState('');
  const [er, setEr] = useState('');

  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem('user');
    if(storedUsername){
      ctx.user[0] = storedUsername;
      setUser(storedUsername);
      console.log(user)
      fetch(`/account/findOne/${storedUsername}`)
        .then(async r => r.json())
        .then((r) => {
          setChk(Number(r[0].chk_balance));
          setSv(Number(r[0].sv_balance));
        })
        .catch(e => {
          console.log(e)
        })
      console.log(ctx.user[0]);
    }
  }, []);
  return (
    <>
      <Navbar />
      {(user !== '') && (<div className='avatar' style={{fontSize:'larger', textAlign:'right', padding:'40px', fontFamily:'monospace'}}><i class="fa-solid fa-user"></i>{user}</div>)}
      <Card 
      bgcolor="light"
      txtcolor='dark'
      header="Account Balance"
      body={(
        <>

        {/*
          showBalance  && (
          <>
           <div style={{fontFamily:'cursive', fontSize:'larger'}}>Balance: {ctx.users[ctx.users.findIndex(e => e.email === user)].balance} 
           {(ctx.users[ctx.users.findIndex(e => e.email === user)].balance<0) && (<div className='text-danger' style={{fontWeight:'bold'}}>Overdrawn Account !!</div>)} </div> 
            <br/>
          </>
          )
          */}
          <label for="accounts" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Account</label>

          <select id="accounts" style={{margin:5, borderRadius:'5px'}} onChange={(e) => {
            if((user !== '')){
              setAccount(e.currentTarget.value);
            }
            else{
              setEr("Please log in to view balances.");
              setTimeout(()=>{setEr("")}, 4000);
            }
            
           }}>
          
            <option value="default" selected disabled hidden>Account Type</option>
            <option value='checking'>Checking Account</option>
            <option value='saving'>Saving Account</option>
          
          </select>
          <div className='text-warning'>{er}</div>
          {
          (user) && 
          (() => {
            if(account==='checking'){
            return (
            <div>
              <p style={{fontFamily:'monospace'}}>Checking: {chk}</p>
              {(chk<0) && (<div className='text-danger' style={{fontWeight:'bold'}}>Overdrawn Account !!</div>)}
            </div>)}
            else if(account === 'saving'){
              return (
              <div>
                <p style={{fontFamily:'monospace'}}>Saving: {sv}</p>
                {(sv<0) && (<div className='text-danger' style={{fontWeight:'bold'}}>Overdrawn Account !!</div>)}
              </div>)
            }
          })()
          }
          
        </>
      )} />
    </>
    
  )
}

export default Balance;
