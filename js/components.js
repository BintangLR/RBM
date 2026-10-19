// =====================================================
// RBM TORAJA — Shared Components & Centralized System
// Navbar, Footer, Global Search, Two-Language Content Engine (ID/EN)
// =====================================================

(function () {
  'use strict';

  // ── Path depth detection ────────────────────────────
  const isRoot = !window.location.pathname.includes('/pages/');
  const base   = isRoot ? '' : '../';
  const scriptUrl = document.currentScript && document.currentScript.src;
  const componentDirectory = scriptUrl ? new URL('../components/', scriptUrl) : null;

  // ── Language management & Storage ───────────────────
  const LANG_KEY_PRIMARY   = 'rbm-language';
  const LANG_KEY_SECONDARY = 'rbm-lang';

  function getLang() {
    return localStorage.getItem(LANG_KEY_PRIMARY) ||
           localStorage.getItem(LANG_KEY_SECONDARY) ||
           'id';
  }

  // ── Verified Social, Map & Brand URLs ───────────────
  const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/rbmtangmentoe?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
    facebook:  'https://www.facebook.com/share/19Uy7bSDYX/',
    youtube:   'https://www.youtube.com/channel/UCBPxvwjtFAagBZpKPFLEupg',
  };

  const MAP_URL = 'https://maps.app.goo.gl/2oJ5zLkbGuWfTi3RA';
  let languageDismissBound = false;
  let searchEscapeBound = false;
  let googleTranslatePromise = null;

  // ── Google Translate integration ────────────────────
  // The page remains Indonesian (the source language); Google Translate
  // changes the rendered text without replacing the original page markup.
  function ensureGoogleTranslate() {
    if (window.google && window.google.translate) {
      return Promise.resolve();
    }
    if (googleTranslatePromise) return googleTranslatePromise;

    googleTranslatePromise = new Promise((resolve, reject) => {
      window.googleTranslateElementInit = function () {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'id',
            includedLanguages: 'id,en',
            autoDisplay: false
          }, 'google_translate_element');
          resolve();
        } else {
          reject(new Error('Google Translate tidak tersedia.'));
        }
      };

      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => reject(new Error('Gagal memuat Google Translate.'));
      document.head.appendChild(script);
    });

    return googleTranslatePromise;
  }

  function applyGoogleTranslate(lang) {
    ensureGoogleTranslate().then(() => {
      let attempts = 0;
      const selectLanguage = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (!combo) {
          if (attempts++ < 20) window.setTimeout(selectLanguage, 100);
          return;
        }

        combo.value = lang;
        combo.dispatchEvent(new Event('change', { bubbles: true }));

        // Google attaches the select handler immediately after creating the
        // widget. Retry briefly in case the first event occurs too early.
        if (attempts++ < 5 && lang === 'en' && !document.cookie.includes('googtrans=')) {
          window.setTimeout(selectLanguage, 150);
        }
      };
      selectLanguage();
    }).catch(error => {
      console.warn('Google Translate tidak dapat digunakan:', error.message);
    });
  }

  // ── Comprehensive Bilingual Dictionary (ID <-> EN) ──
  const TRANSLATION_MAP = [
    // Navbar & Common Navigation
    ['Beranda', 'Home'],
    ['Tentang RBM', 'About RBM'],
    ['Layanan', 'Services'],
    ['Pusat Belajar', 'Learning Center'],
    ['Karya RBM', 'RBM Works'],
    ['Cerita', 'Stories'],
    ['Dukung RBM', 'Support RBM'],
    ['Kontak', 'Contact'],
    ['Donasi', 'Donate'],
    ['Donasi Sekarang', 'Donate Now'],
    ['Profil RBM', 'RBM Profile'],
    ['Sejarah', 'History'],
    ['Visi, Misi & Nilai', 'Vision, Mission & Values'],
    ['Visi & Misi', 'Vision & Mission'],
    ['Struktur Organisasi', 'Organization Structure'],
    ['Tim RBM', 'Our Team'],
    ['Semua Cerita', 'All Stories'],
    ['Semua Artikel', 'All Articles'],
    ['Beli Karya', 'Buy Works'],
    ['Relawan', 'Volunteer'],
    ['Kemitraan', 'Partnership'],
    ['Navigasi utama', 'Main navigation'],
    ['Navigasi mobile', 'Mobile navigation'],
    ['Buka menu navigasi', 'Open navigation menu'],
    ['Buka menu', 'Open menu'],
    ['Pilih Bahasa', 'Select Language'],
    ['Bahasa', 'Language'],
    ['Indonesia', 'Indonesia'],
    ['English', 'English'],
    ['Cari di RBM Toraja...', 'Search RBM Toraja...'],
    ['Cari', 'Search'],
    ['Tutup pencarian', 'Close search'],
    ['Masukkan kata pencarian', 'Enter search query'],

    // Brand & Subtitle
    ['Bersama Mewujudkan Masyarakat Inklusi', 'Together Building an Inclusive Society'],
    ['Bersama Mewujudkan', 'Together Building'],
    ['Masyarakat Inklusi', 'Inclusive Society'],

    // Hero Homepage
    ['RBM Toraja hadir untuk mendampingi, memberdayakan dan menciptakan kesempatan yang setara bagi penyandang disabilitas bersama keluarga dan masyarakat.', 'RBM Toraja accompanies, empowers, and creates equal opportunities for persons with disabilities together with families and communities.'],
    ['Kenal RBM', 'About RBM'],
    ['Dukung Kami', 'Support Us'],

    // Stats
    ['Binaan LKSA', 'LKSA Beneficiaries'],
    ['Tahun 2026', 'Year 2026'],
    ['Layanan Utama', 'Core Services'],
    ['Wilayah Pelayanan', 'Service Area'],
    ['Tana Toraja & Toraja Utara', 'Tana Toraja & North Toraja'],
    ['Banyak Mitra', 'Many Partners'],
    ['yang Mendukung', 'Supporting Us'],

    // Services Homepage & Page
    ['Layanan Kami', 'Our Services'],
    ['Berbagai layanan untuk mendukung kualitas hidup penyandang disabilitas dan keluarganya.', 'Diverse services supporting the quality of life for persons with disabilities and their families.'],
    ['Lihat Semua Layanan', 'View All Services'],
    ['Pendidikan', 'Education'],
    ['Pendidikan inklusif dan setara untuk semua jenis disabilitas.', 'Inclusive and equitable education for all types of disabilities.'],
    ['Pendidikan dasar dan inklusif untuk semua jenis disabilitas.', 'Basic and inclusive education for all types of disabilities.'],
    ['Kesehatan', 'Health'],
    ['Layanan kesehatan komprehensif dengan dukungan mitra.', 'Comprehensive healthcare support with partner organizations.'],
    ['Layanan kesehatan komprehensif dengan dukungan mitra medis.', 'Comprehensive healthcare support backed by medical partners.'],
    ['Fisioterapi', 'Physiotherapy'],
    ['Pendampingan fisioterapi untuk meningkatkan fungsi gerak.', 'Physiotherapy mentoring to improve motor function.'],
    ['Pendampingan fisioterapi untuk meningkatkan fungsi gerak dan kemandirian.', 'Physiotherapy mentoring to improve motor function and independence.'],
    ['Pemberdayaan Ekonomi', 'Economic Empowerment'],
    ['Pelatihan keterampilan dan dukungan usaha menuju kemandirian.', 'Skills training and enterprise support towards economic independence.'],
    ['Pelatihan keterampilan dan dukungan usaha menuju kemandirian ekonomi.', 'Vocational skills training and micro-enterprise support toward independence.'],
    ['Program Pendukung', 'Support Programs'],
    ['Makanan tambahan, dukungan keluarga, dan program komunitas.', 'Supplementary nutrition, family accompaniment, and community initiatives.'],
    ['Pelajari Layanan Pendidikan', 'Explore Education Services'],
    ['Layanan Lainnya', 'Other Services'],
    ['Selengkapnya', 'Read More'],
    ['Baca Selengkapnya', 'Read More'],

    // Homepage Works & Learning & Stories
    ['Karya Teman-teman RBM', 'Works by RBM Artisans'],
    ['Karya Terbaik RBM', 'Featured RBM Crafts'],
    ['Dari Belajar Menuju Kemandirian', 'From Learning Toward Independence'],
    ['Setiap produk adalah bukti nyata potensi, dedikasi, dan kreativitas teman-teman disabilitas di Toraja.', 'Every product is living testimony of the potential, dedication, and creativity of persons with disabilities in Toraja.'],
    ['Beli Karya Mereka', 'Purchase Their Works'],
    ['Lihat Semua Produk', 'View All Products'],
    ['Tentang Karya RBM', 'About RBM Crafts'],
    ['Ruang Belajar & Tumbuh Bersama', 'Learning & Growing Together Space'],
    ['Pusat Belajar RBM', 'RBM Learning Center'],
    ['Fasilitas terpadu untuk pendidikan, pelatihan keterampilan, fisioterapi, dan kegiatan kreatif yang aman dan inklusif.', 'An integrated facility for education, vocational skills, physiotherapy, and safe, inclusive creative activities.'],
    ['Jelajahi Pusat Belajar', 'Explore Learning Center'],
    ['Ruang Kelas', 'Classrooms'],
    ['Kelas Keterampilan', 'Skills Classes'],
    ['Aktivitas Kreatif', 'Creative Activities'],
    ['Fasilitas Belajar', 'Learning Facilities'],
    ['Cerita & Berita', 'Stories & News'],
    ['Dari Toraja untuk Inklusi', 'From Toraja for Inclusion'],
    ['Ikuti kisah perjuangan, kegiatan, dan berita terbaru dari komunitas RBM Toraja.', 'Follow inspiring journeys, community activities, and latest updates from RBM Toraja.'],
    ['Lihat Semua Cerita', 'View All Stories'],

    // Support CTA & Partners
    ['DUKUNG RBM', 'SUPPORT RBM'],
    ['Jadilah Bagian', 'Be Part'],
    ['dari Perjalanan Ini', 'of the Journey'],
    ['Beli karya, menjadi relawan, bermitra, atau memberikan dukungan demi lebih banyak kesempatan bagi anggota RBM Toraja.', 'Buy their creations, volunteer, partner, or provide support to create more opportunities for RBM Toraja members.'],
    ['Dukung Sekarang', 'Support Now'],
    ['Mitra Terpercaya', 'Trusted Partners'],
    ['Mitra yang Mendukung RBM Toraja', 'Partners Supporting RBM Toraja'],
    ['RBM Toraja bekerja bersama mitra-mitra yang berdedikasi dalam mewujudkan pelayanan inklusif dan bermartabat bagi penyandang disabilitas di Toraja.', 'RBM Toraja collaborates with dedicated partners in realizing inclusive, dignified services for persons with disabilities in Toraja.'],
    ['Gereja Toraja', 'Toraja Church'],
    ['Pemerintah Kabupaten Toraja Utara', 'North Toraja Regency Government'],
    ['RS Elim', 'Elim Hospital'],

    // About Page (tentang-rbm.html)
    ['Mengenal RBM Toraja', 'Getting to Know RBM Toraja'],
    ['Mengenal lebih dekat perjalanan, nilai dan komitmen kami dalam mewujudkan masyarakat inklusi.', 'Learn more about our journey, values, and dedication to building an inclusive community.'],
    ['Profil Organisasi', 'Organization Profile'],
    ['RBM Toraja adalah organisasi rehabilitasi berbasis masyarakat yang hadir untuk mendampingi, memberdayakan, dan menciptakan kesempatan yang setara bagi penyandang disabilitas di wilayah Toraja.', 'RBM Toraja is a community-based rehabilitation organization dedicated to accompanying, empowering, and creating equal opportunities for persons with disabilities in Toraja.'],
    ['Bersama keluarga dan komunitas, RBM Toraja percaya bahwa setiap orang — tanpa terkecuali — memiliki potensi, kemampuan, dan hak untuk berpartisipasi penuh dalam kehidupan bermasyarakat.', 'Alongside families and communities, RBM Toraja believes that every individual, without exception, has dignity, potential, and the right to fully participate in society.'],
    ['Melalui pendekatan berbasis komunitas, RBM Toraja bekerja bersama, bukan untuk, para penyandang disabilitas. Pendekatan ini memastikan bahwa program dan layanan yang dikembangkan benar-benar relevan dengan kebutuhan nyata di lapangan.', 'Through a community-based approach, RBM Toraja works alongside—not merely for—persons with disabilities, ensuring programs directly meet genuine grassroots needs.'],
    ['Informasi Organisasi', 'Organization Information'],
    ['Nama Resmi', 'Official Name'],
    ['Nama Layanan', 'Service Name'],
    ['Nama Inggris', 'English Name'],
    ['Akreditasi', 'Accreditation'],
    ['Berdiri Sejak', 'Established'],
    ['Alamat Kantor', 'Office Address'],
    ['Yayasan RBM Toraja', 'Toraja Community Based Rehabilitation Foundation'],
    ['Toraja Community Based Rehabilitation', 'Toraja Community Based Rehabilitation Foundation'],
    ['Tangmentoe, Toraja Utara (Dekat ITGT)', 'Tangmentoe, North Toraja (Near ITGT)'],
    ['Sejarah RBM Toraja', 'History of RBM Toraja'],
    ['Visi Kami', 'Our Vision'],
    ['Misi Kami', 'Our Mission'],
    ['Nilai-Nilai Kami', 'Our Values'],
    ['Nilai Kami', 'Our Values'],

    // Learning Center Page (pusat-belajar.html)
    ['Pusat Belajar Inklusif', 'Inclusive Learning Center'],
    ['Ruang belajar, terapi, dan berkarya yang dirancang ramah untuk semua disabilitas di Toraja.', 'A barrier-free learning, therapy, and creation space designed for all disabilities in Toraja.'],
    ['Menuju Kemandirian', 'Toward Self-Reliance'],
    ['Tujuan', 'Objectives'],
    ['Sasaran', 'Beneficiaries'],
    ['Kegiatan', 'Activities'],
    ['Menyediakan ruang belajar yang kondusif, inklusif, dan dapat diakses oleh semua jenis disabilitas.', 'Providing a conducive, inclusive, accessible learning environment for all types of disabilities.'],
    ['Anak-anak dan remaja penyandang disabilitas yang membutuhkan layanan pendidikan non-formal.', 'Children and youth with disabilities who require non-formal educational support.'],
    ['Anak-anak dan dewasa penyandang disabilitas di wilayah Tana Toraja dan Toraja Utara.', 'Children and adults with disabilities across Tana Toraja and North Toraja.'],

    // Crafts Page (karya-rbm.html)
    ['Produk RBM Toraja', 'RBM Toraja Products'],
    ['Setiap karya adalah hasil dari proses belajar, kreativitas dan perjalanan menuju kemandirian.', 'Every handcrafted item is a product of learning, creativity, and the journey toward independence.'],
    ['Kategori Produk', 'Product Categories'],
    ['Semua Produk', 'All Products'],
    ['Anting-anting', 'Beaded Earrings'],
    ['Baki', 'Tray'],
    ['Gantungan Kunci', 'Keychain'],
    ['Gelang', 'Bracelet'],
    ['Kalung Salib', 'Cross Necklace'],
    ['Pahatan Toraja', 'Toraja Carving'],
    ['Patung Burung', 'Bird Sculpture'],
    ['Patung Kerbau', 'Buffalo Sculpture'],
    ['Patung Kucing', 'Cat Sculpture'],
    ['Tas', 'Bag'],
    ['Tempat Tisu', 'Tissue Holder'],
    ['Kerajinan Tangan Bermakna', 'Meaningful Handicrafts'],
    ['Dari Tangan Teman-teman Disabilitas', 'Handmade by Friends with Disabilities'],
    ['Hubungi untuk Memesan', 'Contact to Order'],
    ['Beli Sekarang', 'Order Now'],

    // Stories Page (cerita.html)
    ['Cerita RBM Toraja', 'RBM Toraja Stories'],
    ['Kisah, kegiatan, berita dan inspirasi dari perjalanan bersama menuju masyarakat yang inklusif dan berdaya.', 'Chronicles, activities, news, and inspiration from our shared journey toward an inclusive, empowered society.'],
    ['Filter Kategori', 'Category Filter'],
    ['Baca Artikel', 'Read Article'],
    ['Artikel Terkait', 'Related Articles'],
    ['Cerita Lainnya', 'Other Stories'],
    ['Kembali ke daftar cerita', 'Back to stories list'],
    ['Kembali ke daftar layanan', 'Back to services list'],
    ['Cerita tidak ditemukan.', 'Story not found.'],
    ['Layanan tidak ditemukan.', 'Service not found.'],

    // Support Page (dukung-rbm.html & donasi.html)
    ['Mari Bergabung Bersama Kami', 'Join Hands With Us'],
    ['Donasi untuk RBM Toraja', 'Donation for RBM Toraja'],
    ['Donasikan sebagian rezeki Anda untuk mendukung program pendidikan, kesehatan, dan pemberdayaan bagi penyandang disabilitas di Toraja.', 'Contribute your support to sustain education, healthcare, and empowerment programs for persons with disabilities in Toraja.'],
    ['Pilih Jumlah Donasi', 'Choose Donation Amount'],
    ['Jumlah Lainnya', 'Custom Amount'],
    ['Informasi Donatur', 'Donor Information'],
    ['Nama Lengkap', 'Full Name'],
    ['Nomor Telepon / WhatsApp', 'Phone / WhatsApp Number'],
    ['Nomor WhatsApp', 'WhatsApp Number'],
    ['Doa atau Pesan Dukungan', 'Prayer or Support Message'],
    ['Lanjutkan Donasi', 'Proceed to Donate'],
    ['Rekening Resmi RBM Toraja', 'Official RBM Toraja Accounts'],
    ['Konfirmasi Donasi', 'Confirm Donation'],
    ['Kirim Bukti Transfer', 'Send Transfer Receipt'],
    ['Tentang Donasi', 'About Donations'],
    ['Donasi Anda akan langsung mendukung keberlangsungan program-program RBM Toraja yang memberikan dampak nyata bagi kehidupan penyandang disabilitas.', 'Your donation directly supports RBM Toraja programs that bring real impact to the lives of persons with disabilities.'],
    ['Pendidikan Inklusif', 'Inclusive Education'],
    ['Layanan Kesehatan', 'Healthcare Services'],
    ['Pelatihan Keterampilan', 'Skills Training'],
    ['Daftar Relawan', 'Sign Up as Volunteer'],

    // Contact Page (kontak.html)
    ['Hubungi Kami', 'Contact Us'],
    ['Kontak RBM Toraja', 'Contact RBM Toraja'],
    ['Kami selalu terbuka untuk berdiskusi, bekerja sama, atau menjawab pertanyaan Anda.', 'We are always open to discussions, collaborative partnerships, and answering your questions.'],
    ['Kirim Pesan untuk RBM', 'Send a Message to RBM'],
    ['Kirim Pesan', 'Send Message'],
    ['Isi formulir di bawah ini dan kami akan merespons sesegera mungkin.', 'Fill out the form below and we will respond as soon as possible.'],
    ['Informasi Kontak', 'Contact Information'],
    ['Hubungi kami melalui salah satu saluran berikut.', 'Contact us through one of the following channels.'],
    ['Alamat', 'Address'],
    ['Telepon / WhatsApp', 'Phone / WhatsApp'],
    ['Jam Operasional', 'Operating Hours'],
    ['Media Sosial', 'Social Media'],
    ['Lokasi Kami', 'Our Location'],
    ['Lokasi RBM Toraja di Google Maps', 'RBM Toraja Location on Google Maps'],
    ['Buka di Google Maps', 'Open in Google Maps'],
    ['Peta lokasi RBM Toraja di Google Maps', 'Google Maps view of RBM Toraja location'],
    ['Keperluan', 'Subject / Purpose'],
    ['Pilih keperluan Anda', 'Select your purpose'],
    ['Informasi Layanan', 'Service Information'],
    ['Informasi Donasi', 'Donation Information'],
    ['Pembelian Karya', 'Product Purchase'],
    ['Menjadi Relawan', 'Becoming a Volunteer'],
    ['Kunjungan', 'Visit Request'],
    ['Pesan', 'Message'],
    ['Tuliskan pesan Anda di sini...', 'Write your message here...'],
    ['Pesan Terkirim!', 'Message Sent!'],

    // FAQ Common
    ['Pertanyaan Umum', 'Frequently Asked Questions'],
    ['Informasi yang sering ditanyakan kepada RBM Toraja.', 'Frequently asked questions and answers about RBM Toraja.'],
    ['Berapa lama waktu respons RBM setelah mengirim pesan?', 'How quickly does RBM respond to inquiries?'],
    ['[DATA PERLU DIKONFIRMASI RBM] — Kami berusaha merespons setiap pesan secepatnya pada hari kerja.', '[DATA TO BE CONFIRMED BY RBM] — We strive to respond as promptly as possible during working hours.'],
    ['Bagaimana cara mengunjungi RBM Toraja?', 'How can I arrange a visit to RBM Toraja?'],
    ['Kunjungan dapat diatur melalui penghubungan terlebih dahulu. Silakan kirim pesan atau hubungi kami untuk menjadwalkan kunjungan. [DATA PERLU DIKONFIRMASI RBM]', 'Visits can be arranged in advance. Please message us or submit the contact form to schedule your visit.'],
    ['Apakah RBM menerima kunjungan dari luar Toraja?', 'Does RBM welcome visitors from outside Toraja?'],
    ['Ya, RBM Toraja terbuka untuk kunjungan dari berbagai pihak yang ingin belajar, berkolaborasi, atau memberikan dukungan. Hubungi kami untuk informasi lebih lanjut.', 'Yes, RBM Toraja warmly welcomes guests, institutions, and partners wishing to learn, collaborate, or offer support.'],
    ['Bagaimana cara melakukan donasi?', 'How can I make a donation?'],
    ['Anda dapat melakukan donasi melalui halaman Donasi atau dengan menghubungi RBM Toraja untuk informasi rekening resmi yang berlaku.', 'You can donate via the Donation page or by contacting RBM Toraja directly for official bank account information.'],
    ['Apakah ada minimal donasi?', 'Is there a minimum donation amount?'],
    ['Tidak ada minimal donasi. Setiap kontribusi, besar atau kecil, sangat berarti bagi program RBM Toraja.', 'There is no minimum donation. Every contribution, large or small, is deeply meaningful for RBM Toraja programs.'],
    ['Tidak ada minimal donasi. Setiap kontribusi sangat berarti bagi teman-teman di RBM.', 'There is no minimum donation. Every contribution is deeply valued by our community at RBM.'],
    ['Bagaimana cara menjadi relawan?', 'How do I become a volunteer?'],
    ['Hubungi kami melalui halaman Kontak atau kirim email/WhatsApp untuk mendiskusikan bidang keahlian Anda dan peluang kolaborasi.', 'Contact us via the Contact page or send an email/WhatsApp message to discuss your expertise and volunteer opportunities.'],
    ['Apa saja bentuk kemitraan yang tersedia?', 'What types of partnerships are available?'],
    ['Kemitraan dapat berupa dukungan pendanaan, program bersama, promosi karya, dan kolaborasi kegiatan tertentu sesuai kebutuhan RBM Toraja.', 'Partnerships include financial support, joint programs, artisan product promotions, and collaborative activities.'],
    ['Bagaimana memastikan donasi saya tepat sasaran?', 'How do you ensure donations reach their intended beneficiaries?'],
    ['Kami berkomitmen untuk transparansi dalam penggunaan donasi. Informasi lebih lanjut dapat dikonfirmasi langsung kepada RBM Toraja.', 'We are committed to full transparency in our use of donations. Official reports are maintained by RBM Toraja.'],
    ['Siapa saja yang dapat menggunakan layanan RBM?', 'Who is eligible to use RBM services?'],
    ['Layanan RBM Toraja terbuka untuk semua penyandang disabilitas di wilayah Tana Toraja dan Toraja Utara beserta keluarganya, tanpa memandang jenis disabilitas.', 'RBM Toraja services are open to all persons with disabilities and families across Tana Toraja and North Toraja, regardless of disability type.'],
    ['Apakah layanan RBM berbayar?', 'Is there any fee for RBM services?'],
    ['Bagaimana cara mendaftar sebagai binaan RBM?', 'How can one register as an RBM beneficiary?'],
    ['Apa saja jenis disabilitas yang dilayani?', 'What types of disabilities are served?'],
    ['RBM Toraja melayani berbagai jenis disabilitas termasuk disabilitas fisik, sensorik (penglihatan dan pendengaran), intelektual, dan psikososial.', 'RBM Toraja serves various disabilities including physical, sensory (vision and hearing), intellectual, and psychosocial disabilities.'],
    ['Apakah donasi saya akan mendapatkan bukti?', 'Will I receive a proof/receipt for my donation?'],
    ['Untuk apa donasi saya digunakan?', 'What will my donation be used for?'],
    ['Donasi digunakan untuk mendukung program pendidikan, kesehatan, fisioterapi, pemberdayaan ekonomi, dan operasional RBM Toraja.', 'Donations are used to support education, healthcare, physiotherapy, economic empowerment, and daily RBM Toraja operations.'],

    // Footer items
    ['Navigasi', 'Navigation'],
    ['Semua hak dilindungi.', 'All rights reserved.'],
    ['Kembali ke atas', 'Back to top'],
    ['Lihat di Google Maps', 'View on Google Maps'],
    ['WhatsApp / Telepon', 'WhatsApp / Phone'],
    ['Footer situs RBM Toraja', 'RBM Toraja site footer'],
  ];

  // Build lookup maps sorted by length (descending) to avoid partial-word collision
  const ID_TO_EN = new Map();
  const EN_TO_ID = new Map();
  TRANSLATION_MAP.forEach(([id, en]) => {
    ID_TO_EN.set(id, en);
    EN_TO_ID.set(en, id);
  });

  const SORTED_ID_KEYS = Array.from(ID_TO_EN.keys()).sort((a, b) => b.length - a.length);

  // ── Translate a single string ───────────────────────
  function translateString(str, targetLang) {
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    if (targetLang === 'en') {
      if (ID_TO_EN.has(trimmed)) {
        return str.replace(trimmed, ID_TO_EN.get(trimmed));
      }
      let result = str;
      for (let i = 0; i < SORTED_ID_KEYS.length; i++) {
        const idKey = SORTED_ID_KEYS[i];
        if (result.includes(idKey)) {
          result = result.split(idKey).join(ID_TO_EN.get(idKey));
        }
      }
      return result;
    }

    return str;
  }

  // ── Apply DOM-wide text translation ─────────────────
  function applyPageTranslations(lang) {
    const isEN = lang === 'en';

    // 1. Text nodes translation
    function walkTextNodes(node) {
      if (!node) return;
      // Skip script, style, noscript, svg paths
      const tag = node.nodeName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'noscript') return;

      if (node.nodeType === 3) {
        // Text node
        const val = node.nodeValue;
        if (!val || !val.trim()) return;

        if (node._rbmOriginalIdText === undefined) {
          node._rbmOriginalIdText = val;
        }

        if (isEN) {
          const translated = translateString(node._rbmOriginalIdText, 'en');
          if (translated !== node.nodeValue) {
            node.nodeValue = translated;
          }
        } else {
          // Restore original Indonesian text
          if (node.nodeValue !== node._rbmOriginalIdText) {
            node.nodeValue = node._rbmOriginalIdText;
          }
        }
        return;
      }

      // Handle element attributes like placeholder, title, aria-label
      if (node.nodeType === 1) {
        // Placeholder
        if (node.placeholder) {
          if (node._rbmOrigPlaceholder === undefined) {
            node._rbmOrigPlaceholder = node.placeholder;
          }
          node.placeholder = isEN
            ? translateString(node._rbmOrigPlaceholder, 'en')
            : node._rbmOrigPlaceholder;
        }

        // Aria-label
        const ariaLabel = node.getAttribute('aria-label');
        if (ariaLabel) {
          if (node._rbmOrigAriaLabel === undefined) {
            node._rbmOrigAriaLabel = ariaLabel;
          }
          const nextAria = isEN ? translateString(node._rbmOrigAriaLabel, 'en') : node._rbmOrigAriaLabel;
          node.setAttribute('aria-label', nextAria);
        }

        // Title
        const titleAttr = node.getAttribute('title');
        if (titleAttr) {
          if (node._rbmOrigTitle === undefined) {
            node._rbmOrigTitle = titleAttr;
          }
          const nextTitle = isEN ? translateString(node._rbmOrigTitle, 'en') : node._rbmOrigTitle;
          node.setAttribute('title', nextTitle);
        }
      }

      let child = node.firstChild;
      while (child) {
        walkTextNodes(child);
        child = child.nextSibling;
      }
    }

    if (document.body) {
      walkTextNodes(document.body);
    }

    // Page title
    const docTitle = document.querySelector('title');
    if (docTitle) {
      if (docTitle._rbmOrigTitle === undefined) {
        docTitle._rbmOrigTitle = docTitle.textContent;
      }
      docTitle.textContent = isEN ? translateString(docTitle._rbmOrigTitle, 'en') : docTitle._rbmOrigTitle;
    }

    // Inform listeners (e.g. dynamic detail pages)
    window.dispatchEvent(new CustomEvent('rbm:languagechange', { detail: { lang } }));
  }

  // ── Set active language ─────────────────────────────
  function setLang(lang) {
    const nextLang = (lang === 'en') ? 'en' : 'id';
    localStorage.setItem(LANG_KEY_PRIMARY, nextLang);
    localStorage.setItem(LANG_KEY_SECONDARY, nextLang);
    // Keep the source language set to Indonesian so Google Translate can
    // correctly detect and translate the complete document.
    document.documentElement.lang = 'id';
    document.documentElement.setAttribute('data-rbm-lang', nextLang);
    if (window) window.__RBM_LANG__ = { lang: nextLang };

    const searchOverlay = document.getElementById('search-overlay');

    document.querySelectorAll('.lang-selector').forEach(selector => {
      const suffix = selector.id.endsWith('-mobile') ? 'mobile' : 'desktop';
      selector.outerHTML = makeLangSelector(suffix);
    });
    if (searchOverlay) {
      searchOverlay.outerHTML = buildSearchOverlay();
    }

    applyGoogleTranslate(nextLang);
    initLanguage();
    initSearch();
    initFAQAccordion();
  }

  // ── Navigation items data ────────────────────────────
  function flagImg(l, size) {
    const s = size || 20;
    const flagFile = (l === 'id') ? 'indonesia-round.svg' : 'uk-round.svg';
    const altText  = (l === 'id') ? 'Indonesia' : 'English';
    return `<img src="${base}assets/images/flags/${flagFile}" alt="${altText}" width="${s}" height="${s}" class="flag-icon" style="width:${s}px;height:${s}px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;flex-shrink:0;" aria-hidden="true">`;
  }

  // ── Language Selector UI Builder ─────────────────────
  function makeLangSelector(suffix) {
    const currentLang = getLang();
    const isEN        = currentLang === 'en';
    const currentLabel = isEN ? 'English' : 'Indonesia';
    const s = suffix ? '-' + suffix : '';

    return `
<div class="lang-selector" id="lang-selector${s}" role="navigation" aria-label="${isEN ? 'Language Selector' : 'Pilihan Bahasa'}">
  <button class="lang-selector__btn" id="lang-btn${s}" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="${isEN ? 'Select language: ' + currentLabel : 'Pilih bahasa: ' + currentLabel}">
    ${flagImg(currentLang, 20)}
    <span class="lang-selector__label">${currentLabel}</span>
    <svg class="lang-selector__chevron" viewBox="0 0 10 7" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
  </button>
  <div class="lang-selector__dropdown" id="lang-dropdown${s}" role="listbox" aria-label="${isEN ? 'Choose language' : 'Pilih bahasa'}" hidden>
    <button type="button" class="lang-option ${currentLang === 'id' ? 'is-active' : ''}" data-lang="id" role="option" aria-selected="${currentLang === 'id'}">
      ${flagImg('id', 20)} <span>Indonesia</span>
    </button>
    <button type="button" class="lang-option ${currentLang === 'en' ? 'is-active' : ''}" data-lang="en" role="option" aria-selected="${currentLang === 'en'}">
      ${flagImg('en', 20)} <span>English</span>
    </button>
  </div>
</div>`;
  }

  // ── Build Navbar ─────────────────────────────────────
  function buildSearchOverlay() {
    const lang        = getLang();
    const isEN        = lang === 'en';
    const placeholder = isEN ? 'Search RBM Toraja...' : 'Cari di RBM Toraja...';
    return `
<div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="${isEN ? 'Search RBM Toraja' : 'Pencarian RBM Toraja'}" hidden>
  <div class="search-overlay__backdrop" id="search-backdrop"></div>
  <div class="search-overlay__panel">
    <div class="search-overlay__header">
      <div class="search-overlay__input-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input type="search" id="search-input" class="search-overlay__input" placeholder="${placeholder}" autocomplete="off" aria-label="${isEN ? 'Enter search terms' : 'Masukkan kata pencarian'}">
      </div>
      <button class="search-overlay__close" id="search-close-btn" type="button" aria-label="${isEN ? 'Close search' : 'Tutup pencarian'}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="search-overlay__results" id="search-results" aria-live="polite"></div>
  </div>
</div>`;
  }

  // ── Unified FAQ Accordion (Single-Open, Keyboard Accessible) ──
  function initFAQAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');
    if (!triggers.length) return;

    triggers.forEach((trigger, index) => {
      const item = trigger.closest('.faq-item');
      if (!item) return;

      const body = item.querySelector('.faq-body');
      if (!body) return;

      const answerId = body.id || `faq-answer-${index + 1}`;
      body.id = answerId;
      trigger.setAttribute('aria-controls', answerId);

      const isOpen = item.classList.contains('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      body.hidden = !isOpen;

      if (trigger._faqUnifiedBound) return;
      trigger._faqUnifiedBound = true;

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const currentlyOpen = item.classList.contains('is-open');
        const willOpen = !currentlyOpen;

        // Close all siblings
        document.querySelectorAll('.faq-item').forEach(other => {
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherBody    = other.querySelector('.faq-body');
          other.classList.remove('is-open');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.hidden = true;
        });

        if (willOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          body.hidden = false;
        }
      });

      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  // ── Navbar Functionality Init ─────────────────────────
  function initNavbar() {
    const header    = document.querySelector('#site-header .site-header');
    const hamburger = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    // Sticky shadow
    window.addEventListener('scroll', function () {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });

    // Mobile Hamburger
    if (hamburger && mobileNav) {
      hamburger.onclick = function (e) {
        e.stopPropagation();
        const isOpen = mobileNav.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.classList.toggle('is-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };

      mobileNav.querySelectorAll('a').forEach(link => {
        link.onclick = function () {
          mobileNav.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('is-open');
          document.body.style.overflow = '';
        };
      });

      mobileNav.querySelectorAll('.mobile-nav__submenu-toggle').forEach(toggle => {
        toggle.onclick = function (e) {
          e.stopPropagation();
          const submenu = document.getElementById(toggle.getAttribute('aria-controls'));
          if (!submenu) return;

          const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
          mobileNav.querySelectorAll('.mobile-nav__submenu-toggle').forEach(otherToggle => {
            const otherSubmenu = document.getElementById(otherToggle.getAttribute('aria-controls'));
            otherToggle.setAttribute('aria-expanded', 'false');
            if (otherSubmenu) otherSubmenu.hidden = true;
          });

          toggle.setAttribute('aria-expanded', String(willOpen));
          submenu.hidden = !willOpen;
        };
      });
    }

    // Dropdown hover & keyboard support
    document.querySelectorAll('.has-dropdown').forEach(function (el) {
      const toggle   = el.querySelector('a');
      const dropdown = el.querySelector('.dropdown');
      if (!toggle || !dropdown) return;

      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isShown = dropdown.style.display === 'block';
          dropdown.style.display = isShown ? '' : 'block';
        }
        if (e.key === 'Escape') dropdown.style.display = '';
      });

      dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            dropdown.style.display = '';
            toggle.focus();
          }
        });
      });
    });
  }

  // ── Language Selector Logic (NO POPUPS) ───────────────
  function initLanguage() {
    const selectors = document.querySelectorAll('.lang-selector');
    if (!selectors.length) return;

    selectors.forEach(sel => {
      const btn      = sel.querySelector('.lang-selector__btn');
      const dropdown = sel.querySelector('.lang-selector__dropdown');
      if (!btn || !dropdown) return;

      btn.onclick = function (e) {
        e.stopPropagation();
        const isHidden = dropdown.hidden;
        // Close others
        document.querySelectorAll('.lang-selector__dropdown').forEach(d => {
          if (d !== dropdown) d.hidden = true;
        });
        document.querySelectorAll('.lang-selector__btn').forEach(b => {
          if (b !== btn) b.setAttribute('aria-expanded', 'false');
        });
        dropdown.hidden = !isHidden;
        btn.setAttribute('aria-expanded', String(!isHidden));
      };

      dropdown.querySelectorAll('.lang-option').forEach(opt => {
        opt.onclick = function (e) {
          e.stopPropagation();
          const chosenLang = this.dataset.lang;
          dropdown.hidden = true;
          btn.setAttribute('aria-expanded', 'false');
          setLang(chosenLang);
        };
      });
    });

    if (!languageDismissBound) {
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.lang-selector')) {
          document.querySelectorAll('.lang-selector__dropdown').forEach(d => d.hidden = true);
          document.querySelectorAll('.lang-selector__btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          document.querySelectorAll('.lang-selector__dropdown').forEach(d => d.hidden = true);
          document.querySelectorAll('.lang-selector__btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
      });
      languageDismissBound = true;
    }
  }

  // ── Footer Init ───────────────────────────────────────
  function initFooter() {
    const btn = document.getElementById('back-to-top-btn');
    if (btn) {
      btn.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
  }

  // ── Global Search Init ────────────────────────────────
  function initSearch() {
    const toggleBtn = document.getElementById('search-toggle-btn');
    const overlay   = document.getElementById('search-overlay');
    const backdrop  = document.getElementById('search-backdrop');
    const closeBtn  = document.getElementById('search-close-btn');
    const input     = document.getElementById('search-input');
    const results   = document.getElementById('search-results');

    if (!toggleBtn || !overlay || !input || !results) return;

    const lang      = getLang();
    const isEN      = lang === 'en';
    const hintMsg   = isEN ? 'Type at least 2 characters to search...' : 'Ketik minimal 2 karakter untuk mencari...';
    const emptyMsg  = isEN ? 'No results found for' : 'Tidak menemukan hasil untuk';

    const searchData = buildSearchData();

    function openSearch() {
      overlay.hidden = false;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      setTimeout(() => input.focus(), 60);
    }

    function closeSearch() {
      overlay.hidden = true;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      input.value = '';
      results.innerHTML = '';
    }

    toggleBtn.onclick = openSearch;
    if (closeBtn) closeBtn.onclick = closeSearch;
    if (backdrop) backdrop.onclick = closeSearch;

    if (!searchEscapeBound) {
      document.addEventListener('keydown', function (e) {
        const activeOverlay = document.getElementById('search-overlay');
        if (e.key === 'Escape' && activeOverlay && !activeOverlay.hidden) {
          const activeCloseButton = document.getElementById('search-close-btn');
          if (activeCloseButton) activeCloseButton.click();
        }
      });
      searchEscapeBound = true;
    }

    let debounce;
    input.oninput = function () {
      clearTimeout(debounce);
      debounce = setTimeout(() => renderResults(input.value.trim()), 160);
    };

    input.onkeydown = function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = results.querySelector('.search-result-item');
        if (first) first.focus();
      }
    };

    function renderResults(query) {
      if (!query || query.length < 2) {
        results.innerHTML = `<div class="search-hint">${hintMsg}</div>`;
        return;
      }

      const q = normalize(query);
      const matches = searchData.filter(item => {
        return normalize(item.title).includes(q)
          || normalize(item.excerpt || '').includes(q)
          || (item.keywords || []).some(k => normalize(k).includes(q));
      }).slice(0, 10);

      if (!matches.length) {
        results.innerHTML = `<div class="search-empty"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><p>${emptyMsg} "<strong>${escHtml(query)}</strong>"</p></div>`;
        return;
      }

      const groups = {};
      matches.forEach(item => {
        const typeLabel = isEN ? translateString(item.type, 'en') : item.type;
        if (!groups[typeLabel]) groups[typeLabel] = [];
        groups[typeLabel].push(item);
      });

      let html = '';
      Object.entries(groups).forEach(([type, items]) => {
        html += `<div class="search-group"><div class="search-group__label">${escHtml(type)}</div>`;
        items.forEach(item => {
          const displayTitle = isEN ? (item.titleEN || translateString(item.title, 'en')) : item.title;
          const displayExcerpt = isEN ? (item.excerptEN || translateString(item.excerpt || '', 'en')) : (item.excerpt || '');
          html += `<a class="search-result-item" href="${item.url}" tabindex="0">
            <div class="search-result-item__body">
              <span class="search-result-item__title">${highlight(displayTitle, query)}</span>
              ${displayExcerpt ? `<span class="search-result-item__excerpt">${highlight(truncate(displayExcerpt, 80), query)}</span>` : ''}
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>`;
        });
        html += '</div>';
      });

      results.innerHTML = html;

      results.querySelectorAll('.search-result-item').forEach((el, i, all) => {
        el.onkeydown = function (e) {
          if (e.key === 'ArrowDown') { e.preventDefault(); if (all[i + 1]) all[i + 1].focus(); }
          if (e.key === 'ArrowUp')   { e.preventDefault(); i > 0 ? all[i - 1].focus() : input.focus(); }
          if (e.key === 'Escape')    closeSearch();
          if (e.key === 'Enter')     el.click();
        };
      });
    }

    function buildSearchData() {
      const staticData = [
        { title: 'Beranda', titleEN: 'Home', type: 'Halaman', url: base + 'index.html', keywords: ['home','beranda','rbm','toraja'] },
        { title: 'Tentang RBM', titleEN: 'About RBM', type: 'Halaman', url: base + 'pages/tentang-rbm.html', keywords: ['tentang','about','profil','profile','sejarah','history','visi','misi'] },
        { title: 'Layanan RBM', titleEN: 'Services', type: 'Halaman', url: base + 'pages/layanan.html', keywords: ['layanan','services','program','bantuan'] },
        { title: 'Pusat Belajar', titleEN: 'Learning Center', type: 'Halaman', url: base + 'pages/pusat-belajar.html', keywords: ['pusat belajar','learning center','kelas','fasilitas'] },
        { title: 'Karya RBM', titleEN: 'RBM Works', type: 'Halaman', url: base + 'pages/karya-rbm.html', keywords: ['karya','works','produk','tenun','kerajinan','crafts'] },
        { title: 'Cerita', titleEN: 'Stories', type: 'Halaman', url: base + 'pages/cerita.html', keywords: ['cerita','stories','berita','news','kegiatan','activities'] },
        { title: 'Dukung RBM', titleEN: 'Support RBM', type: 'Halaman', url: base + 'pages/dukung-rbm.html', keywords: ['dukung','support','relawan','volunteer','kemitraan','partnership'] },
        { title: 'Donasi', titleEN: 'Donate', type: 'Halaman', url: base + 'pages/donasi.html', keywords: ['donasi','donate','sumbang','rekening'] },
        { title: 'Kontak', titleEN: 'Contact', type: 'Halaman', url: base + 'pages/kontak.html', keywords: ['kontak','contact','alamat','address','telepon','whatsapp','map','lokasi'] },
        { title: 'Pendidikan', titleEN: 'Education', type: 'Layanan', url: base + 'pages/layanan-detail.html?id=pendidikan', excerpt: 'Pendidikan dasar dan inklusif untuk semua jenis disabilitas.', excerptEN: 'Basic and inclusive education for all types of disabilities.', keywords: ['pendidikan','education','sekolah','literasi'] },
        { title: 'Kesehatan', titleEN: 'Health', type: 'Layanan', url: base + 'pages/layanan-detail.html?id=kesehatan', excerpt: 'Layanan kesehatan komprehensif dengan dukungan mitra medis.', excerptEN: 'Comprehensive healthcare support with partner organizations.', keywords: ['kesehatan','health','medis','dokter','elim'] },
        { title: 'Fisioterapi', titleEN: 'Physiotherapy', type: 'Layanan', url: base + 'pages/layanan-detail.html?id=fisioterapi', excerpt: 'Pendampingan fisioterapi untuk meningkatkan fungsi gerak.', excerptEN: 'Physiotherapy mentoring to improve motor function.', keywords: ['fisioterapi','physiotherapy','gerak','terapi'] },
        { title: 'Pemberdayaan Ekonomi', titleEN: 'Economic Empowerment', type: 'Layanan', url: base + 'pages/layanan-detail.html?id=ekonomi', excerpt: 'Pelatihan keterampilan dan dukungan usaha menuju kemandirian.', excerptEN: 'Skills training and enterprise support towards economic independence.', keywords: ['pemberdayaan','ekonomi','tenun','usaha'] },
        { title: 'Program Pendukung', titleEN: 'Support Programs', type: 'Layanan', url: base + 'pages/layanan-detail.html?id=pendukung', excerpt: 'Makanan tambahan, dukungan keluarga, dan program komunitas.', excerptEN: 'Supplementary nutrition, family support, and community engagement.', keywords: ['pendukung','makanan','gizi','keluarga'] },
        { title: 'Anting-anting', titleEN: 'Beaded Earrings', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['anting','earrings','aksesori','perhiasan'] },
        { title: 'Baki', titleEN: 'Tray', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['baki','tray','kerajinan'] },
        { title: 'Gantungan Kunci', titleEN: 'Keychains', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['gantungan','kunci','keychain','souvenir'] },
        { title: 'Gelang', titleEN: 'Bracelets', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['gelang','bracelet','manik','beads'] },
        { title: 'Kalung Salib', titleEN: 'Cross Necklace', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['kalung','salib','necklace','perhiasan'] },
        { title: 'Pahatan Toraja', titleEN: 'Toraja Carving', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['pahatan','carving','ukiran','kayu'] },
        { title: 'Patung Burung', titleEN: 'Bird Sculpture', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['patung','burung','sculpture'] },
        { title: 'Patung Kerbau', titleEN: 'Buffalo Sculpture', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['patung','kerbau','sculpture'] },
        { title: 'Patung Kucing', titleEN: 'Cat Sculpture', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['patung','kucing','sculpture'] },
        { title: 'Tas', titleEN: 'Bag', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['tas','bag','karya'] },
        { title: 'Tempat Tisu', titleEN: 'Tissue Holder', type: 'Produk', url: base + 'pages/karya-rbm.html#produk', keywords: ['tempat tisu','tissue holder','kerajinan'] },
      ];

      if (typeof RBM !== 'undefined' && RBM.stories) {
        RBM.stories.forEach(s => {
          staticData.push({
            title:    s.title,
            titleEN:  s.title,
            type:     'Cerita',
            url:      base + 'pages/cerita-detail.html?id=' + s.id,
            excerpt:  s.excerpt,
            keywords: [s.categoryLabel, s.category, ...s.title.toLowerCase().split(' ')],
          });
        });
      }
      return staticData;
    }

    function normalize(str) {
      return (str || '').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ').trim();
    }

    function highlight(text, query) {
      const safe = escHtml(text);
      const q = escHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return safe.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
    }

    function truncate(str, len) {
      return str.length > len ? str.slice(0, len) + '...' : str;
    }

    function escHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  }

  async function injectComponent(containerId, fileName) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Komponen ${fileName} tidak dapat dimuat: #${containerId} tidak ditemukan.`);
      return false;
    }
    if (!componentDirectory) {
      container.innerHTML = '<p role="alert">Komponen situs tidak dapat dimuat.</p>';
      console.error(`Komponen ${fileName} tidak dapat dimuat: URL script tidak tersedia.`);
      return false;
    }

    const url = new URL(fileName, componentDirectory);
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      let markup = await response.text();
      markup = markup
        .replace(/\{\{BASE\}\}/g, base)
        .replace('{{LANG_SELECTOR_DESKTOP}}', makeLangSelector('desktop'))
        .replace('{{LANG_SELECTOR_MOBILE}}', makeLangSelector('mobile'));
      container.innerHTML = markup;
      if (fileName === 'header.html') {
        document.dispatchEvent(new Event('rbm:header-loaded'));
      }
      return true;
    } catch (error) {
      container.innerHTML = '<p role="alert">Komponen situs gagal dimuat. Silakan muat ulang halaman.</p>';
      console.error(`Gagal memuat komponen ${url.href}:`, error);
      return false;
    }
  }

  function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-active-pages]').forEach(link => {
      const activePages = link.dataset.activePages.split(/\s+/);
      if (activePages.includes(currentPage)) {
        link.classList.add('active');
      }
    });
  }

  // ── DOMContentLoaded Initialization ──────────────────
  document.addEventListener('DOMContentLoaded', async function () {
    const currentLang = getLang();
    document.documentElement.lang = 'id';
    document.documentElement.setAttribute('data-rbm-lang', currentLang);

    const componentPromises = [
      injectComponent('site-header', 'header.html'),
      injectComponent('site-footer', 'footer.html'),
    ];
    if (document.getElementById('mitra-component')) {
      componentPromises.push(injectComponent('mitra-component', 'mitra.html'));
    }
    await Promise.all(componentPromises);

    if (!document.getElementById('search-overlay')) {
      document.body.insertAdjacentHTML('beforeend', buildSearchOverlay());
    }

    setActiveNavigation();
    // Load the official Google Translate widget once the shared header exists.
    // Apply a previously selected language after the widget has initialized.
    if (currentLang === 'en') applyGoogleTranslate('en');

    initNavbar();
    initLanguage();
    initSearch();
    initFooter();
    initFAQAccordion();
  });

  // Export functions to window for interoperability
  window.RBM_setLang = setLang;
  window.RBM_getLang = getLang;
  window.RBM_initFAQ = initFAQAccordion;

})();
