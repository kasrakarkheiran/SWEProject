import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import '../styles/VerifyPending.css';

export default function VerifyPending() {
  const navigate = useNavigate();

  return (
    <div className="verify-pending-container">
      <div className="verify-pending-box">
        <div className="verify-pending-icon-container">
          <div className="verify-pending-icon">
            <Mail size={48} />
          </div>
        </div>

        <h1 className="verify-pending-title">Check Your Email</h1>
        <p className="verify-pending-subtitle">
          We've sent a verification link to your email address. Click the link to verify your account.
        </p>
        <div className="verify-pending-note">
          <p>
            <strong>Didn't receive the email?</strong> Check your spam folder or wait a few minutes.
          </p>
        </div>

        <div className="verify-pending-actions">
          <button 
            className="btn-back"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>

      <div className="verify-pending-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
      </div>
    </div>
  );
}