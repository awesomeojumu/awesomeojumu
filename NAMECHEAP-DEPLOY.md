# Deploy awesomeojumu.com on Namecheap

Step-by-step guide for **Namecheap shared hosting (cPanel)** — the usual setup for a personal Laravel site.

**Time:** about 45–90 minutes the first time.

---

## What you need

- Domain **awesomeojumu.com** on Namecheap (or pointed to Namecheap hosting)
- Namecheap **Stellar**, **Stellar Plus**, or **Stellar Business** hosting (cPanel)
- This project on your PC (already at `c:\xampp\htdocs\awesomeojumu`)
- FTP client optional: [FileZilla](https://filezilla-project.org/) or use cPanel File Manager

---

## Part 1 — Point the domain to hosting

### If the domain AND hosting are both on Namecheap

1. Log in to [Namecheap](https://www.namecheap.com/) → **Dashboard**
2. Open **Hosting List** → **Manage** on your hosting plan
3. Note the **cPanel** login URL, username, and password
4. Under the same hosting, use **Domain** → assign **awesomeojumu.com** to this hosting (Namecheap often does this automatically)

### If the domain is on Namecheap but DNS must be set manually

1. **Domain List** → **Manage** next to `awesomeojumu.com`
2. **Advanced DNS**
3. Remove parking records if any, then add:

| Type | Host | Value | TTL |
|------|------|--------|-----|
| A | `@` | Your hosting **server IP** (from cPanel → Server Information) | Automatic |
| CNAME | `www` | `awesomeojumu.com.` | Automatic |

4. Wait **15 minutes to 48 hours** for DNS (often under 1 hour on Namecheap)

---

## Part 2 — Prepare the project on your PC

Open **PowerShell** in the project folder:

```powershell
cd c:\xampp\htdocs\awesomeojumu
```

### 1. Build the deploy zip (one command)

From the project folder in PowerShell:

```powershell
cd c:\xampp\htdocs\awesomeojumu
composer run zip-deploy
```

This runs `deploy-zip.ps1`, which:

1. Runs `composer install --no-dev` (includes `vendor/`)
2. Copies the project (excludes `.git`, `node_modules`, `.env`, tests, etc.)
3. Creates **`Desktop\awesomeojumu-deploy.zip`**

**Custom output path:**

```powershell
.\deploy-zip.ps1 -OutputPath "D:\backups\awesomeojumu-deploy.zip"
```

Upload **`awesomeojumu-deploy.zip`** via cPanel.

> **Important:** Do **not** upload your local `.env` file. You will create a new one on the server.

---

## Part 3 — cPanel setup

### 1. Log in to cPanel

- Namecheap → **Hosting** → **Manage** → **Go to cPanel**
- Or open the cPanel URL from your welcome email

### 2. Set PHP version

1. **Software** → **Select PHP Version** (or **MultiPHP Manager**)
2. Select domain **awesomeojumu.com**
3. Choose **PHP 8.2** (or 8.3 if offered)
4. Enable extensions if shown: **mbstring**, **openssl**, **pdo**, **tokenizer**, **xml**, **ctype**, **json**, **fileinfo**
5. **Save**

### 3. Create the site folder (recommended layout)

**Option A — Best for Laravel (change document root)**

1. **File Manager** → open `home/youruser/`
2. Create folder: `awesomeojumu`
3. Upload `awesomeojumu-deploy.zip` into `awesomeojumu`
4. Right-click zip → **Extract**
5. Delete the zip after extract

6. **Domains** → **Domains** (or **Addon Domains**)
7. Edit **awesomeojumu.com** → set **Document Root** to:
   ```
   /home/youruser/awesomeojumu/public
   ```
   (Replace `youruser` with your cPanel username — shown in File Manager path.)

**Option B — If you cannot change document root**

Only `public_html` is allowed as web root on some plans:

1. Upload the **contents** of the `public` folder into `public_html`
2. Upload the rest of Laravel (app, bootstrap, config, etc.) **one level above** `public_html` into `/home/youruser/`
3. Edit `public_html/index.php` — change paths:

```php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
```

(Adjust `../` if your folder names differ.)

**Option A is strongly recommended** — ask Namecheap support to enable custom document root if you don’t see the option.

---

## Part 4 — Create `.env` on the server

1. cPanel → **File Manager** → `awesomeojumu`
2. Copy `.env.production.example` → rename copy to **`.env`**
3. Right-click `.env` → **Edit**

Set at minimum:

```env
APP_NAME="Awesome Ojumu"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://awesomeojumu.com

LOG_LEVEL=error

SESSION_DRIVER=file
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=awesomeojumu.com
SESSION_SAME_SITE=lax

CACHE_STORE=file
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=mail.awesomeojumu.com
MAIL_PORT=587
MAIL_USERNAME=noreply@awesomeojumu.com
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@awesomeojumu.com
MAIL_FROM_NAME="Awesome Ojumu"
MAIL_CONTACT_TO=planexiglobalconsult@gmail.com

ASSET_VERSION=3
```

4. **Save**

### Generate `APP_KEY` (required)

**If cPanel has Terminal / SSH** (Stellar Business often does):

```bash
cd ~/awesomeojumu
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**If you have NO terminal**, generate key on your PC:

```powershell
cd c:\xampp\htdocs\awesomeojumu
php artisan key:generate --show
```

Copy the output (`base64:...`) into the server `.env`:

```env
APP_KEY=base64:paste-here
```

Then on PC (with production URL in mind), run cache commands and re-upload only `bootstrap/cache` if needed — or use cPanel **Terminal** when available.

---

## Part 5 — Folder permissions

In **File Manager**:

1. Right-click `storage` → **Permissions** → **775** (or 755 if 775 fails)
2. Check **Recurse into subdirectories** → apply
3. Repeat for `bootstrap/cache`

---

## Part 6 — SSL (HTTPS)

1. cPanel → **Security** → **SSL/TLS Status**
2. Find **awesomeojumu.com** → **Run AutoSSL** or install **Let's Encrypt**
3. Wait until certificate shows as active
4. cPanel → **Domains** → enable **Force HTTPS Redirect** if available

Your site’s `.htaccess` also redirects HTTP → HTTPS.

---

## Part 7 — Email for the contact form

### Using Namecheap Private Email (recommended)

1. Namecheap → **Domain** → **Private Email** (or buy a mailbox)
2. Create mailbox: `noreply@awesomeojumu.com`
3. In cPanel → **Email Accounts** you may see the same mailbox
4. Use those SMTP settings in `.env`:

```env
MAIL_HOST=mail.privateemail.com
MAIL_PORT=587
MAIL_USERNAME=noreply@awesomeojumu.com
MAIL_PASSWORD=your-mailbox-password
MAIL_ENCRYPTION=tls
```

(Confirm exact host in Namecheap’s email setup page — sometimes `mail.awesomeojumu.com` after DNS records are added.)

### Using Gmail (alternative)

Use a Google **App Password** (2FA required):

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=16-char-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your@gmail.com
```

---

## Part 8 — Composer on Namecheap (if no SSH)

Shared plans without SSH: you already ran `composer install --no-dev` on your PC before zipping, so the **`vendor`** folder is included in the upload. That is fine.

If you have **Terminal** in cPanel, prefer running `composer install --no-dev` on the server instead of uploading `vendor` from Windows.

---

## Part 9 — Test the live site

Open in the browser:

| URL | Expect |
|-----|--------|
| https://awesomeojumu.com | Home page loads, styles applied |
| https://awesomeojumu.com/work | Work page |
| https://awesomeojumu.com/contact | Form works, success message |
| https://awesomeojumu.com/sitemap.xml | XML sitemap |
| https://awesomeojumu.com/up | `{"status":"ok"}` or similar |

Submit the contact form once and check **planexiglobalconsult@gmail.com**.

---

## Part 10 — Future updates from GitHub

When you change the site locally:

1. Push to GitHub (`git push`)
2. On PC: `composer install --no-dev`, bump `ASSET_VERSION` in `.env`
3. Re-zip and upload changed files, **or** use cPanel **Git Version Control** if available
4. On server (Terminal):
   ```bash
   cd ~/awesomeojumu
   git pull
   composer install --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

---

## Troubleshooting on Namecheap

| Problem | What to do |
|---------|------------|
| **500 Internal Server Error** | cPanel → **Errors** or open `storage/logs/laravel.log` in File Manager |
| **Blank page / white screen** | Set `APP_DEBUG=true` briefly in `.env`, reload, read error, set back to `false` |
| **CSS/JS missing** | Document root must be `.../public` — not project root |
| **403 Forbidden** | Permissions on `storage` and `bootstrap/cache` |
| **Contact form doesn’t email** | Wrong `MAIL_*` — test mailbox in webmail first |
| **“APP_KEY missing”** | Run `php artisan key:generate` or paste key manually |
| **Composer not found** | Install vendors on PC and upload `vendor` folder |
| **PHP version too old** | cPanel → Select PHP Version → 8.2+ |

**Namecheap Support:** Live chat at namecheap.com — say: *“I need PHP 8.2 and document root pointed to a Laravel `public` folder for awesomeojumu.com.”*

---

## Quick reference

| Item | Value |
|------|--------|
| Live URL | https://awesomeojumu.com |
| Web root | `/home/USER/awesomeojumu/public` |
| Env template | `.env.production.example` |
| Deploy script (SSH) | `bash deploy.sh` |
| Health check | `/up` |

---

## Checklist before you go live

- [ ] Domain DNS points to Namecheap hosting
- [ ] PHP 8.2+ selected in cPanel
- [ ] Files uploaded, document root = `public`
- [ ] `.env` created, `APP_DEBUG=false`, `APP_KEY` set
- [ ] `storage` and `bootstrap/cache` writable
- [ ] SSL active, site opens on HTTPS
- [ ] SMTP configured, contact form tested
- [ ] `php artisan config:cache` run (if Terminal available)

Your local XAMPP copy stays unchanged for development. Production only lives on Namecheap with its own `.env`.
