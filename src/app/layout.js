'use client';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientWrapper from '../components/ClientWrapper';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}