@extends('layouts.app')

@section('content')
<main>
  <section class="page-hero section hero-stage">
    <div class="container">
      <p class="eyebrow reveal">Planexi · Consulting & Build</p>
      <h1 class="h1 reveal">The work is the evidence.</h1>
      <p class="h2 reveal" style="margin-top: 1rem;">I don't carry a portfolio of concepts. Everything here shipped, launched, or landed — in real organisations, with real stakes.</p>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">How I approach every engagement</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="philosophy-grid">
        <div class="philosophy-item reveal">
          <h3>I start with the problem, not the solution.</h3>
          <p>Before I scope anything, I need to understand what's actually happening. That means asking the uncomfortable questions, reading between the lines of what a brief says, and resisting the urge to jump straight to deliverables.</p>
        </div>
        <div class="philosophy-item reveal">
          <h3>I think in systems.</h3>
          <p>Projects don't fail because of single bad decisions. They fail because no one mapped how the pieces connect. I always build with the full picture in mind — dependencies, risks, handoffs, and what comes after I leave.</p>
        </div>
        <div class="philosophy-item reveal">
          <h3>I hold people to what they agreed.</h3>
          <p>Accountability without aggression. I've managed vendors, teams, and executive stakeholders. In all three cases, clarity upfront prevents conflict downstream.</p>
        </div>
        <div class="philosophy-item reveal">
          <h3>I deliver things that outlast me.</h3>
          <p>I'm not building a relationship with your organisation. I'm building a system your organisation can run without me. That's the whole point.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="case-studies" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">Case studies</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>

      <article class="case-study reveal" id="redemption-city">
        <h3>Operations Infrastructure</h3>
        <p class="case-meta">Digital Transformation · Vendor Governance</p>
        <p>A city-scale identification and management platform — covering resident registration, visitor management, access control, and hospitality — had been commissioned and delivered far below its strategic vision. I was brought in to find out how far below, why, and what to do next.</p>
        <p>I conducted a full technical audit against the contracted Terms of Reference. Built an Excel-based compliance matrix mapping every feature against delivery status, risk level, and remediation priority. Produced vendor engagement frameworks and a phased remediation roadmap that gave leadership — for the first time — a documented view of exactly where they stood.</p>
        <p>The audit became the foundation for all subsequent vendor negotiations and system improvement planning. Decisions that had been deferred for months were made within weeks of the report landing.</p>
        <ul>
          <li>Technical audit and gap analysis</li>
          <li>Vendor governance frameworks and compliance matrices</li>
          <li>Phased remediation roadmap</li>
          <li>Strategic documentation for leadership decision-making</li>
        </ul>
      </article>

      <article class="case-study reveal" id="no-more-darkness">
        <h3>No More Darkness — Solar Infrastructure Initiative</h3>
        <p class="case-meta">Strategic Planning · Procurement Management</p>
        <p>Redemption City needed a coordinated deployment plan for 100 solar streetlight units across nine roads — with allocation logic that could be defended, KPIs that could be tracked, and a governance structure leadership could sign off on.</p>
        <p>I produced the formal recommendation document, developed tiered allocation tables based on traffic, safety, and priority criteria, defined KPIs for installation success and maintenance compliance, and built the full vendor management checklist and sign-off framework.</p>
        <p>What was a concept became a deployable plan — ready for executive approval and contractor engagement — within a single project cycle.</p>
        <ul>
          <li>Deployment strategy and allocation logic</li>
          <li>KPI framework and monitoring design</li>
          <li>Vendor RFQ and quality oversight</li>
          <li>Governance documentation for leadership sign-off</li>
        </ul>
      </article>

      <article class="case-study reveal" id="terra-academy">
        <h3>Terra Academy — Programme Transformation</h3>
        <p class="case-meta">Programme Management · Stakeholder Relations · Disability Inclusion</p>
        <p>An arts academy needed to scale — dramatically, and fast. The brief covered enrollment growth, retention improvement, data infrastructure, partnership development, and a first-of-its-kind disability inclusion programme. All simultaneously.</p>
        <p>I led the strategic outreach campaign that achieved 400% enrollment growth in six months. Designed and deployed a feedback system for 25,000+ programme participants. Secured ten institutional partnerships producing over 100 student placements. And built the disability inclusion programme from the ground up — strategy, staff training, process flow, budget, and DEI framework.</p>
        <p>The work didn't just hit targets. It restructured what the organisation was capable of.</p>
        <ul>
          <li>Enrollment strategy — 400% growth in 6 months</li>
          <li>Data infrastructure for 25,000+ participants</li>
          <li>10 institutional partnerships secured</li>
          <li>Full disability inclusion programme — strategy to implementation</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">Also worth knowing</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="prose reveal">
        <p><strong>Other Engagements</strong> — Some work lives under NDA. Some is ongoing. Some was formative enough to mention without naming. Here is the shape of it:</p>
        <ul style="margin-top: 1rem; padding-left: 1.25rem; color: var(--text-secondary);">
          <li>A 16-module operations portal for a travel and events company — built from spec to frontend framework, currently in development</li>
          <li>HR policy architecture for multiple organisations — employment contracts, job frameworks, onboarding systems</li>
          <li>A mentorship and learning platform — faith-based, multi-phase, built to serve a global community</li>
          <li>Church management system — technical review, gap analysis, advisory documentation</li>
          <li>Agile project planning — 300+ task workbooks, sprint structures, velocity tracking</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section" data-stagger-section>
    <div class="container">
      <div class="section-heading-wrap reveal">
        <h2 class="h1 heading-reveal">What you can commission</h2>
        <span class="accent-line" aria-hidden="true"></span>
      </div>
      <div class="card-grid">
        <article class="card reveal">
          <h3>Consulting</h3>
          <p>Strategy, digital transformation, vendor governance, operational design.</p>
        </article>
        <article class="card reveal">
          <h3>Build</h3>
          <p>Software development, systems architecture, frontend and backend.</p>
        </article>
        <article class="card reveal">
          <h3>Diagnose-then-Build</h3>
          <p>Audit what exists, identify the gaps, then build what should exist.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="closing-cta section">
    <div class="container reveal">
      <h2 class="h1">Ready to talk about your situation?</h2>
      <a href="{{ route('contact') }}" class="btn btn-primary" style="margin-top: 1.5rem;">Get In Touch →</a>
    </div>
  </section>
</main>

@endsection
