<!DOCTYPE html>
<html lang="en" class="js" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ $pageDescription ?? 'Ayobami Ojumu — Builder, storyteller, consultant, developer, man of faith.' }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="author" content="Ayobami Ojumu">
  <link rel="canonical" href="{{ url()->current() }}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:title" content="{{ ($pageTitle ?? 'AWESOME OJUMU') . ' · Ayobami Ojumu' }}">
  <meta property="og:description" content="{{ $pageDescription ?? 'Ayobami Ojumu — Builder, storyteller, consultant, developer, man of faith.' }}">
  <meta property="og:site_name" content="Awesome Ojumu">

  <title>{{ $pageTitle ?? 'AWESOME OJUMU' }} · Ayobami Ojumu</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="{{ asset('css/main.css') }}?v={{ config('site.asset_version') }}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%23C9A84C'>AO</text></svg>">
</head>
<body>

<nav class="site-nav" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="{{ route('home') }}" class="brand">
      <span class="brand-monogram">AO</span>
      <span class="brand-name">Awesome Ojumu</span>
    </a>
    <ul class="nav-links">
      <li><a href="{{ route('home') }}" @class(['is-active' => request()->routeIs('home')])>Home</a></li>
      <li><a href="{{ route('work') }}" @class(['is-active' => request()->routeIs('work')])>Work</a></li>
      <li><a href="{{ route('faith') }}" @class(['is-active' => request()->routeIs('faith')])>Faith</a></li>
      <li><a href="{{ route('words') }}" @class(['is-active' => request()->routeIs('words')])>Words</a></li>
      <li><a href="{{ route('contact') }}" @class(['is-active' => request()->routeIs('contact')])>Contact</a></li>
    </ul>
    <div class="nav-actions">
      <button type="button" class="theme-toggle" aria-label="Toggle theme">☾</button>
      <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
    </div>
  </div>
</nav>

<div class="mobile-nav" aria-hidden="true">
  <ul>
    <li><a href="{{ route('home') }}">Home</a></li>
    <li><a href="{{ route('work') }}">Work</a></li>
    <li><a href="{{ route('faith') }}">Faith</a></li>
    <li><a href="{{ route('words') }}">Words</a></li>
    <li><a href="{{ route('contact') }}">Contact</a></li>
  </ul>
</div>

<div class="page-transition" aria-hidden="true"></div>

@yield('content')

<footer class="site-footer">
  <div class="footer-inner container">
    <div class="footer-brand">
      <a href="{{ route('home') }}" class="brand">
        <span class="brand-monogram">AO</span>
        <span class="brand-name">Awesome Ojumu</span>
      </a>
      <p class="text-small text-secondary" style="margin-top: 0.75rem;">
        Ayobami Ojumu · Planexi Global Consult Limited
      </p>
    </div>
    <div class="footer-meta">
      <p><a href="mailto:{{ config('site.contact_email') }}">{{ config('site.contact_email') }}</a></p>
      <p class="text-small" style="margin-top: 0.5rem;">Lagos / Ogun State, Nigeria</p>
      <p class="text-small" style="margin-top: 1rem;">© {{ date('Y') }} Awesome Ojumu. All rights reserved.</p>
    </div>
  </div>
</footer>

@php $v = config('site.asset_version'); @endphp
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" crossorigin="anonymous"></script>
<script>document.documentElement.classList.add('js');</script>
<script src="{{ asset('js/theme.js') }}?v={{ $v }}"></script>
<script src="{{ asset('js/cursor.js') }}?v={{ $v }}"></script>
<script src="{{ asset('js/nav.js') }}?v={{ $v }}"></script>
<script src="{{ asset('js/animations.js') }}?v={{ $v }}"></script>
</body>
</html>
