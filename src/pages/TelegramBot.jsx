import { useTranslation } from 'react-i18next';
import './TelegramBot.css';

const TelegramBot = () => {
  const { t } = useTranslation();

  const openTelegramBot = () => {
    // Replace with actual Telegram bot link
    window.open('https://t.me/your_bot_username', '_blank');
  };

  return (
    <div className="telegram-bot-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">{t('telegramBot.title')}</h1>
          <p className="section-subtitle">{t('telegramBot.subtitle')}</p>

          <div className="bot-content">
            <div className="card bot-description-card">
              <p className="bot-description">{t('telegramBot.description')}</p>
            </div>

            <div className="card examples-card">
              <h2 className="examples-title">{t('telegramBot.examples.title')}</h2>
              <ul className="examples-list">
                <li>{t('telegramBot.examples.q1')}</li>
                <li>{t('telegramBot.examples.q2')}</li>
                <li>{t('telegramBot.examples.q3')}</li>
                <li>{t('telegramBot.examples.q4')}</li>
              </ul>
            </div>

            <div className="bot-action">
              <button className="btn btn-primary btn-large" onClick={openTelegramBot}>
                {t('telegramBot.openBot')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TelegramBot;
