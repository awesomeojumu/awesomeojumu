# Awesome Ojumu — Personal Website

**https://awesomeojumu.com** — Ayobami Ojumu (brand: Awesome Ojumu)

Laravel 12 · Planexi design system · GSAP · Alpine.js

## Local development

```bash
cp .env.example .env
php artisan key:generate
composer install
php artisan serve
```

Open http://127.0.0.1:8000

Sessions and cache use **files** (no database required locally).

## Production deploy

```powershell
composer run zip-deploy
```

Creates `Desktop\awesomeojumu-deploy.zip` for upload to your host.

- **Namecheap hosting:** **[NAMECHEAP-DEPLOY.md](NAMECHEAP-DEPLOY.md)** ← start here
- **Other hosts / VPS:** **[DEPLOY.md](DEPLOY.md)**

Quick checklist:

1. Document root → `public/`
2. Copy `.env.production.example` → `.env` on server
3. `APP_DEBUG=false`, `APP_URL=https://awesomeojumu.com`
4. `composer install --no-dev` + `php artisan config:cache`
5. Configure SMTP for the contact form

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/work` | Work |
| `/faith` | Faith |
| `/words` | Words |
| `/contact` | Contact |

## Planexi

Planexi Global Consult Limited · RC No. 9080284
