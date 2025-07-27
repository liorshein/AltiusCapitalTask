# 🚀 Deployment Guide: Netlify + Render (Free Tier)

## Prerequisites
- Git repository (GitHub/GitLab)
- Netlify account (free)
- Render account (free)

## 📋 Deployment Checklist

### Phase 1: Deploy Backend to Render

1. **Push code to Git repository** (if not already done)

2. **Sign up for Render** at https://render.com
   - Connect your GitHub/GitLab account

3. **Create new Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the `backend` folder (or root if monorepo)

4. **Configure deployment settings**:
   ```
   Name: altiuscapital-backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. **Set environment variables** in Render dashboard:
   ```
   SECRET_KEY=generate-a-strong-random-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   FO1_BASE_URL=https://fo1.api.altius.finance/api
   FO2_BASE_URL=https://fo2.api.altius.finance/api
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

6. **Deploy** - Render will automatically build and deploy
   - Note your backend URL: `https://your-app-name.onrender.com`

### Phase 2: Deploy Frontend to Netlify

1. **Update environment variables**:
   - Copy `frontend/.env.example` to `frontend/.env`
   - Update `VITE_API_URL` with your Render backend URL

2. **Sign up for Netlify** at https://netlify.com
   - Connect your GitHub/GitLab account

3. **Create new site**:
   - "Add new site" → "Import an existing project"
   - Choose your repository
   - Configure build settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/dist
     ```

4. **Set environment variables** in Netlify:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```

5. **Deploy** - Netlify will build and deploy automatically
   - Note your frontend URL: `https://your-site-name.netlify.app`

### Phase 3: Update CORS Settings

1. **Update backend CORS** in Render dashboard:
   - Add your Netlify domain to `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://your-site-name.netlify.app,http://localhost:3000,http://localhost:5173
   ```

2. **Redeploy backend** to apply CORS changes

## 🔧 Post-Deployment

### Testing
1. Visit your Netlify URL
2. Test website selection and login functionality
3. Verify deals are loading correctly
4. Test file download feature

### Monitoring
- **Render**: Check logs in dashboard for backend issues
- **Netlify**: Check deploy logs and function logs

### Domain Setup (Optional)
- **Custom domain**: Configure in Netlify dashboard
- **SSL**: Automatically provided by both platforms

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Netlify domain is in `ALLOWED_ORIGINS`
   - Check frontend is using correct API URL

2. **Backend Not Responding**
   - Check Render logs for Python errors
   - Verify environment variables are set

3. **Frontend Build Fails**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **API Calls Fail**
   - Confirm `VITE_API_URL` is correct
   - Check network tab for 404/500 errors

### Free Tier Limitations
- **Render**: Service sleeps after 15 min inactivity (30-second cold start)
- **Netlify**: 100GB bandwidth/month, 300 build minutes
- **Solution**: Consider upgrading for production use

## 📱 URLs After Deployment

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://your-app-name.onrender.com`
- **API Docs**: `https://your-app-name.onrender.com/docs`

## 🔄 Continuous Deployment

Both platforms automatically redeploy when you push to your main branch:
- **Backend**: Render rebuilds on Git push
- **Frontend**: Netlify rebuilds on Git push

## 📊 Cost Breakdown (Free Tier)

- **Render**: $0/month (750 hours free)
- **Netlify**: $0/month (100GB bandwidth)
- **Total**: $0/month

Perfect for MVP and testing! 🎉