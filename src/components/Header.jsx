import './Header.css'
import {link} from '../backend'
import { useNavigate } from 'react-router-dom';


const Header = ({refreshToken}) => {
  const navigate = useNavigate();
  
  const signout = () =>{
    fetch(link+"logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token-refresh": localStorage.getItem("auth-token-refresh"),
        "auth-token-refresh":refreshToken,
        "auth-token-access": "dummy"
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log('Header > signout', data)
        // localStorage.setItem("auth-token-refresh", null);
        localStorage.removeItem("auth-token-refresh");
        // window.location.href = "/";
        navigate('/', { replace: true });

      })
      .catch((error) => {
        console.error("err", error);
      })
  }
    return ( <>
    <div className='header-main'>
      <div className='header-navbar'>
        <button onClick={signout}>Signout</button>
      </div>
    </div>
    </>  );
}
 
export default Header;