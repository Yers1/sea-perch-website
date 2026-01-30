import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [teamPhotos, setTeamPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = () => {
      const stored = localStorage.getItem('teamPhotos');
      if (stored) {
        setTeamPhotos(JSON.parse(stored));
      }
    };

    loadPhotos();

    // Listen for storage changes (when admin adds photos)
    const handleStorageChange = (e) => {
      if (e.key === 'teamPhotos') {
        loadPhotos();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event (for same-tab updates)
    const handleCustomStorage = () => {
      loadPhotos();
    };
    window.addEventListener('photosUpdated', handleCustomStorage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('photosUpdated', handleCustomStorage);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t('home.title')}</h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            <p className="hero-description">{t('home.description')}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <div className="card mission-card">
            <h2 className="section-title-small">{t('home.mission.title')}</h2>
            <p className="mission-text">{t('home.mission.text')}</p>
          </div>
        </div>
      </section>

      {/* Goals & Plans Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h3 className="card-title">{t('home.goals.title')}</h3>
              <ul className="list">
                <li>{t('home.goals.item1')}</li>
                <li>{t('home.goals.item2')}</li>
                <li>{t('home.goals.item3')}</li>
                <li>{t('home.goals.item4')}</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">{t('home.plans.title')}</h3>
              <ul className="list">
                <li>{t('home.plans.item1')}</li>
                <li>{t('home.plans.item2')}</li>
                <li>{t('home.plans.item3')}</li>
                <li>{t('home.plans.item4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photos Section */}
      {teamPhotos.length > 0 && (
        <section className="section team-photos-section">
          <div className="container">
            <h2 className="section-title">Team Photos</h2>
            <div className="team-photos-grid">
              {teamPhotos.map(photo => (
                <div key={photo.id} className="team-photo-item">
                  <img src={photo.url} alt={photo.name} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsor Section */}
      <section className="section sponsor-section">
        <div className="container">
          <h2 className="section-title">{t('home.sponsor.title')}</h2>
          <div className="card sponsor-card">
            <div className="sponsor-placeholder">
              <p>{t('home.sponsor.description')}</p>
              <p className="sponsor-note">Sponsor logo and information will be added here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section quick-links-section">
        <div className="container">
          <h2 className="section-title">{t('home.quickLinks.title')}</h2>
          <div className="quick-links-grid">
            <Link to="/articles" className="quick-link-card">
              <div className="quick-link-icon">📄</div>
              <h3>{t('home.quickLinks.articles')}</h3>
            </Link>
            <Link to="/resources" className="quick-link-card">
              <div className="quick-link-icon">📚</div>
              <h3>{t('home.quickLinks.resources')}</h3>
            </Link>
            <Link to="/files" className="quick-link-card">
              <div className="quick-link-icon">📁</div>
              <h3>{t('home.quickLinks.files')}</h3>
            </Link>
            <Link to="/telegram-bot" className="quick-link-card">
              <div className="quick-link-icon">🤖</div>
              <h3>{t('home.quickLinks.telegramBot')}</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
