import {Link} from 'react-router-dom';

export function Landing() {
    return (
        <>
            <h1>Landing page</h1>
            <div className="landing">
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}