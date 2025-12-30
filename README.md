# The Golden Era - Jewelry E-Commerce Platform

A full-stack e-commerce application for selling gold jewelry, built with React and FastAPI.

## Tech Stack

**Frontend:**
- React 19.0
- React Router 7.5.1
- Tailwind CSS 3.4.17
- shadcn/ui components
- Radix UI primitives
- Craco (Create React App Configuration Override)

**Backend:**
- FastAPI 0.110.1
- Motor (Async MongoDB driver)
- Uvicorn
- Pydantic for data validation

**Database:**
- MongoDB

## Project Structure

```
.
├── frontend/          # React application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/
│   │   ├── context/  # Global state management
│   │   └── App.js    # Main app with routing
│   └── public/
├── backend/          # FastAPI backend
│   └── server.py     # API server
├── data/            # Product data
└── tests/           # Test files
```

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- Yarn (v1.22.22)
- Python 3.8+
- MongoDB

### Frontend Setup

```bash
cd frontend
yarn install
yarn start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

The backend API will run on [http://localhost:8000](http://localhost:8000)

### Environment Variables

Copy [.env.example](.env.example) to `.env.local` in the frontend directory and fill in the values:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

For the backend, set:
```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=your_database_name
CORS_ORIGINS=http://localhost:3000
```

## Deployment

### Deploying to Vercel

This project is configured for Vercel deployment with the frontend. The backend needs to be deployed separately.

#### Step 1: Deploy Backend

Deploy the Python FastAPI backend to a service like:
- **Railway**: [railway.app](https://railway.app)
- **Render**: [render.com](https://render.com)
- **Heroku**: [heroku.com](https://heroku.com)

Set the following environment variables on your backend hosting service:
```
MONGO_URL=your_mongodb_atlas_connection_string
DB_NAME=golden_era
CORS_ORIGINS=https://your-vercel-domain.vercel.app
```

#### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from [vercel.json](vercel.json)

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_BACKEND_URL` = Your deployed backend URL

4. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Step 3: Update CORS

After deployment, update the `CORS_ORIGINS` environment variable in your backend with your Vercel deployment URL.

### Database Setup

Set up MongoDB Atlas (recommended for production):
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add connection string to backend environment variables as `MONGO_URL`

## Build Commands

### Frontend
```bash
cd frontend
yarn build
```

Output: `frontend/build/`

### Backend
The Python backend doesn't require a build step, but ensure all dependencies are installed:
```bash
cd backend
pip install -r requirements.txt
```

## API Endpoints

The backend provides the following API routes:

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/related/{id}` - Get related products
- `GET /api/search/suggestions` - Search suggestions
- `GET/POST /api/cart` - Cart operations
- `GET/POST /api/wishlist` - Wishlist operations
- `POST/GET /api/orders` - Order management
- `POST /api/appointments` - Book appointments
- `GET /api/stores` - Get store locations
- `POST /api/contact` - Contact form
- `GET /api/categories` - Get product categories

## Features

- Product browsing and search
- Shopping cart management
- Wishlist functionality
- User authentication
- Order placement
- Store locator
- Appointment booking
- Quiz for personalized recommendations
- Newsletter subscription
- Contact form

## Configuration Files

- [vercel.json](vercel.json) - Vercel deployment configuration
- [.vercelignore](.vercelignore) - Files to ignore during Vercel deployment
- [frontend/craco.config.js](frontend/craco.config.js) - Webpack customization
- [frontend/tailwind.config.js](frontend/tailwind.config.js) - Tailwind CSS configuration

## License

All rights reserved.
