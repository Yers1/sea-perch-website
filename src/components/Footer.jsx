import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t('footer.team')}</h3>
            <p>{t('footer.location')}</p>
          </div>

          <div className="footer-section">
            <h3>{t('footer.followUs')}</h3>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/nomadic.guardians/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <a href="mailto:nomadic.guardiansbtcs@gmail.com" className="email-link">
              nomadic.guardiansbtcs@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Nomadic Guardians. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


