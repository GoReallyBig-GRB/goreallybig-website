(() => {
  const tabs = [...document.querySelectorAll('.tab')];
  const previous = document.querySelector('[data-work-nav="prev"]');
  const next = document.querySelector('[data-work-nav="next"]');

  if (!tabs.length || (!previous && !next)) return;

  const selectTab = (index) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    tab?.click();
    tab?.focus({ preventScroll: true });
  };

  const activeIndex = () => {
    const index = tabs.findIndex((tab) => tab.classList.contains('active'));
    return index >= 0 ? index : 0;
  };

  previous?.addEventListener('click', () => selectTab(activeIndex() - 1));
  next?.addEventListener('click', () => selectTab(activeIndex() + 1));

  document.querySelector('.showcase-media')?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectTab(activeIndex() - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectTab(activeIndex() + 1);
    }
  });
})();
