import fs from 'node:fs';

function getProductionSource() {
  return fs.readFileSync('index.html', 'utf8');
}

function getBody(source) {
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error('Production body could not be extracted.');
  return match[1]
    .replace(/<script[^>]+src=["']assets\/app\.js["'][^>]*><\/script>/gi, '')
    .trim();
}

export default function Home() {
  const body = getBody(getProductionSource());

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <script src="/assets/app-core.js" defer />
    </>
  );
}
