# Railway Deployment

## Services

1. **Web** — this Next.js + Payload app
2. **MongoDB** — Railway MongoDB plugin

## Environment variables

Set these on the Railway web service:

- `PAYLOAD_SECRET`
- `DATABASE_URI` (from Railway MongoDB)
- `NEXT_PUBLIC_SERVER_URL` (your Railway app URL)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER`
- `BUFFER_ACCESS_TOKEN`

## First deploy steps

1. Deploy the web service and MongoDB.
2. Open `/admin` and create your admin user (or run `npm run seed` locally against the Railway database).
3. In Payload admin, open **Buffer Settings** and click **Sync Channels from Buffer**.
4. Create content and publish social posts from **Social Posts**.

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Seed local content:

```bash
npm run seed
```
