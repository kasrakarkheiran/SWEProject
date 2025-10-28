import { useNavigate } from "react-router-dom";

export function Landing() {
    const navigate = useNavigate();
    
    const goToSignIn = () => {
        navigate("/signin");
    }

    return (
        <>
            <button onClick={goToSignIn}>Login</button>
        </>
    );
}