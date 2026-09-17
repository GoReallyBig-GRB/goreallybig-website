(() => {
  const image = document.querySelector('.hero-carousel-image');
  if (!image) return;

  const sources = (image.dataset.carouselImages || '').split('|').filter(Boolean);
  const alts = (image.dataset.carouselAlts || '').split('|');
  if (sources.length < 2) return;

  let index = 0;
  let timer = null;
  let busy = false;

  const preload = (src) => new Promise((resolve) => {
    const next = new Image();
    next.onload = () => resolve(true);
    next.onerror = () => resolve(false);
    next.src = src;
  });

  const advance = async () => {
    if (busy) return;
    busy = true;

    const nextIndex = (index + 1) % sources.length;
    const loaded = await preload(sources[nextIndex]);

    if (loaded) {
      image.classList.add('is-changing');
      window.setTimeout(() => {
        image.src = sources[nextIndex];
        if (alts[nextIndex]) image.alt = alts[nextIndex];
        image.classList.remove('is-changing');
        index = nextIndex;
        busy = false;
      }, 180);
    } else {
      busy = false;
    }
  };

  sources.slice(1).forEach((src) => {
    const next = new Image();
    next.src = src;
  });

  timer = window.setInterval(advance, 6000);
  window.addEventListener('pagehide', () => window.clearInterval(timer), { once: true });
})();