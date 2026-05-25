@extends('layouts.app')

@section('content')
<main>
  <section class="page-hero section hero-stage">
    <div class="container">
      <p class="eyebrow reveal">Essays & Reflections</p>
      <h1 class="h1 reveal">Thinking out loud.</h1>
      <p class="h2 reveal" style="margin-top: 1rem;">These are not posts. They are positions — taken carefully, shared honestly, always in progress.</p>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="card-grid" style="margin-bottom: 3rem;">
        <article class="card reveal">
          <h3>On Work</h3>
          <p>Systems, strategy, consulting, building. The mechanics of getting things done and the thinking behind them.</p>
        </article>
        <article class="card reveal">
          <h3>On Faith</h3>
          <p>Conviction, purpose, identity, calling. The operating system, examined.</p>
        </article>
        <article class="card reveal">
          <h3>On Craft</h3>
          <p>Storytelling, writing, creativity, the discipline of making things that mean something.</p>
        </article>
      </div>

      <article class="essay-card reveal">
        <p class="card-tag">On Work</p>
        <h3>Why Most Digital Transformations Fail Before They Start</h3>
        <div class="essay-body">
          <p>Every week, another organisation announces a digital transformation initiative. And every few months, you hear quietly that it didn't go as planned — overspent, underdelivered, or quietly shelved.</p>
          <p>I've spent years inside these projects. And I've noticed that the failures almost never happen during implementation. They happen before a single line of code is written.</p>
          <p>The real problem is confusing purchase with transformation. Most organisations approach digital transformation as a procurement exercise. Find a vendor. Sign a contract. Receive a system. What they forget is that technology doesn't transform anything. People using technology in new ways — supported by updated processes, trained adequately, and held accountable — that's transformation.</p>
          <p>Start with the problem, not the solution. Map your current state honestly. Define done before you start. The organisations that transform successfully aren't the ones with the biggest budgets. They're the ones that did the thinking before the spending.</p>
        </div>
      </article>

      <article class="essay-card reveal">
        <p class="card-tag">On Work</p>
        <h3>The Vendor Governance Problem Nobody Talks About</h3>
        <div class="essay-body">
          <p>I've managed vendor relationships across construction, software, event production, and community infrastructure. The contexts differ dramatically. The failure mode is almost always the same: the organisation didn't define success in writing before the contract was signed.</p>
          <p>When the Terms of Reference are vague, vendors deliver to the minimum defensible interpretation of those terms. Then they invoice. Then you dispute. I've sat across the table from vendors who delivered exactly what the contract said — and nothing the client needed. Neither party was wrong, technically. But the project failed.</p>
          <p>Good vendor governance is not distrust. It is clarity. And trust built on top of clarity is the only kind worth having.</p>
        </div>
      </article>

      <article class="essay-card reveal">
        <p class="card-tag">On Faith</p>
        <h3>On Being a Wild Card</h3>
        <div class="essay-body">
          <p>I didn't plan most of what I've built. That is not modesty. It is observation. The consulting firm came from a recognition of what the market needed. The software work came from the absence of what should have existed. The faith work came from a call that didn't ask for my permission.</p>
          <p>A wild card is not a loose cannon. It is an element that doesn't conform to the expected hierarchy — but that doesn't mean it lacks value. In the right hand, at the right moment, it determines everything.</p>
          <p>My purpose is not written in stone because the One writing it is still writing. That is not uncertainty. That is trust.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">Future topics</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <ul class="availability-list reveal">
        <li>What the McKinsey Forward Program actually taught me</li>
        <li>Building LMS platforms on faith and a fixed budget</li>
        <li>Why African organisations need transformation offices, not just IT departments</li>
        <li>On disability inclusion — what it actually requires</li>
        <li>The discipline of finishing things</li>
        <li>Storytelling as systems thinking</li>
      </ul>
    </div>
  </section>
</main>

@endsection
