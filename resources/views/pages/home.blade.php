@extends('layouts.app')

@section('content')
<main>
  <section class="home-hero section">
    <div class="container">
      <p class="eyebrow reveal">Ayobami Ojumu</p>
      <h1 class="hero-statement" aria-label="I am a wild card, one whose purpose is not written in stone.">
        <span class="hero-line-1" aria-hidden="true">
          @foreach (['I', 'am', 'a', 'wild', 'card,'] as $word)
            <span class="hero-word">{{ $word }}</span>
          @endforeach
        </span>
        <span class="line-secondary hero-line-2">one whose purpose is not written in stone.</span>
      </h1>
      <p class="hero-name">Ayobami Ojumu</p>
      <div class="hero-roles">
        <span>Builder</span>
        <span>Storyteller</span>
        <span>Consultant</span>
        <span>Developer</span>
        <span>Man of Faith</span>
      </div>
      <div class="hero-ctas">
        <a href="{{ route('work') }}" class="btn btn-primary">See What I'm Building →</a>
        <a href="{{ route('faith') }}" class="btn btn-outline">Read My Story</a>
      </div>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">Not everything I am fits in a job description.</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="prose reveal">
        <p>I've built operations systems for travel companies and strategy documents for community infrastructure serving hundreds of thousands. I've written policy, drafted proposals, developed software, and told stories — sometimes in the same week.</p>
        <p>I'm a consultant who codes. A developer who consults. A creative who runs a firm. A man of faith who takes systems seriously. None of that is a contradiction — it is, simply, who I am.</p>
        <p><strong>Planexi</strong> is the vehicle. The work is the proof. This site is the record.</p>
      </div>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">Three lanes. One driver.</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="card-grid">
        <article class="card reveal">
          <h3>The Work</h3>
          <p>I build systems, strategies, and software for organisations navigating complexity. From operations portals to HR policy suites to digital transformation roadmaps — if it needs structure, I find it.</p>
          <a href="{{ route('work') }}" class="btn btn-outline">Explore My Work →</a>
        </article>
        <article class="card reveal">
          <h3>The Faith</h3>
          <p>Everything I do is underwritten by conviction. My faith is not a background detail — it is the operating system. Here is where that lives.</p>
          <a href="{{ route('faith') }}" class="btn btn-outline">Read More →</a>
        </article>
        <article class="card reveal">
          <h3>The Words</h3>
          <p>I write. Essays, reflections, observations on work and life and the space between. Not a blog. A record of thinking.</p>
          <a href="{{ route('words') }}" class="btn btn-outline">Read My Writing →</a>
        </article>
      </div>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">A few things worth showing.</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="card-grid-2">
        <article class="card reveal">
          <p class="card-tag">Digital Transformation · Vendor Governance</p>
          <h3>Operations Infrastructure</h3>
          <p>Technical audit, compliance matrix, and phased remediation roadmap for a city-scale platform.</p>
          <a href="{{ route('work') }}#redemption-city">View case study →</a>
        </article>
        <article class="card reveal">
          <p class="card-tag">Programme Management · Inclusion</p>
          <h3>Terra Academy — Programme Transformation</h3>
          <p>400% enrollment growth, data infrastructure for 25,000+ participants, disability inclusion programme.</p>
          <a href="{{ route('work') }}#terra-academy">View case study →</a>
        </article>
        <article class="card reveal">
          <p class="card-tag">Strategic Planning · Procurement</p>
          <h3>No More Darkness — Solar Infrastructure</h3>
          <p>Deployable plan for 100 solar streetlight units with allocation logic and governance frameworks.</p>
          <a href="{{ route('work') }}#no-more-darkness">View case study →</a>
        </article>
      </div>
    </div>
  </section>

  <section class="closing-cta section">
    <div class="container reveal">
      <h2 class="h1">If something you've read here feels like it matters —</h2>
      <p class="h2">let's talk about what we can build together.</p>
      <a href="{{ route('contact') }}" class="btn btn-primary">Get In Touch</a>
    </div>
  </section>
</main>
@endsection
