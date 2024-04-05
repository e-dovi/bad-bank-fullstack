import { UserContext, Card } from './context.js';
import {useContext, useState, useEffect} from 'react';
import Navbar from './navbar.js';

function Deposit(){

  const [account, setAccount]   = useState('');
  const [amt, setAmt]           = useState(0);
  //const [showBalance, setShowBalance] = useState(false);
  //const [balance, setBalance] = useState(0)
  const [scs, setScs]           = useState('');
  const [er, setEr]             = useState('');
  const [user, setUser]         = useState('');
  const [loading, setLoading]   = useState(false);
  const ctx = useContext(UserContext);

  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      ctx.user[0] = storedUsername;
      setUser(storedUsername);
      console.log(ctx.user[0]);
    }
  }, []);

  const validate = (i) => {
    if (i<0){
      setEr('Amount cannot be negative.')
      setTimeout(()=>{
        setEr('')
      }, 4000)
      
    }
    else if (typeof(Number(i)) !== 'number'){
      setEr('Amount must be a number.')
      setTimeout(()=>{
        setEr('')
      }, 4000)
    }
    else if(user === ''){
      setEr('Please log in to make a deposit.');
      setTimeout(()=>{
        setEr('');
      }, 4000)
    }
    else{
      return true;
    }
  }

  const handleSubmit = () => {
    setEr('');
    if(validate(amt)){
     /* ctx.users[ctx.users.findIndex(e => e.email === user)].balance += Number(amt);
      ctx.submissions.push({type:'Money Deposit', user:user, amt:amt});
      setBalance(prev => prev + Number(amt));*/
      if(((ctx.user[0]))&&(typeof(ctx.user[0]) !== undefined)){
        const email = ctx.user[0];
        fetch(`/account/update/${email}/${amt}/${account}/${account} Deposit`)
        .then(r => r.json())
        .then(m => {
          if(m.updated){
            setAmt(0);
            setLoading(true);
            setScs('Money deposited.');
            setTimeout(() =>{
              setScs('');
          }, 4000);
          setTimeout(() =>{
            setLoading(false);
        }, 5000);
          }
          else{
            setEr('Something went wrong, please try again later.');
            setTimeout(() => {setEr('')}, 4000);
          }
        })
        .catch(e => {
          console.log(e);
        })
      }
      
    }

    //fetch(`/account/update/${email}/${amount}/${account}`)
      
    
  }

  return (
  <>
    <Navbar />
    {(user !== '') && (<div className='avatar' style={{fontSize:'larger', textAlign:'right', padding:'40px', fontFamily:'monospace'}}><i class="fa-solid fa-user"></i>{user}</div>)}
    <Card 
      bgcolor="light"
      txtcolor='dark'
      header="Make a Deposit"
      success = {scs}
      body={(
        <>

        {/*
          showBalance  && (
          <>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Balance: {ctx.users[ctx.users.findIndex(e => e.email === user)].balance}</div> 
            <br/>
           <div style={{fontFamily:'cursive', fontSize:'large'}}>Added: {Number(balance)}</div> 
          </>
          )
          */}
          <label for="accounts" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Account</label>

          <select id="accounts" style={{margin:5, borderRadius:'5px'}} onChange={(e) => {
            setAccount(e.currentTarget.value) }}>
          
            <option value="default" selected disabled hidden>Account Type</option>
            <option value='Checking'>Checking Account</option>
            <option value='Saving'>Saving Account</option>
            
          
          </select>

          <label for="num" style={{padding:10, fontSize:'large', fontWeight:'bold'}} className='text-info'>Enter Amount</label>

          <input style={{width:100, margin:5, borderRadius:'5px'}} id='num' type='number' min={0} value={amt} 
          onChange={(e) => { setAmt(e.currentTarget.value) }} placeholder='0.00' required/>
          
          <br/>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit} disabled={(Number(amt) === 0) ||  (account === '')} style={{ margin:10}}>Deposit</button>
          <div className='text-warning'>{er}</div>

          {loading && <i class="fa-solid fa-sack-dollar fa-beat fa-xl" style={{color: '#020431', margin:'5%'}}></i>}
        </>
      )} />
    
  </>
    
  )
}

export default Deposit;