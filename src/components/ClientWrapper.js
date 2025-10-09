"use client";

import Script from 'next/script';

export default function ClientWrapper({ children }) {
  return (
    <>
      {children}
      <Script src="/bootstrap.min.js" strategy="lazyOnload" />
    </>
  );
}