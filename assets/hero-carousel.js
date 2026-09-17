(() => {
  const image = document.querySelector('.hero-carousel-image');
  if (!image) return;

  const sources = (image.dataset.carouselImages || '').split('|').filter(Boolean);
  const alts = (image.dataset.carouselAlts || '').split('|');
  if (sources.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let index = 0;
  let timer;

  sources.slice(1).forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  const advance = () => {
    index = (index + 1) % sources.length;
    const next = sources[index];
    const preload = new Image();
    preload.onload = () => {
      image.classList.add('is-changing');
      window.setTimeout(() => {
        image.src = next;
        if (alts[index]) image.alt = alts[index];
        image.classList.remove('is-changing');
      }, 180);
    };
    preload.src = next;
  };

  timer = window.setInterval(advance, 6000);
  window.addEventListener('pagehide', () => window.clearInterval(timer), { once: true });
})();