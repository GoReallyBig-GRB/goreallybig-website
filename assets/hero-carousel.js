(() => {
  const image = document.querySelector('.hero-carousel-image');
  if (!image) return;

  const sources = (image.dataset.carouselImages || '').split('|').filter(Boolean);
  const alts = (image.dataset.carouselAlts || '').split('|');
  if (sources.length < 2) return;

  let index = 0;
  let timer = 0;
  let changing = false;

  image.dataset.carouselIndex = '0';

  const loadImage = (src) => new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });

  const showNext = async () => {
    if (changing) return;
    changing = true;

    const nextIndex = (index + 1) % sources.length;
    const nextSrc = sources[nextIndex];
    const loaded = await loadImage(nextSrc);

    if (!loaded) {
      changing = false;
      timer = window.setTimeout(showNext, 6000);
      return;
    }

    image.classList.add('is-changing');

    window.setTimeout(() => {
      image.src = nextSrc;
      if (alts[nextIndex]) image.alt = alts[nextIndex];
      image.dataset.carouselIndex = String(nextIndex);
      image.classList.remove('is-changing');
      index = nextIndex;
      changing = false;
      timer = window.setTimeout(showNext, 6000);
    }, 320);
  };

  // The first image is deliberately left completely static. Only after it
  // has painted do we begin loading and cycling the remaining mockups.
  timer = window.setTimeout(showNext, 6000);

  window.addEventListener('pagehide', () => window.clearTimeout(timer), { once: true });
})();