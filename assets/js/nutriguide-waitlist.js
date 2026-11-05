/* NutriSeeds Pakistan | NutriGuide free consultation interest waitlist.
   No appointment service is active. Uses the existing Contact Formspree form.
   This file contains no credentials or private API keys. */
(() => {
  'use strict';
  const form = document.getElementById('nutriguide-waitlist-form');
  if (!form) return;

  const feedback = document.getElementById('nutriguide-waitlist-feedback');
  const submit = document.getElementById('nutriguide-waitlist-submit');
  const config = window.NUTRI_CONFIG || {};
  const endpoint = String(config.contactFormEndpoint || '').trim();
  const validEndpoint = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(endpoint);
  let sending = false;

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.dataset.type = type || 'info';
    feedback.hidden = false;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    feedback.hidden = true;
    feedback.textContent = '';
    if (!form.reportValidity()) return;

    const name = form.elements.namedItem('customer_name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const whatsapp = form.elements.namedItem('customer_whatsapp').value.trim();
    const preference = form.elements.namedItem('consultation_preference').value;
    const consent = form.elements.namedItem('waitlist_consent').checked;

    if (!name || !email || !whatsapp || !preference || !consent) {
      showFeedback('Please fill in every required field and agree to be contacted about NutriGuide.', 'error');
      return;
    }
    if (!/^\+?[\d\s().-]{9,20}$/.test(whatsapp) || whatsapp.replace(/\D/g, '').length < 10) {
      showFeedback('Please enter a valid WhatsApp number with the country code if needed.', 'error');
      return;
    }
    if (!validEndpoint) {
      showFeedback('Waitlist registration is temporarily unavailable. Please contact the NutriSeeds team using the WhatsApp link below.', 'error');
      return;
    }

    const payload = new FormData(form);
    payload.set('_subject', 'NutriSeeds — NutriGuide Free Consultation Waitlist');
    payload.set('_replyto', email);
    payload.set('customer_email', email);
    payload.set('source', 'NutriGuide - Future Free Dietitian Consultation Waitlist');
    payload.set('service_status', 'PLANNED - No consultations or appointments currently available');
    payload.set('message', `NutriGuide free consultation waitlist interest from ${name}. Preferred format: ${preference}. Please contact this person only about the future service.`);
    payload.set('waitlist_consent', 'Yes - contact me about NutriGuide availability');

    sending = true;
    submit.disabled = true;
    const previous = submit.textContent;
    submit.textContent = 'Joining waitlist...';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload
      });
      if (!response.ok) {
        let detail = '';
        try {
          const data = await response.json();
          detail = (data.errors || []).map(e => e.message).filter(Boolean).join('; ');
        } catch (_) {}
        throw new Error(detail || `Form service returned HTTP ${response.status}.`);
      }
      form.reset();
      showFeedback('Thank you! Your interest in NutriGuide has been received. We will contact you if our free dietitian consultation service becomes available. This is not an appointment confirmation.', 'success');
    } catch (error) {
      const detail = error instanceof TypeError ? 'Please check your internet connection.' : error.message;
      showFeedback(`We could not register your interest right now. ${detail} Your entered details are still here; please try again or contact us on WhatsApp.`, 'error');
    } finally {
      sending = false;
      submit.disabled = false;
      submit.textContent = previous;
    }
  });
})();
