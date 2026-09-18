(() => {
  const image = document.querySelector('.hero-carousel-image');
  if (!image) return;

  const sources = (image.dataset.carouselImages || '').split('|').filter(Boolean);
  const alts = (image.dataset.carouselAlts || '').split('|');
  if (sources.length < 2) return;

  let index = 0;
  let timer = 0;
  let changing = false;
  const cache = new Map();

  image.dataset.carouselIndex = '0';

  const preload = (src) => {
    if (cache.has(src)) return cache.get(src);
    const promise = new Promise((resolve) => {
      const next = new Image();
      next.onload = () => resolve(true);
      next.onerror = () => resolve(false);
      next.src = src;
    });
    cache.set(src, promise);
    return promise;
  };

  const scheduleNext = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(advance, 6000);
  };

  const advance = async () => {
    if (changing) return;
    changing = true;

    let nextIndex = (index + 1) % sources.length;
    let loaded = await preload(sources[nextIndex]);

    if (!loaded) {
      for (let offset = 1; offset < sources.length; offset += 1) {
        const candidate = (index + 1 + offset) % sources.length;
        if (await preload(sources[candidate])) {
          nextIndex = candidate;
          loaded = true;
          break;
        }
      }
    }

    if (!loaded) {
      changing = false;
      scheduleNext();
      return;
    }

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
  };

  sources.slice(1).forEach(preload);

  scheduleNext();
  window.addEventListener('pagehide', () => window.clearTimeout(timer), { once: true });
})();