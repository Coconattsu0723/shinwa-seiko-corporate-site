(() => {
  const form = document.querySelector('[data-contact-form]');
  const inputView = document.querySelector('[data-contact-input]');
  const confirmView = document.querySelector('[data-contact-confirm]');
  const completeView = document.querySelector('[data-contact-complete]');
  const confirmDetails = document.querySelector('[data-confirm-details]');
  const errorSummary = document.querySelector('[data-error-summary]');
  const errorList = document.querySelector('[data-error-list]');

  if (!form || !inputView || !confirmView || !completeView || !confirmDetails || !errorSummary || !errorList) return;

  const fields = {
    company: { label: '会社名', message: '会社名を入力してください' },
    name: { label: '氏名', message: '氏名を入力してください' },
    email: { label: 'メールアドレス', message: 'メールアドレスの形式を確認してください' },
    message: { label: '相談内容', message: '相談内容を入力してください' },
    consent: { label: '個人情報の取扱い', message: '個人情報の取扱いへの同意が必要です' }
  };

  const confirmRows = [
    ['会社名', 'company'],
    ['氏名', 'name'],
    ['メールアドレス', 'email'],
    ['電話番号', 'phone'],
    ['材料', 'material'],
    ['数量', 'quantity'],
    ['希望時期', 'timing'],
    ['図面の有無', 'drawing'],
    ['希望連絡方法', 'contactMethod'],
    ['相談内容', 'message']
  ];

  const setState = (state, options = {}) => {
    inputView.hidden = state !== 'input';
    confirmView.hidden = state !== 'confirm';
    completeView.hidden = state !== 'complete';
    document.body.dataset.contactState = state;
    if (options.history === 'push') history.pushState({ contactState: state }, '', state === 'input' ? location.pathname : `#${state}`);
    if (options.history === 'replace') history.replaceState({ contactState: state }, '', state === 'input' ? location.pathname : `#${state}`);
    if (options.scroll !== false) window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const clearError = (control) => {
    control.removeAttribute('aria-invalid');
    control.removeAttribute('aria-describedby');
    const message = document.getElementById(`${control.id}-error`);
    if (message) {
      message.hidden = true;
      message.textContent = '';
    }
    if (control.id === 'consent') control.closest('.consent-field')?.classList.remove('is-invalid');
  };

  const setError = (control, message) => {
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', `${control.id}-error`);
    const target = document.getElementById(`${control.id}-error`);
    if (target) {
      target.textContent = message;
      target.hidden = false;
    }
    if (control.id === 'consent') control.closest('.consent-field')?.classList.add('is-invalid');
  };

  const validate = () => {
    const errors = [];
    Object.entries(fields).forEach(([id, details]) => {
      const control = document.getElementById(id);
      clearError(control);
      let invalid = false;
      if (control.type === 'checkbox') invalid = !control.checked;
      else if (id === 'email') invalid = !control.value.trim() || !control.validity.valid;
      else invalid = !control.value.trim();
      if (invalid) {
        setError(control, details.message);
        errors.push({ id, ...details });
      }
    });
    return errors;
  };

  const showErrors = (errors) => {
    errorList.replaceChildren();
    errors.forEach(({ id, message }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = message;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById(id)?.focus();
      });
      item.append(link);
      errorList.append(item);
    });
    errorSummary.hidden = false;
    errorSummary.focus();
  };

  const selectedValue = (name) => form.querySelector(`[name="${name}"]:checked`)?.value || '未入力';

  const renderConfirmation = () => {
    confirmDetails.replaceChildren();
    confirmRows.forEach(([label, name]) => {
      const control = form.elements.namedItem(name);
      const value = control instanceof RadioNodeList ? selectedValue(name) : control.value.trim() || '未入力';
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      confirmDetails.append(row);
    });
    const attachmentRow = document.createElement('div');
    attachmentRow.innerHTML = '<dt>図面・資料</dt><dd>選択なし（デモ表示）</dd>';
    const consentRow = document.createElement('div');
    consentRow.innerHTML = '<dt>個人情報の取扱い</dt><dd>同意済み</dd>';
    confirmDetails.append(attachmentRow, consentRow);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length) {
      showErrors(errors);
      return;
    }
    errorSummary.hidden = true;
    renderConfirmation();
    setState('confirm', { history: 'push' });
  });

  Object.keys(fields).forEach((id) => {
    const control = document.getElementById(id);
    control.addEventListener(control.type === 'checkbox' ? 'change' : 'input', () => clearError(control));
  });

  document.querySelector('[data-edit-input]')?.addEventListener('click', () => setState('input', { history: 'push' }));
  document.querySelector('[data-demo-submit]')?.addEventListener('click', () => setState('complete', { history: 'push' }));
  document.querySelector('[data-reset-input]')?.addEventListener('click', () => {
    form.reset();
    Object.keys(fields).forEach((id) => clearError(document.getElementById(id)));
    errorSummary.hidden = true;
    setState('input', { history: 'push' });
  });

  window.addEventListener('popstate', (event) => {
    const state = event.state?.contactState || 'input';
    if (state === 'confirm') renderConfirmation();
    setState(state, { scroll: false });
  });

  history.replaceState({ contactState: 'input' }, '', location.pathname);
  setState('input', { scroll: false });
})();
