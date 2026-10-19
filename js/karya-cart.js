(function () {
  'use strict';

  const CART_STORAGE_KEY = 'rbm-karya-cart';
  const FAVORITES_STORAGE_KEY = 'rbm-karya-favorites';
  // Format wa.me harus internasional tanpa tanda plus, spasi, atau tanda hubung.
  const WHATSAPP_ADMIN_NUMBER = '6281343604500';
  const WHATSAPP_ADMIN_URL = `https://wa.me/${WHATSAPP_ADMIN_NUMBER}`;
  const currency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  });

  const grid = document.getElementById('product-grid');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const itemsContainer = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const cartStatus = document.getElementById('cart-status');
  const totalElement = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('cart-checkout');
  const checkoutDialog = document.getElementById('checkout-dialog');
  const checkoutSummary = document.getElementById('checkout-summary');
  const checkoutStatus = document.getElementById('checkout-status');
  const whatsappOrderLink = document.getElementById('open-whatsapp-group');
  const productFeedback = document.getElementById('product-feedback');

  if (!grid || !drawer || !overlay || !itemsContainer || !productFeedback) {
    console.error('Fitur keranjang tidak dapat diinisialisasi: elemen katalog atau panel keranjang tidak ditemukan.');
    return;
  }

  const products = new Map();
  grid.querySelectorAll('.product-card-full[data-product-id]').forEach(card => {
    const id = card.dataset.productId;
    const image = card.querySelector('.product-card-full__img img');
    const priceText = card.querySelector('.product-card-full__price')?.textContent || '';
    const priceDigits = priceText.replace(/[^\d]/g, '');
    const price = priceDigits ? Number(priceDigits) : null;
    const name = card.querySelector('.product-card-full__name')?.textContent.trim();
    const description = card.querySelector('.product-card-full__desc')?.textContent.trim();

    if (!id || !image || !name || (price !== null && (!Number.isSafeInteger(price) || price <= 0))) {
      console.error(`Data produk tidak valid untuk kartu katalog: ${id || '(tanpa ID)'}.`);
      return;
    }

    const gallerySources = card.dataset.gallery
      ? card.dataset.gallery.split('|').map(source => new URL(source.trim(), window.location.href).href).filter(Boolean)
      : [image.src];
    const product = {
      id,
      name,
      description: description || '',
      price,
      image,
      gallerySources: gallerySources.length ? gallerySources : [image.src],
      category: card.dataset.cat || '',
      quantity: 1
    };
    products.set(id, product);
  });

  let cart = readCart();
  let favorites = readFavorites();
  let lastFocusedElement = null;
  let touchStartX = 0;

  grid.querySelectorAll('.product-card-full[data-product-id]').forEach(card => {
    const product = products.get(card.dataset.productId);
    if (!product) return;
    initializeGallery(card, product);
    initializeFavorite(card, product);
    addCartButton(card, product);
  });

  function readCart() {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        console.error('Data keranjang tersimpan bukan daftar yang valid.');
        return [];
      }
      const normalized = new Map();
      let invalidRecords = 0;
      parsed.forEach(item => {
        if (!item || !products.has(item.id) || !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
          invalidRecords += 1;
          return;
        }
        normalized.set(item.id, (normalized.get(item.id) || 0) + item.quantity);
      });
      if (invalidRecords) console.error(`Keranjang tersimpan berisi ${invalidRecords} data produk yang tidak valid; data tersebut diabaikan.`);
      return Array.from(normalized, ([id, quantity]) => ({ id, quantity }));
    } catch (error) {
      console.error('Data keranjang tersimpan tidak dapat dibaca:', error);
      return [];
    }
  }

  function readFavorites() {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return new Set();

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        console.error('Data favorit tersimpan bukan daftar yang valid.');
        return new Set();
      }
      const validFavorites = parsed.filter(id => products.has(id));
      if (validFavorites.length !== parsed.length) console.error('Data favorit tersimpan berisi produk yang tidak dikenal; data tersebut diabaikan.');
      return new Set(validFavorites);
    } catch (error) {
      console.error('Data favorit tersimpan tidak dapat dibaca:', error);
      return new Set();
    }
  }

  function persistCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Keranjang tidak dapat disimpan di penyimpanan lokal:', error);
      announce('Keranjang berubah, tetapi tidak dapat disimpan pada perangkat ini.');
      showProductFeedback('Keranjang berubah, tetapi tidak dapat disimpan pada perangkat ini.');
    }
  }

  function persistFavorites() {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Favorit tidak dapat disimpan di penyimpanan lokal:', error);
      showProductFeedback('Perubahan favorit tidak dapat disimpan pada perangkat ini.');
    }
  }

  function initializeGallery(card, product) {
    const imageFrame = card.querySelector('.product-card-full__img');
    if (!imageFrame || imageFrame.dataset.galleryReady === 'true') return;
    imageFrame.dataset.galleryReady = 'true';

    const counter = document.createElement('span');
    counter.className = 'product-gallery-count';
    counter.setAttribute('aria-label', 'Posisi gambar produk');
    counter.textContent = `1 / ${product.gallerySources.length}`;
    imageFrame.append(counter);

    if (product.gallerySources.length < 2) return;

    let currentIndex = 0;
    const update = index => {
      currentIndex = (index + product.gallerySources.length) % product.gallerySources.length;
      product.image.src = product.gallerySources[currentIndex];
      counter.textContent = `${currentIndex + 1} / ${product.gallerySources.length}`;
    };
    const createArrow = (direction, label) => {
      const button = document.createElement('button');
      button.className = `product-gallery-arrow product-gallery-arrow--${direction}`;
      button.type = 'button';
      button.setAttribute('aria-label', `${label} ${product.name}`);
      button.innerHTML = direction === 'prev'
        ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>'
        : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
      button.addEventListener('click', () => update(currentIndex + (direction === 'next' ? 1 : -1)));
      imageFrame.append(button);
    };

    counter.textContent = `1 / ${product.gallerySources.length}`;
    createArrow('prev', 'Gambar sebelumnya untuk');
    createArrow('next', 'Gambar berikutnya untuk');
    imageFrame.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    imageFrame.addEventListener('touchend', event => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) < 40) return;
      update(currentIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
  }

  function initializeFavorite(card, product) {
    const button = card.querySelector('.product-card-full__fav');
    if (!button) return;
    button.dataset.productAction = 'favorite';
    button.dataset.productId = product.id;
    button.setAttribute('aria-pressed', favorites.has(product.id) ? 'true' : 'false');
    button.setAttribute('aria-label', `${favorites.has(product.id) ? 'Hapus' : 'Simpan'} ${product.name} ${favorites.has(product.id) ? 'dari' : 'ke'} favorit`);
  }

  function addCartButton(card, product) {
    const body = card.querySelector('.product-card-full__body');
    if (!body || body.querySelector('.product-add-cart')) return;
    const actions = document.createElement('div');
    actions.className = 'product-card-full__actions';
    const button = document.createElement('button');
    button.className = 'product-add-cart';
    button.type = 'button';
    button.dataset.productAction = 'add';
    button.dataset.productId = product.id;
    button.dataset.defaultLabel = 'Tambah ke Keranjang';
    button.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.68L23 6H6M12 8v6m-3-3h6"/></svg><span>Tambah ke Keranjang</span>';
    actions.append(button);
    body.append(actions);
  }

  function formatPrice(amount) {
    return currency.format(amount).replace(/\u00a0/g, ' ');
  }

  function findCartItem(id) {
    return cart.find(item => item.id === id);
  }

  function totalQuantity() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function cartTotal() {
    if (cart.some(item => products.get(item.id)?.price === null)) return null;
    return cart.reduce((sum, item) => sum + products.get(item.id).price * item.quantity, 0);
  }

  function updateHeaderBadge() {
    const headerCartButton = document.getElementById('product-cart-toggle');
    const headerCartCount = document.getElementById('product-cart-count');
    if (!headerCartButton || !headerCartCount) return;
    headerCartButton.hidden = false;
    const count = totalQuantity();
    headerCartCount.textContent = String(count);
    headerCartButton.setAttribute('aria-label', `Buka keranjang belanja, ${count} produk`);
  }

  function renderCart() {
    itemsContainer.replaceChildren();
    emptyState.hidden = cart.length > 0;
    checkoutButton.disabled = cart.length === 0;

    cart.forEach(item => {
      const product = products.get(item.id);
      if (!product) return;

      const row = document.createElement('article');
      row.className = 'cart-item';

      const image = document.createElement('img');
      image.className = 'cart-item__image';
      image.src = product.image.src;
      image.alt = product.image.alt || product.name;
      image.loading = 'lazy';

      const details = document.createElement('div');
      details.className = 'cart-item__details';
      const name = document.createElement('h3');
      name.className = 'cart-item__name';
      name.textContent = product.name;

      const controls = document.createElement('div');
      controls.className = 'cart-item__controls';
      const quantity = document.createElement('div');
      quantity.className = 'cart-quantity';
      quantity.setAttribute('aria-label', `Jumlah ${product.name}`);

      const decrease = document.createElement('button');
      decrease.type = 'button';
      decrease.dataset.cartAction = 'decrease';
      decrease.dataset.productId = product.id;
      decrease.setAttribute('aria-label', `Kurangi jumlah ${product.name}`);
      decrease.disabled = item.quantity <= 1;
      decrease.textContent = '−';

      const output = document.createElement('output');
      output.textContent = String(item.quantity);
      output.setAttribute('aria-label', 'Jumlah');

      const increase = document.createElement('button');
      increase.type = 'button';
      increase.dataset.cartAction = 'increase';
      increase.dataset.productId = product.id;
      increase.setAttribute('aria-label', `Tambah jumlah ${product.name}`);
      increase.textContent = '+';

      quantity.append(decrease, output, increase);
      const subtotal = document.createElement('span');
      subtotal.className = 'cart-item__subtotal';
      subtotal.textContent = product.price === null
        ? 'Harga dikonfirmasi saat pemesanan'
        : formatPrice(product.price * item.quantity);
      subtotal.setAttribute('aria-label', 'Subtotal produk');
      controls.append(quantity, subtotal);
      details.append(name, controls);

      const remove = document.createElement('button');
      remove.className = 'cart-item__remove';
      remove.type = 'button';
      remove.dataset.cartAction = 'remove';
      remove.dataset.productId = product.id;
      remove.setAttribute('aria-label', `Hapus ${product.name} dari keranjang`);
      remove.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v7m6-7v7"/></svg>';

      row.append(image, details, remove);
      itemsContainer.append(row);
    });

    const total = cartTotal();
    totalElement.textContent = total === null ? 'Dikonfirmasi saat pemesanan' : formatPrice(total);
    updateHeaderBadge();
  }

  function announce(message) {
    cartStatus.textContent = message;
  }

  function showProductFeedback(message) {
    productFeedback.textContent = message;
    productFeedback.hidden = false;
    window.clearTimeout(productFeedback.hideTimer);
    productFeedback.hideTimer = window.setTimeout(() => {
      productFeedback.hidden = true;
    }, 2600);
  }

  function saveAndRender() {
    persistCart();
    renderCart();
  }

  function addToCart(id, button) {
    const product = products.get(id);
    if (!product) {
      console.error(`Produk tidak ditemukan di katalog: ${id}.`);
      announce('Produk tidak ditemukan. Muat ulang halaman dan coba lagi.');
      return;
    }
    const existing = findCartItem(id);
    if (existing) existing.quantity += 1;
    else cart.push({ id, quantity: 1 });
    saveAndRender();
    announce(`${product.name} berhasil ditambahkan ke keranjang.`);
    showProductFeedback(`${product.name} berhasil ditambahkan ke keranjang.`);
    if (button) {
      const label = button.querySelector('span');
      if (label) {
        const originalLabel = button.dataset.defaultLabel || label.textContent;
        window.clearTimeout(button.labelTimer);
        label.textContent = 'Berhasil ditambahkan';
        button.labelTimer = window.setTimeout(() => { label.textContent = originalLabel; }, 1800);
      }
    }
  }

  function openDrawer() {
    const headerCartButton = document.getElementById('product-cart-toggle');
    if (!headerCartButton) return;
    lastFocusedElement = document.activeElement;
    drawer.hidden = false;
    overlay.hidden = false;
    headerCartButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cart-is-open');
    drawer.querySelector('[data-cart-close]').focus();
  }

  function closeDrawer() {
    const headerCartButton = document.getElementById('product-cart-toggle');
    drawer.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove('cart-is-open');
    headerCartButton?.setAttribute('aria-expanded', 'false');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function buildOrderSummary() {
    const lines = ['PESANAN KARYA RBM TORAJA', ''];
    cart.forEach(item => {
      const product = products.get(item.id);
      if (!product) return;
      lines.push(product.name);
      lines.push(`Jumlah: ${item.quantity}`);
      if (product.price === null) {
        lines.push('Harga satuan: dikonfirmasi saat pemesanan');
        lines.push('Subtotal: dikonfirmasi saat pemesanan');
      } else {
        lines.push(`Harga satuan: ${formatPrice(product.price)}`);
        lines.push(`Subtotal: ${formatPrice(product.price * item.quantity)}`);
      }
      lines.push('');
    });
    const total = cartTotal();
    lines.push(total === null ? 'Total pesanan: dikonfirmasi saat pemesanan' : `Total pesanan: ${formatPrice(total)}`);
    lines.push('');
    lines.push('Mohon informasi lebih lanjut mengenai proses pembayaran dan pengiriman.');
    return lines.join('\n');
  }

  function openCheckoutSummary() {
    if (cart.length === 0) return;
    const orderSummary = buildOrderSummary();
    checkoutSummary.textContent = orderSummary;
    if (whatsappOrderLink) {
      whatsappOrderLink.href = `${WHATSAPP_ADMIN_URL}?text=${encodeURIComponent(orderSummary)}`;
    }
    checkoutStatus.textContent = '';
    if (typeof checkoutDialog.showModal !== 'function') {
      console.error('Dialog ringkasan pesanan tidak didukung oleh browser ini.');
      announce('Browser ini belum mendukung ringkasan checkout. Silakan muat ulang atau gunakan browser terbaru.');
      return;
    }
    checkoutDialog.showModal();
  }

  document.addEventListener('rbm:header-loaded', updateHeaderBadge);

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const actionButton = target.closest('[data-product-action]');
    if (actionButton) {
      const { productAction, productId } = actionButton.dataset;
      if (productAction === 'add') addToCart(productId, actionButton);
      if (productAction === 'favorite') {
        if (favorites.has(productId)) favorites.delete(productId);
        else favorites.add(productId);
        persistFavorites();
        initializeFavorite(actionButton.closest('.product-card-full'), products.get(productId));
      }
      return;
    }

    if (target.closest('#product-cart-toggle')) {
      renderCart();
      openDrawer();
      return;
    }
    if (target.closest('[data-cart-close]')) {
      closeDrawer();
      return;
    }
    if (target === overlay) {
      closeDrawer();
      return;
    }

    const cartAction = target.closest('[data-cart-action]');
    if (cartAction) {
      const { cartAction: action, productId } = cartAction.dataset;
      const item = findCartItem(productId);
      if (!item) return;

      if (action === 'increase') item.quantity += 1;
      if (action === 'decrease' && item.quantity > 1) item.quantity -= 1;
      if (action === 'remove') {
        cart = cart.filter(cartItem => cartItem.id !== productId);
        announce(`${products.get(productId).name} dihapus dari keranjang.`);
      }
      saveAndRender();
      return;
    }
    if (target.closest('#cart-checkout')) openCheckoutSummary();
    if (target.closest('[data-checkout-close]') && checkoutDialog.open) checkoutDialog.close();
    if (target.closest('#back-to-cart') && checkoutDialog.open) checkoutDialog.close();
    if (target.closest('#copy-order-summary')) {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        checkoutStatus.textContent = 'Penyalinan otomatis tidak didukung. Pilih teks ringkasan di atas untuk menyalinnya secara manual.';
        return;
      }
      navigator.clipboard.writeText(checkoutSummary.textContent).then(() => {
        checkoutStatus.textContent = 'Ringkasan pesanan berhasil disalin.';
      }).catch(error => {
        console.error('Ringkasan pesanan tidak dapat disalin:', error);
        checkoutStatus.textContent = 'Gagal menyalin. Pilih teks ringkasan di atas untuk menyalinnya secara manual.';
      });
    }
  });

  drawer.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || drawer.hidden) return;
    const focusable = Array.from(drawer.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'))
      .filter(element => !element.hidden);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (checkoutDialog.open) {
      checkoutDialog.close();
      return;
    }
    if (!drawer.hidden) closeDrawer();
  });

  renderCart();
})();
