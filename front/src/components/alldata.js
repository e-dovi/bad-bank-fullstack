import { UserContext, Card } from './context.js';
import {useContext, useEffect, useState} from 'react';
import Navbar from './navbar.js';

function AllData(){
  const [user, setUser]         = useState('');
  const [data, setData] = useState([])
  const ctx = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      setLoading(true)
      ctx.user[0] = storedUsername;
      setUser(storedUsername);
      console.log(ctx.user[0]);

      if(ctx.user[0]){
        fetch(`/account/findOne/${ctx.user[0]}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data[0].events); 
            setTimeout(() => {setLoading(false)}, 5000);               
    });
      }
      else{
        console.log(`user not logged in.`)
      }
    
    }
    else{
      console.log(`user not logged in.`)
    }
  }, []);

  return (

    <>
    <Navbar />
    {(user !== '') && (<div className='avatar' style={{fontSize:'larger', textAlign:'right', padding:'40px', fontFamily:'monospace'}}><i class="fa-solid fa-user"></i>{user}</div>)}
    {(user !== '') && (<h5 style={{textAlign:'center', paddingTop:40, fontFamily:"sans-serif"}}>Recent Activities</h5>)}
    {(user === '') && (<h5 style={{textAlign:'center', paddingTop:40, fontFamily:"sans-serif"}}>Please log in to view the recent activities on your account.</h5>)}
    {(loading) && (<div style={{textAlign:'center', paddingTop:100}}><i className="fa-solid fa-arrow-down fa-beat-fade fa-2xl"></i></div>)}

    <div>{data.map(s => {
      return (
      <div> 
        <Card 
          bgcolor="body-secondary"
          txtcolor='info-emphasis'
          header="Account Activity"
          body={
            (
            <div style={{fontFamily:'monospace'}}>
              <div><div className='text-info' style={{display:'inline'}}>Type:</div> <div style={{display:'inline'}} className='text-dark'>{s.type}</div></div><br/>
              <div><div className='text-info' style={{display:'inline'}}>User:</div> <div style={{display:'inline'}} className='text-dark'>{s.user}</div></div><br/>
              <div><div className='text-info' style={{display:'inline'}}>Amount:</div> <div style={{display:'inline'}} className='text-dark'>{s.amount}</div></div><br/>
              <div><div className='text-info' style={{display:'inline'}}>Date, time:</div> <div style={{display:'inline'}} className='text-dark'>{s.time}</div></div><br/>
            </div>
          )
          }
          />
      </div>
      )
    })}</div>
    </>
  );
}

export default AllData;
