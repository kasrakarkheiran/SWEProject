import { useNavigate } from "react-router-dom";

export function Landing() {
    const navigate = useNavigate();
    
    const goToSignUp = () => {
        navigate("/signup");
    }

    return (
        <>
            <button onClick={goToSignUp}>Sign up</button>
            <h1>Landing page</h1>
        </>
    );
}