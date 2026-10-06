(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => preference.matches;
  const observed = 'IntersectionObserver' in window;
  if (!reduced()) document.documentElement.classList.add('motion-ready');

  // Conteúdo continua visível sem JavaScript ou sem IntersectionObserver.
  if (observed && !reduced()) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    }), {threshold:0.05, rootMargin:'0px 0px -24px 0px'});
    document.querySelectorAll('.about > p, .services h2, .services-list li, .faq h2, .faq details, .case-statement, .case-facts > div, .case-story > div, .gallery-item, .film, .case-next').forEach(element => {
      element.classList.add('reveal');
      reveal.observe(element);
    });
  }

  // Cada contador inicia uma única vez, ao entrar na tela.
  const runningCounters = new Map();
  const finishCounters = () => runningCounters.forEach((value, element) => { element.textContent = value; });
  if (observed && !reduced()) {
    const counter = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counter.unobserve(entry.target);
      const element = entry.target;
      const finalText = element.textContent;
      const goal = parseInt(finalText, 10);
      const suffix = finalText.replace(/\d/g, '');
      const start = performance.now();
      element.setAttribute('aria-label', finalText);
      runningCounters.set(element, finalText);
      function tick(now) {
        const progress = reduced() ? 1 : Math.min((now - start) / 1600, 1);
        element.textContent = Math.floor(goal * (1 - Math.pow(1 - progress, 3))) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else { element.textContent = finalText; runningCounters.delete(element); }
      }
      requestAnimationFrame(tick);
    }), {threshold:0.5});
    document.querySelectorAll('.stat-number').forEach(number => counter.observe(number));
  }

  const carousel = document.querySelector('.project-preview');
  if (carousel) {
    const track = carousel.querySelector('.preview-track');
    const viewport = carousel.querySelector('.preview-viewport');
    const cards = [...track.children];
    const total = cards.length;
    const pause = carousel.querySelector('[data-preview-pause]');
    const position = carousel.querySelector('.preview-position');
    let index = 0, timer, inView = !observed, hovered = false, focused = false, paused = reduced();
    let moving = false, fallback;
    // Cópias somente visuais mantêm a passagem do último ao primeiro contínua.
    cards.slice(0,3).forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden','true');
      clone.inert = true;
      clone.tabIndex = -1;
      track.append(clone);
    });
    function visibleCount() { return Number(getComputedStyle(carousel).getPropertyValue('--visible')) || 3; }
    function paint(instant = false) {
      track.classList.toggle('no-transition', instant || reduced());
      track.style.transform = `translate3d(${-index * viewport.clientWidth / visibleCount()}px,0,0)`;
      // As cópias permanecem clicáveis para ponteiro somente durante a passagem;
      // links fora da janela nunca entram na sequência de Tab.
      [...track.children].forEach((card, i) => {
        const visible = i >= index && i < index + visibleCount();
        card.inert = !visible;
        card.tabIndex = visible ? 0 : -1;
        card.setAttribute('aria-hidden', String(!visible));
      });
      position.textContent = String(index % total + 1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
      carousel.dataset.activeIndex = String(index % total);
    }
    function settled() {
      clearTimeout(fallback);
      if (index >= total) { index = 0; paint(true); }
      moving = false;
    }
    function advance(direction = 1) {
      if (moving) return;
      if (direction < 0 && index === 0) { index = total; paint(true); track.getBoundingClientRect(); }
      index += direction;
      moving = !reduced();
      paint();
      if (moving) fallback = setTimeout(settled, 950);
      else settled();
    }
    function schedule() {
      clearInterval(timer);
      if (!paused && !reduced() && inView && !hovered && !focused && !document.hidden) timer = setInterval(() => advance(), 3000);
      pause.setAttribute('aria-label', paused || reduced() ? 'Retomar alternância automática' : 'Pausar alternância automática');
      pause.textContent = paused || reduced() ? '▷' : 'Ⅱ';
      pause.disabled = reduced();
    }
    carousel.querySelector('[data-preview-next]').addEventListener('click', () => { advance(); schedule(); });
    carousel.querySelector('[data-preview-prev]').addEventListener('click', () => { advance(-1); schedule(); });
    pause.addEventListener('click', () => { paused = !paused; schedule(); });
    track.addEventListener('transitionend', event => { if (event.target === track && event.propertyName === 'transform') settled(); });
    carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
    carousel.addEventListener('pointerleave', () => { hovered = false; schedule(); });
    carousel.addEventListener('focusin', () => { focused = true; schedule(); });
    carousel.addEventListener('focusout', () => { requestAnimationFrame(() => { focused = carousel.contains(document.activeElement); schedule(); }); });
    document.addEventListener('visibilitychange', schedule);
    if (observed) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold:0.1}).observe(carousel);
    let startTouch, swiped = false;
    viewport.addEventListener('touchstart', event => { startTouch = {x:event.touches[0].clientX,y:event.touches[0].clientY}; swiped = false; clearInterval(timer); }, {passive:true});
    viewport.addEventListener('touchend', event => {
      if (!startTouch) return;
      const dx = event.changedTouches[0].clientX - startTouch.x;
      const dy = event.changedTouches[0].clientY - startTouch.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { swiped = true; advance(dx < 0 ? 1 : -1); }
      startTouch = null; schedule();
    }, {passive:true});
    viewport.addEventListener('click', event => { if (swiped) { event.preventDefault(); swiped = false; } }, true);
    viewport.addEventListener('touchcancel', () => { startTouch = null; schedule(); }, {passive:true});
    carousel.classList.add('preview-ready');
    carousel.querySelector('.preview-controls').hidden = false;
    const resize = () => { settled(); paint(true); };
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(viewport);
    else window.addEventListener('resize', resize);
    preference.addEventListener('change', () => { paused = reduced(); settled(); paint(true); schedule(); });
    paint(true); schedule();
  }

  // Deslocamento curto da capa; a página conserva a rolagem normal do navegador.
  const cover = document.querySelector('.case-cover');
  if (cover) {
    let frame = false;
    const updateCover = () => {
      frame = false;
      cover.style.setProperty('--cover-offset', reduced() ? '0px' : Math.min(window.scrollY * .035, 18) + 'px');
    };
    window.addEventListener('scroll', () => { if (!frame && !reduced()) { frame = true; requestAnimationFrame(updateCover); } }, {passive:true});
    preference.addEventListener('change', updateCover);
  }
  preference.addEventListener('change', () => {
    document.documentElement.classList.toggle('motion-ready', !reduced());
    if (reduced()) finishCounters();
  });
})();
