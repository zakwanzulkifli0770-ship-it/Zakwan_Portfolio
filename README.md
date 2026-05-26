# Muhd Zakwan — Personal Portfolio

A full-stack personal portfolio website with admin dashboard, built with React + Vite (frontend) and Express + Node.js (backend), backed by PostgreSQL.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, TailwindCSS, Framer Motion, shadcn/ui |
| Backend | Express 5, Node.js 24, TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| Package Manager | pnpm (monorepo) |

---

## Local Development (Replit)

Everything runs automatically in Replit. Just open the project and the workflows start.

- Portfolio frontend: `pnpm --filter @workspace/portfolio run dev`
- API server: `pnpm --filter @workspace/api-server run dev`
- Push DB schema: `pnpm --filter @workspace/db run push`
- Regenerate API hooks: `pnpm --filter @workspace/api-spec run codegen`

---

## Deploy to Render

### Prerequisites

- A [Render](https://render.com) account
- Your code pushed to a GitHub or GitLab repository

### Steps

**1. Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**2. Create services on Render**

Go to [render.com/dashboard](https://dashboard.render.com) → **New** → **Blueprint** → connect your repository. Render will automatically detect `render.yaml` and create:

- A **Web Service** (Node.js) for the API + frontend
- A **PostgreSQL database**

**3. Set environment variables**

After the blueprint is created, go to your Web Service → **Environment** and set:

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | Your secure admin password |

All other variables (`DATABASE_URL`, `NODE_ENV`, `PORT`, `BASE_PATH`) are set automatically by `render.yaml`.

**4. Deploy**

Render will automatically build and deploy. The build command runs:

1. Install dependencies (`pnpm install`)
2. Generate API client code
3. Build the React frontend (`vite build`)
4. Compile the Express API (`esbuild`)
5. Push database schema (`drizzle-kit push`)

**5. First login**

Visit `https://YOUR_RENDER_URL/admin` and log in with the `ADMIN_PASSWORD` you set.

---

## Environment Variables

See `.env.example` for all required variables.

```env
NODE_ENV=production
PORT=10000
BASE_PATH=/
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your_secure_password
```

---

## Admin Dashboard

The admin dashboard is available at `/admin`. It lets you manage:

- Projects (create, edit, delete, mark as featured)
- Skills (with proficiency levels and categories)
- Experiences (work history and education)
- Certificates
- Contact messages (read/mark as read)

---

## Project Structure

```
├── artifacts/
│   ├── api-server/       # Express API (builds to dist/index.mjs)
│   └── portfolio/        # React + Vite frontend (builds to dist/public/)
├── lib/
│   ├── api-spec/         # OpenAPI spec + codegen config
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-zod/          # Generated Zod validation schemas
│   └── db/               # Drizzle ORM schema + migrations
├── render.yaml           # Render deployment blueprint
├── render-build.sh       # Render build script
└── .env.example          # Environment variable reference
```
