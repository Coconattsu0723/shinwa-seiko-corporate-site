(() => {
  const section = document.querySelector('[data-marquee]');
  const button = document.querySelector('[data-marquee-toggle]');
  const label = document.querySelector('[data-marquee-label]');
  const status = document.querySelector('[data-marquee-status]');
  if (!section || !button || !label || !status) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;

  const render = () => {
    const reduced = reduceMotion.matches;
    section.classList.toggle('is-paused', paused || reduced);
    button.disabled = reduced;
    button.setAttribute('aria-pressed', String(paused));
    label.textContent = reduced ? '静止表示' : paused ? '再生する' : '一時停止';
    status.textContent = reduced ? '動きを減らす設定のため静止表示中' : paused ? 'ギャラリーを一時停止しました' : 'ギャラリーを再生しています';
  };

  button.addEventListener('click', () => {
    paused = !paused;
    render();
  });

  reduceMotion.addEventListener('change', render);
  render();
})();
