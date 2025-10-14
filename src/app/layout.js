// src/app/layout.js
'use client';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientWrapper from '../components/ClientWrapper';
import { AuthProvider } from '../context/AuthContext';
import { SearchProvider } from '../context/SearchContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SearchProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}