const REQUEST_TYPES = {
  pertanyaan: 'Pertanyaan umum',
  'informasi-layanan': 'Informasi layanan',
  donasi: 'Informasi donasi',
  relawan: 'Pengajuan relawan',
  kemitraan: 'Pengajuan kemitraan',
  'beli-karya': 'Pembelian karya',
  kunjungan: 'Permohonan kunjungan',
  lainnya: 'Pertanyaan lainnya'
};

function sendJson(res, statusCode, body) {
  return res.status(statusCode).json(body);
}

function readBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body && typeof body === 'object' ? body : null;
}

module.exports = async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Metode permintaan tidak didukung.' });
  }

  const body = readBody(req.body);
  if (!body || Array.isArray(body)) {
    return sendJson(res, 400, { error: 'Data formulir tidak valid. Silakan periksa kembali isian Anda.' });
  }

  const name = typeof body.nama === 'string' ? body.nama.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subjek === 'string' ? body.subjek.trim() : '';
  const requestType = typeof body.keperluan === 'string' ? body.keperluan : '';
  const message = typeof body.pesan === 'string' ? body.pesan.trim() : '';
  const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';
  const subjectLabel = Object.prototype.hasOwnProperty.call(REQUEST_TYPES, requestType)
    ? REQUEST_TYPES[requestType]
    : null;

  if (!subjectLabel) {
    return sendJson(res, 400, { error: 'Silakan pilih keperluan yang tersedia.' });
  }
  if (!name || name.length > 120 || /[\r\n]/.test(name)) {
    return sendJson(res, 400, { error: 'Nama wajib diisi dan maksimal 120 karakter.' });
  }
  if (!email || email.length > 254 || /[\r\n]/.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { error: 'Masukkan alamat email yang valid.' });
  }
  if (!subject || subject.length > 160 || /[\r\n]/.test(subject)) {
    return sendJson(res, 400, { error: 'Subjek wajib diisi dan maksimal 160 karakter.' });
  }
  if (!message || message.length > 5000) {
    return sendJson(res, 400, { error: 'Pesan wajib diisi dan maksimal 5.000 karakter.' });
  }
  if (whatsapp.length > 40) {
    return sendJson(res, 400, { error: 'Nomor WhatsApp maksimal 40 karakter.' });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const recipientEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'bintanglande321@gmail.com';
  if (!apiKey || !fromEmail || /[\r\n]/.test(fromEmail)) {
    console.error('Contact email is unavailable: RESEND_API_KEY and RESEND_FROM_EMAIL must be configured.');
    return sendJson(res, 503, {
      error: 'Layanan email belum siap. Pengelola perlu mengatur RESEND_API_KEY dan RESEND_FROM_EMAIL di Vercel.'
    });
  }

  const text = [
    `Keperluan: ${subjectLabel}`,
    `Subjek: ${subject}`,
    `Nama: ${name}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp || '-'}`,
    '',
    'Pesan:',
    message
  ].join('\n');

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `[RBM Toraja] ${subjectLabel} — ${subject} — ${name}`,
        text
      })
    });
  } catch (error) {
    console.error('Contact email request could not reach Resend:', error);
    return sendJson(res, 502, {
      error: 'Pengiriman email gagal karena layanan email tidak dapat dijangkau. Silakan coba kembali nanti.'
    });
  }

  if (!response.ok) {
    const details = await response.text();
    console.error(`Resend rejected a contact email (${response.status}): ${details.slice(0, 500)}`);
    return sendJson(res, 502, {
      error: 'Layanan email menolak pengiriman. Pengelola perlu memeriksa konfigurasi Resend.'
    });
  }

  return sendJson(res, 200, { ok: true });
};
