import {UserContext, Card} from '../components/context.js';
import {useState, useContext, useEffect} from 'react';
import Navbar from './navbar.js';


function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
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

  function validate(field, label){
     function spaces(){
      let text = field.split('');
      let s = 0
      let c = 0
      for(let i=0; i<text.length; i++){
        if(text[i].charCodeAt(0)===32) {
          s += 1;
        }
        else{
          c += 1;
        }
      }
      if ((s===text.length)|| (s>=c)){
        return true;
      }
      else{
        return false;
      }
      
     }
     
     if(spaces()){
          setStatus(`${label} must be valid characters.`);
          setTimeout(() => setStatus(''), 3000);
          return false
     }
      if(label==='Password'){
        if(password.split('').length<8){
          setStatus('Password must be at least 8 characters.');
          setTimeout(() => setStatus(''), 3000);
          return false
        }
      }
     else{
      if (!field) {
        setStatus(`Please verify ${label} field.`);
        setTimeout(() => setStatus(''), 3000);
        return false;}
        
      
      }
      
      
      return true;
  }


  function handleCreate(){
    console.log(name, email, password);
    if (!validate(name,     'Name'))     return;
    if (!validate(email,    'Email'))    return;
    if (!validate(password, 'Password')) return;
    //ctx.users.push({name, email, password, balance:0});
    //ctx.submissions.push({type:'Account creation', user: email, amt:0});
    setLoading(true);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data); 
        
        if((data) && (data.Inserted)){
          setShow(false);
        }
        else if(!!data["existing-user"]){
          setLoading(false);
          setStatus("User already exists. Please log in.");
          setTimeout(() => {
            setStatus("")
          }, 4000)
        }
        else{
          setLoading(false);
          setStatus("Something went wrong. Please try again later.");
          setTimeout(() => {
            setStatus("")
          }, 4000)
        }      
    })()
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <>
    <Navbar />
    {(user !== '') && (<div className='avatar' style={{fontSize:'larger', textAlign:'right', padding:'40px', fontFamily:'monospace'}}><i class="fa-solid fa-user"></i>{user}</div>)}
    <Card
      bgcolor="primary-subtle"
      txtcolor='info-emphasis'
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-dark" onClick={handleCreate} disabled={(name === '')&&(email === '')&&(password === '')&&(loading)}>Create Account</button>
              {loading && <i class="fa-sharp fa-solid fa-circle fa-flip fa-lg" style={{color: '#020431', margin:'5%'}}></i>}
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-dark" onClick={clearForm}>Add another account</button>
              </>
            )
          }/>  
    </>
  )
}

export default CreateAccount;