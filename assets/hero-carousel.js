(() => {
  const image = document.querySelector('.hero-carousel-image');
  if (!image) return;

  const sources = (image.dataset.carouselImages || '').split('|').filter(Boolean);
  const alts = (image.dataset.carouselAlts || '').split('|');
  if (sources.length < 2) return;

  let index = 0;
  let timer = null;
  let changing = false;

  image.dataset.carouselIndex = '0';

  const preload = (src) => new Promise((resolve) => {
    const next = new Image();
    next.onload = () => resolve(true);
    next.onerror = () => resolve(false);
    next.src = src;
  });

  const scheduleNext = () => {
    timer = window.setTimeout(advance, 6000);
  };

  const advance = async () => {
    if (changing) return;
    changing = true;

    const nextIndex = (index + 1) % sources.length;
    if (await preload(sources[nextIndex])) {
      image.classList.add('is-changing');
      window.setTimeout(() => {
        image.src = sources[nextIndex];
        if (alts[nextIndex]) image.alt = alts[nextIndex];
        image.dataset.carouselIndex = String(nextIndex);
        image.classList.remove('is-changing');
        index = nextIndex;
        changing = false;
        scheduleNext();
      }, 180);
    } else {
      changing = false;
      scheduleNext();
    }
  };

  sources.slice(1).forEach((src) => {
    const next = new Image();
    next.src = src;
  });

  scheduleNext();
  window.addEventListener('pagehide', () => {
    if (timer) window.clearTimeout(timer);
  }, { once: true });
})();