@extends('layouts.app')

@section('content')
<main>
  <section class="page-hero section hero-stage">
    <div class="container">
      <p class="eyebrow reveal">Conviction</p>
      <h1 class="h1 reveal">This is where everything else comes from.</h1>
      <p class="h2 reveal" style="margin-top: 1rem;">Not a religious statement. Not a brand position. A fact about who I am and how I operate.</p>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">I believe work is a form of service.</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="prose reveal">
        <p>That doing something well, reliably, and with integrity is itself an act of meaning. That the quality of your output reflects the quality of your character. That purpose is not assigned by a title or a salary — it is revealed progressively, in the way you show up, in every context, over time.</p>
        <p>That conviction is what the wild card statement is really saying. Not chaos. Not unpredictability. A life that is not pre-formatted — because the One who formed it writes in real time.</p>
      </div>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <article class="case-study reveal">
        <p class="eyebrow">Redemption Chaplaincy International — RCI</p>
        <h3>Commander · Assistant Director of Research & Development · Cabinet Office</h3>
        <p>I serve in the Cabinet Office of Redemption Chaplaincy International — the intelligence and strategy layer of the organisation. My work here spans research, advisory input, and program development at the intersection of faith and community transformation.</p>
        <p>This is not volunteer work I do on weekends. It is a substantive leadership responsibility that sits alongside — and often informs — everything I do professionally.</p>
      </article>

      <article class="case-study reveal" style="margin-top: 2rem;">
        <p class="eyebrow">Community Development</p>
        <h3>The Work</h3>
        <p>Redemption City is a community of over 200,000 residents. The transformation work I contribute to there — resident profiling, infrastructure strategy, digital systems design — is driven by the same conviction that drives everything else: that communities deserve systems that work, and that building those systems is meaningful work.</p>
      </article>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">In development</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="card-grid">
        <article class="card reveal">
          <p class="card-tag">Drama Series</p>
          <h3>The Search</h3>
          <p>A faith-based drama series currently in development for pitch to a Nigerian Christian film producer. The story lives at the intersection of faith, identity, and the kind of questions that don't have clean answers. More details at the right time.</p>
        </article>
        <article class="card reveal">
          <p class="card-tag">Non-Fiction</p>
          <h3>Binary Code</h3>
          <p>A non-fiction writing project exploring the intersection of faith, technology, and purpose. The title is deliberate: binary systems operate on two states — and so, in ways worth examining, does a life of faith.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="closing-cta section">
    <div class="container reveal">
      <h2 class="h1">Questions about faith, purpose, or the work I do at RCI?</h2>
      <a href="{{ route('contact', ['topic' => 'faith']) }}" class="btn btn-primary" style="margin-top: 1.5rem;">Reach Out →</a>
    </div>
  </section>
</main>

@endsection
