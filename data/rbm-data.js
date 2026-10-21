// =====================================================
// RBM TORAJA — Structured Content Data
// Single source of truth for all website content.
// =====================================================

const RBM = {

  images: {
    rbm01: '../assets/images/rbm-01.jpg',
    rbm02: '../assets/images/rbm-02.jpg',
    rbm03: '../assets/images/rbm-03.jpg',
    rbm04: '../assets/images/rbm-04.jpg',
    rbm05: '../assets/images/rbm-05.jpg',
  },

  footerLogo: 'assets/images/logo/logo1.png',

  org: {
    name:             'RBM Toraja',
    fullName:         'Yayasan RBM Toraja',
    nameEN:           'Toraja Community Based Rehabilitation Foundation',
    shortDescription: 'RBM Toraja hadir untuk mendampingi, memberdayakan, dan mewujudkan kesempatan yang setara bagi penyandang disabilitas bersama keluarga dan masyarakat.',
    shortDescriptionEN: 'RBM Toraja accompanies, empowers, and creates equal opportunities for persons with disabilities together with families and communities.',
    accreditation:    '[DATA PERLU DIKONFIRMASI RBM]',
    yearFounded:      '[DATA PERLU DIKONFIRMASI RBM]',
    address:          'Tangmentoe, Toraja Utara (Dekat ITGT)',
    email:            '[DATA PERLU DIKONFIRMASI RBM]',
    phone:            '[DATA PERLU DIKONFIRMASI RBM]',
    operationalHours: '[DATA PERLU DIKONFIRMASI RBM]',
    bankInfo:         '[REKENING DONASI PERLU DIKONFIRMASI RBM]',
    mapEmbed:         'https://www.google.com/maps?q=RBM%20Toraja%20Tangmentoe%20Toraja%20Utara&z=16&output=embed',
  },

  socialLinks: {
    instagram: 'https://www.instagram.com/rbmtangmentoe?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
    facebook:  'https://www.facebook.com/share/19Uy7bSDYX/',
    youtube:   'https://www.youtube.com/channel/UCBPxvwjtFAagBZpKPFLEupg',
  },

  map: {
    googleMaps: 'https://maps.app.goo.gl/2oJ5zLkbGuWfTi3RA',
    embed:      'https://www.google.com/maps?q=RBM%20Toraja%20Tangmentoe%20Toraja%20Utara&z=16&output=embed',
  },

  languages: {
    default: 'id',
    supported: ['id', 'en'],
    label: {
      id: 'Indonesia',
      en: 'English'
    }
  },

  faq: [
    {
      id: 'faq-donasi',
      question: 'Bagaimana cara melakukan donasi?',
      answer: 'Anda dapat melakukan donasi melalui halaman Donasi atau dengan menghubungi RBM Toraja untuk informasi rekening resmi yang berlaku.',
      translations: {
        id: {
          question: 'Bagaimana cara melakukan donasi?',
          answer: 'Anda dapat melakukan donasi melalui halaman Donasi atau dengan menghubungi RBM Toraja untuk informasi rekening resmi yang berlaku.'
        },
        en: {
          question: 'How can I make a donation?',
          answer: 'You can make a donation through the Donation page or by contacting RBM Toraja directly for official verified bank details.'
        }
      }
    },
    {
      id: 'faq-min-donasi',
      question: 'Apakah ada minimal donasi?',
      answer: 'Tidak ada minimal donasi. Setiap kontribusi, besar atau kecil, sangat berarti bagi program RBM Toraja.',
      translations: {
        id: {
          question: 'Apakah ada minimal donasi?',
          answer: 'Tidak ada minimal donasi. Setiap kontribusi, besar atau kecil, sangat berarti bagi program RBM Toraja.'
        },
        en: {
          question: 'Is there a minimum donation amount?',
          answer: 'There is no minimum donation. Every contribution, whether large or small, is deeply meaningful for RBM Toraja programs.'
        }
      }
    },
    {
      id: 'faq-relawan',
      question: 'Bagaimana cara menjadi relawan?',
      answer: 'Hubungi kami melalui halaman Kontak atau kirim email/WhatsApp untuk mendiskusikan bidang keahlian Anda dan peluang kolaborasi.',
      translations: {
        id: {
          question: 'Bagaimana cara menjadi relawan?',
          answer: 'Hubungi kami melalui halaman Kontak atau kirim email/WhatsApp untuk mendiskusikan bidang keahlian Anda dan peluang kolaborasi.'
        },
        en: {
          question: 'How do I become a volunteer?',
          answer: 'Reach out to us through the Contact page or send an email/WhatsApp to discuss your area of expertise and volunteer opportunities.'
        }
      }
    },
    {
      id: 'faq-kemitraan',
      question: 'Apa saja bentuk kemitraan yang tersedia?',
      answer: 'Kemitraan dapat berupa dukungan pendanaan, program bersama, promosi karya, dan kolaborasi kegiatan tertentu sesuai kebutuhan RBM Toraja.',
      translations: {
        id: {
          question: 'Apa saja bentuk kemitraan yang tersedia?',
          answer: 'Kemitraan dapat berupa dukungan pendanaan, program bersama, promosi karya, dan kolaborasi kegiatan tertentu sesuai kebutuhan RBM Toraja.'
        },
        en: {
          question: 'What types of partnerships are available?',
          answer: 'Partnerships include funding support, joint programs, product exhibitions, and collaborative events tailored to community needs.'
        }
      }
    },
    {
      id: 'faq-sasaran',
      question: 'Bagaimana memastikan donasi saya tepat sasaran?',
      answer: 'Kami berkomitmen untuk transparansi dalam penggunaan donasi. Informasi lebih lanjut dapat dikonfirmasi langsung kepada RBM Toraja.',
      translations: {
        id: {
          question: 'Bagaimana memastikan donasi saya tepat sasaran?',
          answer: 'Kami berkomitmen untuk transparansi dalam penggunaan donasi. Informasi lebih lanjut dapat dikonfirmasi langsung kepada RBM Toraja.'
        },
        en: {
          question: 'How do you ensure donations reach their intended beneficiaries?',
          answer: 'We are committed to full accountability and transparent use of donations. Verified financial and program reports are maintained by RBM Toraja.'
        }
      }
    }
  ],

  navigation: [
    { label: 'Beranda',      href: '../index.html' },
    { label: 'Tentang RBM',  href: '../pages/tentang-rbm.html', dropdown: [
      { label: 'Profil RBM',          href: '../pages/tentang-rbm.html#profil' },
      { label: 'Sejarah',             href: '../pages/tentang-rbm.html#sejarah' },
      { label: 'Visi, Misi & Nilai',  href: '../pages/tentang-rbm.html#visi-misi' },
      { label: 'Struktur Organisasi', href: '../pages/tentang-rbm.html#struktur' },
    ]},
    { label: 'Layanan', href: '../pages/layanan.html', dropdown: [
      { label: 'Pendidikan',           href: '../pages/layanan-detail.html?id=pendidikan' },
      { label: 'Kesehatan',            href: '../pages/layanan-detail.html?id=kesehatan' },
      { label: 'Fisioterapi',          href: '../pages/layanan-detail.html?id=fisioterapi' },
      { label: 'Pemberdayaan Ekonomi', href: '../pages/layanan-detail.html?id=ekonomi' },
      { label: 'Program Pendukung',    href: '../pages/layanan-detail.html?id=pendukung' },
    ]},
    { label: 'Pusat Belajar', href: '../pages/pusat-belajar.html' },
    { label: 'Karya RBM',    href: '../pages/karya-rbm.html' },
    { label: 'Cerita', href: '../pages/cerita.html', dropdown: [
      { label: 'Semua Artikel',     href: '../pages/cerita.html' },
      { label: 'Berita',            href: '../pages/cerita.html?cat=berita' },
      { label: 'Kegiatan',          href: '../pages/cerita.html?cat=kegiatan' },
      { label: 'Cerita Inspiratif', href: '../pages/cerita.html?cat=inspiratif' },
      { label: 'Pendidikan',        href: '../pages/cerita.html?cat=pendidikan' },
      { label: 'Pemberdayaan',      href: '../pages/cerita.html?cat=pemberdayaan' },
      { label: 'Kemitraan',         href: '../pages/cerita.html?cat=kemitraan' },
    ]},
    { label: 'Dukung RBM', href: '../pages/dukung-rbm.html', dropdown: [
      { label: 'Donasi',     href: '../pages/donasi.html' },
      { label: 'Beli Karya', href: '../pages/karya-rbm.html' },
      { label: 'Relawan',    href: '../pages/dukung-rbm.html#relawan' },
      { label: 'Kemitraan',  href: '../pages/dukung-rbm.html#kemitraan' },
    ]},
    { label: 'Kontak', href: '../pages/kontak.html' },
  ],

  stats: [
    { icon: 'users',     number: '529',     label: 'Binaan LKSA\nTahun 2026' },
    { icon: 'book',      number: '5',       label: 'Layanan Utama' },
    { icon: 'map-pin',   number: '2',       label: 'Wilayah Pelayanan\nTana Toraja & Toraja Utara' },
    { icon: 'handshake', number: 'Bersama', label: 'Banyak Mitra\nyang Mendukung' },
  ],

  services: [
    {
      id:          'pendidikan',
      title:       'Pendidikan',
      titleEN:     'Education',
      icon:        'book-open',
      description: 'Pendidikan dasar dan inklusif untuk semua jenis disabilitas.',
      descriptionEN: 'Basic and inclusive education for all types of disabilities.',
      overview:    'RBM Toraja menyediakan layanan pendidikan inklusif yang memastikan setiap penyandang disabilitas mendapatkan kesempatan belajar yang setara. Program ini dirancang untuk mendukung pengembangan potensi intelektual, sosial, dan emosional setiap peserta didik.',
      overviewEN:  'RBM Toraja provides inclusive education ensuring every person with a disability receives equal learning opportunities. The program is designed to develop the intellectual, social, and emotional potential of every student.',
      details: {
        tujuan:   'Memberikan akses pendidikan yang setara bagi penyandang disabilitas tanpa diskriminasi, serta mendukung pengembangan potensi individu secara menyeluruh.',
        tujuanEN: 'Providing equal educational access for persons with disabilities without discrimination, supporting holistic individual potential.',
        sasaran:  'Anak-anak dan dewasa penyandang disabilitas di wilayah Tana Toraja dan Toraja Utara.',
        sasaranEN: 'Children and adults with disabilities across Tana Toraja and North Toraja.',
        kegiatan: 'Kelas belajar inklusif, pendampingan akademik, program literasi dan numerasi dasar, pengembangan keterampilan komunikasi.',
        kegiatanEN: 'Inclusive classrooms, academic mentoring, basic literacy and numeracy programs, communication skill development.',
      },
      image:    'rbm02',
      imagePos: 'center 30%',
      galleryTitle: 'Dokumentasi Kegiatan Pendidikan',
      galleryDescription: 'Momen belajar, bertumbuh, dan membangun kepercayaan diri dalam program pendidikan RBM Toraja.',
      gallery: [
        { image: 'foto3', alt: 'Peserta mengikuti kegiatan belajar bersama pendamping RBM Toraja' },
        { image: 'foto4', alt: 'Pendamping memberikan dukungan dalam kegiatan pendidikan' },
        { image: 'foto8', alt: 'Suasana ruang belajar inklusif RBM Toraja' },
        { image: 'foto11', alt: 'Peserta berinteraksi dalam kegiatan belajar bersama' },
      ],
    },
    {
      id:          'kesehatan',
      title:       'Kesehatan',
      titleEN:     'Health',
      icon:        'heart',
      description: 'Layanan kesehatan komprehensif dengan dukungan mitra medis.',
      descriptionEN: 'Comprehensive healthcare support backed by medical partners.',
      overview:    'Layanan kesehatan RBM Toraja hadir untuk memastikan setiap penyandang disabilitas mendapatkan akses terhadap layanan kesehatan yang layak. Dengan dukungan mitra medis seperti RS Elim, RBM memberikan pendampingan medis yang komprehensif.',
      overviewEN:  'RBM Toraja healthcare services ensure persons with disabilities receive dignified health access. With support from medical partners such as Elim Hospital, RBM delivers comprehensive medical accompaniment.',
      details: {
        tujuan:   'Meningkatkan akses layanan kesehatan bagi penyandang disabilitas dan keluarganya, serta meningkatkan kualitas hidup secara menyeluruh.',
        tujuanEN: 'Improving access to healthcare services for persons with disabilities and their families, elevating overall quality of life.',
        sasaran:  'Penyandang disabilitas dari berbagai jenis dan keluarganya di wilayah Tana Toraja dan Toraja Utara.',
        sasaranEN: 'Persons with various disabilities and their families across Tana Toraja and North Toraja.',
        kegiatan: 'Pemeriksaan kesehatan berkala, pendampingan medis, rujukan ke fasilitas kesehatan mitra, edukasi kesehatan keluarga.',
        kegiatanEN: 'Periodic health checkups, medical accompaniment, referrals to partner medical facilities, family health education.',
      },
      image:    'rbm03',
      imagePos: 'center 30%',
      galleryTitle: 'Dokumentasi Kegiatan Kesehatan',
      galleryDescription: 'Momen pendampingan dan edukasi kesehatan untuk mendukung kesejahteraan keluarga RBM Toraja.',
      gallery: [
        { image: 'foto2', alt: 'Pendampingan kesehatan bagi peserta RBM Toraja' },
        { image: 'foto9', alt: 'Kegiatan pemeriksaan dan pendampingan kesehatan' },
        { image: 'foto12', alt: 'Peserta dan pendamping dalam kegiatan kesehatan' },
        { image: 'foto13', alt: 'Interaksi hangat dalam layanan kesehatan RBM Toraja' },
      ],
    },
    {
      id:          'fisioterapi',
      title:       'Fisioterapi',
      titleEN:     'Physiotherapy',
      icon:        'activity',
      description: 'Pendampingan fisioterapi untuk meningkatkan fungsi gerak dan kemandirian.',
      descriptionEN: 'Physiotherapy mentoring to improve motor function and independence.',
      overview:    'Program fisioterapi RBM Toraja dirancang untuk membantu pemulihan dan peningkatan kemampuan gerak penyandang disabilitas fisik. Sesi fisioterapi dilakukan secara terstruktur oleh tenaga terlatih untuk mencapai kemandirian optimal.',
      overviewEN:  'RBM Toraja physiotherapy program is structured to assist recovery and improve motor skills for persons with physical disabilities. Sessions are conducted systematically by trained personnel.',
      details: {
        tujuan:   'Membantu pemulihan dan peningkatan kemampuan gerak, keseimbangan, dan koordinasi untuk mencapai kemandirian dalam kehidupan sehari-hari.',
        tujuanEN: 'Assisting physical recovery, balance, and coordination to achieve daily independence.',
        sasaran:  'Penyandang disabilitas fisik dan anak-anak dengan keterlambatan perkembangan motorik.',
        sasaranEN: 'Persons with physical disabilities and children experiencing motor development delays.',
        kegiatan: 'Sesi fisioterapi terstruktur, latihan gerak fungsional, program pemulihan bertahap, pendampingan penggunaan alat bantu.',
        kegiatanEN: 'Structured physiotherapy sessions, functional movement exercises, progressive rehabilitation, assistive device guidance.',
      },
      image:    'rbm03',
      imagePos: 'right center',
      galleryTitle: 'Dokumentasi Kegiatan Fisioterapi',
      galleryDescription: 'Momen latihan gerak dan pendampingan bertahap dalam program fisioterapi RBM Toraja.',
      gallery: [
        { image: 'foto2', alt: 'Peserta mengikuti latihan gerak bersama pendamping' },
        { image: 'foto6', alt: 'Pendamping membantu latihan fisioterapi peserta' },
        { image: 'foto10', alt: 'Sesi pendampingan gerak yang terstruktur' },
        { image: 'foto14', alt: 'Kegiatan pemulihan dan latihan kemandirian' },
      ],
    },
    {
      id:          'ekonomi',
      title:       'Pemberdayaan Ekonomi',
      titleEN:     'Economic Empowerment',
      icon:        'trending-up',
      description: 'Pelatihan keterampilan dan dukungan usaha menuju kemandirian ekonomi.',
      descriptionEN: 'Skills training and enterprise support towards economic independence.',
      overview:    'Program pemberdayaan ekonomi RBM Toraja berfokus pada pengembangan keterampilan produktif dan kewirausahaan. Melalui pelatihan menenun dan kerajinan tangan, peserta tidak hanya mengembangkan potensi ekonomi tetapi juga melestarikan budaya Toraja.',
      overviewEN:  'RBM Toraja economic empowerment focuses on productive vocational skills and entrepreneurship. Through traditional Toraja weaving and craft training, participants gain livelihood independence while preserving Toraja heritage.',
      details: {
        tujuan:   'Meningkatkan kemampuan ekonomi dan kemandirian penyandang disabilitas melalui pengembangan keterampilan produktif dan jiwa kewirausahaan.',
        tujuanEN: 'Enhancing economic independence for persons with disabilities through productive vocational skills and entrepreneurship.',
        sasaran:  'Remaja dan dewasa penyandang disabilitas yang siap untuk bekerja atau berwirausaha secara mandiri.',
        sasaranEN: 'Youth and adults with disabilities preparing for employment or independent micro-enterprise.',
        kegiatan: 'Pelatihan menenun tradisional Toraja, kerajinan tangan manik-manik, manajemen usaha kecil, pemasaran produk.',
        kegiatanEN: 'Traditional Toraja weaving training, beaded handicrafts, small business management, product marketing.',
      },
      image:    'rbm04',
      imagePos: 'center',
      galleryTitle: 'Dokumentasi Kegiatan Pemberdayaan Ekonomi',
      galleryDescription: 'Momen belajar keterampilan, berkarya, dan menumbuhkan kemandirian ekonomi bersama RBM Toraja.',
      gallery: [
        { image: 'foto5', alt: 'Peserta mengikuti pelatihan keterampilan produktif' },
        { image: 'foto1', alt: 'Proses berkarya dalam program pemberdayaan ekonomi' },
        { image: 'foto8', alt: 'Pendampingan peserta dalam kegiatan keterampilan' },
        { image: 'foto13', alt: 'Hasil dan proses karya peserta RBM Toraja' },
      ],
    },
    {
      id:          'pendukung',
      title:       'Program Pendukung',
      titleEN:     'Support Programs',
      icon:        'heart-handshake',
      description: 'Makanan tambahan, dukungan keluarga, dan program komunitas.',
      descriptionEN: 'Supplementary nutrition, family support, and community engagement.',
      overview:    'Program Pendukung RBM Toraja hadir untuk melengkapi layanan utama dengan dukungan kebutuhan dasar dan sosial. Program ini memastikan bahwa penyandang disabilitas dan keluarganya mendapatkan dukungan menyeluruh untuk kehidupan yang bermartabat.',
      overviewEN:  'RBM Toraja Support Programs complement core services by addressing foundational social and basic needs. It ensures persons with disabilities and families receive comprehensive support for a dignified life.',
      details: {
        tujuan:   'Mendukung kebutuhan dasar, keterlibatan komunitas, dan kesejahteraan menyeluruh penyandang disabilitas dan keluarganya.',
        tujuanEN: 'Supporting essential basic needs, community inclusion, and holistic wellbeing for beneficiaries and their families.',
        sasaran:  'Penyandang disabilitas dengan kebutuhan khusus dan keluarganya, terutama yang membutuhkan dukungan gizi dan psikososial.',
        sasaranEN: 'Beneficiaries with special nutritional, psychosocial, and community support requirements.',
        kegiatan: 'Pemberian makanan tambahan bergizi, dukungan psikososial bagi keluarga, program komunitas inklusif berbasis lokal, perayaan hari penting.',
        kegiatanEN: 'Nutritious supplementary food, psychosocial family counseling, community-based inclusive events, disability awareness days.',
      },
      image:    'rbm05',
      imagePos: 'center 35%',
      galleryTitle: 'Dokumentasi Program Pendukung RBM Toraja',
      galleryDescription: 'Momen kebersamaan, dukungan keluarga, dan kegiatan komunitas yang melengkapi layanan RBM Toraja.',
      gallery: [
        { image: 'foto15', alt: 'Kebersamaan peserta dan keluarga dalam program RBM Toraja' },
        { image: 'foto10', alt: 'Kegiatan komunitas inklusif bersama pendamping' },
        { image: 'foto4', alt: 'Dukungan keluarga dan komunitas untuk peserta' },
        { image: 'foto14', alt: 'Suasana kegiatan pendukung RBM Toraja' },
      ],
    },
  ],

  storyCategories: [
    { id: 'all',          label: 'Semua Artikel',     labelEN: 'All Articles' },
    { id: 'berita',       label: 'Berita',            labelEN: 'News' },
    { id: 'kegiatan',     label: 'Kegiatan',          labelEN: 'Activities' },
    { id: 'inspiratif',   label: 'Cerita Inspiratif', labelEN: 'Inspiring Stories' },
    { id: 'pendidikan',   label: 'Pendidikan',        labelEN: 'Education' },
    { id: 'pemberdayaan', label: 'Pemberdayaan',      labelEN: 'Empowerment' },
    { id: 'kemitraan',    label: 'Kemitraan',         labelEN: 'Partnership' },
  ],

  stories: [
    {
      id:            's07',
      title:         'Membuka Ruang Informasi yang Inklusif',
      category:      'berita',
      categoryLabel: 'Berita',
      detailPage:    'cerita-berita-membuka-ruang-informasi-yang-inklusif.html',
      contentPage:   '../content/cerita/cerita-berita-membuka-ruang-informasi-yang-inklusif.html',
      date:          'Oktober 2026',
      dateTime:      '2026-10-01',
      excerpt:       'RBM Toraja terus membuka ruang informasi yang mudah diakses untuk memperkuat komunikasi, partisipasi, dan dukungan bagi masyarakat inklusif.',
      quote: 'Informasi yang terbuka membantu lebih banyak orang memahami, peduli, dan mengambil bagian.',
      image:         'rbm02',
      imagePos:      'center',
    },
    {
      id:            's01',
      title:         'Polres Toraja Utara dan Bhayangkari Gelar Aksi Sosial di RBM Toraja',
      category:      'kegiatan',
      categoryLabel: 'Kegiatan',
      detailPage: 'cerita-kegiatan-polres-toraja-utara-dan-bhayangkari.html',
      date:          '25 September 2026',
      dateTime:      '2026-09-25',
      excerpt:       'Bentuk sinergi komunitas dan aparat dalam mendukung penyandang disabilitas di Toraja Utara. Kegiatan ini menjadi contoh nyata kolaborasi lintas sektor.',
      body: [
        'Kegiatan sosial menjadi lebih bermakna ketika dilakukan melalui kerja sama. Kehadiran Polres Toraja Utara dan Bhayangkari menunjukkan bahwa dukungan bagi penyandang disabilitas dapat tumbuh dari kolaborasi berbagai unsur masyarakat.',
        'Dalam setiap perjumpaan, perhatian tidak hanya diwujudkan melalui bantuan, tetapi juga melalui waktu untuk mendengarkan, berinteraksi, dan memahami kebutuhan komunitas. Sikap tersebut membantu menciptakan hubungan yang lebih setara dan penuh penghormatan.',
        'RBM Toraja menyambut kemitraan yang mendorong kepedulian menjadi tindakan nyata. Dukungan dari berbagai pihak memperluas kesempatan bagi anak-anak, keluarga, dan penyandang disabilitas untuk terus belajar serta berkembang.',
        'Cerita ini merupakan placeholder editorial dan akan dilengkapi dengan rangkaian kegiatan serta dokumentasi resmi.'
      ],
      quote: 'Kolaborasi yang tulus mengubah kepedulian menjadi kesempatan yang nyata.',
      image:         'rbm05',
      imagePos:      'center 30%',
    },
    {
      id:            's02',
      title:         'Pelatihan Keterampilan untuk Penyandang Disabilitas: Menenun Masa Depan',
      category:      'pendidikan',
      categoryLabel: 'Pendidikan',
      detailPage: 'cerita-pendidikan-pelatihan-keterampilan-menenun-masa-depan.html',
      date:          '29 Oktober 2025',
      dateTime:      '2025-10-29',
      excerpt:       'Program pelatihan yang membekali peserta dengan keterampilan praktis dan nilai budaya. Setiap helai kain tenun menjadi simbol kemandirian dan harapan.',
      body: [
        'Belajar menenun bukan hanya tentang menghasilkan sehelai kain. Di dalamnya ada proses mengenal pola, melatih ketekunan, mengembangkan koordinasi, dan membangun keberanian untuk mencoba sesuatu yang baru.',
        'Dalam pelatihan keterampilan, peserta mendapatkan ruang untuk belajar sesuai kemampuan dan kecepatannya masing-masing. Pendampingan yang sabar membuat setiap proses terasa lebih aman, menyenangkan, dan bermakna.',
        'Motif dan teknik yang diwariskan dari budaya Toraja menjadi sumber inspirasi dalam berkarya. Ketika keterampilan bertemu dengan kreativitas, lahirlah karya yang membawa nilai budaya sekaligus membuka peluang kemandirian.',
        'Perjalanan ini masih terus berlangsung. Setiap latihan, kesalahan, dan kemajuan menjadi bagian penting dari proses menenun masa depan.'
      ],
      quote: 'Setiap helai kain menyimpan proses belajar, ketekunan, dan harapan untuk hidup yang lebih mandiri.',
      image:         'rbm01',
      imagePos:      'center 50%',
    },
    {
      id:            's03',
      title:         'Kisah Perjuangan dan Harapan dari Teman-teman RBM',
      category:      'inspiratif',
      categoryLabel: 'Cerita Inspiratif',
      detailPage: 'cerita-inspiratif-kisah-perjuangan-dan-harapan.html',
      date:          '15 Agustus 2025',
      dateTime:      '2025-08-15',
      excerpt:       'Perjalanan panjang menuju kemandirian yang menginspirasi banyak orang — tentang semangat, potensi, dan hak untuk berpartisipasi penuh dalam kehidupan.',
      body: [
        'Perjalanan menuju kemandirian tidak selalu berlangsung cepat. Ada hari-hari ketika langkah terasa berat, tetapi ada pula momen kecil yang menunjukkan bahwa setiap usaha memiliki arti.',
        'Bagi teman-teman RBM, dukungan dari keluarga, pendamping, dan lingkungan menjadi kekuatan untuk terus mencoba. Kesempatan untuk belajar, berkomunikasi, dan terlibat dalam kegiatan membantu setiap orang mengenali potensi yang dimilikinya.',
        'Kisah perjuangan bukan tentang kesempurnaan. Kisah ini adalah tentang keberanian untuk bertumbuh, menerima proses, dan menemukan harapan melalui hubungan yang saling menguatkan.',
        'Cerita ini merupakan placeholder editorial dan akan dilengkapi dengan pengalaman serta dokumentasi langsung dari komunitas RBM Toraja.'
      ],
      quote: 'Harapan tumbuh ketika seseorang diberi kesempatan untuk mencoba dan dipercaya untuk berkembang.',
      image:         'rbm03',
      imagePos:      'center',
    },
    {
      id:            's04',
      title:         'Karya Tenun RBM: Dari Kelas ke Pasar',
      category:      'pemberdayaan',
      categoryLabel: 'Pemberdayaan',
      detailPage: 'cerita-pemberdayaan-karya-tenun-rbm.html',
      date:          'Maret 2025',
      dateTime:      '2025-03-01',
      excerpt:       'Produk kerajinan tangan dari teman-teman RBM kini mulai menemukan pasarnya, menjadi bukti nyata bahwa inklusi ekonomi adalah mungkin.',
      body: [
        'Di balik sebuah karya tenun, ada banyak proses yang tidak selalu terlihat. Ada waktu untuk belajar, memilih bahan, menyusun warna, memperbaiki kesalahan, dan menyelesaikan setiap bagian dengan teliti.',
        'Ketika karya mulai dikenal dan menemukan peminat, peserta pelatihan melihat bahwa keterampilan mereka memiliki nilai. Apresiasi dari pembeli menjadi dorongan untuk terus berlatih dan meningkatkan kualitas karya.',
        'Membeli karya RBM bukan hanya mendapatkan produk. Dukungan tersebut ikut menjaga ruang belajar, memperkuat kepercayaan diri, dan membuka peluang bagi penyandang disabilitas untuk berkontribusi secara ekonomi.',
        'Perjalanan dari kelas menuju pasar masih terus dibangun bersama melalui pendampingan, promosi, dan kemitraan yang berkelanjutan.'
      ],
      quote: 'Sebuah karya menjadi lebih bermakna ketika proses pembuatannya ikut membuka jalan menuju kemandirian.',
      image:         'rbm04',
      imagePos:      'center',
    },
    {
      id:            's05',
      title:         'Perayaan Hari Disabilitas Internasional bersama RBM',
      category:      'kegiatan',
      categoryLabel: 'Kegiatan',
      detailPage: 'cerita-kegiatan-hari-disabilitas-internasional.html',
      date:          'Desember 2024',
      dateTime:      '2024-12-03',
      excerpt:       'RBM Toraja turut merayakan Hari Disabilitas Internasional dengan berbagai kegiatan yang memperkuat semangat inklusi dan kebersamaan.',
      body: [
        'Hari Disabilitas Internasional menjadi pengingat bahwa inklusi adalah tanggung jawab bersama. Perayaan ini bukan hanya tentang satu hari, tetapi tentang komitmen untuk menghadirkan kesempatan yang setara sepanjang waktu.',
        'Kegiatan bersama menciptakan ruang untuk bertemu, berbagi pengalaman, dan merayakan kemampuan setiap individu. Dalam suasana yang hangat, keluarga dan komunitas dapat saling mengenal serta menguatkan.',
        'RBM Toraja terus mendorong masyarakat untuk melihat penyandang disabilitas sebagai bagian penting dari kehidupan bersama. Mereka memiliki potensi, suara, pilihan, dan kontribusi yang layak dihargai.',
        'Melalui kebersamaan, semangat inklusi dapat dibawa dari kegiatan perayaan menuju praktik sehari-hari di keluarga, sekolah, tempat kerja, dan lingkungan masyarakat.'
      ],
      quote: 'Masyarakat yang inklusif dibangun ketika setiap orang memiliki ruang untuk hadir, berpartisipasi, dan dihargai.',
      image:         'rbm05',
      imagePos:      'right 30%',
    },
    {
      id:            's06',
      title:         'RBM Toraja Perkuat Kemitraan untuk Layanan Inklusif',
      category:      'kemitraan',
      categoryLabel: 'Kemitraan',
      detailPage: 'cerita-kemitraan-layanan-inklusif.html',
      date:          'Juli 2025',
      dateTime:      '2025-07-01',
      excerpt:       'Kolaborasi dengan berbagai pihak terus diperkuat demi memperluas jangkauan dan kualitas layanan bagi penyandang disabilitas di Toraja.',
      body: [
        'Pelayanan yang inklusif membutuhkan kemitraan yang kuat. Tidak ada satu pihak yang dapat bekerja sendiri untuk menjawab seluruh kebutuhan penyandang disabilitas dan keluarganya.',
        'Melalui kerja sama dengan berbagai pihak, RBM Toraja dapat memperluas dukungan dalam bidang pendidikan, kesehatan, keterampilan, dan pemberdayaan masyarakat. Setiap mitra membawa pengalaman, sumber daya, dan kepedulian yang saling melengkapi.',
        'Kemitraan yang baik dibangun melalui komunikasi terbuka, tujuan yang jelas, dan komitmen untuk menjaga martabat penerima manfaat. Yang terpenting, penyandang disabilitas tetap dilibatkan sebagai bagian dari proses perubahan.',
        'Dengan jejaring yang terus bertumbuh, layanan RBM diharapkan dapat menjangkau lebih banyak keluarga dan menghadirkan dampak yang berkelanjutan.'
      ],
      quote: 'Kemitraan yang setara memperluas jangkauan pelayanan dan memperkuat perubahan.',
      image:         'rbm02',
      imagePos:      'center 20%',
    },
    {
      id:            's08',
      title:         'Pendampingan Pendidikan untuk Kesempatan Belajar yang Setara',
      category:      'pendidikan',
      categoryLabel: 'Pendidikan',
      detailPage:   'cerita-pendidikan-kesempatan-belajar-setara.html',
      date:         'Oktober 2026',
      dateTime:     '2026-10-08',
      excerpt:      'Pendampingan pendidikan membantu penyandang disabilitas belajar sesuai potensi, kebutuhan, dan ritme mereka dalam lingkungan yang inklusif.',
      body: [
        'Pendidikan inklusif membuka kesempatan bagi setiap anak untuk belajar, bertumbuh, dan berpartisipasi sesuai potensi yang dimilikinya. RBM Toraja menghadirkan pendampingan yang memperhatikan kebutuhan setiap peserta.',
        'Dengan dukungan pendamping dan keluarga, proses belajar dapat berlangsung lebih aman, terarah, dan menyenangkan. Setiap kemajuan, sekecil apa pun, menjadi bagian penting dari perjalanan menuju kemandirian.',
      ],
      quote:        'Kesempatan belajar yang setara memberi ruang bagi setiap anak untuk berkembang dengan caranya sendiri.',
      image:        'rbm01',
      imagePos:     'center 50%',
    },
    {
      id:            's09',
      title:         'Menguatkan Keterampilan dan Kemandirian Bersama RBM',
      category:      'pemberdayaan',
      categoryLabel: 'Pemberdayaan',
      detailPage:   'cerita-pemberdayaan-kemandirian-rbm.html',
      date:         'Oktober 2026',
      dateTime:     '2026-10-15',
      excerpt:      'Kegiatan pengembangan keterampilan membantu penyandang disabilitas membangun kepercayaan diri, kemandirian, dan ruang partisipasi di masyarakat.',
      body: [
        'Pengembangan keterampilan memberi kesempatan bagi penyandang disabilitas untuk mengenali kekuatan, mencoba hal baru, dan menghasilkan karya yang bermakna. Prosesnya dibangun melalui latihan yang konsisten dan pendampingan yang menghargai setiap kemampuan.',
        'Kemandirian tumbuh ketika seseorang diberi kesempatan untuk mengambil bagian, membuat pilihan, dan melihat nilai dari kontribusinya. RBM Toraja terus mendorong ruang belajar yang mendukung proses tersebut.',
      ],
      quote:        'Keterampilan tumbuh melalui kesempatan, dukungan, dan kepercayaan untuk terus mencoba.',
      image:        'rbm03',
      imagePos:     'center',
    },
    {
      id:            's10',
      title:         'Kolaborasi dan Kepedulian untuk Layanan Inklusif di Toraja',
      category:      'kemitraan',
      categoryLabel: 'Kemitraan',
      detailPage:   'cerita-kolaborasi-kepedulian-layanan-inklusif.html',
      date:         'Oktober 2026',
      dateTime:     '2026-10-20',
      excerpt:      'Kerja sama dengan komunitas dan mitra memperkuat kualitas layanan inklusif serta memperluas dukungan bagi keluarga di Toraja.',
      body: [
        'Layanan inklusif menjadi lebih kuat ketika komunitas, keluarga, dan mitra saling berbagi kepedulian serta sumber daya. Kolaborasi membantu RBM Toraja memahami kebutuhan di lapangan dan menghadirkan dukungan yang lebih tepat.',
        'Melalui komunikasi terbuka dan tujuan bersama, setiap pihak dapat mengambil peran dalam membangun lingkungan yang lebih ramah, setara, dan mudah diakses bagi penyandang disabilitas.',
      ],
      quote:        'Kepedulian yang dikerjakan bersama dapat memperluas dampak layanan inklusif.',
      image:        'rbm05',
      imagePos:     'center 30%',
    },
  ],

  products: [
    { id: 'p01', name: 'Tas Tenun Toraja', nameEN: 'Toraja Woven Bag', category: 'fashion',  price: 150000, image: 'rbm04', imagePos: 'center',        description: 'Tas tenun tradisional Toraja dengan motif khas, dibuat tangan oleh teman-teman RBM.', descriptionEN: 'Handmade traditional Toraja woven bag crafted with distinctive local motifs by RBM artisans.' },
    { id: 'p02', name: 'Gantungan Kunci',  nameEN: 'Keychains', category: 'souvenir', price: 25000,  image: 'rbm04', imagePos: 'left center',   description: 'Gantungan kunci bermotif Toraja, cocok sebagai oleh-oleh.', descriptionEN: 'Toraja-themed souvenir keychains handmade by RBM youth.' },
    { id: 'p03', name: 'Dompet Tenun',     nameEN: 'Woven Wallet', category: 'fashion',  price: 75000,  image: 'rbm04', imagePos: 'right center',  description: 'Dompet dari kain tenun tradisional Toraja yang kuat dan cantik.', descriptionEN: 'Durable and elegant traditional Toraja woven fabric wallet.' },
    { id: 'p04', name: 'Tempat Pensil',    nameEN: 'Pencil Case', category: 'lainnya',  price: 45000,  image: 'rbm04', imagePos: 'center bottom', description: 'Tempat pensil unik berbahan anyaman Toraja.', descriptionEN: 'Unique pencil holder crafted from woven Toraja craft material.' },
    { id: 'p05', name: 'Gelang Manik',     nameEN: 'Beaded Bracelet', category: 'fashion',  price: 30000,  image: 'rbm04', imagePos: 'center top',   description: 'Gelang cantik dari manik-manik warna-warni hasil kreasi teman-teman RBM.', descriptionEN: 'Colorful beaded bracelet handcrafted with care by RBM artisans.' },
  ],

  partners: [
    { name: 'Gereja Toraja',                     logo: '../assets/images/partners/gereja-toraja.png' },
    { name: 'Pemerintah Kabupaten Toraja Utara',  logo: '../assets/images/partners/pemkab-toraja-utara.png' },
    { name: 'RS Elim',                            logo: '../assets/images/partners/rs-elim.png' },
  ],

  partnerLogos: [
    { name: 'Gereja Toraja',                     logo: 'assets/images/partners/gereja-toraja.png' },
    { name: 'Pemerintah Kabupaten Toraja Utara',  logo: 'assets/images/partners/pemkab-toraja-utara.png' },
    { name: 'RS Elim',                            logo: 'assets/images/partners/rs-elim.png' },
  ],

  faqLayanan: [
    {
      q: 'Siapa saja yang dapat menggunakan layanan RBM?',
      a: 'Layanan RBM Toraja terbuka untuk semua penyandang disabilitas di wilayah Tana Toraja dan Toraja Utara beserta keluarganya, tanpa memandang jenis disabilitas.',
      q_en: 'Who is eligible to access RBM services?',
      a_en: 'RBM Toraja services are open to all persons with disabilities and their families throughout Tana Toraja and North Toraja, regardless of the type of disability.'
    },
    {
      q: 'Apakah layanan RBM berbayar?',
      a: '[DATA PERLU DIKONFIRMASI RBM]',
      q_en: 'Is there a fee for RBM services?',
      a_en: '[DATA TO BE CONFIRMED BY RBM]'
    },
    {
      q: 'Bagaimana cara mendaftar sebagai binaan RBM?',
      a: '[DATA PERLU DIKONFIRMASI RBM]',
      q_en: 'How do I register as an RBM beneficiary?',
      a_en: '[DATA TO BE CONFIRMED BY RBM]'
    },
    {
      q: 'Apa saja jenis disabilitas yang dilayani?',
      a: 'RBM Toraja melayani berbagai jenis disabilitas termasuk disabilitas fisik, sensorik (penglihatan dan pendengaran), intelektual, dan psikososial.',
      q_en: 'What types of disabilities are supported?',
      a_en: 'RBM Toraja supports diverse disability categories including physical, sensory (vision and hearing), intellectual, and psychosocial disabilities.'
    },
  ],

  faqDonasi: [
    {
      q: 'Bagaimana cara melakukan donasi?',
      a: '[REKENING DONASI PERLU DIKONFIRMASI RBM]',
      q_en: 'How can I make a donation?',
      a_en: '[OFFICIAL DONATION ACCOUNT TO BE CONFIRMED BY RBM]'
    },
    {
      q: 'Apakah donasi saya akan mendapatkan bukti?',
      a: '[DATA PERLU DIKONFIRMASI RBM]',
      q_en: 'Will I receive a receipt/proof for my donation?',
      a_en: '[DATA TO BE CONFIRMED BY RBM]'
    },
    {
      q: 'Untuk apa donasi saya digunakan?',
      a: 'Donasi digunakan untuk mendukung program pendidikan, kesehatan, fisioterapi, pemberdayaan ekonomi, dan operasional RBM Toraja.',
      q_en: 'How are donations utilized?',
      a_en: 'Donations are directly allocated to support education, healthcare, physiotherapy, vocational empowerment, and essential operations of RBM Toraja.'
    },
    {
      q: 'Apakah ada minimal donasi?',
      a: 'Tidak ada minimal donasi. Setiap kontribusi sangat berarti bagi teman-teman di RBM.',
      q_en: 'Is there a minimum donation?',
      a_en: 'There is no minimum donation. Every contribution is deeply valued by our community at RBM.'
    },
  ],

  faqKontak: [
    {
      q: 'Berapa lama waktu respons RBM setelah mengirim pesan?',
      a: '[DATA PERLU DIKONFIRMASI RBM] — Kami berusaha merespons setiap pesan secepatnya pada hari kerja.',
      q_en: 'How quickly does RBM respond to inquiries?',
      a_en: '[DATA TO BE CONFIRMED BY RBM] — We strive to respond to every inquiry as quickly as possible during working hours.'
    },
    {
      q: 'Bagaimana cara mengunjungi RBM Toraja?',
      a: 'Kunjungan dapat diatur melalui penghubungan terlebih dahulu. Silakan kirim pesan atau hubungi kami untuk menjadwalkan kunjungan. [DATA PERLU DIKONFIRMASI RBM]',
      q_en: 'How can I visit RBM Toraja in person?',
      a_en: 'Visits can be arranged by contacting us in advance. Please submit the contact form or message us to schedule a visit.'
    },
    {
      q: 'Apakah RBM menerima kunjungan dari luar Toraja?',
      a: 'Ya, RBM Toraja terbuka untuk kunjungan dari berbagai pihak yang ingin belajar, berkolaborasi, atau memberikan dukungan. Hubungi kami untuk informasi lebih lanjut.',
      q_en: 'Does RBM welcome visitors from outside Toraja?',
      a_en: 'Yes, RBM Toraja warmly welcomes visitors, partners, and institutions wishing to learn, collaborate, or offer support.'
    }
  ],

  // ── Localization (i18n) ─────────────────────────────
  i18n: {
    id: {
      lang: 'id',
      langLabel: 'Indonesia',
      flagSrc: null, // resolved dynamically
      nav: {
        home:        'Beranda',
        about:       'Tentang RBM',
        services:    'Layanan',
        learn:       'Pusat Belajar',
        karya:       'Karya RBM',
        stories:     'Cerita',
        support:     'Dukung RBM',
        contact:     'Kontak',
        donate:      'Donasi',
      },
      hero: {
        eyebrow:  '',
        heading:  'Bersama Mewujudkan<br><span class="text-primary">Masyarakat Inklusi</span>',
        body:     'RBM Toraja hadir untuk mendampingi, memberdayakan dan menciptakan kesempatan yang setara bagi penyandang disabilitas bersama keluarga dan masyarakat.',
        cta1:     'Kenal RBM',
        cta2:     'Dukung Kami',
      },
      search: {
        placeholder: 'Cari di RBM Toraja...',
        hint:        'Ketik minimal 2 karakter untuk mencari...',
        empty:       'Tidak menemukan hasil untuk',
      },
      footer: {
        nav:          'Navigasi',
        support:      'Dukung RBM',
        contact:      'Hubungi Kami',
        copyright:    '© 2026 RBM Toraja — Semua hak dilindungi.',
        donate:       'Donasi',
        buyKarya:     'Beli Karya',
        volunteer:    'Relawan',
        partnership:  'Kemitraan',
      },
    },
    en: {
      lang: 'en',
      langLabel: 'English',
      flagSrc: null,
      nav: {
        home:        'Home',
        about:       'About RBM',
        services:    'Services',
        learn:       'Learning Center',
        karya:       'RBM Works',
        stories:     'Stories',
        support:     'Support RBM',
        contact:     'Contact',
        donate:      'Donate',
      },
      hero: {
        eyebrow:  'Community Based Rehabilitation',
        heading:  'Together Building<br><span class="text-primary">Inclusive Communities</span>',
        body:     'RBM Toraja is here to accompany, empower, and create equal opportunities for persons with disabilities together with their families and communities.',
        cta1:     'About RBM',
        cta2:     'Support Us',
      },
      search: {
        placeholder: 'Search RBM Toraja...',
        hint:        'Type at least 2 characters to search...',
        empty:       'No results found for',
      },
      footer: {
        nav:          'Navigation',
        support:      'Support RBM',
        contact:      'Contact Us',
        copyright:    '© 2026 RBM Toraja — Community Based Rehabilitation Toraja. All rights reserved.',
        donate:       'Donate',
        buyKarya:     'Buy Works',
        volunteer:    'Volunteer',
        partnership:  'Partnership',
      },
    },
  },

  searchIndex: [
    { title: 'Beranda',                    type: 'Halaman', url: '../index.html',                              keywords: ['home','beranda','rbm','utama','rehabilitasi'] },
    { title: 'Tentang RBM',               type: 'Halaman', url: '../pages/tentang-rbm.html',                 keywords: ['tentang','profil','rbm','sejarah','visi','misi','organisasi'] },
    { title: 'Profil RBM',                type: 'Halaman', url: '../pages/tentang-rbm.html#profil',          keywords: ['profil','tentang','rbm','yayasan'] },
    { title: 'Sejarah RBM',               type: 'Halaman', url: '../pages/tentang-rbm.html#sejarah',         keywords: ['sejarah','berdiri','asal','rbm'] },
    { title: 'Visi, Misi & Nilai',        type: 'Halaman', url: '../pages/tentang-rbm.html#visi-misi',       keywords: ['visi','misi','nilai','tujuan','rbm'] },
    { title: 'Struktur Organisasi',       type: 'Halaman', url: '../pages/tentang-rbm.html#struktur',        keywords: ['struktur','organisasi','pengurus','rbm'] },
    { title: 'Tim RBM',                   type: 'Halaman', url: '../pages/tentang-rbm.html#tim',             keywords: ['tim','staf','pengurus','rbm'] },
    { title: 'Layanan RBM',              type: 'Halaman',  url: '../pages/layanan.html',                     keywords: ['layanan','service','program','rbm'] },
    { title: 'Pusat Belajar',            type: 'Halaman',  url: '../pages/pusat-belajar.html',               keywords: ['pusat belajar','belajar','kelas','ruang','fasilitas'] },
    { title: 'Karya RBM',               type: 'Halaman',  url: '../pages/karya-rbm.html',                   keywords: ['karya','produk','kerajinan','tenun','beli'] },
    { title: 'Cerita',                  type: 'Halaman',  url: '../pages/cerita.html',                      keywords: ['cerita','berita','artikel','kegiatan','inspiratif'] },
    { title: 'Dukung RBM',             type: 'Halaman',   url: '../pages/dukung-rbm.html',                  keywords: ['dukung','bantu','relawan','volunteer','kemitraan'] },
    { title: 'Donasi',                  type: 'Halaman',  url: '../pages/donasi.html',                      keywords: ['donasi','sumbang','dukung','finansial','dana'] },
    { title: 'Kontak',                  type: 'Halaman',  url: '../pages/kontak.html',                      keywords: ['kontak','hubungi','alamat','telepon','email'] },
    { title: 'Pendidikan',              type: 'Layanan',  url: '../pages/layanan-detail.html?id=pendidikan', keywords: ['pendidikan','belajar','sekolah','inklusif','literasi','kelas'] },
    { title: 'Kesehatan',              type: 'Layanan',   url: '../pages/layanan-detail.html?id=kesehatan',  keywords: ['kesehatan','medis','periksa','dokter','rujukan'] },
    { title: 'Fisioterapi',            type: 'Layanan',   url: '../pages/layanan-detail.html?id=fisioterapi',keywords: ['fisioterapi','gerak','terapi','pemulihan','latihan'] },
    { title: 'Pemberdayaan Ekonomi',   type: 'Layanan',   url: '../pages/layanan-detail.html?id=ekonomi',    keywords: ['pemberdayaan','ekonomi','usaha','keterampilan','kerja','wirausaha'] },
    { title: 'Program Pendukung',      type: 'Layanan',   url: '../pages/layanan-detail.html?id=pendukung',  keywords: ['pendukung','makanan','gizi','keluarga','komunitas'] },
    { title: 'Anting-anting',          type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['anting','aksesori','perhiasan','karya'] },
    { title: 'Baki',                   type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['baki','kerajinan','karya'] },
    { title: 'Gantungan Kunci',        type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['gantungan','kunci','souvenir','oleh-oleh','karya'] },
    { title: 'Gelang',                 type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['gelang','manik','aksesori','karya'] },
    { title: 'Kalung Salib',           type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['kalung','salib','aksesori','perhiasan','karya'] },
    { title: 'Pahatan Toraja',         type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['pahatan','ukiran','kayu','karya'] },
    { title: 'Patung Burung',          type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['patung','burung','pahatan','karya'] },
    { title: 'Patung Kerbau',          type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['patung','kerbau','pahatan','karya'] },
    { title: 'Patung Kucing',          type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['patung','kucing','pahatan','karya'] },
    { title: 'Tas',                    type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['tas','toraja','karya'] },
    { title: 'Tempat Tisu',            type: 'Produk',   url: '../pages/karya-rbm.html#produk',              keywords: ['tempat tisu','tissue','kerajinan','karya'] },
    { title: 'Semua Artikel',          type: 'Kategori', url: '../pages/cerita.html',                       keywords: ['semua','artikel','cerita'] },
    { title: 'Berita',                 type: 'Kategori', url: '../pages/cerita.html?cat=berita',            keywords: ['berita','news','informasi'] },
    { title: 'Kegiatan',              type: 'Kategori',  url: '../pages/cerita.html?cat=kegiatan',          keywords: ['kegiatan','event','acara','aktivitas'] },
    { title: 'Cerita Inspiratif',     type: 'Kategori',  url: '../pages/cerita.html?cat=inspiratif',        keywords: ['inspiratif','motivasi','kisah','cerita'] },
    { title: 'Pendidikan (Cerita)',   type: 'Kategori',  url: '../pages/cerita.html?cat=pendidikan',        keywords: ['pendidikan','belajar','cerita pendidikan'] },
    { title: 'Pemberdayaan (Cerita)', type: 'Kategori',  url: '../pages/cerita.html?cat=pemberdayaan',      keywords: ['pemberdayaan','mandiri','ekonomi','cerita'] },
    { title: 'Kemitraan (Cerita)',    type: 'Kategori',  url: '../pages/cerita.html?cat=kemitraan',         keywords: ['kemitraan','mitra','kolaborasi','partner'] },
    { title: 'Gereja Toraja',         type: 'Mitra',    url: '../pages/tentang-rbm.html',                  keywords: ['gereja','toraja','mitra','partner'] },
    { title: 'Pemerintah Kab. Toraja Utara', type: 'Mitra', url: '../pages/tentang-rbm.html',              keywords: ['pemerintah','kabupaten','toraja utara','pemkab','mitra'] },
    { title: 'RS Elim',              type: 'Mitra',     url: '../pages/tentang-rbm.html',                  keywords: ['rs elim','rumah sakit','elim','mitra','kesehatan'] },
  ],
};
