import { NavLink} from 'react-router-dom';

function Navigate(){
    

 /* {<li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>}*/


       return ( 
        
        <ul className="nav nav-tabs">

              <NavLink to="/" title="BadBank Home" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}>  <div className='navItem'>BadBank</div> </NavLink>
              <NavLink to='/create-account' title="Create an account" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}><div className='navItem'>Create Account</div></NavLink>
              <NavLink to="/login" title="Login" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}>  <div className='navItem'>Login</div> </NavLink>
              <NavLink to="/deposit" title="Make a deposit" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}>  <div className='navItem'>Deposit</div> </NavLink>
              <NavLink to="/withdraw" title="Withdraw from your account" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}> <div className='navItem'>Withdraw</div> </NavLink>
              <NavLink to="/balance" title="Look up your balance" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}> <div className='navItem'>Balance</div> </NavLink>
              <NavLink to="/allData" title="All data" className={ ({ isActive }) => isActive? "nav-link active" : "nav-link"}> <div className='navItem'>All Data</div> </NavLink>
              
              

             { /*<NavLink to="/create-account" className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>  <div className='navItem'>Create Account</div> </NavLink>
              <NavLink to="/login" className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>  <div className='navItem'>Login</div> </NavLink>
              <NavLink to="/withdraw" className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}>  <div className='navItem'>Withdraw</div> </NavLink> */}

        </ul>
       )
}

export default Navigate;