# 🚨 URGENT: Production Deployment Guide

## Current Status: **PRODUCTION IS DOWN**

Your site at https://golden-era-black.vercel.app is **completely non-functional** because the backend API is not deployed.

---

## Quick Fix (30 Minutes)

### Step 1: Deploy Backend to Railway (Recommended - FREE)

1. **Create Railway Account**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login to Railway
   railway login
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Get Your Backend URL**
   - After deployment, Railway will give you a URL like: `https://golden-era-backend-production.up.railway.app`
   - Copy this URL

4. **Set Environment Variables in Railway**
   ```bash
   railway variables set MONGO_URL="your_mongodb_connection_string"
   railway variables set DB_NAME="golden_era"
   railway variables set CORS_ORIGINS="https://golden-era-black.vercel.app"
   ```

### Step 2: Configure Vercel Frontend

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   ```
   Name: REACT_APP_BACKEND_URL
   Value: https://golden-era-backend-production.up.railway.app
   ```
5. Click **Save**
6. Go to **Deployments** tab
7. Click ••• on latest deployment → **Redeploy**

### Step 3: Verify It Works

1. Visit https://golden-era-black.vercel.app
2. Check browser console (F12) for errors
3. Navigate to /shop - should load products
4. Navigate to /stores - should load stores

---

## Alternative: Deploy Backend to Render.com

1. **Create Account**: https://render.com
2. **New Web Service**
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. **Environment Variables** (in Render dashboard):
   ```
   MONGO_URL=your_mongodb_connection_string
   DB_NAME=golden_era
   CORS_ORIGINS=https://golden-era-black.vercel.app
   ```
4. Copy the Render URL (e.g., `https://golden-era-backend.onrender.com`)
5. Add to Vercel as `REACT_APP_BACKEND_URL`

---

## Why Your Site is Broken

### Problem 1: Backend Not Deployed
```javascript
// frontend/src/services/api.js:4
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
```

**Issue:**
- `REACT_APP_BACKEND_URL` is not set in Vercel
- Defaults to `http://localhost:8000`
- Browsers block HTTP requests from HTTPS sites (Mixed Content)
- `localhost:8000` doesn't exist on user browsers

**Fix:** Set `REACT_APP_BACKEND_URL` to your deployed backend URL

### Problem 2: No CORS Configuration
Your backend needs to whitelist your frontend domain.

**Current:** No CORS setup in `backend/server.py`

**Fix:** Add this to `backend/server.py` after line 22:
```python
from fastapi.middleware.cors import CORSMiddleware

# Get allowed origins from environment
allowed_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then set environment variable:
```bash
CORS_ORIGINS=https://golden-era-black.vercel.app,https://www.yourdomain.com
```

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended - FREE)

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster** (Free tier M0)
3. **Database Access**: Create database user
4. **Network Access**: Add IP `0.0.0.0/0` (allow all - for Railway/Render)
5. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Option 2: Use Existing MongoDB
If you already have MongoDB, use your connection string.

---

## Complete Environment Variables Reference

### Backend (Railway/Render)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=golden_era
CORS_ORIGINS=https://golden-era-black.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
```

---

## Testing Checklist

After deployment, test these critical flows:

- [ ] Homepage loads
- [ ] /shop shows products
- [ ] /shop/rings filters by category
- [ ] Search works
- [ ] Product detail page loads
- [ ] Add to cart works
- [ ] /stores shows store locations
- [ ] Newsletter subscription works
- [ ] Contact form works

---

## Troubleshooting

### Frontend shows "Failed to load products"
1. Open browser console (F12)
2. Check Network tab
3. Look for failed API calls
4. Common issues:
   - CORS error → Check backend CORS_ORIGINS
   - 404 error → Backend not deployed or wrong URL
   - Mixed content error → Using http:// instead of https://

### Backend deployment fails
- **Railway**: Check build logs in Railway dashboard
- **Render**: Check deploy logs
- Common issues:
  - Missing requirements.txt
  - MongoDB connection string wrong
  - Environment variables not set

### MongoDB connection fails
- Check connection string format
- Verify database user credentials
- Check Network Access allows your deployment IP
- Test connection string locally first

---

## Monitoring & Maintenance

### Check Backend Health
```bash
curl https://your-backend-url.railway.app/api/products
```
Should return JSON product list.

### Check Frontend Build
Vercel automatically rebuilds on git push. Check:
- Vercel Dashboard → Deployments
- Click on deployment → View logs

### Database Monitoring
- MongoDB Atlas → Metrics
- Check connections, operations, storage

---

## Cost Estimates

- **Railway**: Free tier (500 hours/month) - enough for low traffic
- **Render**: Free tier (750 hours/month with spindown)
- **MongoDB Atlas**: Free tier (512MB storage) - good for 10K+ products
- **Vercel**: Free tier (100GB bandwidth) - good for thousands of visitors

**Total monthly cost: $0** (on free tiers)

---

## Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - Vercel: Settings → Domains
   - Update CORS_ORIGINS to include custom domain

2. **Set Up Monitoring**
   - Railway: Built-in monitoring
   - MongoDB Atlas: Set up alerts

3. **Improve SEO**
   - Submit sitemap to Google Search Console
   - Add robots.txt
   - Configure Google Analytics

4. **Security**
   - Add rate limiting to backend
   - Implement user authentication
   - Set up HTTPS redirects

---

## Support

If you encounter issues:
1. Check deployment logs (Railway/Render/Vercel dashboards)
2. Verify environment variables are set correctly
3. Test backend URL directly in browser
4. Check MongoDB Atlas allows connections

**Deployment should take ~30 minutes total if following this guide.**
