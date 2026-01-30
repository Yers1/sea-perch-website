import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Articles.css';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('articles');
    if (stored) {
      setArticles(JSON.parse(stored));
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="articles-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">{t('articles.title')}</h1>
          <p className="section-subtitle">{t('articles.subtitle')}</p>

          {articles.length === 0 ? (
            <div className="no-articles">
              <p>{t('articles.noArticles')}</p>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <article key={index} className="article-card">
                  <h2 className="article-title">{article.title}</h2>
                  <div className="article-meta">
                    <span className="article-author">
                      {t('articles.author')}: {article.author}
                    </span>
                    <span className="article-date">
                      {t('articles.date')}: {formatDate(article.date)}
                    </span>
                  </div>
                  <div className="article-content">
                    {article.content.split('\n').slice(0, 3).join('\n')}
                    {article.content.split('\n').length > 3 && '...'}
                  </div>
                  <button className="btn btn-primary read-more-btn">
                    {t('articles.readMore')}
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;


