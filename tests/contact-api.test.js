const assert = require('node:assert/strict');
const { test } = require('node:test');
const contactHandler = require('../api/contact');

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

function createRequest(body, method = 'POST') {
  return { method, body };
}

test('rejects requests when the Resend sender configuration is missing', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });

  const response = createResponse();
  await contactHandler(createRequest({
    nama: 'Pengunjung',
    email: 'pengunjung@example.com',
    subjek: 'Permohonan menjadi relawan',
    keperluan: 'relawan',
    pesan: 'Saya ingin mendaftar.'
  }), response);

  assert.equal(response.statusCode, 503);
  assert.match(response.body.error, /RESEND_API_KEY dan RESEND_FROM_EMAIL/);
});

test('validates form data before calling the email provider', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev';
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });
  t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Fetch should not be called for invalid input');
  });

  const response = createResponse();
  await contactHandler(createRequest({
    nama: 'Pengunjung',
    email: 'bukan-email',
    subjek: 'Pertanyaan',
    keperluan: 'pertanyaan',
    pesan: 'Pertanyaan'
  }), response);

  assert.equal(response.statusCode, 400);
  assert.match(response.body.error, /alamat email yang valid/);
});

test('sends the selected request to RBM Toraja and uses the visitor email for replies', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev';
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });

  let request;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    request = { url, options, payload: JSON.parse(options.body) };
    return { ok: true, status: 200 };
  });

  const response = createResponse();
  await contactHandler(createRequest({
    nama: 'Sari Toraja',
    email: 'sari@example.com',
    subjek: 'Diskusi kerja sama',
    whatsapp: '+628123456789',
    keperluan: 'kemitraan',
    pesan: 'Kami ingin berdiskusi tentang kerja sama.'
  }), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(request.url, 'https://api.resend.com/emails');
  assert.equal(request.options.headers.Authorization, 'Bearer test-key');
  assert.equal(request.payload.from, 'onboarding@resend.dev');
  assert.deepEqual(request.payload.to, ['rbmtoraja@gmail.com']);
  assert.equal(request.payload.reply_to, 'sari@example.com');
  assert.match(request.payload.subject, /Pengajuan kemitraan.*Diskusi kerja sama/);
  assert.match(request.payload.text, /Subjek: Diskusi kerja sama/);
  assert.match(request.payload.text, /WhatsApp: \+628123456789/);
  assert.match(request.payload.text, /Kami ingin berdiskusi tentang kerja sama\./);
});

test('uses a matching subject for question, donation, volunteer, and partnership requests', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev';
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });

  const requests = [];
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return { ok: true, status: 200 };
  });
  const types = [
    ['pertanyaan', 'Pertanyaan umum'],
    ['donasi', 'Informasi donasi'],
    ['relawan', 'Pengajuan relawan'],
    ['kemitraan', 'Pengajuan kemitraan']
  ];

  for (const [type, label] of types) {
    const response = createResponse();
    await contactHandler(createRequest({
      nama: 'Pengunjung',
      email: 'pengunjung@example.com',
      subjek: `Permintaan ${type}`,
      keperluan: type,
      pesan: `Pesan untuk ${type}.`
    }), response);
    assert.equal(response.statusCode, 200);
    assert.match(requests.at(-1).subject, new RegExp(label));
    assert.match(requests.at(-1).text, new RegExp(`Keperluan: ${label}`));
  }
});

test('reports provider rejections instead of confirming a failed email', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev';
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: false,
    status: 403,
    text: async () => 'test provider rejection'
  }));

  const response = createResponse();
  await contactHandler(createRequest({
    nama: 'Pengunjung',
    email: 'pengunjung@example.com',
    subjek: 'Pertanyaan',
    keperluan: 'pertanyaan',
    pesan: 'Saya ingin bertanya.'
  }), response);

  assert.equal(response.statusCode, 502);
  assert.equal(response.body.ok, undefined);
  assert.match(response.body.error, /menolak pengiriman/);
});

test('validates the message subject before calling the email provider', async t => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev';
  t.after(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = originalFrom;
  });
  t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Fetch should not be called for an invalid subject');
  });

  const response = createResponse();
  await contactHandler(createRequest({
    nama: 'Pengunjung',
    email: 'pengunjung@example.com',
    subjek: 'Pertanyaan\r\nBcc: attacker@example.com',
    keperluan: 'pertanyaan',
    pesan: 'Saya ingin bertanya.'
  }), response);

  assert.equal(response.statusCode, 400);
  assert.match(response.body.error, /Subjek wajib diisi/);
});
