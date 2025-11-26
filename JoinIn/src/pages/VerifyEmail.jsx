import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api";

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

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>{loading ? "Verifying..." : status}</h1>
        </div>
    );
}