import {Link} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import {useLogout} from '../hooks/useLogout'

export function Navbar(){
    //logout logic
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
      <nav className="navbar">
      <div className="navbar-content">
        <Link to="/home" className="navbar-brand">
          JoinIn
        </Link>

        <div className="navbar-items">
          {user && (
            <div className="navbar-user-section">
              <span className="navbar-email">{user.email}</span>
              <Link to="/home" className="navbar-link">
                Home
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
              <button className="navbar-logout-btn" onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="navbar-auth-section">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>


    )
}