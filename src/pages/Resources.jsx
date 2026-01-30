import { useTranslation } from 'react-i18next';
import './Resources.css';

const Resources = () => {
  const { t } = useTranslation();

  const resourceCategories = [
    {
      key: 'manuals',
      icon: '📖',
      links: [
        { name: 'SeaPerch 2026 Challenge Manual', url: 'https://seaperchwestasia.org/challenge-manual/' },
        { name: 'Team Handbook 2026', url: 'https://seaperchwestasia.org/challenge-manual/' },
        { name: 'Pool Course Build Manual', url: 'https://seaperchwestasia.org/challenge-manual/' }
      ]
    },
    {
      key: 'engineering',
      icon: '⚙️',
      links: [
        { name: 'ROV Design Principles', url: '#' },
        { name: 'Underwater Robotics Basics', url: '#' },
        { name: 'STEM Education Resources', url: '#' }
      ]
    },
    {
      key: 'cad',
      icon: '🖥️',
      links: [
        { name: 'CAD Software for ROV Design', url: '#' },
        { name: '3D Modeling Tutorials', url: '#' },
        { name: 'Design Best Practices', url: '#' }
      ]
    },
    {
      key: 'hydrodynamics',
      icon: '🌊',
      links: [
        { name: 'Hydrodynamics Fundamentals', url: '#' },
        { name: 'Fluid Dynamics for ROVs', url: '#' },
        { name: 'Buoyancy and Stability', url: '#' }
      ]
    },
    {
      key: 'safety',
      icon: '⚠️',
      links: [
        { name: 'Safety Rules and Guidelines', url: 'https://seaperchwestasia.org/challenge-manual/' },
        { name: 'Competition Rules 2026', url: 'https://seaperchwestasia.org/challenge-manual/' },
        { name: 'Equipment Safety Checklist', url: '#' }
      ]
    }
  ];

  return (
    <div className="resources-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">{t('resources.title')}</h1>
          <p className="section-subtitle">{t('resources.subtitle')}</p>

          <div className="resources-grid">
            {resourceCategories.map(category => (
              <div key={category.key} className="resource-category-card">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h2 className="category-title">
                    {t(`resources.categories.${category.key}`)}
                  </h2>
                </div>
                <ul className="resource-links">
                  {category.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
