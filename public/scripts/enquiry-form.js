const form = document.querySelector('[data-enquiry-form]');

if (form) {
  const summary = form.querySelector('[data-error-summary]');
  const list = form.querySelector('[data-error-list]');
  const status = form.querySelector('[data-form-status]');
  const placeholder = form.action.endsWith('#enquiry-form-notice');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalid = Array.from(form.querySelectorAll(':invalid'));

    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });

    form.querySelectorAll('.field-error').forEach((error) => {
      error.hidden = true;
      error.textContent = '';
    });

    if (invalid.length) {
      if (list) list.innerHTML = '';

      invalid.forEach((field) => {
        field.setAttribute('aria-invalid', 'true');
        const label = form
          .querySelector(`label[for="${field.id}"]`)
          ?.textContent?.replace('*', '')
          .trim() ?? 'This field';
        const error = form.querySelector(`#${field.id}-error`);

        if (error) {
          error.textContent = field.validationMessage;
          error.hidden = false;
        }

        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${field.id}`;
        link.textContent = `${label}: ${field.validationMessage}`;
        item.append(link);
        list?.append(item);
      });

      if (summary) {
        summary.hidden = false;
        summary.focus();
      }

      status?.setAttribute('hidden', '');
      return;
    }

    summary?.setAttribute('hidden', '');

    if (placeholder && status) {
      status.textContent =
        'Your details are ready, but they have not been sent. Please email threadscoaching@gmail.com or call +44 7739 353444.';
      status.hidden = false;
    }
  });
}
