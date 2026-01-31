import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import TelegramBot from './pages/TelegramBot';
import Resources from './pages/Resources';
import Files from './pages/Files';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize data storage if not exists
    try {
      if (!localStorage.getItem('articles')) {
        localStorage.setItem('articles', JSON.stringify([]));
      }
      if (!localStorage.getItem('teamPhotos')) {
        localStorage.setItem('teamPhotos', JSON.stringify([]));
      }
      if (!localStorage.getItem('teams')) {
        localStorage.setItem('teams', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error initializing localStorage:', error);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/telegram-bot" element={<TelegramBot />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/files" element={<Files />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


