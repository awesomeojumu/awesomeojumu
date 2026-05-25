<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page not found · Awesome Ojumu</title>
  <link rel="stylesheet" href="{{ asset('css/main.css') }}?v={{ config('site.asset_version') }}">
</head>
<body>
  <main class="section" style="min-height: 80vh; display: flex; align-items: center;">
    <div class="container">
      <p class="eyebrow">404</p>
      <h1 class="h1">This page isn't written yet.</h1>
      <p class="h2" style="margin-top: 1rem;">The wild card goes where it's needed — not every URL.</p>
      <a href="{{ route('home') }}" class="btn btn-primary" style="margin-top: 2rem;">Back home →</a>
    </div>
  </main>
</body>
</html>
