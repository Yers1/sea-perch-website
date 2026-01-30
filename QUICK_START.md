# Quick Start Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   The site will open at `http://localhost:3000`

## Admin Panel

1. Navigate to `/admin`
2. Enter password: `ramaztop1mentor`
3. You can now:
   - Add/edit/delete articles
   - Upload team photos
   - Upload and manage public files

## Adding Content

### Articles
- Go to Admin → Articles
- Click "Add New Article"
- Fill in title, author, and content
- Save

### Team Photos
- Go to Admin → Photos
- Click "Upload Photo"
- Select image file
- Photo will appear on Home page automatically

### Files
- Go to Admin → Files
- Fill in file name, select category
- Add description (optional)
- Upload file
- File will appear on Files page

## Customization

### Update Telegram Bot Link
Edit `src/pages/TelegramBot.jsx` and replace the bot URL.

### Add Sponsor Information
Edit the Sponsor section in `src/pages/Home.jsx`.

### Change Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00a8e8;
  /* ... */
}
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Data Storage

All data is stored in browser localStorage. To reset:
- Open browser DevTools
- Application → Local Storage
- Clear all items
