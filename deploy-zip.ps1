# Build production zip for Namecheap / cPanel upload
# Usage: .\deploy-zip.ps1
#        .\deploy-zip.ps1 -OutputPath "C:\Users\you\Desktop\my-deploy.zip"

param(
    [string]$OutputPath = "$env:USERPROFILE\Desktop\awesomeojumu-deploy.zip"
)

$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot

Set-Location $projectRoot

Write-Host "Installing production dependencies..." -ForegroundColor Cyan
composer install --optimize-autoloader --no-dev --no-interaction
if ($LASTEXITCODE -ne 0) {
    throw "composer install failed"
}

$exclude = @(
    '.git',
    'node_modules',
    'tests',
    '.env',
    '.cursor',
    '.idea',
    '.vscode',
    '.fleet',
    '.phpunit.cache',
    'storage\logs\*.log'
)

$dest = Join-Path $env:TEMP "awesomeojumu-deploy-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
if (Test-Path $dest) {
    Remove-Item $dest -Recurse -Force
}
New-Item -ItemType Directory -Path $dest | Out-Null

Write-Host "Copying project files..." -ForegroundColor Cyan
Get-ChildItem -Path $projectRoot -Force | Where-Object {
    $exclude -notcontains $_.Name
} | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
}

# Ensure storage structure exists and logs are empty
$storageDirs = @('storage\app\public', 'storage\framework\cache\data', 'storage\framework\sessions', 'storage\framework\views', 'storage\logs')
foreach ($dir in $storageDirs) {
    $full = Join-Path $dest $dir
    if (-not (Test-Path $full)) {
        New-Item -ItemType Directory -Path $full -Force | Out-Null
    }
}
Get-ChildItem (Join-Path $dest 'storage\logs') -Filter '*.log' -ErrorAction SilentlyContinue | Remove-Item -Force

if (Test-Path $OutputPath) {
    Remove-Item $OutputPath -Force
}

$outputDir = Split-Path $OutputPath -Parent
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Creating zip..." -ForegroundColor Cyan
Compress-Archive -Path (Join-Path $dest '*') -DestinationPath $OutputPath -Force

Remove-Item $dest -Recurse -Force

$sizeMb = [math]::Round((Get-Item $OutputPath).Length / 1MB, 2)
Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host "  Zip:  $OutputPath"
Write-Host "  Size: ${sizeMb} MB"
Write-Host ""
Write-Host "Upload to Namecheap cPanel, extract, then create .env from .env.production.example" -ForegroundColor Yellow
