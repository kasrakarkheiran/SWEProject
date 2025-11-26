import {useState} from 'react'
import {useSignup} from "../hooks/useSignup.jsx"
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import '../styles/signup.css'

export function Signup() {
    const [name, setName]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const navigate = useNavigate();
    const events = [];
    const handleSubmit = async (e) => {
        //prevent default refresh
        e.preventDefault()

        await signup(name, email, password, events)
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-header">
                <div className="signup-icon">
                    <UserPlus size={32} />
                </div>
                <h1 className="signup-title">Join PlayTogether</h1>
                <p className="signup-subtitle">Create your account to start playing</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                    Full Name
                    </label>
                    <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    />
                </div>

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
                    placeholder="Create a strong password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
                    <p className="password-hint">Minimum 6 characters recommended</p>
                </div>

                {error && (
                    <div className="error-message">
                    <span className="error-icon">⚠</span>
                    <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="btn-signup"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
                </form>

                <div className="signup-divider">
                <span>Already have an account?</span>
                </div>

                <Link to="/login" className="btn-login-link">
                Log in instead
                </Link>

                <div className="signup-footer">
                <Link to="/home" className="footer-link">
                    Back to home
                </Link>
                </div>
            </div>

            <div className="signup-background">
                <div className="background-shape shape-1"></div>
                <div className="background-shape shape-2"></div>
                <div className="background-shape shape-3"></div>
            </div>
        </div>
    )
}

export default Signup