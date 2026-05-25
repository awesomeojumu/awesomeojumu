#!/usr/bin/env bash
# Run on the production server after git pull
set -e

echo "Installing dependencies..."
composer install --optimize-autoloader --no-dev

echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Linking storage..."
php artisan storage:link 2>/dev/null || true

echo "Done. Verify https://awesomeojumu.com/up"
