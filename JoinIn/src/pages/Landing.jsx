import {Link} from 'react-router-dom';
import "../styles/landing.css";
import { Users, Zap, Smile, ArrowRight, Activity } from 'lucide-react';
export function Landing() {
    return (
        // <>
        //     <h1>Landing page</h1>
        //     <div className="landing">
        //         <Link to="/login">Log in</Link>
        //         <Link to="/signup">Sign up</Link>
        //     </div>
        // </>
        
        <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar-landing">
        <div className="landing-navbar-content">
          <div className="landing-navbar-brand">JoinIn</div>
          <div className="landing-navbar-buttons">
            <button className="landing-btn-login"><Link to="/login" className="landing-link">Log In</Link></button>
            <button className="landing-btn-signup"><Link to="/signup" className="landing-link">Sign Up</Link></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Sports without the stress</h1>
          <p className="hero-subtitle">
            Find casual players for your favorite sports. No competition, no pressure—just fun with friends (new and old).
          </p>
          {/* <div className="email-signup">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button onClick={handleEmailSignup} className="btn-get-started">
              Get Started <ArrowRight size={20} />
            </button>
          </div> */}
          <p className="hero-subtext">Join hundreds of casual players making new friends</p>
        </div>
      </section>

      {/* Hero Image/Illustration Area */}
      <section className="hero-image-section">
        <div className="hero-image">
          <Activity size={80} className="hero-icon" />
          <p className="hero-image-text">Sports Awaits You</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why PlayTogether?</h2>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-blue">
              <Users size={28} />
            </div>
            <h3 className="feature-title">Find Your People</h3>
            <p className="feature-text">
              Connect with casual players who just want to have fun. No skill requirements, no judgment—just vibes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-purple">
              <Zap size={28} />
            </div>
            <h3 className="feature-title">Easy Setup</h3>
            <p className="feature-text">
              Post when you want to play, pick a location and time, and let others join. That's it!
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-pink">
              <Smile size={28} />
            </div>
            <h3 className="feature-title">Stress-Free Fun</h3>
            <p className="feature-text">
              No competition, no egos, no drama. Just good times, exercise, and making new friends.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step">
            <div className="step-number step-number-blue">1</div>
            <h3 className="step-title">Create Your Post</h3>
            <p className="step-text">
              Tell us what sport, when, and where. Whether it's basketball, soccer, or ultimate frisbee—we've got you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step">
            <div className="step-number step-number-purple">2</div>
            <h3 className="step-title">Others Join</h3>
            <p className="step-text">
              Other players discover your post and join in. Build your group one person at a time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step">
            <div className="step-number step-number-pink">3</div>
            <h3 className="step-title">Play & Connect</h3>
            <p className="step-text">
              Show up, have fun, and make new friends. That's the whole point.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="popular-sports-section">
        <h2 className="section-title">Popular Sports</h2>
        <div className="sports-grid">
          {['Basketball', 'Soccer', 'Volleyball', 'Tennis', 'Badminton', 'Frisbee', 'Pickleball', 'Cricket'].map((sport, idx) => (
            <div key={idx} className="sport-card">
              <p className="sport-name">{sport}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Ready to play?</h2>
          <p className="cta-text">Join the casual sports community today. No commitment, just fun.</p>
          <button className="btn-cta">Start Playing Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-brand">PlayTogether</p>
        <p className="footer-description">
          Making casual sports accessible to everyone. No pressure, just passion.
        </p>
        <p className="footer-copyright">© 2025 PlayTogether. All rights reserved.</p>
      </footer>
    </div>
    );
}