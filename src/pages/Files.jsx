import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Files.css';

const Files = () => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = () => {
      try {
        const stored = localStorage.getItem('teams');
        if (stored) {
          const parsed = JSON.parse(stored);
          setTeams(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading teams:', error);
        setTeams([]);
      }
    };

    loadTeams();

    // Listen for teams updates
    const handleTeamsUpdate = () => {
      loadTeams();
    };
    window.addEventListener('teamsUpdated', handleTeamsUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'teams') {
        loadTeams();
      }
    });

    return () => {
      window.removeEventListener('teamsUpdated', handleTeamsUpdate);
    };
  }, []);

  const getFilesByCategory = (files, category) => {
    return files.filter(file => file.category === category);
  };

  const downloadFile = (file) => {
    try {
      if (file.url) {
        window.open(file.url, '_blank');
      } else if (file.data) {
        // Create download link for base64 data
        const link = document.createElement('a');
        link.href = file.data;
        link.download = file.name || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(t('files.error') || 'File data is missing');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert(t('files.downloadError') || 'Error downloading file');
    }
  };

  const renderFileCategory = (files, categoryKey, titleKey, descriptionKey) => {
    const categoryFiles = getFilesByCategory(files, categoryKey);
    if (categoryFiles.length === 0) return null;

    return (
      <div className="file-category">
        <h3 className="file-category-title">{t(`files.${titleKey}`)}</h3>
        <p className="file-category-description">{t(`files.${descriptionKey}`)}</p>
        <div className="files-list">
          {categoryFiles.map((file) => (
            <div key={file.id || `file-${file.name}`} className="file-item">
              <div style={{ flex: 1 }}>
                <span className="file-name">{file.name}</span>
                {file.description && (
                  <div className="file-description" style={{ marginTop: '5px' }}>
                    {file.description}
                  </div>
                )}
              </div>
              <button 
                className="btn btn-primary btn-small"
                onClick={() => downloadFile(file)}
              >
                {t('files.download')}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="files-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">{t('files.title')}</h1>
          <p className="section-subtitle">{t('files.subtitle')}</p>

          {teams.length === 0 ? (
            <div className="no-teams">
              <p>{t('files.noTeams') || 'No teams available yet.'}</p>
            </div>
          ) : (
            teams.map(team => (
              <div key={team.id} className="team-section">
                <h2 className="team-name">{team.name}</h2>
                
                {(!team.files || team.files.length === 0) ? (
                  <p className="no-files-text">{t('files.noFiles')}</p>
                ) : (
                  <>
                    {/* Required Files */}
                    {(getFilesByCategory(team.files, 'tdr').length > 0 || 
                      getFilesByCategory(team.files, 'teamIntro').length > 0) && (
                      <div className="files-section">
                        <h3 className="files-section-title">{t('files.required.title')}</h3>
                        
                        {renderFileCategory(
                          team.files,
                          'tdr',
                          'required.tdr.title',
                          'required.tdr.description'
                        )}

                        {renderFileCategory(
                          team.files,
                          'teamIntro',
                          'required.teamIntro.title',
                          'required.teamIntro.description'
                        )}
                      </div>
                    )}

                    {/* Optional Files */}
                    {(getFilesByCategory(team.files, 'poster').length > 0 || 
                      getFilesByCategory(team.files, 'outreach').length > 0) && (
                      <div className="files-section">
                        <h3 className="files-section-title">{t('files.optional.title')}</h3>
                        
                        {renderFileCategory(
                          team.files,
                          'poster',
                          'optional.poster.title',
                          'optional.poster.description'
                        )}

                        {renderFileCategory(
                          team.files,
                          'outreach',
                          'optional.outreach.title',
                          'optional.outreach.description'
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Files;
