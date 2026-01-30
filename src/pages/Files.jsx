import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Files.css';

const Files = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('publicFiles');
    if (stored) {
      setFiles(JSON.parse(stored));
    }
  }, []);

  const getFilesByCategory = (category) => {
    return files.filter(file => file.category === category);
  };

  const downloadFile = (file) => {
    if (file.url) {
      window.open(file.url, '_blank');
    } else if (file.data) {
      // Create download link for base64 data
      const link = document.createElement('a');
      link.href = file.data;
      link.download = file.name;
      link.click();
    }
  };

  return (
    <div className="files-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">{t('files.title')}</h1>
          <p className="section-subtitle">{t('files.subtitle')}</p>

          {/* Required Files */}
          <div className="files-section">
            <h2 className="files-section-title">{t('files.required.title')}</h2>
            
            <div className="file-category">
              <h3 className="file-category-title">{t('files.required.tdr.title')}</h3>
              <p className="file-category-description">{t('files.required.tdr.description')}</p>
              {getFilesByCategory('tdr').length > 0 ? (
                <div className="files-list">
                  {getFilesByCategory('tdr').map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        className="btn btn-primary btn-small"
                        onClick={() => downloadFile(file)}
                      >
                        {t('files.download')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-files-text">{t('files.noFiles')}</p>
              )}
            </div>

            <div className="file-category">
              <h3 className="file-category-title">{t('files.required.teamIntro.title')}</h3>
              <p className="file-category-description">{t('files.required.teamIntro.description')}</p>
              {getFilesByCategory('teamIntro').length > 0 ? (
                <div className="files-list">
                  {getFilesByCategory('teamIntro').map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        className="btn btn-primary btn-small"
                        onClick={() => downloadFile(file)}
                      >
                        {t('files.download')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-files-text">{t('files.noFiles')}</p>
              )}
            </div>
          </div>

          {/* Optional Files */}
          <div className="files-section">
            <h2 className="files-section-title">{t('files.optional.title')}</h2>
            
            <div className="file-category">
              <h3 className="file-category-title">{t('files.optional.poster.title')}</h3>
              <p className="file-category-description">{t('files.optional.poster.description')}</p>
              {getFilesByCategory('poster').length > 0 ? (
                <div className="files-list">
                  {getFilesByCategory('poster').map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        className="btn btn-primary btn-small"
                        onClick={() => downloadFile(file)}
                      >
                        {t('files.download')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-files-text">{t('files.noFiles')}</p>
              )}
            </div>

            <div className="file-category">
              <h3 className="file-category-title">{t('files.optional.outreach.title')}</h3>
              <p className="file-category-description">{t('files.optional.outreach.description')}</p>
              {getFilesByCategory('outreach').length > 0 ? (
                <div className="files-list">
                  {getFilesByCategory('outreach').map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        className="btn btn-primary btn-small"
                        onClick={() => downloadFile(file)}
                      >
                        {t('files.download')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-files-text">{t('files.noFiles')}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Files;


