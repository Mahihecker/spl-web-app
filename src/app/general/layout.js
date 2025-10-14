// src/app/(general)/layout.js
'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import SidePanel from '../../components/SidePanel';
import Footer from '../../components/Footer';

export default function GeneralLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const sidebarWidth = isSidebarOpen ? '190px' : '55px';

  if (!user || user.role !== 'general') {
    return null; // Middleware will redirect
  }

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#F8F8F8',
        overflowX: 'hidden',
      }}
    >
      <Header placeholder="Search organizations" style={{ zIndex: 10, top: 0 }} />
      <div className="d-flex flex-grow-1" style={{ position: 'relative' }}>
        <SidePanel
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          userRole={user.role}
          style={{ zIndex: 1 }}
        />
        <main
          className="flex-grow-1"
          style={{
            width: `calc(100% - ${sidebarWidth})`,
            padding: 0,
            transition: 'margin-left 0.3s ease, width 0.3s ease',
          }}
        >
          {children}
        </main>
      </div>
      <Footer style={{ zIndex: 20, position: 'sticky', bottom: 0 }} />
    </div>
  );
}