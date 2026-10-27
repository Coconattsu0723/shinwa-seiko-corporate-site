(() => {
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-material]')];
  const title = document.querySelector('[data-filter-title]');
  const count = document.querySelector('[data-result-count]');
  const grid = document.querySelector('[data-works-grid]');
  const empty = document.querySelector('[data-empty-state]');
  const consultation = document.querySelector('.works-consultation');
  const status = document.querySelector('[data-filter-status]');
  if (!filters.length || !cards.length || !title || !count || !grid || !empty || !status) return;

  const labels = { all: 'すべて', aluminum: 'アルミ', stainless: 'ステンレス', steel: '鉄系', brass: '真鍮', resin: '樹脂' };
  const allowed = new Set(Object.keys(labels));

  const render = (material, announce = true) => {
    const selected = allowed.has(material) ? material : 'all';
    let visibleCount = 0;

    filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    grid.dataset.state = selected === 'all' ? 'all' : 'filtered';
    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.material === selected;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    title.textContent = selected === 'all' ? '条件から、近い実績を探す。' : `${labels[selected]}の実績${visibleCount ? 'を表示中' : ''}`;
    count.textContent = selected === 'all' ? `${visibleCount}件の実績` : `${labels[selected]}：${visibleCount}件`;
    empty.hidden = visibleCount !== 0;
    if (consultation) consultation.hidden = visibleCount === 0;
    if (announce) status.textContent = visibleCount ? `${labels[selected]}の実績を${visibleCount}件表示しました` : `${labels[selected]}の実績は準備中です`;
  };

  const readURL = () => {
    const material = new URLSearchParams(location.search).get('material') || 'all';
    if (!allowed.has(material)) {
      const url = new URL(location.href);
      url.searchParams.delete('material');
      history.replaceState({ material: 'all' }, '', url);
    }
    render(material, false);
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const material = button.dataset.filter;
      const url = new URL(location.href);
      if (material === 'all') url.searchParams.delete('material');
      else url.searchParams.set('material', material);
      history.pushState({ material }, '', url);
      render(material);
    });
  });

  addEventListener('popstate', readURL);
  readURL();
})();
