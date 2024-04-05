import Navbar from './navbar.js';
import { Card, UserContext } from './context.js';
import {useState, useContext, useEffect} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const provider = new GoogleAuthProvider();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.SenderID,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function Login(){
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [status, setStatus]       = useState('');
  const [scs, setScs]             = useState('');
  const [user, setUser]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [gDisabled, setGDisabled] = useState(false);
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
  function handleLogin (){
    
    if (!validate(email,    'Email'))    return;
    if (!validate(password, 'Password')) return;
    setLoading(true);
    ctx.user[0] = email;
    
    const url = `/account/login/${email}/${password}`;

    (async () => {
      var res  = await fetch(url);
      var data = await res.json();    
            
      if(data.logged_in){
        setLoading(false);
        setScs('Login successful!');
        setUser(email);
        
        ctx.auth[0] = true;
        
        localStorage.setItem('user', email);
        setEmail('');
        setPassword('');

        setTimeout(() => {
          setScs('');
        }, 3000);    
      }
      else if(data.reason) {
        setLoading(false);
        setStatus(data.reason);
        setTimeout(() => {
          setStatus("");
        }, 4000)
      }

  })()   
  }
  const googleSignIn = () => {
    setGDisabled(true);
    signInWithPopup(auth, provider)
    .then((result) => {
      if(result){
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const email = user.email;
        const name = user.displayName
        return {email, name};
      } 
    })
    .then(async (e) =>{

      ctx.user[0] = e.email;

      const url = `/account/create/${e.name}/${e.email}/generated-password`;
      const uri = `/account/login/${e.email}/generated-password`;

      var res  = await fetch(url);
      var rjson = await res.json();  
      
      console.log(rjson);

      if((rjson["existing-user"])||(rjson.Inserted)){
        var r  = await fetch(uri);
        var data = await r.json(); 
        console.log(data);
        if(data.logged_in){
        
          setScs('Login successful!');
          setUser(e.email);
          
          ctx.auth[0] = true;
          
          localStorage.setItem('user', e.email);
          setGDisabled(false);

          setEmail('');
          setPassword('');
  
          setTimeout(() => {
            setScs('');
          }, 3000);    
        }
        else{
          setStatus("Something went wrong. Please try again later.");
          setTimeout(() => {
            setStatus('');
          }, 3000); 
          setGDisabled(false);
        }
      }
      else{
        setStatus("Something went wrong. Please try again later.");
        setTimeout(() => {
          setStatus('');
        }, 3000); 
        setGDisabled(false);
      } 
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
      setStatus("Authentication unsuccessful. Please try again later.");
      setTimeout(() => {
        setStatus('')
      }, 3000);
      setGDisabled(false);
    })
  }
  return (
   <>
    <Navbar />
    {(user !== '') && (<div className='avatar' style={{fontSize:'larger', textAlign:'right', padding:'40px', fontFamily:'monospace'}}><i class="fa-solid fa-user"></i>{user}</div>)}
    <Card
      bgcolor="primary-subtle"
      txtcolor='info-emphasis'
      header="Login"
      status = {status}
      success = {scs}
      body={ (user ==='') ? (  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" style={{margin:'1%'}} className="btn btn-dark" onClick={handleLogin}>Login</button>
              <button className="btn btn-dark" style={{margin:'1%'}} onClick={googleSignIn} disabled={gDisabled}><i class="fa-brands fa-google fa-lg"></i> Google Sign In </button>
              {loading && <i className="fa-sharp fa-solid fa-circle fa-flip fa-lg" style={{color: '#020431', margin:'5%'}} ></i>}
              </>
            ) : 
            (<div style={{fontFamily:'monospace', fontSize:'large'}}>
              Logged in as {user}
              <button className="btn btn-dark" onClick={() => {localStorage.removeItem('user'); setUser('')}}>Log Out</button>
            </div>)
          }
    />
    </>   
  )  
}

export default Login;
