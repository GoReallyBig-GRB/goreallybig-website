import fs from 'node:fs';
import './globals.css';

export const metadata = {
  title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
  description: 'Professional website design and website makeovers for Nigerian businesses. GoReallyBig builds websites that make businesses easier to find, trust and choose.',
  robots: 'index, follow',
  alternates: { canonical: 'https://goreallybig.com/' },
  icons: { icon: '/assets/favicon.png', apple: '/assets/favicon.png' },
  openGraph: {
    type: 'website', siteName: 'GoReallyBig',
    title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
    description: 'Professional website design and website makeovers for Nigerian businesses.',
    url: 'https://goreallybig.com/', images: [{ url: 'https://goreallybig.com/assets/favicon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Website Design for Nigerian Businesses | GoReallyBig',
    description: 'Professional website design and website makeovers for Nigerian businesses.',
    images: ['https://goreallybig.com/assets/favicon.png'],
  },
};

function getProductionStyles() {
  const source = fs.readFileSync('index.html', 'utf8');
  return [...source.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1]).join('\n');
}

const refinements = `
.contact-detail a{color:#aebacc;text-decoration:none;font-size:15px;line-height:1.65}
.contact-detail a:hover{color:#fff;text-decoration:underline}
.contact-mini .wa{background:#25d366 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='white' d='M23.5 8.5A10.5 10.5 0 0 0 7.3 21.2L6 26l4.9-1.3a10.5 10.5 0 0 0 12.6-16.2Zm-7.5 16.1c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.7 8.7 0 1 1 7.1 3.7Zm4.8-6.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.3-.6-.5Z'/%3E%3C/svg%3E") center/17px 17px no-repeat;color:transparent}
`;

export default function RootLayout({ children }) {
  const styles = getProductionStyles();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: styles + refinements }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
