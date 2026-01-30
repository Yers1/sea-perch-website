import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Articles.css';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('articles');
      if (stored) {
        const parsed = JSON.parse(stored);
        setArticles(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      setArticles([]);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };

    if (selectedArticle) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString();
    } catch (error) {
      return 'N/A';
    }
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
              {articles.map((article, index) => {
                const articleId = article.id || `article-${index}`;
                const content = typeof article.content === 'string' ? article.content : '';
                const previewLines = content ? content.split('\n').slice(0, 3) : [];
                const hasMore = content && content.split('\n').length > 3;
                
                return (
                  <article key={articleId} className="article-card">
                    <h2 className="article-title">{article.title || 'Untitled'}</h2>
                    <div className="article-meta">
                      <span className="article-author">
                        {t('articles.author')}: {article.author || 'Unknown'}
                      </span>
                      <span className="article-date">
                        {t('articles.date')}: {formatDate(article.date)}
                      </span>
                    </div>
                    <div className="article-content">
                      {previewLines.join('\n')}
                      {hasMore && '...'}
                    </div>
                    {hasMore && (
                      <button 
                        className="btn btn-primary read-more-btn"
                        onClick={() => setSelectedArticle(article)}
                      >
                        {t('articles.readMore')}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {selectedArticle && (
            <div className="article-modal" onClick={() => setSelectedArticle(null)}>
              <div className="article-modal-content" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="article-modal-close"
                  onClick={() => setSelectedArticle(null)}
                >
                  ×
                </button>
                <h2 className="article-modal-title">{selectedArticle.title}</h2>
                <div className="article-modal-meta">
                  <span className="article-author">
                    {t('articles.author')}: {selectedArticle.author || 'Unknown'}
                  </span>
                  <span className="article-date">
                    {t('articles.date')}: {formatDate(selectedArticle.date)}
                  </span>
                </div>
                <div className="article-modal-body">
                  {typeof selectedArticle.content === 'string' ? selectedArticle.content : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;


