/**
 * Contact Form Handler
 * Handles form submission to backend API
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const successMessage = document.getElementById('successMessage');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  // ===================================
  // CONTACT FORM SUBMISSION
  // ===================================
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous status
      formStatus.style.display = 'none';
      successMessage.style.display = 'none';

      // Get form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error', formStatus);
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error', formStatus);
        return;
      }

      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Show success message
          successMessage.style.display = 'block';
          contactForm.reset();
          
          // Optional: scroll to success message
          successMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
          showStatus(data.message || 'Failed to send message. Please try again.', 'error', formStatus);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showStatus('Network error. Please check your connection and try again.', 'error', formStatus);
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  // ===================================
  // NEWSLETTER FORM SUBMISSION
  // ===================================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput.value.trim();
      const statusEl = document.getElementById('newsletterStatus');

      if (!email || !isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error', statusEl);
        return;
      }

      const submitBtn = newsletterForm.querySelector('button');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';

      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showStatus('✓ Successfully subscribed! Check your email to confirm.', 'success', statusEl);
          emailInput.value = '';
          setTimeout(() => {
            statusEl.style.display = 'none';
          }, 5000);
        } else {
          showStatus(data.message || 'Failed to subscribe. Please try again.', 'error', statusEl);
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        showStatus('Network error. Please try again later.', 'error', statusEl);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});

/**
 * Helper: Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Helper: Show status message
 */
function showStatus(message, type, element) {
  element.textContent = message;
  element.style.display = 'block';
  
  if (type === 'error') {
    element.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
    element.style.color = '#ef4444';
    element.style.borderLeft = '4px solid #ef4444';
  } else if (type === 'success') {
    element.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
    element.style.color = '#10b981';
    element.style.borderLeft = '4px solid #10b981';
  }
}
