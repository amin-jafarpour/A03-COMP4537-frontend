import './LandIn.css'
import {Link} from 'react-router-dom'
const LandIn = () => {
    return ( <div className="landing-page">
    <header>
      <nav>
        <ul>
          <li><Link to='/signup'>Register Account</Link></li>
          <li><Link to='/login'>Login to my Account</Link></li>
        </ul>
      </nav>
    </header>
    <main>
      <section className="hero-section">
        <h1>Welcome to My Pokemon App</h1>
      </section>
      <section className="about-section">
        <h2>About Me</h2>
      </section>
    </main>
    <footer>
      <p>Copyright © Your Name</p>
    </footer>
  </div>);
}
 
export default LandIn;