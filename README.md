# Awesome Ojumu — Personal Website

Personal site for **Ayobami Ojumu** (brand: **Awesome Ojumu**) at [awesomeojumu.com](https://awesomeojumu.com).

Built on **Laravel 12** with the Planexi design system: dual themes (The Executive / The Manuscript), Playfair Display + DM Sans + DM Mono, GSAP animations, Alpine.js contact form.

## Local development (XAMPP)

1. Copy `.env.example` to `.env` and run `php artisan key:generate`
2. Start Apache in XAMPP
3. Open: **http://localhost/awesomeojumu/**

Routes are served through Laravel's `public/` folder via root `.htaccess`.

Alternative: `php artisan serve` → http://127.0.0.1:8000

## Pages

| Route     | Page    |
|-----------|---------|
| `/`       | Home    |
| `/work`   | Work    |
| `/faith`  | Faith   |
| `/words`  | Words   |
| `/contact`| Contact |

## Assets

- `public/css/` — design tokens, components
- `public/js/` — theme, nav, GSAP animations, custom cursor

## Contact form

POST `/contact` — uses Laravel Mail. Default mailer is `log` (writes to `storage/logs/laravel.log`).

For production, set in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=...
MAIL_CONTACT_TO=planexiglobalconsult@gmail.com
```

## Production (awesomeojumu.com)

Point the domain document root to `public/`, or deploy the full app with root `.htaccess` redirecting to `public/`.

## Planexi

Planexi Global Consult Limited · RC No. 9080284
