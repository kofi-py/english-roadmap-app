# Deployment Guide 🚀

Follow these steps to publish your full-stack English Mastery Roadmap app.

## 1. Backend Deployment (Render.com)

1.  **Create a New Web Service**: Link your GitHub repository.
2.  **Root Directory**: Set this to `server`.
3.  **Environment**: Node
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`
6.  **Advanced (Environment Variables)**: Add the following from your local `.env`:
    -   `DATABASE_URL`: (Your Neon PostgreSQL connection string)
    -   `JWT_SECRET`: (A strong random string)
    -   `FRONTEND_URL`: (Leave empty for now, update later with your Vercel URL)

## 2. Frontend Deployment (Vercel)

1.  **Import Project**: Link your GitHub repository.
2.  **Settings**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `./` (The root level)
3.  **Environment Variables**:
    -   `VITE_API_URL`: (The URL of your live Render backend, e.g., `https://your-app.onrender.com`)
4.  **Deploy**: Click deploy!

## 3. Connecting the Two

1.  Once Vercel gives you a preview URL (e.g., `https://english-roadmap.vercel.app`), go back to **Render**.
2.  Update the `FRONTEND_URL` environment variable to match your new Vercel URL.
3.  This ensures that your backend only accepts secure requests from your specific website.

## 4. Database Setup (Neon.tech)

-   Your database is already live on Neon. 
-   Ensure all tables (`users`, `posts`, `replies`) are created. You can use the code in `server/schema.sql` to re-run the setup if needed in the Neon SQL Editor.

---

### Important Maintenance
> [!NOTE]
> If you change your backend URL, you MUST update `VITE_API_URL` on Vercel and trigger a new deployment for the frontend.
