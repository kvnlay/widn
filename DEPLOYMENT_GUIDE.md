# Deployment Guide: Women in Data Network Website

This guide will help you deploy:
- **Frontend (Next.js)** → Vercel (Free)
- **Backend (Strapi)** → Railway (Free tier with $5 credit/month) or Render (Free tier)
- **Database** → PostgreSQL (included with Railway/Render)

---

## 🚀 Part 1: Deploy Strapi Backend

### Option A: Railway (Recommended - Easiest)

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder (or create a new service)

3. **Add PostgreSQL Database**
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create a `DATABASE_URL` environment variable

4. **Configure Environment Variables**
   - Go to your Strapi service → "Variables"
   - Add these environment variables:

   ```env
   DATABASE_CLIENT=postgres
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=${{PORT}}
   APP_KEYS=your-app-key-1,your-app-key-2,your-app-key-3,your-app-key-4
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   JWT_SECRET=your-jwt-secret
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
   
   **Note:** Replace `https://your-frontend.vercel.app` with your actual Vercel URL (you can add this after deploying the frontend)

   **Generate secrets:**
   ```bash
   # Run these commands to generate random secrets
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   # Run 4 times for APP_KEYS (comma-separated)
   # Run once each for the other secrets
   ```

5. **Update package.json for Railway**
   - Railway needs to know how to build and start your app
   - The existing scripts should work, but verify:
     ```json
     "scripts": {
       "build": "strapi build",
       "start": "strapi start"
     }
     ```

6. **Deploy**
   - Railway will automatically detect your Node.js app
   - It will run `npm install`, `npm run build`, and `npm start`
   - Wait for deployment to complete

7. **Get Your Strapi URL**
   - Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL - you'll need it for the frontend

8. **Set up Strapi Admin**
   - Visit your Strapi URL
   - Create your admin account
   - Configure your content types and add content

9. **Create API Token**
   - Go to Settings → API Tokens
   - Create a new token with "Read" permissions
   - Copy the token (you'll need it for the frontend)

### Option B: Render (Alternative)

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Name it (e.g., "widn-db")
   - Note the connection string

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name**: `widn-strapi`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

4. **Add Environment Variables**
   - In your web service, go to "Environment"
   - Add all the same variables as Railway (see above)
   - For `DATABASE_URL`, use the connection string from step 2
   - Add `CORS_ORIGIN` with your Vercel frontend URL (after deploying frontend)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment

---

## 🎨 Part 2: Deploy Next.js Frontend to Vercel

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `women-in-data-website` folder as the root directory

3. **Configure Build Settings**
   - Vercel will auto-detect Next.js
   - Framework Preset: Next.js
   - Root Directory: `women-in-data-website`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Add Environment Variables**
   - Go to "Environment Variables"
   - Add these variables:

   ```env
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.railway.app
   NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-from-strapi
   ```

   Replace:
   - `your-strapi-url.railway.app` with your actual Strapi URL
   - `your-api-token-from-strapi` with the API token you created in Strapi

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will give you a URL like: `https://your-app.vercel.app`

---

## 🔗 Part 3: Connect Frontend to Backend

1. **Update CORS Environment Variable**
   - In your Strapi deployment (Railway/Render), add or update the `CORS_ORIGIN` environment variable:
     ```
     CORS_ORIGIN=https://your-app.vercel.app
     ```
   - If you have multiple origins, separate with commas:
     ```
     CORS_ORIGIN=https://your-app.vercel.app,https://www.your-domain.com
     ```
   - Redeploy Strapi after adding this variable

2. **Test the Connection**
   - Visit your Vercel URL
   - Check browser console for any CORS errors
   - Test the newsletter subscription form
   - Verify that content from Strapi loads correctly

---

## 📝 Part 4: Update Database Configuration (if needed)

If you're using Railway or Render, they provide PostgreSQL. Make sure your `backend/config/database.ts` supports PostgreSQL (it already does based on the config).

The environment variable `DATABASE_CLIENT=postgres` will automatically use PostgreSQL.

---

## 🔐 Part 5: Generate Secure Secrets

Run these commands to generate secure random secrets:

```bash
# Generate APP_KEYS (run 4 times, join with commas)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🐛 Troubleshooting

### Strapi won't start
- Check that all environment variables are set
- Verify `DATABASE_URL` is correct
- Check Railway/Render logs for errors

### Frontend can't connect to Strapi
- Verify `NEXT_PUBLIC_STRAPI_URL` is correct (no trailing slash)
- Check CORS settings in Strapi
- Verify API token is correct
- Check browser console for specific errors

### Database connection errors
- Ensure `DATABASE_CLIENT=postgres` is set
- Verify `DATABASE_URL` includes SSL if required
- Check that the database is running in Railway/Render

### Build errors
- Check that all dependencies are in `package.json`
- Verify Node.js version matches (Strapi needs Node 20+)
- Check build logs for specific errors

---

## 📊 Free Tier Limits

### Railway
- $5 free credit per month
- Enough for small to medium projects
- PostgreSQL included

### Render
- Free tier available (with limitations)
- Spins down after 15 minutes of inactivity
- PostgreSQL available on free tier

### Vercel
- Unlimited deployments
- 100GB bandwidth/month
- Perfect for Next.js

---

## 🎉 You're Done!

Your website should now be live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-strapi.railway.app` or `https://your-strapi.onrender.com`

Remember to:
- Keep your API tokens secure
- Regularly backup your Strapi content
- Monitor your usage to stay within free tier limits

---

## ✅ Quick Deployment Checklist

### Backend (Strapi)
- [ ] Sign up for Railway or Render
- [ ] Create PostgreSQL database
- [ ] Deploy Strapi backend
- [ ] Generate secrets using `node generate-secrets.js` in backend folder
- [ ] Add all environment variables (see Part 1)
- [ ] Create admin account in Strapi
- [ ] Create API token in Strapi (Settings → API Tokens)
- [ ] Copy Strapi URL for frontend configuration

### Frontend (Next.js)
- [ ] Sign up for Vercel
- [ ] Import GitHub repository
- [ ] Set root directory to `women-in-data-website`
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_STRAPI_URL` (your Strapi URL)
  - [ ] `NEXT_PUBLIC_STRAPI_API_TOKEN` (your API token)
- [ ] Deploy to Vercel
- [ ] Copy Vercel URL

### Connection
- [ ] Add `CORS_ORIGIN` environment variable in Strapi deployment
- [ ] Redeploy Strapi if needed
- [ ] Test frontend connection to backend
- [ ] Verify all content loads correctly
- [ ] Test newsletter subscription form

---

## 🛠️ Useful Commands

### Generate Secrets (in backend folder)
```bash
cd backend
node generate-secrets.js
```

### Test Strapi API Locally
```bash
curl http://localhost:1337/api/hero-section
```

### Test Strapi API in Production
```bash
curl https://your-strapi.railway.app/api/hero-section \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```
