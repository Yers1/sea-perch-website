# Nomadic Guardians Website

Modern, professional, and scalable website for the Nomadic Guardians school STEM team participating in SeaPerch West Asia 2026 competitions.

## Features

- 🌍 **Multi-language Support**: Russian, English, and Kazakh with language switcher
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional STEM/engineering style
- 📝 **Content Management**: Admin panel for managing articles, photos, and files
- 🔐 **Secure Admin Access**: Password-protected admin panel
- 📄 **Articles System**: Publish and manage team articles
- 📸 **Photo Gallery**: Upload and display team photos
- 📁 **File Management**: Organize and share public files by category

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **LocalStorage** - Data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Admin Access

- **URL**: `/admin`
- **Password**: `ramazantop1mentor`

## Important Notes

### Telegram Bot Link
Update the Telegram bot link in `src/pages/TelegramBot.jsx` (line 8) with your actual bot username:
```javascript
window.open('https://t.me/your_bot_username', '_blank');
```

### Sponsor Section
Add sponsor logo and information in the Sponsor section on the Home page. You can customize this in `src/pages/Home.jsx`.

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer)
├── pages/           # Page components (Home, Articles, etc.)
├── i18n/            # Translation files
│   └── locales/     # Language JSON files
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Pages

1. **Home** - Team introduction, mission, goals, plans, sponsor section, quick links
2. **Articles** - Blog posts about engineering solutions, ROV design, and competition insights
3. **Telegram Bot** - Information about the SeaPerch Manual Telegram bot
4. **Resources** - Useful materials organized by category
5. **Files** - Public team files (TDR, Team Introduction, Posters, etc.)
6. **Admin** - Content management panel

## Admin Features

### Articles Management
- Add, edit, and delete articles
- Articles include: title, author, content, and date

### Team Photos
- Upload team photos
- Photos automatically appear on the home page
- Delete photos when needed

### File Management
- Upload files with categories:
  - Technical Design Report (tdr)
  - Team Introduction (teamIntro)
  - Real-World Application Poster (poster)
  - Community Outreach (outreach)
- Add descriptions for files
- Files are publicly accessible on the Files page

## Data Storage

All data is stored in browser localStorage:
- `articles` - Published articles
- `teamPhotos` - Team photos
- `publicFiles` - Public files

## Customization

### Adding New Languages
1. Create a new JSON file in `src/i18n/locales/`
2. Add translations following the same structure
3. Import and add to `src/i18n/config.js`

### Styling
- Global styles: `src/index.css`
- Component styles: Each component has its own CSS file
- CSS variables in `:root` for easy theming

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`
4. Add translations to all language files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Nomadic Guardians. All rights reserved.

## Contact

- **Email**: nomadic.guardiansbtcs@gmail.com
- **Instagram**: [@nomadic.guardians](https://www.instagram.com/nomadic.guardians/)
- **Location**: Astana, Kazakhstan
