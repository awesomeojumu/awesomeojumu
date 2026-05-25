@extends('layouts.app')

@section('content')
<main x-data="{ submitted: false }">
  <section class="page-hero section">
    <div class="container">
      <p class="eyebrow reveal">Reach out</p>
      <h1 class="h1 reveal">If something here moved you to reach out —</h1>
      <p class="h2 reveal" style="margin-top: 1rem;">that is already a good sign.</p>
    </div>
  </section>

  <section class="section">
    <div class="container split-layout">
      <div>
        <div class="contact-options" data-stagger-section>
          <div class="contact-option reveal">
            <h3>Consulting or Build Enquiry</h3>
            <p>You have a project, a system that needs building, or an organisation that needs structuring. Tell me what you're working with.</p>
            <p style="margin-top: 0.75rem;"><a href="mailto:planexiglobalconsult@gmail.com">planexiglobalconsult@gmail.com</a></p>
          </div>
          <div class="contact-option reveal">
            <h3>Faith or Community Conversation</h3>
            <p>Something on the Faith page resonated. You're thinking about purpose, calling, or the intersection of faith and meaningful work.</p>
          </div>
          <div class="contact-option reveal">
            <h3>Something Else</h3>
            <p>You read something in Words that you want to push back on, or build on, or simply discuss. Good. Those are the conversations worth having.</p>
          </div>
        </div>

        <div class="reveal" style="margin-top: 2rem;">
          <p class="eyebrow">Currently open to</p>
          <ul class="availability-list" style="margin-top: 1rem;">
            <li>Consulting and advisory engagements — short and long term</li>
            <li>Software build commissions — systems, portals, platforms</li>
            <li>Strategic partnerships on mission-aligned initiatives</li>
            <li>Speaking and training invitations</li>
            <li>Conversations about faith, purpose, and meaningful work</li>
          </ul>
        </div>

        <div class="details-grid reveal">
          <div class="detail-item">
            <p class="eyebrow">Email</p>
            <a href="mailto:planexiglobalconsult@gmail.com">planexiglobalconsult@gmail.com</a>
          </div>
          <div class="detail-item">
            <p class="eyebrow">Phone</p>
            <a href="tel:+2348135743324">+234 813 574 3324</a>
          </div>
          <div class="detail-item">
            <p class="eyebrow">LinkedIn</p>
            <a href="https://linkedin.com/in/awesomeojumu" target="_blank" rel="noopener">linkedin.com/in/awesomeojumu</a>
          </div>
          <div class="detail-item">
            <p class="eyebrow">Location</p>
            <p>Lagos / Ogun State, Nigeria — Open to remote and travel</p>
          </div>
        </div>
      </div>

      <div>
        <div class="form-success" :class="{ 'is-visible': submitted }" role="status">
          <p><strong>Your message is in.</strong> I respond within 48 hours — usually less.</p>
        </div>

        <form
          id="contact-form"
          class="reveal"
          x-show="!submitted"
          action="{{ route('contact.store') }}"
          method="post"
          @submit.prevent="
            const fd = new FormData($el);
            fetch($el.action, {
              method: 'POST',
              body: fd,
              headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content,
                'Accept': 'application/json',
              },
            })
              .then(r => r.json())
              .then(data => { if (data.ok) submitted = true; else alert(data.message || data.error || 'Something went wrong.'); })
              .catch(() => alert('Unable to send. Please email planexiglobalconsult@gmail.com directly.'));
          "
        >
          @csrf
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" required autocomplete="name">
          </div>
          <div class="form-group">
            <label for="email">Your Email</label>
            <input type="email" id="email" name="email" required autocomplete="email">
          </div>
          <div class="form-group">
            <label for="topic">What's this about?</label>
            <select id="topic" name="topic" required>
              <option value="">Select…</option>
              <option value="consulting" @selected(($defaultTopic ?? '') === 'consulting')>Consulting / Build Enquiry</option>
              <option value="faith" @selected(($defaultTopic ?? '') === 'faith')>Faith</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Something Else</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Send It →</button>
        </form>
      </div>
    </div>
  </section>
</main>
@endsection
