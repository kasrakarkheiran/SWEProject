import {useState} from 'react'
import {useLogin} from '../hooks/useLogin.jsx'
import {Link} from 'react-router-dom'
import { LogIn} from 'lucide-react'
import '../styles/login.css'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        //prevent default refresh
        e.preventDefault()

        await login(email, password)
    }


    return (
        // <form className="login" onSubmit={handleSubmit}>
        //     <h3>Log in</h3>

        //     <label>Email:</label>
        //     <input 
        //         type="email" 
        //         onChange={(e) => setEmail(e.target.value)} 
        //         value={email}
        //     />
        //     <label>Password:</label>
        //     <input 
        //         type="password" 
        //         onChange={(e) => setPassword(e.target.value)} 
        //         value={password}
        //     />

        //     <button disabled={isLoading}>Log in</button>
        //     {error && <div class="error">{error}</div>}
        // </form>
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                <div className="login-icon">
                    <LogIn size={32} />
                </div>
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Log in to your PlayTogether account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                    Email Address
                    </label>
                    <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                    Password
                    </label>
                    <input
                    id="password"
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
                </div>

                {error && (
                    <div className="error-message">
                    <span className="error-icon">⚠</span>
                    <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="btn-login"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
                </form>

                <div className="login-divider">
                <span>Don't have an account?</span>
                </div>

                <Link to="/signup" className="btn-signup-link">
                Create an account
                </Link>

                <div className="login-footer">
                <Link to="/home" className="footer-link">
                    Back to home
                </Link>
                </div>
            </div>

            <div className="login-background">
                <div className="background-shape shape-1"></div>
                <div className="background-shape shape-2"></div>
                <div className="background-shape shape-3"></div>
            </div>
        </div>
    )
}

