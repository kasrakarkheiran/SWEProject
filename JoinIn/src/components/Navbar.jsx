import {Link} from "react-router-dom";
import {pageData} from "./pageData"
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
        /*
        <div className="navbar">
            
            {pageData.map((page) => {
                return (
                    <Link to={page.path} className="navItem">
                        <button>
                            {page.name}
                        </button>
                    </Link>
                );
            })}
        </div>
        */
        // Renders divs based on whether there's a user in local storage or not
        <div className="navbar">
            {user && (
                <div>
                    <span>{user.email}</span>
                    <button><Link to="/profile">Profile</Link></button> 
                    <button onClick={handleClick}>Log out</button>
                </div>
            )}
            {!user && (
                <div>
                <button><Link to="/login">Login</Link></button>         
                <button><Link to="/signup">Signup</Link></button>
                </div>)}
        </div>

    )
}