(() => {
  const contactDialog = document.querySelector('#contact-dialog');
  document.querySelectorAll('[data-contact]').forEach(link => link.addEventListener('click', event => {
    if (!contactDialog) return;
    event.preventDefault();
    contactDialog.showModal();
  }));
  if (contactDialog) {
    contactDialog.querySelectorAll('button').forEach(button => button.addEventListener('click', () => contactDialog.close()));
    contactDialog.addEventListener('click', event => {
      const r = contactDialog.getBoundingClientRect();
      if (event.target === contactDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) contactDialog.close();
    });
  }
  document.querySelectorAll('.faq details').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.faq details').forEach(other => {
      if (other !== detail) other.open = false;
    });
  }));

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.project-card')];
  const validFilters = ['todos', 'identidade-visual', 'fotografia', 'audiovisual', 'design'];
  function currentCategory() {
    const value = new URLSearchParams(location.search).get('categoria');
    return validFilters.includes(value) ? value : 'todos';
  }
  function filterProjects(category, updateURL = false) {
    let count = 0;
    cards.forEach(card => {
      const match = category === 'todos' || card.dataset.categories.split(' ').includes(category);
      card.hidden = !match;
      if (match) count++;
      const base = card.getAttribute('href').split('?')[0];
      card.setAttribute('href', base + (category === 'todos' ? '' : '?categoria=' + category));
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    document.querySelector('#project-count').textContent = '(' + count + ')';
    const label = filters.find(button => button.dataset.filter === category)?.textContent || 'Todos';
    document.querySelector('#filter-status').textContent = count + ' projetos — ' + label;
    if (updateURL) {
      const url = new URL(location.href);
      category === 'todos' ? url.searchParams.delete('categoria') : url.searchParams.set('categoria', category);
      try { history.pushState({}, '', url); } catch (_) { /* Arquivos locais continuam filtrando sem History API. */ }
    }
  }
  if (filters.length) {
    filterProjects(currentCategory());
    filters.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter, true)));
    window.addEventListener('popstate', () => filterProjects(currentCategory()));
  }
  const category = currentCategory();
  document.querySelectorAll('[data-back-projects]').forEach(link => {
    if (category !== 'todos') link.href += '?categoria=' + category;
  });

  const lightbox = document.querySelector('#image-lightbox');
  const gallery = [...document.querySelectorAll('[data-lightbox]')];
  let selected = 0;
  function showImage(index) {
    selected = (index + gallery.length) % gallery.length;
    const source = gallery[selected].querySelector('img');
    const image = lightbox.querySelector('#lightbox-image');
    image.src = source.src;
    image.alt = source.alt;
    lightbox.querySelector('#lightbox-caption').textContent = source.alt;
    lightbox.querySelector('.lightbox-count').textContent = (selected + 1) + ' / ' + gallery.length;
  }
  if (lightbox && gallery.length) {
    gallery.forEach((button, index) => button.addEventListener('click', () => {
      showImage(index);
      lightbox.showModal();
    }));
    lightbox.querySelector('[data-close-lightbox]').addEventListener('click', () => lightbox.close());
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(selected - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(selected + 1));
    lightbox.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(selected + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  }
  // Evita áudio simultâneo ao comparar os filmes de um projeto.
  document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  }));
})();
