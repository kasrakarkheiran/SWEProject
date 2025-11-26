import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api";
import '../styles/VerifyEmail.css';

export default function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await verifyEmail(token);

                if (res.status === 200) {
                    setStatus("Email verified successfully! Redirecting to login...");
                    setTimeout(() => navigate("/login"), 1500);
                } else {
                    setStatus("Verification failed.");
                }
            } catch (err) {
                console.log(err);
                setStatus("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token, navigate]);

    const isSuccess = status.includes("successfully");
    const isError = status.includes("failed") || status.includes("wrong");

    return (
        <div className="verify-email-container">
            <div className="verify-email-box">
                <div className="verify-icon-container">
                    {loading && (
                        <div className="verify-icon loading">
                            <Loader size={48} />
                        </div>
                    )}
                    {!loading && isSuccess && (
                        <div className="verify-icon success">
                            <CheckCircle size={48} />
                        </div>
                    )}
                    {!loading && isError && (
                        <div className="verify-icon error">
                            <XCircle size={48} />
                        </div>
                    )}
                </div>

                <h1 className="verify-title">
                    {loading ? "Verifying Your Email" : status}
                </h1>

                {loading && (
                    <p className="verify-subtitle">Please wait while we verify your email address...</p>
                )}

                {!loading && isSuccess && (
                    <p className="verify-subtitle">You'll be redirected to login shortly.</p>
                )}

                {!loading && isError && (
                    <div className="verify-actions">
                        <button 
                            className="btn-back-home"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>
                        <button 
                            className="btn-try-login"
                            onClick={() => navigate("/login")}
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>

            <div className="verify-background">
                <div className="background-shape shape-1"></div>
                <div className="background-shape shape-2"></div>
                <div className="background-shape shape-3"></div>
            </div>
        </div>
    );
}