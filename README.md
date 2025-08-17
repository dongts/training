# Quiz App

A React-based quiz application with Vietnamese content for Party work training.

## Features

- Interactive quiz interface
- Score tracking
- Question shuffling
- Detailed explanations for answers
- Responsive design

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Instructions:

1. **Create a new repository on GitHub** (if you haven't already)
2. **Initialize git and push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically run and deploy your app

4. **Update the base URL in vite.config.ts:**
   - Change the `base` property to match your repository name
   - For example, if your repo is `https://github.com/username/my-quiz-app`, set `base: '/my-quiz-app/'`

5. **Your app will be available at:**
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

- `src/main.tsx` - Main React component with quiz logic
- `src/App.tsx` - App wrapper component
- `index.html` - HTML template
- `vite.config.ts` - Vite configuration
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## Technologies Used

- React 18
- TypeScript
- Vite
- Lucide React (for icons)
- GitHub Actions
- GitHub Pages
