(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const stories = typeof RBM !== 'undefined' && Array.isArray(RBM.stories) ? RBM.stories : [];
    const list = document.getElementById('cerita-list');
    const detailPage = document.querySelector('[data-story-id]');
    const categoryPills = list ? document.querySelectorAll('#cerita-cat-nav .cat-pill') : [];

    function escapeHtml(value) {
      return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
    }

    function imageFor(story) {
      return RBM.images[story.image] || '../assets/images/' + escapeHtml(story.image).replace(/^rbm/, 'rbm-') + '.jpg';
    }

    function feedbackKey(storyId) {
      return 'rbm-story-feedback-' + storyId;
    }

    function readFeedback(storyId) {
      try {
        const saved = JSON.parse(window.localStorage.getItem(feedbackKey(storyId)) || '{}');
        return {
          rating: Number(saved.rating) >= 1 && Number(saved.rating) <= 5 ? Number(saved.rating) : 0,
          comments: Array.isArray(saved.comments) ? saved.comments : [],
        };
      } catch (error) {
        return { rating: 0, comments: [] };
      }
    }

    function writeFeedback(storyId, feedback) {
      try {
        window.localStorage.setItem(feedbackKey(storyId), JSON.stringify(feedback));
      } catch (error) {
        // Feedback tetap dapat dilihat selama halaman terbuka jika storage tidak tersedia.
      }
    }

    function updateFeedbackView(root, storyId) {
      const feedback = readFeedback(storyId);
      const totalRating = feedback.rating ? 1 : 0;
      const average = totalRating ? feedback.rating.toFixed(1) : '—';
      const summary = root.querySelector('[data-rating-summary]');
      const comments = root.querySelector('[data-comments]');

      if (summary) {
        summary.textContent = average + (totalRating ? ' / 5 dari penilaian Anda' : ' Belum ada penilaian');
      }
      root.querySelectorAll('[data-rating]').forEach(button => {
        const value = Number(button.dataset.rating);
        button.classList.toggle('is-selected', value <= feedback.rating);
        button.setAttribute('aria-pressed', String(value === feedback.rating));
        button.textContent = value <= feedback.rating ? '★' : '☆';
      });
      if (comments) {
        comments.innerHTML = feedback.comments.length
          ? feedback.comments.map(comment => `
              <article class="story-feedback__comment">
                <div class="story-feedback__comment-meta">
                  <strong>${escapeHtml(comment.name)}</strong>
                  <time datetime="${escapeHtml(comment.dateTime)}">${escapeHtml(comment.date)}</time>
                </div>
                <p>${escapeHtml(comment.text)}</p>
              </article>
            `).join('')
          : '<p class="story-feedback__empty">Belum ada komentar. Jadilah yang pertama berbagi tanggapan.</p>';
      }
    }

    function bindFeedback(root, storyId) {
      function previewRating(value) {
        root.querySelectorAll('[data-rating]').forEach(button => {
          const buttonValue = Number(button.dataset.rating);
          button.classList.toggle('is-selected', buttonValue <= value);
          button.textContent = buttonValue <= value ? '★' : '☆';
        });
      }

      root.querySelectorAll('[data-rating]').forEach(button => {
        button.addEventListener('mouseenter', function () {
          previewRating(Number(this.dataset.rating));
        });
        button.addEventListener('focus', function () {
          previewRating(Number(this.dataset.rating));
        });
        button.addEventListener('click', function () {
          const feedback = readFeedback(storyId);
          feedback.rating = Number(this.dataset.rating);
          writeFeedback(storyId, feedback);
          updateFeedbackView(root, storyId);
        });
      });
      root.addEventListener('mouseleave', function () {
        updateFeedbackView(root, storyId);
      });

      const form = root.querySelector('[data-comment-form]');
      if (form) form.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameField = form.querySelector('[name="comment-name"]');
        const textField = form.querySelector('[name="comment-text"]');
        const name = nameField.value.trim();
        const text = textField.value.trim();
        if (!name || !text) return;

        const feedback = readFeedback(storyId);
        feedback.comments.unshift({
          name,
          text,
          date: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date()),
          dateTime: new Date().toISOString(),
        });
        writeFeedback(storyId, feedback);
        form.reset();
        updateFeedbackView(root, storyId);
      });
    }

    async function loadStoryContent(story, template) {
      if (story.contentPage) {
        try {
          const response = await fetch(story.contentPage);
          if (response.ok) return await response.text();
        } catch (error) {
          // Gunakan fallback apabila halaman dibuka tanpa server atau file gagal dimuat.
        }
      }
      const paragraphs = Array.isArray(story.body) && story.body.length
        ? story.body
        : (story.content && story.content.charAt(0) !== '[' ? [story.content] : template.body);
      return `<h2>Ruang untuk berbagi cerita</h2>${paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}`;
    }

    function renderList() {
      const requested = new URLSearchParams(window.location.search).get('cat') || 'all';
      const category = Array.from(categoryPills).some(pill => pill.dataset.cat === requested) ? requested : 'all';
      const filtered = category === 'all' ? stories : stories.filter(story => story.category === category);

      categoryPills.forEach(pill => {
        const active = pill.dataset.cat === category;
        pill.classList.toggle('active', active);
        pill.setAttribute('aria-pressed', String(active));
      });

      if (!filtered.length) {
        list.innerHTML = '<div class="cerita-empty"><p>Belum ada artikel di kategori ini.</p></div>';
        return;
      }

      list.innerHTML = filtered.map(story => `
        <a class="story-list-card" href="${escapeHtml(story.detailPage)}">
          <img class="story-list-card__image" src="${escapeHtml(imageFor(story))}" alt="${escapeHtml(story.title)}" style="object-position:${escapeHtml(story.imagePos || 'center')}" loading="lazy">
          <div class="story-list-card__body">
            <span class="story-list-card__category">${escapeHtml(story.categoryLabel)}</span>
            <h2 class="story-list-card__title">${escapeHtml(story.title)}</h2>
            <p class="story-list-card__excerpt">${escapeHtml(story.excerpt)}</p>
            <div class="story-list-card__meta">
              <time class="story-list-card__date" datetime="${escapeHtml(story.dateTime)}">${escapeHtml(story.date)}</time>
              <span class="story-list-card__read">Baca Selengkapnya</span>
            </div>
          </div>
        </a>
      `).join('');

    }

    if (list) {
      categoryPills.forEach(pill => pill.addEventListener('click', function () {
        const url = new URL(window.location.href);
        if (this.dataset.cat === 'all') url.searchParams.delete('cat');
        else url.searchParams.set('cat', this.dataset.cat);
        window.history.pushState({}, '', url);
        renderList();
      }));
    }

    if (list) {
      renderList();
      window.addEventListener('popstate', renderList);
      return;
    }

    async function renderDetail(story) {
      const main = document.getElementById('page-main');
      const pageDescription = escapeHtml(story.excerpt);
      const categoryUrl = 'cerita.html?cat=' + encodeURIComponent(story.category);
      const template = RBM.storyArticleTemplate || {
        body: ['Konten berita sedang dipersiapkan dan akan diperbarui setelah informasi lengkap dikonfirmasi oleh RBM Toraja.'],
        quote: 'Setiap cerita membuka ruang untuk berbagi, belajar, dan bergerak bersama menuju masyarakat yang inklusif.',
      };
      const articleContent = await loadStoryContent(story, template);
      const related = stories
        .filter(item => item.id !== story.id)
        .sort((a, b) => Number(b.category === story.category) - Number(a.category === story.category))
        .slice(0, 3);
      const encodedUrl = encodeURIComponent(window.location.href);
      const encodedTitle = encodeURIComponent(story.title);
      const author = story.author
        ? `<span class="story-detail__meta-separator" aria-hidden="true"></span><span>Oleh ${escapeHtml(story.author)}</span>`
        : '';
      const relatedCards = related.map(item => `
        <a class="story-related-card" href="${escapeHtml(item.detailPage)}">
          <img class="story-related-card__image" src="${escapeHtml(imageFor(item))}" alt="${escapeHtml(item.title)}" loading="lazy" style="object-position:${escapeHtml(item.imagePos || 'center')}">
          <div class="story-related-card__body">
            <span class="story-related-card__category">${escapeHtml(item.categoryLabel)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <time datetime="${escapeHtml(item.dateTime)}">${escapeHtml(item.date)}</time>
          </div>
        </a>
      `).join('');

      document.getElementById('page-title').textContent = story.title + ' | Cerita RBM Toraja';
      document.getElementById('page-desc').setAttribute('content', story.excerpt);
      main.innerHTML = `
        <section class="story-detail-page">
          <div class="container">
            <nav class="breadcrumb" aria-label="Navigasi halaman">
              <a href="../index.html">Beranda</a>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
              <a href="cerita.html">Cerita</a>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
              <a href="${categoryUrl}">${escapeHtml(story.categoryLabel)}</a>
            </nav>
            <header class="story-detail__header">
              <span class="story-detail__category">${escapeHtml(story.categoryLabel)}</span>
              <h1 class="story-detail__title">${escapeHtml(story.title)}</h1>
              <div class="story-detail__meta">
                <time datetime="${escapeHtml(story.dateTime)}">${escapeHtml(story.date)}</time>
                ${author}
              </div>
            </header>
            <div class="story-detail__main">
              <figure class="story-detail__figure">
                <img src="${escapeHtml(imageFor(story))}" alt="${escapeHtml(story.title)}" style="object-position:${escapeHtml(story.imagePos || 'center')}">
                <figcaption>Gambar ilustrasi</figcaption>
              </figure>
              <article class="story-detail__body">
                <p class="story-detail__lead">${pageDescription}</p>
                <div class="story-detail__content">
                  ${articleContent}
                  <blockquote class="story-detail__quote">${escapeHtml(story.quote || template.quote)}</blockquote>
                </div>
                <section class="story-feedback" data-story-feedback aria-labelledby="story-feedback-title">
                  <div class="story-feedback__rating">
                    <div>
                      <h2 id="story-feedback-title">Beri penilaian cerita</h2>
                      <p class="story-feedback__summary" data-rating-summary>Belum ada penilaian</p>
                    </div>
                    <div class="story-feedback__stars" aria-label="Pilih rating dari 1 sampai 5">
                      ${[1, 2, 3, 4, 5].map(value => `<button type="button" class="story-feedback__star" data-rating="${value}" aria-label="Beri ${value} bintang" aria-pressed="false">☆</button>`).join('')}
                    </div>
                  </div>
                  <form class="story-feedback__form" data-comment-form>
                    <h2>Tulis komentar</h2>
                    <label for="comment-name">Nama</label>
                    <input id="comment-name" name="comment-name" type="text" maxlength="80" placeholder="Nama Anda" required>
                    <label for="comment-text">Komentar</label>
                    <textarea id="comment-text" name="comment-text" maxlength="500" placeholder="Bagikan tanggapan Anda tentang cerita ini" required></textarea>
                    <button class="story-feedback__submit" type="submit">Kirim komentar</button>
                  </form>
                  <div class="story-feedback__comments" data-comments aria-live="polite"></div>
                </section>
                <section class="story-detail__share" aria-label="Bagikan artikel">
                  <h2>Bagikan cerita ini</h2>
                  <p>Bagikan informasi ini kepada keluarga dan kerabat.</p>
                  <div class="story-detail__share-links">
                    <a href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&amp;url=${encodedUrl}" target="_blank" rel="noopener noreferrer">X</a>
                  </div>
                </section>
                <div class="story-detail__back"><a href="${categoryUrl}">&larr; Kembali ke ${escapeHtml(story.categoryLabel)}</a></div>
              </article>
            </div>
            ${related.length ? `
              <section class="story-related" aria-labelledby="story-related-title">
                <div class="story-related__heading">
                  <p class="eyebrow">Lanjutkan membaca</p>
                  <h2 id="story-related-title">Cerita terkait</h2>
                </div>
                <div class="story-related__grid">${relatedCards}</div>
              </section>
            ` : ''}
          </div>
        </section>
      `;
      const feedbackRoot = main.querySelector('[data-story-feedback]');
      bindFeedback(feedbackRoot, story.id);
      updateFeedbackView(feedbackRoot, story.id);
      main.style.visibility = 'visible';
    }

    if (detailPage) {
      const story = stories.find(item => item.id === detailPage.dataset.storyId);
      if (!story) {
        const main = document.getElementById('page-main');
        main.innerHTML = '<div class="container story-not-found"><p>Cerita tidak ditemukan.</p><p><a href="cerita.html">Kembali ke daftar cerita</a></p></div>';
        main.style.visibility = 'visible';
        return;
      }
      renderDetail(story);
      return;
    }

    if (window.location.pathname.endsWith('/cerita-detail.html')) {
      const story = stories.find(item => item.id === new URLSearchParams(window.location.search).get('id'));
      if (story) window.location.replace(story.detailPage);
      else {
        const main = document.getElementById('page-main');
        main.innerHTML = '<div class="container story-not-found"><p>Cerita tidak ditemukan.</p><p><a href="cerita.html">Kembali ke daftar cerita</a></p></div>';
        main.style.visibility = 'visible';
      }
    }
  });
})();
