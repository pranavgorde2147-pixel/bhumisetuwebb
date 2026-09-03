import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">BHUMISETU</div>
            <p className="footer-desc">
              India's unified land records platform providing citizens with
              transparent, verified, and comprehensive access to land information
              across all states.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <Link to="/find" className="footer-link">Find Land</Link>
            <Link to="/map" className="footer-link">Map View</Link>
            <Link to="/services" className="footer-link">Land Services</Link>
            <Link to="/transactions" className="footer-link">My Applications</Link>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">API Documentation</a>
            <a href="#" className="footer-link">State Portals</a>
            <a href="#" className="footer-link">Data Standards</a>
          </div>
          <div>
            <h4 className="footer-heading">Legal</h4>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Data Policy</a>
            <a href="#" className="footer-link">Accessibility</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-bottom-text">
            © {new Date().getFullYear()} BHUMISETU. Government of India Initiative.
          </span>
          <span className="footer-bottom-text">
            Built with transparency and trust for every citizen.
          </span>
        </div>
      </div>
    </footer>
  );
}
