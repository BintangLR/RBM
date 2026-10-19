(function () {
  'use strict';

  const productFiles = [
    'anting-anting-1.jpg',
    'anting-anting-2.jpg',
    'anting-anting-3.jpg',
    'anting-anting.jpg',
    'baki-2.jpg',
    'baki-1.jpg',
    'gk-1.jpg',
    'gk-2.jpg',
    'GK.jpg',
    'GK3.jpg',
    'GK4.jpg',
    'GK5.jpg',
    'GK6.jpg',
    'GK7.jpg',
    'GK9.jpg',
    'gantungan-kunci-varian-1.jpg',
    'gantungan-kunci-varian-2.jpg',
    'gantungan-kunci-varian-3.jpg',
    'gantungan-kunci-varian-4.jpg',
    'gantungan-kunci-varian-5.jpg',
    'gantungan-kunci-varian-6.jpg',
    'gantungan-kunci-varian-7.jpg',
    'gantungan-kunci-varian-8.jpg',
    'gantungan-kunci-varian-9.jpg',
    'gantungan-kunci-1.jpg',
    'gelang-1.jpg',
    'gelang-2.jpg',
    'gelang-3.jpg',
    'gelang-4.jpg',
    'Gelang.jpg',
    'IMG_20261007_103743.jpg',
    'IMG_20261007_103758.jpg',
    'IMG_20261007_104121.jpg',
    'IMG_20261007_104708.jpg',
    'IMG_20261007_104925.jpg',
    'IMG_20261007_104953.jpg',
    'IMG_20261007_105012.jpg',
    'IMG_20261007_105034.jpg',
    'IMG_20261007_105056.jpg',
    'IMG_20261007_105126.jpg',
    'IMG_20261007_105205.jpg',
    'IMG_20261007_105244.jpg',
    'IMG_20261007_105323.jpg',
    'IMG_20261007_105357.jpg',
    'IMG_20261007_105407.jpg',
    'IMG_20261007_105421.jpg',
    'IMG_20261007_105433.jpg',
    'IMG_20261007_105812.jpg',
    'IMG_20261007_105825.jpg',
    'IMG_20261007_105916.jpg',
    'IMG_20261007_110808.jpg',
    'IMG_20261007_110906.jpg',
    'IMG_20261007_110910.jpg',
    'IMG_20261007_111018.jpg',
    'IMG_20261007_111222.jpg',
    'IMG_20261007_111240.jpg',
    'IMG_20261007_111302.jpg',
    'IMG_20261007_111307.jpg',
    'IMG_20261007_111606.jpg',
    'IMG_20261007_111609.jpg',
    'IMG_20261007_111706.jpg',
    'IMG_20261007_111817.jpg',
    'IMG_20261007_111828.jpg',
    'IMG_20261007_111857.jpg',
    'IMG_20261007_111944.jpg',
    'kalung-salib-1.jpg',
    'kalung-salib.jpg',
    'pahatan-1.jpg',
    'pahatan-2.jpg',
    'pahatan-13.jpg',
    'Pahatan.jpg',
    'patung-burung-1.jpg',
    'patung-burung-2.jpg',
    'patung-burung-3.jpg',
    'patung-kerbau-1.jpg',
    'patung-kerbau-2.jpg',
    'patung-kerbau-3.jpg',
    'patung-kucing-1.jpg',
    'patung-kucing-2.jpg',
    'Patung.jpg',
    'SAVE_20261015_110741.jpg',
    'SAVE_20261015_110757.jpg',
    'SAVE_20261015_110804.jpg',
    'SAVE_20261015_110813.jpg',
    'SAVE_20261015_110819.jpg',
    'SAVE_20261015_110826.jpg',
    'SAVE_20261015_110833.jpg',
    'SAVE_20261015_110840.jpg',
    'SAVE_20261015_110846.jpg',
    'SAVE_20261015_110854.jpg',
    'SAVE_20261015_110902.jpg',
    'SAVE_20261015_110909.jpg',
    'SAVE_20261015_110916.jpg',
    'SAVE_20261015_110923.jpg',
    'SAVE_20261015_110932.jpg',
    'SAVE_20261015_110938.jpg',
    'SAVE_20261015_110944.jpg',
    'SAVE_20261015_110951.jpg',
    'SAVE_20261015_110958.jpg',
    'SAVE_20261015_111004.jpg',
    'SAVE_20261015_111015.jpg',
    'SAVE_20261015_111023.jpg',
    'SAVE_20261015_111030.jpg',
    'SAVE_20261015_111037.jpg',
    'SAVE_20261015_111046.jpg',
    'SAVE_20261015_111053.jpg',
    'SAVE_20261015_111059.jpg',
    'SAVE_20261015_111106.jpg',
    'tas-1.jpg',
    'tas-2.jpg',
    'tas-3.jpg',
    'tas-4.jpg',
    'tas-5.jpg',
    'tas-6.jpg',
    'tas-7.jpg',
    'tempat-tisu-1.jpg',
    'tempat-tisu-2.jpg'
  ];
  const hiddenPhotoFiles = new Set([
    'IMG_20261007_103743.jpg',
    'IMG_20261007_103758.jpg',
    'IMG_20261007_110906.jpg',
    'IMG_20261007_110910.jpg',
    'IMG_20261007_104708.jpg',
    'IMG_20261007_111944.jpg',
    'gantungan-kunci-varian-2.jpg',
    'tempat-tisu-1.jpg',
    'tempat-tisu-2.jpg'
  ]);
  // Hasil audit visual. Nama file lama tidak konsisten dengan isi fotonya,
  // jadi hanya foto yang terverifikasi sebagai karya yang sama yang digabung.
  const visualGroups = new Map([
    ['gantungan-kunci-tanduk', {
      title: 'Gantungan Kunci Tanduk',
      category: 'lainnya',
      files: ['patung-burung-1.jpg', 'patung-burung-2.jpg']
    }],
    ['kalung-salib-hitam', {
      title: 'Kalung Salib Hitam',
      category: 'kalung',
      files: ['pahatan-1.jpg', 'tas-1.jpg']
    }],
    ['kalung-salib', {
      title: 'Kalung Salib',
      category: 'kalung',
      files: ['kalung-salib-1.jpg', 'kalung-salib.jpg']
    }],
    ['busana-manik', {
      title: 'Busana Manik Toraja',
      category: 'kain',
      files: ['IMG_20261007_111018.jpg', 'IMG_20261007_111222.jpg', 'IMG_20261007_111240.jpg', 'IMG_20261007_111302.jpg', 'IMG_20261007_111307.jpg']
    }],
    ['kain-hitam', {
      title: 'Kain Hitam Motif Percik',
      category: 'kain',
      files: ['IMG_20261007_111606.jpg', 'IMG_20261007_111609.jpg']
    }],
    ['kain-hijau', {
      title: 'Kain Hijau Motif Percik',
      category: 'kain',
      files: ['IMG_20261007_111706.jpg', 'IMG_20261007_111817.jpg']
    }],
    ['kain-abu', {
      title: 'Kain Abu-abu Motif Percik',
      category: 'kain',
      files: ['IMG_20261007_111828.jpg', 'IMG_20261007_111857.jpg']
    }],
    ['tempat-tisu-rbm', {
      title: 'Tempat Tisu Motif RBM',
      category: 'lainnya',
      files: ['IMG_20261007_105357.jpg', 'IMG_20261007_105433.jpg']
    }],
    ['tempat-tisu-toraja', {
      title: 'Tempat Tisu Motif Toraja',
      category: 'lainnya',
      files: ['IMG_20261007_105407.jpg', 'IMG_20261007_105421.jpg']
    }]
  ]);
  const visualFileGroups = new Map();
  visualGroups.forEach((group, key) => group.files.forEach(file => visualFileGroups.set(file, { ...group, key })));
  const visualLabels = new Map([
    ['anting-anting-1.jpg', ['Tas Selempang', 'tas']],
    ['anting-anting-2.jpg', ['Tempat Tisu', 'lainnya']],
    ['anting-anting-3.jpg', ['Tas Biru', 'tas']],
    ['anting-anting.jpg', ['Patung Burung', 'patung']],
    ['baki-1.jpg', ['Patung Kucing', 'patung']],
    ['baki-2.jpg', ['Gantungan Kunci Salib', 'lainnya']],
    ['gelang-1.jpg', ['Gantungan Kunci Tanduk', 'lainnya']],
    ['gelang-2.jpg', ['Patung Kerbau', 'patung']],
    ['pahatan-2.jpg', ['Gelang Rajut', 'lainnya']],
    ['patung-burung-3.jpg', ['Gantungan Kunci Tali', 'lainnya']],
    ['patung-kerbau-1.jpg', ['Gantungan Kunci Manik', 'lainnya']],
    ['patung-kerbau-2.jpg', ['Pahatan Figur', 'pahatan']],
    ['patung-kucing-1.jpg', ['Tas Rajut', 'tas']],
    ['tas-2.jpg', ['Gantungan Kunci Tali', 'lainnya']]
  ]);

  function getVisualInfo(filename) {
    const group = visualFileGroups.get(filename);
    if (group) return { title: group.title, category: group.category, groupKey: group.key };
    const label = visualLabels.get(filename);
    return label ? { title: label[0], category: label[1], groupKey: null } : null;
  }

  const grid = document.getElementById('product-grid');
  if (!grid) {
    console.error('Katalog karya RBM tidak dapat ditampilkan: elemen product-grid tidak ditemukan.');
    return;
  }

  function productDetails(filename, index) {
    const baseName = filename.replace(/\.jpg$/i, '');
    const isCameraFilename = /^(IMG|SAVE)_\d+(?:_\d+)*$/i.test(baseName);
    const readableBaseName = baseName.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
    const normalizedName = readableBaseName.toLocaleLowerCase('id-ID');
    const compactBaseName = baseName.replace(/[-\s]+/g, '');
    let title = readableBaseName;
    let category = 'lainnya';
    const visualInfo = getVisualInfo(filename);
    const cameraGroup = null;

    if (visualInfo) {
      title = visualInfo.title;
      category = visualInfo.category;
    } else if (/^Gantungan Kunci(?: Varian)?(?: \d+)?$/i.test(readableBaseName)) {
      title = 'Gantungan Kunci';
    } else if (/^Baki\d+$/i.test(compactBaseName)) {
      title = 'Baki';
    } else if (cameraGroup) {
      title = cameraGroup;
    } else if (isCameraFilename) {
      title = `Karya RBM — Foto ${String(index + 1).padStart(2, '0')}`;
    } else if (/^AntingAnting(?:\d+)?$/i.test(compactBaseName)) {
      title = 'Anting-anting';
    } else if (/^GK\d*$/i.test(compactBaseName)) {
      title = 'Gantungan Kunci Salib';
    } else if (/^Gelang\d*$/i.test(compactBaseName)) {
      title = 'Gelang';
    } else if (/^Pahatan\d*$/i.test(compactBaseName)) {
      title = 'Pahatan';
    } else if (/^Tas\d*$/i.test(compactBaseName)) {
      title = 'Tas';
    } else if (/^TempatT(isu|issue)\d*$/i.test(compactBaseName)) {
      title = 'Tempat Tisu';
    } else if (/^KalungSalib\d*$/i.test(compactBaseName)) {
      title = 'Kalung Salib';
    } else if (/^Patung .+ \d+$/i.test(readableBaseName)) {
      title = readableBaseName
        .replace(/\s+\d+$/, '')
        .replace(/^patung\s+(.+)$/i, (_, name) => `Patung ${name.charAt(0).toUpperCase()}${name.slice(1)}`);
    } else {
      title = title
        .replace(/^antinganting/i, 'Anting-anting')
        .replace(/^gk\s*(\d*)$/i, (_, number) => `Gantungan Kunci${number ? ` ${number}` : ''}`)
        .replace(/^gantungan kunci \((\d+)\)$/i, 'Gantungan Kunci $1')
        .replace(/^baki(\d+)$/i, 'Baki $1')
        .replace(/^tempat tissue$/i, 'Tempat Tisu');
    }

    if (visualInfo) {
      category = visualInfo.category;
    } else if (/\banting\b/.test(normalizedName) || cameraGroup === 'Anting-anting') {
      category = 'anting-anting';
    } else if (/\b(tas|dompet)\b/.test(normalizedName)) {
      category = 'tas';
    } else if (/\bkalung\b/.test(normalizedName) || cameraGroup === 'Kalung') {
      category = 'kalung';
    } else if (/\bpahatan\b/.test(normalizedName)) {
      category = 'pahatan';
    } else if (/\bpatung\b/.test(normalizedName)) {
      category = 'patung';
    } else if (/\bkain\b/.test(normalizedName) || cameraGroup === 'Kain') {
      category = 'kain';
    }

    return { title, category };
  }

  function getProducts() {
    const products = [];
    const groupedProducts = new Map();

    productFiles.forEach((filename, index) => {
      if (hiddenPhotoFiles.has(filename)) return;

      const baseName = filename.replace(/\.jpg$/i, '');
      const readableBaseName = baseName.replace(/[-_]+/g, ' ');
      const visualInfo = getVisualInfo(filename);
      const groupName = visualInfo?.groupKey || null;
      if (!groupName) {
        products.push({ filename, files: [filename], index });
        return;
      }

      const key = groupName.toLocaleLowerCase('id-ID').replace(/^tempat tissue$/, 'tempat tisu');
      const existingProduct = groupedProducts.get(key);
      if (existingProduct) {
        existingProduct.files.push(filename);
        return;
      }

      const product = { filename, files: [filename], index };
      groupedProducts.set(key, product);
      products.push(product);
    });

    return products;
  }

  function createProductCard(product) {
    const { filename, files, index } = product;
    const { title, category } = productDetails(filename, index);
    const imageUrl = `../assets/images/Produk/${encodeURIComponent(filename)}`;
    const card = document.createElement('article');
    card.className = 'product-card-full';
    card.dataset.productId = `karya-${String(index + 1).padStart(3, '0')}`;
    card.dataset.cat = category;
    if (files.length > 1) {
      card.dataset.gallery = files
        .map(file => `../assets/images/Produk/${encodeURIComponent(file)}`)
        .join('|');
    }

    const imageFrame = document.createElement('div');
    imageFrame.className = 'product-card-full__img';
    imageFrame.style.position = 'relative';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = `${title}, karya RBM Toraja`;
    image.loading = 'lazy';
    image.decoding = 'async';

    const favoriteButton = document.createElement('button');
    favoriteButton.className = 'product-card-full__fav';
    favoriteButton.type = 'button';
    favoriteButton.setAttribute('aria-label', `Simpan ${title} ke favorit`);
    favoriteButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>';
    imageFrame.append(image, favoriteButton);

    const body = document.createElement('div');
    body.className = 'product-card-full__body';

    const name = document.createElement('div');
    name.className = 'product-card-full__name';
    name.textContent = title;

    const price = document.createElement('div');
    price.className = 'product-card-full__price';
    price.textContent = 'Hubungi untuk harga';

    const description = document.createElement('div');
    description.className = 'product-card-full__desc';
    description.textContent = files.length > 1
      ? `Karya RBM Toraja dengan ${files.length} foto. Gunakan panah untuk melihat semua foto. Hubungi kami untuk informasi harga dan ketersediaan.`
      : 'Karya RBM Toraja. Hubungi kami untuk informasi harga dan ketersediaan.';

    body.append(name, price, description);
    card.append(imageFrame, body);
    return card;
  }

  grid.replaceChildren(...getProducts().map(createProductCard));
})();

