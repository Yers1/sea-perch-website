import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Admin.css';

const ADMIN_PASSWORD = 'ramazantop1mentor';

const Admin = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [teamPhotos, setTeamPhotos] = useState([]);
  const [publicFiles, setPublicFiles] = useState([]);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', author: '', content: '' });
  const [fileForm, setFileForm] = useState({ name: '', category: 'tdr', description: '', file: null });

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

    try {
      const storedPhotos = localStorage.getItem('teamPhotos');
      if (storedPhotos) {
        const parsed = JSON.parse(storedPhotos);
        setTeamPhotos(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
      setTeamPhotos([]);
    }

    try {
      const storedFiles = localStorage.getItem('publicFiles');
      if (storedFiles) {
        const parsed = JSON.parse(storedFiles);
        setPublicFiles(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      setPublicFiles([]);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const saveArticles = (newArticles) => {
    try {
      setArticles(newArticles);
      localStorage.setItem('articles', JSON.stringify(newArticles));
    } catch (error) {
      console.error('Error saving articles:', error);
      alert('Error saving articles. Please try again.');
    }
  };

  const savePhotos = (newPhotos) => {
    try {
      setTeamPhotos(newPhotos);
      localStorage.setItem('teamPhotos', JSON.stringify(newPhotos));
      // Dispatch custom event to update other components
      window.dispatchEvent(new Event('photosUpdated'));
    } catch (error) {
      console.error('Error saving photos:', error);
      alert('Error saving photos. File might be too large.');
    }
  };

  const saveFiles = (newFiles) => {
    try {
      setPublicFiles(newFiles);
      localStorage.setItem('publicFiles', JSON.stringify(newFiles));
    } catch (error) {
      console.error('Error saving files:', error);
      alert('Error saving files. File might be too large.');
    }
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (editingArticle !== null && editingArticle >= 0 && editingArticle < articles.length) {
      const updated = [...articles];
      updated[editingArticle] = {
        ...articleForm,
        date: articles[editingArticle].date
      };
      saveArticles(updated);
      setEditingArticle(null);
    } else {
      saveArticles([...articles, {
        ...articleForm,
        date: new Date().toISOString()
      }]);
    }
    setArticleForm({ title: '', author: '', content: '' });
    setShowArticleForm(false);
  };

  const handleDeleteArticle = (index) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = articles.filter((_, i) => i !== index);
      saveArticles(updated);
    }
  };

  const handleEditArticle = (index) => {
    if (index >= 0 && index < articles.length) {
      setEditingArticle(index);
      setArticleForm(articles[index]);
      setShowArticleForm(true);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('File is too large. Maximum size is 5MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.onloadend = () => {
        try {
          const newPhoto = {
            id: Date.now(),
            url: reader.result,
            name: file.name
          };
          savePhotos([...teamPhotos, newPhoto]);
        } catch (error) {
          console.error('Error processing photo:', error);
          alert('Error processing photo. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      const updated = teamPhotos.filter(photo => photo.id !== id);
      savePhotos(updated);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File is too large. Maximum size is 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.onloadend = () => {
        try {
          const newFile = {
            id: Date.now(),
            name: fileForm.name || file.name,
            category: fileForm.category,
            description: fileForm.description,
            data: reader.result,
            type: file.type
          };
          saveFiles([...publicFiles, newFile]);
          setFileForm({ name: '', category: 'tdr', description: '', file: null });
        } catch (error) {
          console.error('Error processing file:', error);
          alert('Error processing file. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = (id) => {
    if (confirm('Are you sure you want to delete this file?')) {
      const updated = publicFiles.filter(file => file.id !== id);
      saveFiles(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="container">
          <div className="login-card">
            <h1>{t('admin.title')}</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>{t('admin.password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {t('admin.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>{t('admin.title')}</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            {t('admin.logout')}
          </button>
        </div>

        <div className="admin-tabs">
          <button
            className={activeSection === 'articles' ? 'active' : ''}
            onClick={() => setActiveSection('articles')}
          >
            {t('admin.sections.articles')}
          </button>
          <button
            className={activeSection === 'photos' ? 'active' : ''}
            onClick={() => setActiveSection('photos')}
          >
            {t('admin.sections.photos')}
          </button>
          <button
            className={activeSection === 'files' ? 'active' : ''}
            onClick={() => setActiveSection('files')}
          >
            {t('admin.sections.files')}
          </button>
        </div>

        {/* Articles Section */}
        {activeSection === 'articles' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>{t('admin.articles.title')}</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowArticleForm(true);
                  setEditingArticle(null);
                  setArticleForm({ title: '', author: '', content: '' });
                }}
              >
                {t('admin.articles.add')}
              </button>
            </div>

            {showArticleForm && (
              <form className="article-form" onSubmit={handleArticleSubmit}>
                <div className="form-group">
                  <label>{t('admin.articles.form.title')}</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('admin.articles.form.author')}</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('admin.articles.form.content')}</label>
                  <textarea
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    rows="10"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {t('admin.articles.form.save')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowArticleForm(false);
                      setEditingArticle(null);
                    }}
                  >
                    {t('admin.articles.form.cancel')}
                  </button>
                </div>
              </form>
            )}

            <div className="articles-list">
              {articles.map((article, index) => (
                <div key={index} className="article-item">
                  <h3>{article.title}</h3>
                  <p className="article-meta">By {article.author} - {new Date(article.date).toLocaleDateString()}</p>
                  <div className="article-actions">
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => handleEditArticle(index)}
                    >
                      {t('admin.articles.edit')}
                    </button>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => handleDeleteArticle(index)}
                    >
                      {t('admin.articles.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        {activeSection === 'photos' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>{t('admin.photos.title')}</h2>
              <label className="btn btn-primary">
                {t('admin.photos.upload')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="photos-grid">
              {teamPhotos.map(photo => (
                <div key={photo.id} className="photo-item">
                  <img src={photo.url} alt={photo.name} />
                  <div className="photo-actions">
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      {t('admin.photos.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files Section */}
        {activeSection === 'files' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>{t('admin.files.title')}</h2>
            </div>

            <form className="file-form">
              <div className="form-group">
                <label>{t('admin.files.name')}</label>
                <input
                  type="text"
                  value={fileForm.name}
                  onChange={(e) => setFileForm({ ...fileForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>{t('admin.files.category')}</label>
                <select
                  value={fileForm.category}
                  onChange={(e) => setFileForm({ ...fileForm, category: e.target.value })}
                >
                  <option value="tdr">Technical Design Report</option>
                  <option value="teamIntro">Team Introduction</option>
                  <option value="poster">Real-World Application Poster</option>
                  <option value="outreach">Community Outreach</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('admin.files.description')}</label>
                <textarea
                  value={fileForm.description}
                  onChange={(e) => setFileForm({ ...fileForm, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>{t('admin.files.upload')}</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                />
              </div>
            </form>

            <div className="files-list">
              {publicFiles.map(file => (
                <div key={file.id} className="file-item-admin">
                  <div>
                    <h4>{file.name}</h4>
                    <p className="file-meta">Category: {file.category}</p>
                    {file.description && <p>{file.description}</p>}
                  </div>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    {t('admin.files.delete')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
