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

  // Redirect to login if not authenticated or wrong role
  if (!user || user.role !== 'general') {
    return null; // Middleware will redirect
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', backgroundColor: '#F8F8F8' }}>
      <Header placeholder="Search organizations" />
      <div className="d-flex flex-grow-1">
        <SidePanel isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} userRole={user.role} />
        <main className="flex-grow-1" style={{ margin: 0, padding: 0, width: '100%' }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}