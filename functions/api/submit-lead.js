const LEAD_CAPTURE_URL = 'https://script.google.com/macros/s/AKfycbwisgNDtbntSx9usZlwnQoYZZDF37n_Y7rMdwMxtCWES6NcRqS5Yy9m71eGiOK8uFBS/exec';

const LIMITS = {
  name: 120,
  business: 160,
  phone: 40,
  email: 254,
  site: 2048,
  message: 3000
};

const ALLOWED_SOURCES = new Set(['modal', 'contact']);
const ALLOWED_NEEDS = new Set(['New website', 'Website makeover', 'Not sure yet']);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-store'
    }
  });
}

function clean(value) {
  return String(value ?? '').trim();
}

function validate(data) {
  const required = ['name', 'business', 'phone', 'need', 'source'];
  for (const field of required) {
    if (!clean(data.get(field))) {
      return `Missing required field: ${field}`;
    }
  }

  if (!ALLOWED_SOURCES.has(clean(data.get('source')))) {
    return 'Invalid submission source.';
  }

  if (!ALLOWED_NEEDS.has(clean(data.get('need')))) {
    return 'Invalid request type.';
  }

  const honeypot = clean(data.get('honeypot'));
  if (honeypot) return 'Invalid submission.';

  for (const [field, max] of Object.entries(LIMITS)) {
    if (clean(data.get(field)).length > max) {
      return `${field} is too long.`;
    }
  }

  const email = clean(data.get('email'));
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address.';
  }

  if (clean(data.get('need')) === 'Website makeover') {
    const site = clean(data.get('site') || data.get('website') || data.get('websiteUrl'));
    if (!/^(https?:\/\/|www\.)[^\s]+$/i.test(site)) {
      return 'Please enter a valid website URL for a makeover.';
    }
  }

  return null;
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405);
  }

  try {
    const incoming = await request.formData();
    const data = new URLSearchParams();

    for (const [key, value] of incoming.entries()) {
      if (typeof value === 'string') data.set(key, value);
    }

    const validationError = validate(data);
    if (validationError) {
      return json({ ok: false, error: validationError }, 400);
    }

    const upstream = await fetch(LEAD_CAPTURE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
      },
      body: data.toString()
    });

    const text = await upstream.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return json({ ok: false, error: 'Lead service returned an invalid response.' }, 502);
    }

    if (result?.ok === true) {
      return json(result, 200);
    }

    // Apps Script may return HTTP 200 while reporting an application-level failure.
    return json({
      ok: false,
      error: result?.error || 'Submission could not be processed.'
    }, 502);
  } catch (error) {
    console.error('GoReallyBig lead proxy failed:', error);
    return json({ ok: false, error: 'Lead service is temporarily unavailable.' }, 502);
  }
}
