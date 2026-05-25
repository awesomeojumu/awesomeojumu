# Deploy awesomeojumu.com (Production)

Laravel 12 personal site for **https://awesomeojumu.com**

> **Using Namecheap?** Follow the dedicated guide: **[NAMECHEAP-DEPLOY.md](NAMECHEAP-DEPLOY.md)**

## Server requirements

- PHP **8.2+** (extensions: `openssl`, `mbstring`, `pdo`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`)
- Composer 2.x
- Apache with `mod_rewrite` + `mod_headers` (or Nginx equivalent)
- **Document root must be the `public/` folder**

## 1. Upload the project

Clone or upload the repo to your host (e.g. `public_html/awesomeojumu` or directly into `public_html` if the domain points there).

**Recommended structure (cPanel / shared hosting):**

```
/home/you/awesomeojumu/     ← full Laravel app (not web-accessible)
/home/you/public_html/      ← symlink OR copy only contents of /public here
```

**Simplest for cPanel:** set domain document root to:

```
/home/you/awesomeojumu/public
```

## 2. Create production `.env` on the server

```bash
cp .env.production.example .env
php artisan key:generate
```

Edit `.env` and set:

| Variable | Value |
|----------|--------|
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_URL` | `https://awesomeojumu.com` |
| `SESSION_SECURE_COOKIE` | `true` |
| `SESSION_DOMAIN` | `awesomeojumu.com` |
| `MAIL_*` | Your host SMTP credentials |
| `MAIL_CONTACT_TO` | `planexiglobalconsult@gmail.com` |

Never commit `.env` to Git.

## 3. Install dependencies (on server)

```bash
composer install --optimize-autoloader --no-dev
```

## 4. Permissions

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

(On cPanel, use the file manager or your host’s PHP user instead of `www-data`.)

## 5. Optimize Laravel

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

## 6. SSL / HTTPS

- Enable **SSL** for `awesomeojumu.com` in your hosting panel (Let’s Encrypt).
- `public/.htaccess` already redirects HTTP → HTTPS (skipped on localhost).

## 7. DNS

Point the domain to your server:

| Type | Name | Value |
|------|------|--------|
| A | `@` | Server IP |
| A or CNAME | `www` | Same IP or `awesomeojumu.com` |

## 8. Verify after deploy

- https://awesomeojumu.com/
- https://awesomeojumu.com/work
- https://awesomeojumu.com/contact (submit test message)
- https://awesomeojumu.com/sitemap.xml
- https://awesomeojumu.com/robots.txt
- https://awesomeojumu.com/up (health check)

## 9. Contact form email

Use your host’s SMTP (cPanel → Email Accounts) or a service (Mailgun, Brevo, Gmail app password).

Example (cPanel SMTP):

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.awesomeojumu.com
MAIL_PORT=587
MAIL_USERNAME=noreply@awesomeojumu.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@awesomeojumu.com
MAIL_FROM_NAME="Awesome Ojumu"
```

Test from the server:

```bash
php artisan tinker
>>> Mail::raw('Test', fn ($m) => $m->to('planexiglobalconsult@gmail.com')->subject('Test'));
```

## 10. Updates (re-deploy)

```bash
git pull origin main
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Bump `ASSET_VERSION` in `.env` when CSS/JS changes so browsers load fresh assets.

## 11. Maintenance mode

```bash
php artisan down --secret="your-secret-token"
# Visit https://awesomeojumu.com/your-secret-token to preview while down
php artisan up
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 error | Check `storage/logs/laravel.log`, fix permissions on `storage/` |
| CSS/JS 404 | Document root must be `public/`; run `php artisan config:cache` |
| Mixed content | Ensure `APP_URL` uses `https://` |
| Contact form fails | Check SMTP in `.env`, see log file |
| Session issues | Set `SESSION_DOMAIN=awesomeojumu.com` and `SESSION_SECURE_COOKIE=true` |

## Local vs production

Keep local `.env` with `APP_DEBUG=true` and `APP_URL=http://localhost:8000`. Use `.env.production.example` only on the live server.
