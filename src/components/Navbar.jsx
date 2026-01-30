import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'kk', name: 'Қазақша' }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/articles', label: t('nav.articles') },
    { path: '/telegram-bot', label: t('nav.telegramBot') },
    { path: '/resources', label: t('nav.resources') },
    { path: '/files', label: t('nav.files') },
    { path: '/admin', label: t('nav.admin') }
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-name">Nomadic Guardians</span>
            <span className="brand-subtitle">SeaPerch 2026</span>
          </Link>

          <div className="navbar-right">
            <div className="language-selector">
              <button 
                className="lang-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
                <span className="arrow">▼</span>
              </button>
              {isLangOpen && (
                <div className="lang-dropdown">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={i18n.language === lang.code ? 'active' : ''}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
